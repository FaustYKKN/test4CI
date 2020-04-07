export default function decodeBase64url( str ) {

  // 1. from base64url to base64
  // 2. base64 to string
  let base64 = str.replace(/-/g, '+').replace(/_/g, '/');
  return JSON.parse( atou( base64 ) );

  function atou(str) {
    return decodeURIComponent(escape(window.atob(str)));
  }

  // this function maybe used in future, it can transform messy code of chinese to correct code
  function utf8to16(str) {
    let out, i, len, c;
    let char2, char3;
    out = "";
    len = str.length;
    i = 0;
    while(i < len) {
      c = str.charCodeAt(i++);
      switch(c >> 4)
      {
        case 0: case 1: case 2: case 3: case 4: case 5: case 6:case7:
        // 0xxxxxxx
        out += str.charAt(i-1);
        break;
        case 12: case 13:
        // 110x xxxx 10xx xxxx
        char2 = str.charCodeAt(i++);
        out += String.fromCharCode(((c & 0x1F) << 6) | (char2&0x3F));
        break;
        case 14:
          // 1110 xxxx 10xx xxxx 10xx xxxx
          char2 = str.charCodeAt(i++);
          char3 = str.charCodeAt(i++);
          out += String.fromCharCode(((c & 0x0F) << 12) |
            ((char2 & 0x3F) << 6) |
            ((char3 & 0x3F) << 0));
          break;
      }
    }
    return out;
  }


}