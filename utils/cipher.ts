export const checkIsUnicodePartOfAlphabet = (code: number): boolean => {
  return (code >= 65 && code <= 90) || (code >= 97 && code <= 122);
};
export const checkIsUnicodePartOfUpperCaseAlphabet = (
  code: number
): boolean => {
  return code >= 65 && code <= 90;
};
