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
      label: "Ciphers",
      href: "/ciphers",
    },
    {
      label: "RSA",
      href: "/rsa",
    },
  ],
  navMenuItems: [
    {
      label: "Ciphers",
      href: "/ciphers",
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
