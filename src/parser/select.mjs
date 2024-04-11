export function handleSelect(rawSql) {
   const SELECT_REGEX = /\bSELECT\b\s+\*\s+\bFROM\b\s+\w+\s*(\bWHERE\b\s+\w+\s*=\s*\d+)?\s*(\bORDER BY\b\s+\w+\s+(ASC|DESC))?\s*(\bLIMIT\b\s+\d+)?/i

  const stringRawSQL = String(rawSql).toLowerCase().trim()  
  if(!SELECT_REGEX.test(stringRawSQL)) return 'Invalid Query'

  const split = stringRawSQL.split(' ')
  console.log(split)
}

handleSelect('SELECT * FROM users WHERE id = 1 ORDER BY name ASC LIMIT 10')