export function is_query_cache_enabled_via_parameter({ query_cache_type }) {
    return query_cache_type == 1 || query_cache_type == "ON"
}

function is_query_cache_enabled_via_sql(query) {
    return /SQL_NO_CACHE/ig.test(String(query)) === false
}