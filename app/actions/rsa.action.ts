export function generateKeys({
                               p,
                               q,
                               e,
                             }: {
  p: number;
  q: number;
  e: number;
}): { publicKey: { n: number; e: number }; privateKey: { n: number; d: number } } | null {
  try {
    if (p <= 0 || q <= 0 || e <= 0) {
      throw new Error("Invalid input values. p, q, and e must be positive numbers.");
    }

    const n = p * q;
    const fi = (p - 1) * (q - 1);
    const d = decKey({ e, fi });

    if (d === null) {
      throw new Error("Failed to calculate decryption key.");
    }

    return {
      publicKey: { n, e },
      privateKey: { n, d },
    };
  } catch (error) {
    console.error("Error generating keys:", error);
    return null;
  }
}

export function decKey({ e, fi }: { e: number; fi: number }): number | null {
  try {
    if (e <= 0 || fi <= 0) {
      throw new Error("Invalid input values. e and fi must be positive numbers.");
    }

    const gcdResult = extendedEuclideanAlgorithm(e, fi);
    const d = gcdResult.x % fi; // Modular inverse

    return d < 0 ? d + fi : d;
  } catch (error) {
    console.error("Error calculating decryption key:", error);
    return null;
  }
}

function extendedEuclideanAlgorithm(a: number, b: number): { gcd: number, x: number, y: number } {
  let x0 = 1, x1 = 0, y0 = 0, y1 = 1;
  while (b !== 0) {
    const q = Math.floor(a / b);
    [a, b] = [b, a % b];
    [x0, x1] = [x1, x0 - q * x1];
    [y0, y1] = [y1, y0 - q * y1];
  }
  return { gcd: a, x: x0, y: y0 };
}

export function encryptString({
                                text,
                                publicKey,
                              }: {
  text: string;
  publicKey: { n: number; e: number };
}): string | null {
  try {
    if (!text || !publicKey) {
      throw new Error("Text or public key is missing.");
    }

    const encryptedArray: bigint[] = [];
    for (const char of text) {
      const val = char.charCodeAt(0);
      const encryptedVal = encrypt({ val, publicKey });
      if (encryptedVal === null) {
        throw new Error("Error encrypting value.");
      }
      encryptedArray.push(encryptedVal);
    }

    return encryptedArray.join("-");
  } catch (error) {
    console.error("Error encrypting string:", error);
    return null;
  }
}

export function decryptString({
                                encryptedString,
                                privateKey,
                              }: {
  encryptedString: string;
  privateKey: { n: number; d: number };
}): string | null {
  try {
    if (!encryptedString || !privateKey) {
      throw new Error("Encrypted string or private key is missing.");
    }

    const encryptedArray = encryptedString.split("-").map(BigInt);
    let decryptedString = "";

    for (const encryptedVal of encryptedArray) {
      const decryptedVal = decrypt({ val: encryptedVal, privateKey });
      if (decryptedVal === null) {
        throw new Error("Error decrypting value.");
      }
      decryptedString += String.fromCharCode(Number(decryptedVal));
    }

    return decryptedString;
  } catch (error) {
    console.error("Error decrypting string:", error);
    return null;
  }
}

export function encrypt({
                          val,
                          publicKey,
                        }: {
  val: number;
  publicKey: { n: number; e: number };
}): bigint | null {
  try {
    if (val < 0 || !publicKey) {
      throw new Error("Invalid value or public key.");
    }

    const { n, e } = publicKey;
    return BigInt(val) ** BigInt(e) % BigInt(n);
  } catch (error) {
    console.error("Error encrypting value:", error);
    return null;
  }
}

export function decrypt({
                          val,
                          privateKey,
                        }: {
  val: bigint;
  privateKey: { n: number; d: number };
}): bigint | null {
  try {
    if (val < 0 || !privateKey) {
      throw new Error("Invalid value or private key.");
    }

    const { n, d } = privateKey;
    return modularExponentiation(val, BigInt(d), BigInt(n));
  } catch (error) {
    console.error("Error decrypting value:", error);
    return null;
  }
}

function modularExponentiation(base: bigint, exponent: bigint, modulus: bigint): bigint {
  try {
    let result = BigInt(1);
    let baseMod = base % modulus;

    while (exponent > 0) {
      if (exponent % 2n === 1n) {
        result = (result * baseMod) % modulus;
      }
      exponent = exponent >> 1n;
      baseMod = (baseMod * baseMod) % modulus;
    }

    return result;
  } catch (error) {
    console.error("Error in modular exponentiation:", error);
    return BigInt(0);
  }
}
