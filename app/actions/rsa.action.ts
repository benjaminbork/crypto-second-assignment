export function generateKeys({
                               p,
                               q,
                               e,
                             }: {
  p: number;
  q: number;
  e: number;
}): {
  publicKey: { n: number; e: number };
  privateKey: { n: number; d: number };
} {
  const n = p * q;
  const fi = (p - 1) * (q - 1);
  const d = decKey({ e, fi });

  return {
    publicKey: { n, e },
    privateKey: { n, d },
  };
}

export function decKey({ e, fi }: { e: number; fi: number }): number {
  const gcdResult = extendedEuclideanAlgorithm(e, fi);
  const d = gcdResult.x % fi; // Modular inverse

  return d < 0 ? d + fi : d;
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
}): string {
  const encryptedArray: bigint[] = [];
  for (const char of text) {
    const val = char.charCodeAt(0);
    const encryptedVal = encrypt({ val, publicKey });
    encryptedArray.push(encryptedVal);
  }

  return encryptedArray.join("-");
}

export function decryptString({
                                encryptedString,
                                privateKey,
                              }: {
  encryptedString: string;
  privateKey: { n: number; d: number };
}): string {
  const encryptedArray = encryptedString.split("-").map(BigInt);
  let decryptedString = "";

  for (const encryptedVal of encryptedArray) {
    const decryptedVal = decrypt({ val: encryptedVal, privateKey });
    decryptedString += String.fromCharCode(Number(decryptedVal));
  }
  return decryptedString;
}

export function encrypt({
                          val,
                          publicKey,
                        }: {
  val: number;
  publicKey: { n: number; e: number };
}): bigint {
  const { n, e } = publicKey;
  return BigInt(val) ** BigInt(e) % BigInt(n);
}

export function decrypt({
                          val,
                          privateKey,
                        }: {
  val: bigint;
  privateKey: { n: number; d: number };
}): bigint {
  const { n, d } = privateKey;
  return modularExponentiation(val, BigInt(d), BigInt(n));
}

function modularExponentiation(base: bigint, exponent: bigint, modulus: bigint): bigint {
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
}