export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "DogCrypt",
  description: "Encryption with Wau",
  navItems: [
    {
      label: "Home",
      href: "/",
    },
    {
      label: "Encryption/Decryption",
      href: "/encrypt-decrypt",
    },
    {
      label: "RSA",
      href: "/rsa",
    },
  ],
  navMenuItems: [
    {
      label: "Encryption/Decryption",
      href: "/encrypt-decrypt",
    },
    {
      label: "RSA",
      href: "/rsa",
    },
  ],
  links: {
    github: "https://github.com/benjaminbork/crypto-second-assignment",
  },
};
