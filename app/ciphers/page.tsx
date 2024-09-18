"use client";

import { useState } from "react";
import { title } from "@/components/primitives";
import { encrypt as caesarEncrypt, decrypt as caesarDecrypt } from '@/app/actions/ceaser-cipher.action';
import { encrypt as vigenereEncrypt, decrypt as vigenereDecrypt } from '@/app/actions/vigenere-cipher.action';
import { Input } from "@nextui-org/input";
import { Spacer } from '@nextui-org/spacer';
import { RadioGroup, Radio } from "@nextui-org/radio";
import { Button } from "@nextui-org/button";
import { Snippet } from "@nextui-org/snippet";

export default function CipherPage() {
  const [text, setText] = useState("");
  const [shift, setShift] = useState(0);
  const [key, setKey] = useState("");
  const [cipherType, setCipherType] = useState("caesar");
  const [result, setResult] = useState("");
  const [resultLabel, setResultLabel] = useState("");

  const handleEncrypt = () => {
    let encryptedText = "";
    if (cipherType === "caesar") {
      encryptedText = caesarEncrypt({ text, shift });
    } else if (cipherType === "vigenere") {
      encryptedText = vigenereEncrypt({ text, key });
    }
    setResult(encryptedText);
    setResultLabel("Encrypted:");
  };

  const handleDecrypt = () => {
    let decryptedText = "";
    if (cipherType === "caesar") {
      decryptedText = caesarDecrypt({ text, shift });
    } else if (cipherType === "vigenere") {
      decryptedText = vigenereDecrypt({ text, key });
    }
    setResult(decryptedText);
    setResultLabel("Decrypted:");
  };

  return (
    <div>
      <h1 className={title()}>Ciphers</h1>
      <Spacer y={16} />

      {/* Cipher Selection */}
      <div>
        <RadioGroup
          label="Select Cipher"
          value={cipherType}
          onChange={(e) => setCipherType(e.target.value)}
          orientation="horizontal"
        >
          <Radio value="caesar">Caesar Cipher</Radio>
          <Radio value="vigenere">Vigenère Cipher</Radio>
        </RadioGroup>
      </div>

      {/* Common Text Input */}
      <div>
        <Spacer y={4} />
        <Input type="text" label="Text" labelPlacement="outside" value={text}
               onChange={(e) => setText(e.target.value)} />
        <Spacer y={8} />
      </div>

      {/* Conditional Input for Caesar or Vigenère */}
      {cipherType === "caesar" && (
        <div>
          <Input type="number" label="Shift Value" labelPlacement="outside"
                 value={shift.toString()}
                 onChange={(e) => setShift(Number(e.target.value))} />
        </div>
      )}

      {cipherType === "vigenere" && (
        <div>
          <Input type="text" label="Key" labelPlacement="outside" value={key}
                 onChange={(e) => setKey(e.target.value)} />
        </div>
      )}

      <div className="flex justify-center m-6">
        <Button color="primary" variant="flat" onClick={handleEncrypt}>
          Encrypt
        </Button>
        <Spacer x={6} />
        <Button color="success" variant="flat" onClick={handleDecrypt}>
          Decrypt
        </Button>
      </div>


      {result !== "" && (
        <div>
          <h3>{resultLabel}</h3>
          <Snippet symbol=''>{result}</Snippet>
        </div>
      )}
    </div>
  );
}
