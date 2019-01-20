// Return que number of characters in txt which aren't
// new line, blank space os tabs.
export const validChars = txt => {
  // console.log('VALIDCHARS REVEIVED :: ', txt);
  // if( txt === null || txt === undefined || txt.length === undefined)
  //   return 0
  let c = txt.length
  for(let it of txt) if (it.match(/[\t\s\n]/))  c--
  return c
}

