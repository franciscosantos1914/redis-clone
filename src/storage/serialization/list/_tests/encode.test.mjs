import { serializeList } from '../encode.mjs'
import { Messages } from '../../../../shareds/messages.mjs';
import { List } from "../../../../data-structures/list.mjs";
import { AppError, AppSuccess } from '../../../../shareds/app-response.mjs';

describe('serializeList', () => {
    it('should return an AppError if no parameters are provided', () => {
        const result = serializeList();
        expect(result instanceof AppError).toBe(true);
        expect(result.message).toBe(Messages.Error.NO_PARAMS_PROVIDED);
    });

    it('should return an AppError if input is not a List', () => {
        const result = serializeList({});
        expect(result instanceof AppError).toBe(true);
        expect(result.message).toBe(Messages.Error.INVALID_LIST);
    });

    it('should return an AppSuccess with the serialized data if input is a List', () => {
        const list = new List();
        list.add(1);
        list.add(2);
        list.add(3);
    
        const result = serializeList(list);
        expect(result instanceof AppSuccess).toBe(true);
    
        const expectedBuffer = new ArrayBuffer(17);
        const view = new DataView(expectedBuffer);
    
        view.setUint8(0, 'l'.charCodeAt(0));
        view.setUint32(1, 3, false);
    
        // Adjusted offsets to fit within the ArrayBuffer size
        view.setUint32(5, 1, false);
        view.setUint32(9, 2, false);
        view.setUint32(13, 3, false);
    
        expect(result.data.byteLength).toBe(expectedBuffer.byteLength);
        const resultView = new DataView(result.data);
        for (let i = 0; i < expectedBuffer.byteLength; i++) {
            expect(resultView.getUint8(i)).toBe(view.getUint8(i));
        }
    });
    
});
