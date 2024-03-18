import assert from 'node:assert'
import { describe, it } from 'node:test'

import { is_query_cache_enabled_via_parameter } from '../configurations.mjs'

describe("Query Cache Configurations", () => {
    describe("is_query_cache_enabled_via_parameter", () => {
        it("should return true because query_cache_type is set to one", () => {
            assert.equal(is_query_cache_enabled_via_parameter({ query_cache_type: 1 }), true)
        })
        it("should return true because query_cache_type is set to true", () => {
            assert.equal(is_query_cache_enabled_via_parameter({ query_cache_type: true }), true)
        })
        it("should return false because query_cache_type is set to false", () => {
            assert.equal(is_query_cache_enabled_via_parameter({ query_cache_type: false }), false)
        })
        it("should return false because query_cache_type is set to OFF", () => {
            assert.equal(is_query_cache_enabled_via_parameter({ query_cache_type: "OFF" }), false)
        })
        it("should return false because query_cache_type is set to invalid data", () => {
            assert.equal(is_query_cache_enabled_via_parameter({ query_cache_type: {} }), false)
        })
    })
})