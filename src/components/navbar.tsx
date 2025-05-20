import { useNavigate } from "react-router-dom";
import { Button, Image, Link, Navbar as HeroUINavbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenuToggle, NavbarMenu, NavbarMenuItem, link as linkStyles } from "@heroui/react";
import clsx from "clsx";
import { ThemeSwitch } from "@/components/theme-switch";
import logo from "../../assets/img/stardrop-logo.png";
import { CartIcon, HeartFilledIcon } from "@/components/icons";
import { siteConfig } from "@/config/site";
import { SearchInput } from "./searchInput";

export const Navbar = () => {
    const navigate = useNavigate();

    const onWishlistHandler = () => {
        navigate("/wishlist", { replace: true });
    };

    const onCartHandler = () => {
        navigate("/cart", { replace: true });
    };

    const onProfileHandler = () => {
        navigate("/profile", { replace: true });
        console.log("Profile");
    };

    return (
        <HeroUINavbar maxWidth="xl" position="sticky">
            <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
                <NavbarBrand className="gap-3 max-w-fit">
                    <Link className="flex justify-start items-center gap-3" color="foreground" href="/">
                        <Image src={logo} alt="Logo" className="w-8 h-8 mx-auto mb-1" />
                        <p className="text-secondary font-bold text-center text-2xl">STARDROP</p>
                    </Link>
                </NavbarBrand>
                <div className="hidden lg:flex gap-4 justify-start ml-2">
                    {siteConfig.navItems.map((item) => (
                        <NavbarItem key={item.href}>
                            <Link
                                className={clsx(linkStyles({ color: "foreground" }), "data-[active=true]:text-primary data-[active=true]:font-medium")}
                                color="foreground"
                                href={item.href}
                            >
                                {item.label}
                            </Link>
                        </NavbarItem>
                    ))}
                </div>
            </NavbarContent>

            <NavbarContent className="hidden sm:flex basis-1/5 sm:basis-full" justify="end">
                <NavbarItem className="hidden sm:flex gap-2">
                    <ThemeSwitch />
                </NavbarItem>
                <NavbarItem className="hidden md:flex gap-3">
                    <Button
                        as={Link}
                        className="text-sm font-normal text-default-600 bg-default-100"
                        onPress={onWishlistHandler}
                        startContent={<HeartFilledIcon className="text-secondary" />}
                        variant="flat"
                    >
                        Wishlist
                    </Button>
                    <Button
                        as={Link}
                        className="text-sm font-normal text-default-600 bg-default-100"
                        onPress={onCartHandler}
                        startContent={<CartIcon className="text-secondary" />}
                        variant="flat"
                    >
                        Cart
                    </Button>
                    <Button
                        as={Link}
                        className="text-sm font-normal text-default-600 bg-default-100"
                        onPress={onProfileHandler}
                        startContent={<HeartFilledIcon className="text-secondary" />}
                        variant="flat"
                    >
                        Profile
                    </Button>
                </NavbarItem>
            </NavbarContent>

            <NavbarContent className="sm:hidden basis-1 pl-4" justify="end">
                <ThemeSwitch />
                <NavbarMenuToggle />
            </NavbarContent>

            <NavbarMenu>
                <SearchInput />
                <div className="mx-4 mt-2 flex flex-col gap-2">
                    {siteConfig.navMenuItems.map((item, index) => (
                        <NavbarMenuItem key={`${item}-${index}`}>
                            <Link color={index === 2 ? "primary" : index === siteConfig.navMenuItems.length - 1 ? "danger" : "foreground"} href="#" size="lg">
                                {item.label}
                            </Link>
                        </NavbarMenuItem>
                    ))}
                </div>
            </NavbarMenu>
        </HeroUINavbar>
    );
};
