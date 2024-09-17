import {
  generateKeys,
  encryptString,
  decryptString,
} from "../actions/rsa.action";

describe("rsa", () => {
  const p = 89;
  const q = 107;
  const e = 3;

  const { publicKey, privateKey } = generateKeys({
    p,
    q,
    e,
  });

  test("encryption and decryption", () => {
    const userInput = "test";
    const encryptedString = encryptString({
      text: userInput,
      publicKey,
    });
    const decryptedString = decryptString({
      encryptedString,
      privateKey,
    });
    expect(decryptedString).toBe(userInput);
  });

  test("decryption", () => {
    const encryptedString = "7988-7938-8476";
    const decryptedString = decryptString({
      encryptedString,
      privateKey,
    });
    expect(decryptedString).toBe("abc");
  });
});
