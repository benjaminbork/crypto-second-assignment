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
  let i = 2;
  while (i < 1000) {
    const formula = (1 + fi * i) % e;
    const d = Math.floor((1 + fi * i) / e);
    if (formula === 0 && d !== e) {
      return d;
    }
    i++;
  }
  throw new Error("No valid key found");
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
  return val ** BigInt(d) % BigInt(n);
}