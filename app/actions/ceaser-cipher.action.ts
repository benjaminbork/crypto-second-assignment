import {
  checkIsUnicodePartOfAlphabet,
  checkIsUnicodePartOfUpperCaseAlphabet,
} from "../../utils/cipher";

const shiftUnicode = (code: number, shift: number, base: number): number => {
  return ((code - base - shift + 26) % 26) + base;
};

export const decrypt = ({
                          text,
                          shift,
                        }: {
  text: string;
  shift: number;
}): string => {
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

export const encrypt = ({
                          text,
                          shift,
                        }: {
  text: string;
  shift: number;
}): string => {
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