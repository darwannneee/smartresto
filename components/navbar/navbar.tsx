import { Montserrat } from "next/font/google";
import { useState } from "react";
import FornKnife from "@/public/assets/img/fork-and-knife.svg";
import "@/app/globals.css"

const FontMonsterrat = Montserrat({
    weight: "400",
    subsets: ["latin"]
});

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className={`w-full h-14 bg-white ${FontMonsterrat.className}`}>
            <div className="mx-10 flex justify-between items-center h-full px-4">
                <div>
                    <h1 className="text-2xl font-bold text-black">SmartResto.</h1>
                </div>
                <div className="hidden md:flex space-x-4 justify-center items-center flex-1">
                    <div className="flex items-center space-x-2 cursor-pointer hover:text-gray-400">
                        <svg viewBox="0 0 24 24" width="18px" height="18px" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                            <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                            <g id="SVGRepo_iconCarrier"> 
                            <path d="M17 21V16M7 21V16" stroke="#b5b5b5" stroke-width="1.5" stroke-linecap="round"></path> 
                            <path d="M12 16H7.00001C6.01506 16 5.52259 16 5.22538 15.6762C4.92818 15.3523 4.9669 14.9018 5.04435 14.0008C5.10026 13.3503 5.22669 12.9125 5.51257 12.5858C6.02514 12 6.8501 12 8.50001 12H15.5C17.1499 12 17.9749 12 18.4874 12.5858C18.7733 12.9125 18.8998 13.3503 18.9557 14.0008C19.0331 14.9018 19.0718 15.3523 18.7746 15.6762C18.4774 16 17.985 16 17 16H16" stroke="#b5b5b5" stroke-width="1.5" stroke-linecap="round"></path> 
                            <path d="M7 8C7 6.13077 7 5.19615 7.40192 4.5C7.66523 4.04394 8.04394 3.66523 8.5 3.40192C9.19615 3 10.1308 3 12 3C13.8692 3 14.8038 3 15.5 3.40192C15.9561 3.66523 16.3348 4.04394 16.5981 4.5C17 5.19615 17 6.13077 17 8V12H7V8Z" stroke="#b5b5b5" stroke-width="1.5"></path> </g>
                        </svg>
                        <a href="pelayan" className="text-sm text-black">Meja</a>
                    </div>
                    <div className="flex items-center space-x-2 cursor-pointer hover:text-gray-400">
                        <svg
                            height="18px"
                            width="18px"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 59.687 59.687"
                            fill="#b5b5b5"
                        >
                            <g>
                                <path
                                    style={{ fill: "#b5b5b5" }}
                                    d="M37.094,33.579l-1.804-0.685l-0.868,25.604c0,0.576,3.012,1.189,4.427,1.189h0.631
                                    c1.416,0,4.428-0.613,4.428-1.189l-0.927-27.324L37.094,33.579z M39.256,55.816c-0.786,0-1.423-0.638-1.423-1.423
                                    c0-0.786,0.637-1.423,1.423-1.423s1.423,0.637,1.423,1.423C40.679,55.178,40.042,55.816,39.256,55.816z M39.256,40.049
                                    c-0.786,0-1.423-0.637-1.423-1.424c0-0.785,0.637-1.422,1.423-1.422s1.423,0.637,1.423,1.422
                                    C40.679,39.413,40.042,40.049,39.256,40.049z"
                                />
                                <path
                                    style={{ fill: "#b5b5b5" }}
                                    d="M27.821,12.5c0-8.022-0.476-10.391-2.334-11.087l-0.219,10.362c0,0.498-0.367,0.912-0.818,0.912
                                    h-0.289c-0.451,0-0.818-0.414-0.818-0.923l-0.844-10.64c-0.227,0-0.46,0.001-0.706,0.001c-0.426,0-0.819,0.003-1.187,0.012
                                    l-0.843,10.666c0.001,0.469-0.365,0.883-0.816,0.883h-0.289c-0.451,0-0.818-0.414-0.818-0.923L17.625,1.662
                                    c-1.857,0.998-1.86,3.835-1.86,11.854c0,2.184,0.392,3.915,1.318,5.11c0.296,0.65,0.648,1.419,1.021,2.224
                                    c0.575,1.244,1.195,2.565,1.737,3.681l-0.852,32.735c0,0.771,1.642,1.422,2.414,1.422h1.271c0.772,0,2.414-0.718,2.414-1.49
                                    l-0.864-33.106l1.977-5.163l0.335-0.876C27.437,16.611,27.821,14.657,27.821,12.5z"
                                />
                                <path
                                    style={{ fill: "#b5b5b5" }}
                                    d="M37.08,32.504l6.841-2.795L41.111,0c-3.698,3.21-5.405,6.936-5.647,7.492l-1.507,23.826
                                    L37.08,32.504z"
                                />
                            </g>
                        </svg>
                        <a href="pelayan/menu" className="text-sm text-black">Menu</a>
                    </div>
                    <div className="flex items-center space-x-2 cursor-pointer hover:text-gray-400">
                        <svg
                            viewBox="0 0 24 24"
                            width="18px"
                            height="18px"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <g>
                                <path
                                    d="M4 19V6.2C4 5.0799 4 4.51984 4.21799 4.09202C4.40973 3.71569 4.71569 3.40973 5.09202 3.21799C5.51984 3 6.0799 3 7.2 3H16.8C17.9201 3 18.4802 3 18.908 3.21799C19.2843 3.40973 19.5903 3.71569 19.782 4.09202C20 4.51984 20 5.0799 20 6.2V19"
                                    stroke="#b5b5b5"
                                    stroke-width="1.5"
                                    stroke-linecap="round"
                                ></path>
                                <path
                                    d="M2 19L22 19"
                                    stroke="#b5b5b5"
                                    stroke-width="1.5"
                                    stroke-linecap="round"
                                ></path>
                                <path
                                    d="M10 10H14"
                                    stroke="#b5b5b5"
                                    stroke-width="1.5"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                ></path>
                                <path
                                    d="M10 14H14"
                                    stroke="#b5b5b5"
                                    stroke-width="1.5"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                ></path>
                            </g>
                        </svg>
                        <a href="/pelayan/pesanan" className="text-sm text-black">Pesanan</a>
                    </div>
                </div>
                <div className="hidden md:flex space-x-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2">
                            </path><circle cx="12" cy="7" r="4"></circle></svg>
                    <h1 className="items-center justify-center">Jeane</h1>
                </div>
                <div className="md:hidden flex items-center">
                    <button onClick={() => setIsOpen(!isOpen)} className="text-black focus:outline-none">
                        <svg
                            className="w-6 h-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h16m-7 6h7"
                            ></path>
                        </svg>
                    </button>
                </div>
            </div>
            {isOpen && (
                <div className="md:hidden bg-white">
                    <div className="flex flex-col space-y-4 px-4 py-2">
                        <div className="flex items-center space-x-2 cursor-pointer hover:text-gray-400">
                            <svg viewBox="0 0 24 24" width="18px" height="18px" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                                <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                                <g id="SVGRepo_iconCarrier"> 
                                <path d="M17 21V16M7 21V16" stroke="#b5b5b5" stroke-width="1.5" stroke-linecap="round"></path> 
                                <path d="M12 16H7.00001C6.01506 16 5.52259 16 5.22538 15.6762C4.92818 15.3523 4.9669 14.9018 5.04435 14.0008C5.10026 13.3503 5.22669 12.9125 5.51257 12.5858C6.02514 12 6.8501 12 8.50001 12H15.5C17.1499 12 17.9749 12 18.4874 12.5858C18.7733 12.9125 18.8998 13.3503 18.9557 14.0008C19.0331 14.9018 19.0718 15.3523 18.7746 15.6762C18.4774 16 17.985 16 17 16H16" stroke="#b5b5b5" stroke-width="1.5" stroke-linecap="round"></path> 
                                <path d="M7 8C7 6.13077 7 5.19615 7.40192 4.5C7.66523 4.04394 8.04394 3.66523 8.5 3.40192C9.19615 3 10.1308 3 12 3C13.8692 3 14.8038 3 15.5 3.40192C15.9561 3.66523 16.3348 4.04394 16.5981 4.5C17 5.19615 17 6.13077 17 8V12H7V8Z" stroke="#b5b5b5" stroke-width="1.5"></path> </g>
                            </svg>
                            <a href="meja" className="text-sm text-black">Meja</a>
                        </div>
                        <div className="flex items-center space-x-2 cursor-pointer hover:text-gray-400">
                            <svg
                                height="18px"
                                width="18px"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 59.687 59.687"
                                fill="#b5b5b5"
                            >
                                <g>
                                    <path
                                        style={{ fill: "#b5b5b5" }}
                                        d="M37.094,33.579l-1.804-0.685l-0.868,25.604c0,0.576,3.012,1.189,4.427,1.189h0.631
                                        c1.416,0,4.428-0.613,4.428-1.189l-0.927-27.324L37.094,33.579z M39.256,55.816c-0.786,0-1.423-0.638-1.423-1.423
                                        c0-0.786,0.637-1.423,1.423-1.423s1.423,0.637,1.423,1.423C40.679,55.178,40.042,55.816,39.256,55.816z M39.256,40.049
                                        c-0.786,0-1.423-0.637-1.423-1.424c0-0.785,0.637-1.422,1.423-1.422s1.423,0.637,1.423,1.422
                                        C40.679,39.413,40.042,40.049,39.256,40.049z"
                                    />
                                    <path
                                        style={{ fill: "#b5b5b5" }}
                                        d="M27.821,12.5c0-8.022-0.476-10.391-2.334-11.087l-0.219,10.362c0,0.498-0.367,0.912-0.818,0.912
                                        h-0.289c-0.451,0-0.818-0.414-0.818-0.923l-0.844-10.64c-0.227,0-0.46,0.001-0.706,0.001c-0.426,0-0.819,0.003-1.187,0.012
                                        l-0.843,10.666c0.001,0.469-0.365,0.883-0.816,0.883h-0.289c-0.451,0-0.818-0.414-0.818-0.923L17.625,1.662
                                        c-1.857,0.998-1.86,3.835-1.86,11.854c0,2.184,0.392,3.915,1.318,5.11c0.296,0.65,0.648,1.419,1.021,2.224
                                        c0.575,1.244,1.195,2.565,1.737,3.681l-0.852,32.735c0,0.771,1.642,1.422,2.414,1.422h1.271c0.772,0,2.414-0.718,2.414-1.49
                                        l-0.864-33.106l1.977-5.163l0.335-0.876C27.437,16.611,27.821,14.657,27.821,12.5z"
                                    />
                                    <path
                                        style={{ fill: "#b5b5b5" }}
                                        d="M37.08,32.504l6.841-2.795L41.111,0c-3.698,3.21-5.405,6.936-5.647,7.492l-1.507,23.826
                                        L37.08,32.504z"
                                    />
                                </g>
                            </svg>
                            <a href="meja" className="text-sm text-black">Menu</a>
                        </div>
                        <div className="flex items-center space-x-2 cursor-pointer hover:text-gray-400">
                            <svg
                                height="18px"
                                width="18px"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 32 32"
                                fill="#b5b5b5"
                            >
                                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                                <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                                <g id="SVGRepo_iconCarrier">
                                    {" "}
                                    <title></title> <g id="SVGRepo_bgCarrier"></g>{" "}
                                    <g id="SVGRepo_tracerCarrier"></g>{" "}
                                    <g id="SVGRepo_iconCarrier">
                                        {" "}
                                        <g id="SVGRepo_bgCarrier"></g>{" "}
                                        <g id="SVGRepo_tracerCarrier"></g>{" "}
                                        <g id="SVGRepo_iconCarrier">
                                            {" "}
                                            <title></title>{" "}
                                            <g id="Layer_2" data-name="Layer 2">
                                                {" "}
                                                <path
                                                    d="M28,2H24a4,4,0,0,0-8,0H10a4,4,0,0,0-8,0V26a4,4,0,0,0,4,4H28a4,4,0,0,0,4-4V6A4,4,0,0,0,28,2ZM20,2a2,2,0,0,1,2,2H18A2,2,0,0,1,20,2ZM6,2A2,2,0,0,1,8,4H4A2,2,0,0,1,6,2ZM30,26a2,2,0,0,1-2,2H6a2,2,0,0,1-2-2V6A2,2,0,0,1,6,4H8V8h2V4h8V8h2V4h4a2,2,0,0,1,2,2Z"
                                                    id="folder_1_"
                                                    fill="#b5b5b5"
                                                ></path>{" "}
                                                <rect
                                                    id="SVGRepo_tracerCarrier"
                                                    width="32"
                                                    height="32"
                                                    fill="none"
                                                ></rect>{" "}
                                            </g>{" "}
                                        </g>{" "}
                                    </g>{" "}
                                </g>{" "}
                            </svg>
                            <h1 className="text-sm text-black">Reservasi</h1>
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
};

