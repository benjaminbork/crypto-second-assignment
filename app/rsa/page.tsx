"use client";

import { useState } from 'react'
import { title } from "@/components/primitives";
import { generateKeys, encryptString, decryptString } from "@/app/actions/rsa.action";
import { Input } from '@nextui-org/input';
import { Spacer } from '@nextui-org/spacer';
import { Button } from '@nextui-org/button';
import { Snippet } from '@nextui-org/snippet';
import { Textarea } from "@nextui-org/input";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem} from "@nextui-org/dropdown";

type PresetKey = 'preset1' | 'preset2' | 'preset3' | 'preset4';

export default function RSAPage() {
  const [p, setP] = useState<number>(0);
  const [q, setQ] = useState<number>(0);
  const [e, setE] = useState<number>(0);
  const [publicKey, setPublicKey] = useState<{ n: number; e: number } | null>(null);
  const [privateKey, setPrivateKey] = useState<{ n: number; d: number } | null>(null);
  const [publicKeyGenerated, setPublicKeyGenerated] = useState<{ n: number; e: number } | null>(null);
  const [privateKeyGenerated, setPrivateKeyGenerated] = useState<{ n: number; d: number } | null>(null);


  const [text, setText] = useState<string>("");
  const [encryptedText, setEncryptedText] = useState<string>("");
  const [decryptedText, setDecryptedText] = useState<string>("");

  const [inputPublicKey, setInputPublicKey] = useState<string>("");
  const [inputPrivateKey, setInputPrivateKey] = useState<string>("");

  const [textToDecrypt, setTextToDecrypt] = useState<string>("");

  // Generate RSA keys
  const handleGenerateKeys = () => {
    if (p > 0 && q > 0 && e > 0) {
      // @ts-ignore
      const { publicKey, privateKey } = generateKeys({ p, q, e });
      setPublicKeyGenerated(publicKey);
      setPrivateKeyGenerated(privateKey);
    }
  };


  // Encrypt with provided or generated public key
  const handleEncrypt = () => {
    let publicKeyToUse;
    if (inputPublicKey) {
      const [n, e] = inputPublicKey.split(',').map(Number);
      publicKeyToUse = { n, e };
    } else if (publicKey) {
      publicKeyToUse = publicKey;
    } else {
      alert("Public key is required for encryption.");
      return;
    }

    if (text) {
      const encrypted = encryptString({ text, publicKey: publicKeyToUse });
      // @ts-ignore
      setEncryptedText(encrypted);
    }
  };

  // Decrypt with provided or generated private key
  const handleDecrypt = () => {
    let privateKeyToUse;
    if (inputPrivateKey) {
      const [n, d] = inputPrivateKey.split(',').map(Number);
      privateKeyToUse = { n, d };
    } else if (privateKey) {
      privateKeyToUse = privateKey;
    } else {
      alert("Private key is required for decryption.");
      return;
    }

    if (textToDecrypt) {
      const decrypted = decryptString({ encryptedString: textToDecrypt, privateKey: privateKeyToUse });
      // @ts-ignore
      setDecryptedText(decrypted);
    }
  };

  const rsaPresets: Record<PresetKey, { p: number; q: number; e: number }> = {
    preset1: { p: 61, q: 53, e: 17 },
    preset2: { p: 101, q: 89, e: 3 },
    preset3: { p: 137, q: 131, e: 65537 },
    preset4: { p: 1811, q: 1931, e: 65537 }
  };

  const handlePresetChange = (key: string) => {
    if (key in rsaPresets) {
      const selectedPreset = rsaPresets[key as PresetKey];
      setP(selectedPreset.p);
      setQ(selectedPreset.q);
      setE(selectedPreset.e);
    }
  };


  return (
    <div>
      <h1 className={title()}>RSA</h1>
      <Spacer y={8} />

      <Dropdown>
        <DropdownTrigger>
          <Button variant="bordered" className="capitalize">
            Select Preset
          </Button>
        </DropdownTrigger>
        <DropdownMenu
          aria-label="RSA Presets"
          onAction={(key) => handlePresetChange(key as string)}
        >
          <DropdownItem key="preset1">Preset 1 (p=61, q=53, e=17)</DropdownItem>
          <DropdownItem key="preset2">Preset 2 (p=101, q=89, e=3)</DropdownItem>
          <DropdownItem key="preset3">Preset 3 (p=137, q=131, e=65537)</DropdownItem>
          <DropdownItem key="preset4">Preset 4 (p=1811, q=1931, e=65537)</DropdownItem>
        </DropdownMenu>
      </Dropdown>
      <Spacer y={4} />

      <div className="flex justify-between">
        <Input type="number" label="Prime Number P" labelPlacement="outside"
               value={p.toString()}
               onChange={(e) => setP(Number(e.target.value))} className="m-4" />
        <Input type="number" label="Prime Number Q" labelPlacement="outside"
               value={q.toString()}
               onChange={(e) => setQ(Number(e.target.value))} className="m-4" />
        <Input type="number" label="Public Exponent E" labelPlacement="outside"
               value={e.toString()}
               onChange={(e) => setE(Number(e.target.value))} className="m-4" />
        <Spacer y={4} />
      </div>

      <Button color="primary" variant="flat" onClick={handleGenerateKeys}>
        Generate Keys
      </Button>

      <Spacer y={10} />

      {publicKeyGenerated !== null && privateKeyGenerated !== null && (
        <div className='flex items-center justify-center'>
          <p className='mr-2'>Public Key:</p>
          <Snippet symbol='' size='sm' className='mr-4'>
            {`${publicKeyGenerated?.n}, ${publicKeyGenerated?.e}`}
          </Snippet>
          <p className='mr-2'>Private Key:</p>
          <Snippet symbol='' size='sm'>
            {`${privateKeyGenerated?.n}, ${privateKeyGenerated?.d}`}
          </Snippet>
        </div>
      )}

      <Spacer y={10} />

      <div className="flex items-center justify-between">
        <div>
          <Input type="text" label="Enter public key as N,E"
                 labelPlacement="outside" value={inputPublicKey}
                 onChange={(e) => setInputPublicKey(e.target.value)} className="mb-8"/>
          <Input type="text" label="Text to Encrypt" labelPlacement="outside"
                 value={text} onChange={(e) => setText(e.target.value)} className="mb-4"/>
          <Button color="primary" variant="flat" onClick={handleEncrypt} className="mb-4">
            Encrypt
          </Button>
        </div>


        <div>
          <Input type="text" label="Enter private key as N,D"
                 labelPlacement="outside" value={inputPrivateKey}
                 onChange={(e) => setInputPrivateKey(e.target.value)} className="mb-8"/>
          <Input type="text" label="Text to Decrypt" labelPlacement="outside"
                 value={textToDecrypt}
                 onChange={(e) => setTextToDecrypt(e.target.value)} className="mb-4"/>
          <Button color="success" variant="flat" onClick={handleDecrypt} className="mb-4">
            Decrypt
          </Button>
        </div>
      </div>

      <div className="flex items-center justify-between">
        {encryptedText && (
          <div className='flex items-center justify-center'>
            <Textarea
              isReadOnly
              label="Encrypted Text"
              variant="bordered"
              labelPlacement="outside"
              value={encryptedText}
            />
          </div>
        )}
        {decryptedText && (
          <div className='flex items-center justify-center'>
            <Textarea
              isReadOnly
              label="Decrypted Text"
              variant="bordered"
              labelPlacement="outside"
              value={decryptedText}
            />
          </div>
        )}
      </div>


    </div>
  );
}
