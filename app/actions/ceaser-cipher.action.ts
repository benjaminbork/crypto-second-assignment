import {
  checkIsUnicodePartOfAlphabet,
  checkIsUnicodePartOfUpperCaseAlphabet,
} from "../../utils/cipher";

const shiftUnicode = (code: number, shift: number, base: number): number => {
  try {
    const normalizedShift = shift % 26;
    return ((code - base - normalizedShift + 26) % 26) + base;
  } catch (error) {
    console.error("Error in shiftUnicode function:", error);
    return code;
  }
};

export const decrypt = ({
                          text,
                          shift,
                        }: {
  text: string;
  shift: number;
}): string => {
  try {
    if (typeof text !== 'string' || typeof shift !== 'number') {
      throw new Error("Invalid input types. Text must be a string and shift must be a number.");
    }

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
  } catch (error) {
    console.error("Error in decrypt function:", error);
    return text;
  }
};

export const encrypt = ({
                          text,
                          shift,
                        }: {
  text: string;
  shift: number;
}): string => {
  try {
    if (typeof text !== 'string' || typeof shift !== 'number') {
      throw new Error("Invalid input types. Text must be a string and shift must be a number.");
    }

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
  } catch (error) {
    console.error("Error in encrypt function:", error);
    return text;
  }
};
