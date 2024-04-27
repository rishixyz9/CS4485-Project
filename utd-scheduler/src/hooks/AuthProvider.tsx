import { User } from '@utils/UserUtils'

import { useContext, createContext, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

import Navbar from "@components/NavBar";
import SideMenu from '@components/SideMenu';

import { getUser } from "@utils/FirebaseUtils";

const AuthContext = createContext(null);

export default function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null)
    const router = useRouter();
    const pathName = usePathname();

    const logIn = (netid: string) => {
        getUser(netid).then((data) => {
            setUser(new User(data?.firstname, data?.lastname, data?.netId, data?.classes, data?.major, data?.year))
        })
    }

    const logOut = () => {
        setUser(null);
        router.replace('/');
    };

    return (
        <AuthContext.Provider value={{ user, logIn, logOut }}>
            <Navbar />
            {pathName != '/' ? <SideMenu /> : null}
            {children}
        </AuthContext.Provider>
    );

};

export const useAuth = () => {
    return useContext(AuthContext);
};