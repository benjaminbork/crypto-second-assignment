import {
  checkIsUnicodePartOfAlphabet,
  checkIsUnicodePartOfUpperCaseAlphabet,
} from '@/utils/cipher';

const shiftUnicode = (uniCode: number, shift: number, base: number): number => {
  try {
    return ((uniCode - base + shift + 26) % 26) + base;
  } catch (error) {
    console.error("Error in shiftUnicode function:", error);
    return uniCode;
  }
};

export const encrypt = ({
                          text,
                          key,
                        }: {
  text: string;
  key: string;
}): string => {
  try {

    if (!key) {
      throw new Error("Key must not be empty.");
    }

    let keyIndex = 0;
    return text
      .split("")
      .map((char) => {
        const uniCode = char.charCodeAt(0);
        if (!checkIsUnicodePartOfAlphabet(uniCode)) {
          return char;
        }
        const base = checkIsUnicodePartOfUpperCaseAlphabet(uniCode) ? 65 : 97;
        const keyChar = key.charCodeAt(keyIndex % key.length);
        const keyShift = checkIsUnicodePartOfUpperCaseAlphabet(keyChar)
          ? keyChar - 65
          : keyChar - 97;
        keyIndex++;
        return String.fromCharCode(shiftUnicode(uniCode, keyShift, base));
      })
      .join("");
  } catch (error) {
    console.error("Error in encrypt function:", error);
    return text;
  }
};

export const decrypt = ({
                          text,
                          key,
                        }: {
  text: string;
  key: string;
}): string => {
  try {

    if (!key) {
      throw new Error("Key must not be empty.");
    }

    let keyIndex = 0;
    return text
      .split("")
      .map((char) => {
        const uniCode = char.charCodeAt(0);
        if (!checkIsUnicodePartOfAlphabet(uniCode)) {
          return char;
        }
        const base = checkIsUnicodePartOfUpperCaseAlphabet(uniCode) ? 65 : 97;
        const keyChar = key.charCodeAt(keyIndex % key.length);
        const keyShift = checkIsUnicodePartOfUpperCaseAlphabet(keyChar)
          ? keyChar - 65
          : keyChar - 97;
        keyIndex++;
        return String.fromCharCode(shiftUnicode(uniCode, -keyShift, base));
      })
      .join("");
  } catch (error) {
    console.error("Error in decrypt function:", error);
    return text;
  }
};
