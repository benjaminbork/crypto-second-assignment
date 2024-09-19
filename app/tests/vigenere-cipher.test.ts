import { decrypt, encrypt } from "../actions/vigenere-cipher.action";

describe("vigenere-cipher", () => {
  test("decrypt-success", () => {
    const encryptedText = "vvnx mw c hjxx qggxfki";
    const key = "coffee";

    const decryptedText = decrypt({
      text: encryptedText,
      key,
    });
    expect(decryptedText).toBe("this is a test message");
  });
  test("encrypt-success", () => {
    const text = "this is a test message";
    const key = "coffee";

    const encryptedText = encrypt({
      text,
      key,
    });
    expect(encryptedText).toBe("vvnx mw c hjxx qggxfki");
  });
});