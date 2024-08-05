import { useState, useEffect, ReactNode, Key } from 'react';
import { useRouter } from 'next/router';
import Navbar from "@/components/navbar/navbar";
import "@/app/globals.css";
import { Roboto, Open_Sans } from "next/font/google";

// Import Image
import BurgerImage from "@/public/assets/img/burger.jpg";

const RobotoBold = Roboto({
    weight: "700",
    style: "normal",
    subsets: ["latin"]
});

const OpenSansFont = Open_Sans({
    weight: "400",
    subsets: ["latin"]
});

type Menu = {
    harga_menu: ReactNode;
    deskripsi_menu: ReactNode;
    nama_menu: string | undefined;
    kode_menu: Key | null | undefined;
    kategori_menu: string;
    menuItems: any[];
    setMenuItems: React.Dispatch<React.SetStateAction<any[]>>;
    // other properties of Menu
};

export default function Menu() {
    const [menuItems, setMenuItems] = useState<Menu[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [cart, setCart] = useState<{ item: any, quantity: number }[]>([]);
    const router = useRouter();
    const { table } = router.query;

    useEffect(() => {
        const getMenu = async () => {
            const response = await fetch('http://localhost:3001/api/menu');
            const result = await response.json();
            setMenuItems(result);

            // Set the default selected category to the first category in the list
            if (result.length > 0) {
                setSelectedCategory(result[0].kategori_menu);
            }
        };

        getMenu();
    }, []);

    const categories = Array.from(new Set((menuItems as unknown as { kategori_menu: string }[]).map(item => item.kategori_menu)));
    const filteredItems = menuItems.filter(item => item.kategori_menu === selectedCategory);

    const addToCart = (item: any) => {
        setCart(prevCart => {
            const itemIndex = prevCart.findIndex(cartItem => cartItem.item.kode_menu === item.kode_menu);
            if (itemIndex !== -1) {
                const updatedCart = [...prevCart];
                updatedCart[itemIndex].quantity += 1;
                return updatedCart;
            } else {
                return [...prevCart, { item, quantity: 1 }];
            }
        });
    };

    const totalAmount = cart.reduce((total, cartItem) => total + parseFloat(cartItem.item.harga_menu as string) * cartItem.quantity, 0);

    const handleCheckout = () => {
        router.push({
            pathname: '/pelayan/payment',
            query: { cart: JSON.stringify(cart), total: totalAmount, table: table }
        });
    };

    return (
        <main>
            <Navbar />
            <div className="min-h-screen px-6 sm:px-6 md:px-16 pt-6">
                <h1 className={`text-3xl font-bold mb-4 ${RobotoBold.className}`}>Explore Our Best Menu</h1>
                <p className={`text-sm text-gray-500 mb-8 ${OpenSansFont.className}`}>Pie biological ginger tasty apples taste restaurant drink cupcake vegetables lunch fruit Relish liquor sour java gluten free.</p>
                <div className={`flex flex-col md:flex-row ${OpenSansFont.className}`}>
                    <div className="md:w-1/4 mb-6 md:mb-0">
                        <ul>
                            {categories.map(category => (
                                <li key={category} className="mb-4">
                                    <button
                                        className={`flex items-center space-x-2 ${selectedCategory === category ? 'bg-[#5a4fcf] text-white' : ''} px-4 py-2 rounded`}
                                        onClick={() => setSelectedCategory(category)}
                                    >
                                        <span>🍛</span>
                                        <span>{category}</span>
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="md:w-3/4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {filteredItems.map(item => (
                            <div key={item.kode_menu} className="bg-white p-4 rounded shadow">
                                <img src={BurgerImage.src} alt={item.nama_menu} className="w-full rounded mb-4" />
                                <h2 className="text-xl font-semibold">{item.nama_menu}</h2>
                                <p className="text-gray-500 mt-2">{item.deskripsi_menu}</p>
                                <p className="text-[#5a4fcf] mt-2">Rp {item.harga_menu}</p>
                                <button
                                    className="bg-blue-500 text-white px-4 py-2 mt-2 rounded"
                                    onClick={() => addToCart(item)}
                                >
                                    Add to Cart
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="bottom-0 left-0 right-0 bg-white p-5 shadow-lg">
                    <div className="flex justify-between items-center">
                        <div>
                            <h2 className="text-xl font-semibold">Total: Rp {totalAmount}</h2>
                            <p>{cart.length} items</p>
                        </div>
                        <button
                            className="bg-green-500 text-white px-4 py-2 rounded"
                            onClick={handleCheckout}
                        >
                            Proceed to Payment
                        </button>
                    </div>
                    <div className="mt-4">
                        {cart.map((cartItem, index) => (
                            <div key={index} className="flex justify-between items-center mb-2">
                                <span>{cartItem.item.nama_menu} x {cartItem.quantity}</span>
                                <span>Rp {parseFloat(cartItem.item.harga_menu as string) * cartItem.quantity}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </main>
    );
}
