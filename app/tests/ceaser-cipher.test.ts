import { decrypt, encrypt } from "../actions/ceaser-cipher.action";

describe("ceaser-cipher", () => {
  test("decrypt-success", () => {
    const encryptedText = "wklv lv d whvw phvvdjh";
    const shift = 3;

    const decryptedText = decrypt({
      text: encryptedText,
      shift,
    });
    expect(decryptedText).toBe("this is a test message");
  });
  test("encrypt-success", () => {
    const text = "this is a test message";
    const shift = 3;

    const encryptedText = encrypt({
      text,
      shift,
    });
    expect(encryptedText).toBe("wklv lv d whvw phvvdjh");
  });
  test("large-shift", () => {
    const text = "this is a test message";
    const shift = 3000;

    const encryptedText = encrypt({
      text,
      shift,
    });

    const decryptedText = decrypt({
      text: encryptedText,
      shift,
    });

    expect(decryptedText).toBe(text);
  });
});
