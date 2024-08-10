import { Montserrat, Rubik } from "next/font/google";
import { useState, useEffect, useRef } from "react";
import { useRouter } from 'next/router';
import "@/app/globals.css";

// Import Image
import FaceProfile from "@/public/assets/img/profile.jpg";

const FontMonsterrat = Montserrat({
    weight: "300",
    subsets: ["latin"],
});

const RubikFontBold = Rubik({
    weight: '600',
    subsets: ['latin']
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

interface SidebarProps {
    isSidebarOpen: boolean;
    toggleSidebar: () => void;
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

export default function Sidebar({ isSidebarOpen, toggleSidebar }: SidebarProps) {
    const [user, setUser] = useState<User>({ name: "", role: "Pelayan" });
    const router = useRouter();
    const sidebarRef = useRef<HTMLDivElement>(null);

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
                    router.push("/login");
                }
            } else {
                router.push("/login");
            }
        };

        fetchUserData();
    }, [router]);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (sidebarRef.current && !sidebarRef.current.contains(event.target as Node)) {
                toggleSidebar();
            }
        }

        if (isSidebarOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isSidebarOpen, toggleSidebar]);

    const handleLogout = () => {
        localStorage.removeItem("token");
        console.log("Logged out successfully");
        setUser({ name: "", role: "Manager" });
        router.push("/login");
    };

    const menusByRole: Record<Role, { label: string; href: string; icon: JSX.Element }[]> = {
        Pelayan: [
            { label: "Meja", href: "/pelayan/", icon: <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/></svg> },
            { label: "Pesanan", href: "/pelayan/pesanan", icon: <svg xmlns="http://www.w3.org/2000/svg" width="22" height="25" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16c0 1.1.9 2 2 2h12a2 2 0 0 0 2-2V8l-6-6z"/><path d="M14 3v5h5M16 13H8M16 17H8M10 9H8"/></svg> },
        ],
        Kasir: [
            { label: "Dashboard", href: "/kasir/", icon: <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/></svg> },
            { label: "Transaksi", href: "/kasir/order", icon: <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><circle cx="10" cy="20.5" r="1"/><circle cx="18" cy="20.5" r="1"/><path d="M2.5 2.5h3l2.7 12.4a2 2 0 0 0 2 1.6h7.7a2 2 0 0 0 2-1.6l1.6-8.4H7.1"/></svg> },
        ],
        Koki: [
            { label: "Pesanan Masuk", href: "/koki/", icon: <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/></svg> },
        ],
        Manager: [
            { label: "Karyawan", href: "/manager/", icon: <svg xmlns="http://www.w3.org/2000/svg" width="22" height="25" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16c0 1.1.9 2 2 2h12a2 2 0 0 0 2-2V8l-6-6z"/><path d="M14 3v5h5M16 13H8M16 17H8M10 9H8"/></svg> },
            { label: "Laporan", href: "/manager/laporan", icon: <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><circle cx="10" cy="20.5" r="1"/><circle cx="18" cy="20.5" r="1"/><path d="M2.5 2.5h3l2.7 12.4a2 2 0 0 0 2 1.6h7.7a2 2 0 0 0 2-1.6l1.6-8.4H7.1"/></svg> },
            { label: "Menu", href: "/manager/menuManager", icon: <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><path d="M3 3h18v18H3zM12 8v8m-4-4h8"/></svg> },
        ],
    };

    // Get the menus based on the user's role
    const userMenus = menusByRole[user.role];

    return (
        <div className="z-50">
            {/* Sidebar */}
            <div ref={sidebarRef} className={`fixed top-0 left-0 h-screen w-48 bg-white shadow-md transform transition-transform duration-300 ease-in-out ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 ${FontMonsterrat.className}`}>
                <div className="flex flex-col justify-between h-full">
                    <div className="flex flex-col items-center p-4">
                        <div className="flex justify-center items-center space-x-2">
                            <img src={FaceProfile.src} className="w-14" alt="Profile" />
                            <div className="flex flex-col justify-center">
                                <h1 className={`text-md text-black ${RubikFontBold.className}`}>{user.name}</h1>
                                <small className="text-xs">{user.role}</small>
                            </div>
                        </div>
                        <div className="flex flex-col space-y-6 pt-5 text-black">
                            <hr />
                            {userMenus.map((menu, index) => (
                                <div key={index} className="flex items-center space-x-2 cursor-pointer hover:text-gray-400">
                                    {menu.icon}
                                    <a href={menu.href} className="text-md">{menu.label}</a>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="relative flex flex-col mb-24 sm:mb-3 items-center p-4 mt-auto" onClick={handleLogout}>
                        <div className="flex items-center space-x-2 text-black cursor-pointer">
                            <svg 
                                xmlns="http://www.w3.org/2000/svg" 
                                width="24" 
                                height="24" 
                                viewBox="0 0 24 24" 
                                fill="none" 
                                stroke="currentColor" 
                                strokeWidth="2" 
                                strokeLinecap="round" 
                                strokeLinejoin="round"
                                className="text-black"
                            >
                                <path d="M10 17l5-5-5-5"/>
                                <path d="M13.8 12H3m9 10a10 10 0 1 0 0-20"/>
                            </svg>
                            <span className="text-md">Logout</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Overlay untuk menutup sidebar di mobile */}
            {isSidebarOpen && <div className="fixed z-40 bg-transparent" onMouseDown={toggleSidebar}></div>}
        </div>
    );
}
