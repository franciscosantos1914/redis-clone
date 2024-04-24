import _ from 'lodash';

function objHas(obj, path) {
    return _.has(obj, path);
}

function isEmpty(value) {
    return _.isEmpty(value);
}

function isString(value) {
    return _.isString(value);
}

function isNumber(value) {
    return _.isNumber(value);
}

function isObject(value) {
    return _.isObject(value);
}

function isBoolean(value) {
    return _.isBoolean(value);
}

function capitalize(value) {
    return _.capitalize(value);
}

function isValidJSON(str) {
    try {
        JSON.parse(str);
        return true;
    } catch (e) {
        return false;
    }
}

export const Helper = {
    objHas
    , isBoolean
    , isEmpty
    , isNumber
    , isObject
    , isString
    , capitalize
    , isValidJSON
}
