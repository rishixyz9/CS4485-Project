import React from "react";
import { usePathname } from "next/navigation";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button } from "@nextui-org/react";

import { User } from "@utils/UserUtils";
import { useAuth } from "@hooks/AuthProvider";


export default function NavBar() {

    const { user, logIn, logOut } = useAuth() as unknown as { user: User, logIn: (netid: string) => void, logOut: () => void };
    const pathName = usePathname();

    return user ? (
        <Navbar shouldHideOnScroll>
            <NavbarBrand>
                <p className="font-bold text-inherit"></p>
            </NavbarBrand>
            <NavbarContent className="hidden sm:flex gap-4" justify="center">
                <NavbarItem isActive={pathName === '/classes'}>
                    <Link color="foreground" href="/classes">
                        Classes
                    </Link>
                </NavbarItem>
                <NavbarItem isActive={pathName === '/dashboard'}>
                    <Link color="foreground" href="/dashboard">
                        Schedules
                    </Link>
                </NavbarItem>
                <NavbarItem isActive={pathName === '/friends'}>
                    <Link color="foreground" href="/friends">
                        Friends
                    </Link>
                </NavbarItem>
            </NavbarContent>
            <NavbarContent justify="end">
                <NavbarItem>
                    <Button as={Link} color="primary" href="#" variant="flat" onClick={logOut}>
                        Logout
                    </Button>
                </NavbarItem>
            </NavbarContent>
        </Navbar>
    ) : null;
}