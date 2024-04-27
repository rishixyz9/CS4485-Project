import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

import { Spinner } from "@nextui-org/react";

import Navbar from "@components/NavBar";
import SideMenu from '@components/SideMenu';

import { User } from '@utils/UserUtils'
import { getUser } from "@utils/FirebaseUtils";

const AuthContext = createContext(null);

export default function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null)
    const router = useRouter();
    const pathName = usePathname();

    const logIn = useCallback((netid: string) => {
        getUser(netid).then((data) => {
            setUser(new User(data?.firstname, data?.lastname, data?.netId, data?.classes, data?.major, data?.year))
            router.push('/dashboard');
        })
    }, [setUser, router])

    const logOut = useCallback(() => {
        setUser(null);
        router.replace('/');
    }, [setUser, router]);

    useEffect(() => {
        if (user === null && pathName !== '/') {
            logOut();
        }
    }, [user, logOut, pathName])

    return (
        <AuthContext.Provider value={{ user, logIn, logOut } as any}>
            <Navbar />
            {pathName != '/' ? <SideMenu /> : null}
            {(user === null && pathName !== '/') ? <Spinner color="primary" size="lg" /> : children}
        </AuthContext.Provider>
    );

};

export const useAuth = () => {
    return useContext(AuthContext);
};