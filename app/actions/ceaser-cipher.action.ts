const checkIsUnicodePartOfAlphabet = (code: number): boolean => {
  return (code >= 65 && code <= 90) || (code >= 97 && code <= 122);
};
const checkIsUnicodePartOfUpperCaseAlphabet = (code: number): boolean => {
  return code >= 65 && code <= 90;
};

const shiftUnicode = (code: number, shift: number, base: number): number => {
  return ((code - base - shift + 26) % 26) + base;
};

export const decrypt = (text: string, shift: number): string => {
  return text
    .split("")
    .map((char) => {
      const uniCode = char.charCodeAt(0);
      if (!checkIsUnicodePartOfAlphabet(uniCode)) {
        return char;
      }
      const base = checkIsUnicodePartOfUpperCaseAlphabet(uniCode) ? 65 : 97;
      return String.fromCharCode(shiftUnicode(uniCode, shift, base));
    })
    .join("");
};

export const encrypt = (text: string, shift: number): string => {
  return text
    .split("")
    .map((char) => {
      const uniCode = char.charCodeAt(0);
      if (!checkIsUnicodePartOfAlphabet(uniCode)) {
        return char;
      }
      const base = checkIsUnicodePartOfUpperCaseAlphabet(uniCode) ? 65 : 97;
      return String.fromCharCode(shiftUnicode(uniCode, -shift, base));
    })
    .join("");
};
