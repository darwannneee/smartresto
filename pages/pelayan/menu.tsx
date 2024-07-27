import Navbar from "@/components/navbar/navbar"
import "@/app/globals.css"
import { Roboto, Open_Sans } from "next/font/google"

// Import Image
import BurgerImage from "@/public/assets/img/burger.jpg"

const RobotoBold = Roboto({
    weight: "700",
    style: "normal",
    subsets: ["latin"]
})

const OpenSansFont = Open_Sans({
    weight: "400",
    subsets: ["latin"]
})

export default function Menu() {
    return (
        <main>
            <Navbar />

            <div className="min-h-screen px-6 sm:px-6 md:px-10 pt-6">
                <h1 className={`text-3xl font-bold mb-4 ${RobotoBold.className}`}>Explore Our Best Menu</h1>
                <p className={`text-sm text-gray-500 mb-8 ${OpenSansFont.className}`}>Pie biological ginger tasty apples taste restaurant drink cupcake vegetables lunch fruit Relish liquor sour java gluten free.</p>
                <div className={`flex flex-col md:flex-row ${OpenSansFont.className}`}>
                    <div className="md:w-1/4 mb-6 md:mb-0">
                        <ul>
                            <li className="mb-4">
                                <button className="flex items-center space-x-2">
                                    <span>🍛</span>
                                    <span>Fish Curry</span>
                                </button>
                            </li>
                            <li className="mb-4">
                                <button className="flex items-center space-x-2 bg-[#5a4fcf] text-white px-4 py-2 rounded">
                                    <span>🍔</span>
                                    <span>Burger</span>
                                </button>
                            </li>
                            <li className="mb-4">
                                <button className="flex items-center space-x-2">
                                    <span>🍕</span>
                                    <span>Pizza</span>
                                </button>
                            </li>
                            <li className="mb-4">
                                <button className="flex items-center space-x-2">
                                    <span>🍦</span>
                                    <span>Ice Cream</span>
                                </button>
                            </li>
                            <li className="mb-4">
                                <button className="flex items-center space-x-2">
                                    <span>🧁</span>
                                    <span>Cupcake</span>
                                </button>
                            </li>
                            <li>
                                <button className="flex items-center space-x-2 text-yellow-500">
                                    <span>More Items+</span>
                                </button>
                            </li>
                        </ul>
                    </div>
                    <div className="md:w-3/4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        <div className="bg-white p-4 rounded shadow">
                            <img src={BurgerImage.src} alt="Italian Burger" className="w-full rounded mb-4" />
                            <h2 className="text-xl font-semibold">Italian Burger</h2>
                            <p className="text-[#5a4fcf] mt-2">$17.00</p>
                        </div>
                        <div className="bg-white p-4 rounded shadow">
                            <img src={BurgerImage.src} alt="Chilli Burger" className="w-full rounded mb-4" />
                            <h2 className="text-xl font-semibold">Chilli Burger</h2>
                            <p className="text-[#5a4fcf] mt-2">$18.00</p>
                        </div>
                        <div className="bg-white p-4 rounded shadow">
                            <img src={BurgerImage.src} alt="Another Burger" className="w-full rounded mb-4" />
                            <h2 className="text-xl font-semibold">Another Burger</h2>
                            <p className="text-[#5a4fcf] mt-2">$19.00</p>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}
