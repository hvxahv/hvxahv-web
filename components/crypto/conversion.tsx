export const ab2str = (buf:ArrayBuffer) => {
    // @ts-ignore
    return String.fromCharCode.apply(null, new Uint8Array(buf))
  }
  
  // convert from a binary string to an ArrayBuffer
  export const str2ab = (str: string) => {
    const buf = new ArrayBuffer(str.length);
    const bufView = new Uint8Array(buf);
    for (let i = 0, strLen = str.length; i < strLen; i++) {
      bufView[i] = str.charCodeAt(i);
    }
    return buf;
  }
  