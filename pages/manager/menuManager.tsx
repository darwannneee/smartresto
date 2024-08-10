import { useState, useEffect } from 'react';
import Navbar from "@/components/navbar/navbar";
import Sidebar from "@/components/navbar/sidebar";
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
    kode_menu: number;
    nama_menu: string;
    deskripsi_menu: string;
    harga_menu: number;
    kategori_menu: string;
    status_menu: string;
};

export default function MenuManager() {
    const [menuItems, setMenuItems] = useState<Menu[]>([]);
    const [categories, setCategories] = useState<string[]>([]);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
    const [successModalIsOpen, setSuccessModalIsOpen] = useState<boolean>(false);
    const [successMessage, setSuccessMessage] = useState<string>('');
    const [selectedMenu, setSelectedMenu] = useState<Menu | null>(null);
    const [editMenu, setEditMenu] = useState<Menu | null>(null);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    // Function to fetch menu data
    const fetchMenuData = async () => {
        try {
            const response = await fetch('https://api.smartresto.xyz/api/menu');
            const result = await response.json();
            setMenuItems(result);

            // Extract unique categories
            const uniqueCategories = Array.from(new Set(result.map((item: Menu) => item.kategori_menu)));
            setCategories(uniqueCategories as string[]);
        } catch (error) {
            console.error('Error fetching menu:', error);
        }
    };

    // Fetch menu data when component mounts and setup polling
    useEffect(() => {
        fetchMenuData(); // Initial data fetch

        const intervalId = setInterval(fetchMenuData, 5000); // Polling every 5 seconds

        // Cleanup interval on component unmount
        return () => clearInterval(intervalId);
    }, []);

    const handleDelete = async (kode_menu: number) => {
        try {
            await fetch(`https://api.smartresto.xyz/api/menu/${kode_menu}`, {
                method: 'DELETE',
            });
            setSuccessMessage('Berhasil menghapus menu!');
            setSuccessModalIsOpen(true); // Tampilkan modal sukses
            setTimeout(() => setSuccessModalIsOpen(false), 2000); // Auto close setelah 2 detik

            // Refetch data after deletion
            fetchMenuData();
        } catch (error) {
            console.error('Failed to delete menu item:', error);
        }
    };

    const handleEdit = (menu: Menu) => {
        setSelectedMenu(menu);
        setEditMenu({ ...menu });
        setModalIsOpen(true);
    };

    const handleAdd = () => {
        setSelectedMenu(null);
        setEditMenu({
            kode_menu: 0,
            nama_menu: '',
            deskripsi_menu: '',
            harga_menu: 0,
            kategori_menu: categories.length > 0 ? categories[0] : '',
            status_menu: 'tersedia'
        });
        setModalIsOpen(true);
    };

    const handleAddMenu = async () => {
        if (editMenu) {
            try {
                const response = await fetch('https://api.smartresto.xyz/api/menu/create', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(editMenu),
                });
    
                if (response.ok) {
                    setSuccessMessage('Berhasil menambahkan menu!');
                    setSuccessModalIsOpen(true);
                    setTimeout(() => setSuccessModalIsOpen(false), 2000);
                    setModalIsOpen(false);

                    // Refetch data after adding
                    fetchMenuData();
                } else {
                    const errorMessage = await response.text();
                    console.error('Failed to add menu item:', errorMessage);
                    alert('Gagal menambahkan menu: ' + errorMessage);
                }
            } catch (error) {
                console.error('Failed to add menu item:', error);
                alert('Gagal menambahkan menu: ' + (error as Error).message);
            }
        }
    };
    

    const handleUpdateMenu = async () => {
        if (editMenu) {
            try {
                const response = await fetch(`https://api.smartresto.xyz/api/menu/${editMenu.kode_menu}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(editMenu),
                });

                if (response.ok) {
                    setSuccessMessage('Berhasil mengubah menu!');
                    setSuccessModalIsOpen(true); // Tampilkan modal sukses
                    setTimeout(() => setSuccessModalIsOpen(false), 2000); // Auto close setelah 2 detik
                    setModalIsOpen(false);

                    // Refetch data after updating
                    fetchMenuData();
                } else {
                    const errorMessage = await response.text();
                    console.error('Failed to update menu item:', errorMessage);
                    alert('Gagal mengubah menu: ' + errorMessage);
                }
            } catch (error) {
                console.error('Failed to update menu item:', error);
                alert('Gagal mengubah menu: ' + (error as Error).message);
            }
        }
    };

    const filteredItems = menuItems.filter(item =>
        (item.nama_menu?.toLowerCase().includes(searchTerm.toLowerCase()) || '') ||
        (item.kategori_menu?.toLowerCase().includes(searchTerm.toLowerCase()) || '')
    );

    return (
        <div>
            <Navbar toggleSidebar={toggleSidebar} />
            <div className="flex">
                <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
                <main className="md:ml-56 mx-10 md:mx-12 w-full mt-14 pt-10">
                    <h1 className={`text-3xl font-bold mb-4 ${RobotoBold.className}`}>Manage Menus</h1>
                    <button 
                        className="bg-green-500 text-white px-4 py-2 rounded mb-4"
                        onClick={handleAdd}
                    >
                        Tambah Menu
                    </button>
                    <input
                        type="text"
                        placeholder="Search menu..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className={`w-full mb-4 p-2 border border-gray-300 rounded ${OpenSansFont.className}`}
                    />
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {filteredItems.length > 0 ? (
                            filteredItems.map(item => (
                                <div key={item.kode_menu} className="bg-white p-4 rounded shadow">
                                    <img src={BurgerImage.src} alt={item.nama_menu} className="w-full rounded mb-4" />
                                    <h2 className="text-xl font-semibold">{item.nama_menu}</h2>
                                    <p className="text-gray-500 mt-2">{item.deskripsi_menu}</p>
                                    <p className="text-[#5a4fcf] mt-2">Rp {item.harga_menu}</p>
                                    <div className="flex space-x-2 mt-2">
                                        <button
                                            className="bg-yellow-500 text-white px-4 py-2 rounded"
                                            onClick={() => handleEdit(item)}
                                        >
                                            Edit
                                        </button>
                                        <button
                                            className="bg-red-500 text-white px-4 py-2 rounded"
                                            onClick={() => handleDelete(item.kode_menu)}
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p>No menu items found.</p>
                        )}
                    </div>
                </main>
            </div>

            {modalIsOpen && editMenu && (
                <div className="fixed inset-0 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded shadow-lg max-w-md w-full">
                        <h2 className="text-2xl font-bold mb-4">{selectedMenu ? 'Edit Menu' : 'Tambah Menu'}</h2>
                        <div>
                            <label className="block mb-2">Nama Menu</label>
                            <input
                                type="text"
                                value={editMenu.nama_menu}
                                onChange={(e) => setEditMenu({ ...editMenu, nama_menu: e.target.value })}
                                className="w-full mb-2 p-2 border border-gray-300 rounded"
                            />
                            <label className="block mb-2">Deskripsi Menu</label>
                            <input
                                type="text"
                                value={editMenu.deskripsi_menu}
                                onChange={(e) => setEditMenu({ ...editMenu, deskripsi_menu: e.target.value })}
                                className="w-full mb-2 p-2 border border-gray-300 rounded"
                            />
                            <label className="block mb-2">Harga Menu</label>
                            <input
                                type="number"
                                value={editMenu.harga_menu}
                                onChange={(e) => setEditMenu({ ...editMenu, harga_menu: parseInt(e.target.value) })}
                                className="w-full mb-2 p-2 border border-gray-300 rounded"
                            />
                            <label className="block mb-2">Kategori Menu</label>
                            <select
                                value={editMenu.kategori_menu}
                                onChange={(e) => setEditMenu({ ...editMenu, kategori_menu: e.target.value })}
                                className="w-full mb-2 p-2 border border-gray-300 rounded"
                            >
                                {categories.map((category, index) => (
                                    <option key={index} value={category}>
                                        {category}
                                    </option>
                                ))}
                            </select>
                            <div className="flex justify-end space-x-2">
                                <button
                                    className="bg-blue-500 text-white px-4 py-2 rounded"
                                    onClick={selectedMenu ? handleUpdateMenu : handleAddMenu}
                                >
                                    {selectedMenu ? 'Save Changes' : 'Add Menu'}
                                </button>
                                <button
                                    className="bg-gray-300 text-gray-700 px-4 py-2 rounded"
                                    onClick={() => setModalIsOpen(false)}
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                    <div
                        className="fixed"
                        onClick={() => setModalIsOpen(false)}
                    ></div>
                </div>
            )}

            {successModalIsOpen && (
                <div className="fixed inset-0 flex items-center justify-center z-50">
                    <div className="bg-green-500 text-white p-6 rounded shadow-lg max-w-md w-full">
                        <h2 className="text-2xl font-bold mb-4">Success</h2>
                        <p>{successMessage}</p>
                    </div>
                    <div
                        className="fixed"
                        onClick={() => setSuccessModalIsOpen(false)}
                    ></div>
                </div>
            )}
        </div>
    );
}
