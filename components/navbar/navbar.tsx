import { Montserrat } from "next/font/google";
import { useState, useEffect } from "react";
import "@/app/globals.css";

const FontMonsterrat = Montserrat({
    weight: "400",
    subsets: ["latin"],
});

type Role = 'Pelayan' | 'Kasir' | 'Koki' | 'Manager';

interface User {
    name: string;
    role: Role;
}

interface DecodedToken {
    email: string;
    userType: string;
}

function parseJwt(token: string): DecodedToken {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
        atob(base64)
            .split('')
            .map(function (c) {
                return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
            })
            .join('')
    );

    return JSON.parse(jsonPayload);
}

async function fetchUserByEmail(email: string): Promise<User | null> {
    const roles: Role[] = ["Pelayan", "Kasir", "Koki", "Manager"];
    for (let role of roles) {
        const response = await fetch(`https://api.smartresto.xyz/api/${role.toLowerCase()}`);
        const data = await response.json();
        const user = data.find((u: any) => u.email === email);
        if (user) {
            return { name: user[`nama_${role.toLowerCase()}`], role: role };
        }
    }
    return null;
}

export default function Navbar({ toggleSidebar }: { toggleSidebar: () => void }) {
    const [showPopup, setShowPopup] = useState(false);
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const fetchUserData = async () => {
            const token = localStorage.getItem("token");
            if (token) {
                try {
                    const decodedToken = parseJwt(token);
                    const userData = await fetchUserByEmail(decodedToken.email);
                    if (userData) {
                        setUser(userData);
                    } else {
                        console.error("User not found in any role");
                    }
                } catch (error) {
                    console.error("Error fetching user data:", error);
                }
            }
        };

        fetchUserData();
    }, []);

    const handleProfileClick = () => {
        setShowPopup(!showPopup);
    };

    const handleLogout = () => {
        localStorage.removeItem("token");
        console.log("Logged out successfully");
        setShowPopup(false);
    };

    return (
        <nav className={`w-full h-16 bg-white shadow-md ${FontMonsterrat.className} fixed top-0 flex justify-between items-center px-4`}>
            {/* Tombol untuk membuka sidebar di mobile */}
            <button onClick={toggleSidebar} className="md:hidden p-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
            </button>

            {/* Logo atau judul di tengah untuk desktop dan kanan untuk mobile */}
            <h1 className="text-xl font-bold text-black md:ml-0 md:absolute md:left-1/2 md:transform md:-translate-x-1/2">
                SmartResto.
            </h1>

            {/* Profile section */}
            <div className="relative flex items-center space-x-2 cursor-pointer md:absolute md:right-4">
                <span className="text-black">{user ? user.name : "Loading..."}</span>
            </div>
        </nav>
    );
}
