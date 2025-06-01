export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "Stardrop",
  description: "Every garment, a story. Every purchase, a choice.",
  navItems: [
    {
      label: "Login",
      href: "/login",
    },
    {
      label: "Sign Up",
      href: "/sign-up",
    },
  ],
  navMenuItems: [
    {
      label: "Home",
      href: "/",
    },
    {
      label: "Profile",
      href: "/profile",
    },
    {
      label: "Cart",
      href: "/cart",
    },
    {
      label: "Wishlist",
      href: "/wishlist",
    }
  ]
};
