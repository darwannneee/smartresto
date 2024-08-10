import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Navbar from '@/components/navbar/navbar';
import "@/app/globals.css";
import Sidebar from '@/components/navbar/sidebar';

const Payment = () => {
    const router = useRouter();
    const { cart, total, table } = router.query;

    const parsedCart = cart ? JSON.parse(decodeURIComponent(cart as string)) : [];

    const [fullName, setFullName] = useState('Komol Kuchkarov');
    const [email, setEmail] = useState('komol@example.com');
    const [phoneNumber, setPhoneNumber] = useState('08123456789');
    const [cardDetails, setCardDetails] = useState('8950 9004 0000 4900');
    const [expiryDate, setExpiryDate] = useState('');
    const [cvv, setCvv] = useState('');
    const [message, setMessage] = useState('');
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const createCustomer = async () => {
        const response = await fetch('https://api.smartresto.xyz/api/pelanggan', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                nama_pelanggan: fullName,
                email: email,
                nomor_meja: table,
                nomor_hp: phoneNumber
            }),
        });

        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.message || 'Error creating customer');
        }

        return data.id_pelanggan;
    };

    const createOrder = async (id_pelanggan: any) => {
        const response = await fetch('https://api.smartresto.xyz/api/pesanan', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                nomor_meja: table,
                id_pelanggan: id_pelanggan,
                kode_menu: parsedCart.map((cartItem: { item: { kode_menu: any; }; }) => cartItem.item.kode_menu),
                total_harga: total,
                id_kasir: 1, // Replace with the actual cashier ID if available
            }),
        });

        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.message || 'Error creating order');
        }

        return data;
    };

    const updateMejaStatus = async () => {
        const response = await fetch(`https://api.smartresto.xyz/api/meja/${table}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                status_meja: 'tidak tersedia',
            }),
        });

        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.message || 'Error updating table status');
        }

        return data;
    };

    const handleCheckout = async () => {
        try {
            const id_pelanggan = await createCustomer();
            await createOrder(id_pelanggan);
            await updateMejaStatus();
            setMessage('Order and customer data successfully saved!');
        } catch (error: any) {
            console.error('Error during checkout:', error);
            setMessage(`An error occurred during the process: ${error.message}`);
        }
    };

    return (
        <div>
            <Navbar toggleSidebar={toggleSidebar} />
            <div className="">
                <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
            <div className="min-h-screen bg-gray-100 p-6 pt-32 flex justify-center items-center">
                <div className="bg-white p-8 rounded shadow-md w-full max-w-lg">
                    <h2 className="text-2xl font-bold mb-4">Detail Pesanan</h2>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2">Nama Lengkap</label>
                        <input 
                            type="text" 
                            className="w-full p-2 border rounded" 
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2">Email</label>
                        <input 
                            type="email" 
                            className="w-full p-2 border rounded" 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2">Phone Number</label>
                        <input 
                            type="text" 
                            className="w-full p-2 border rounded" 
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                        />
                    </div>
                    <div className="mb-4">
                        <h3 className="text-lg font-semibold mb-2">Detail Pesanan</h3>
                        <div className="flex justify-between items-center mb-2">
                            <span className="font-bold">Meja</span>
                            <span className="font-bold">#{table}</span>
                        </div>
                        {parsedCart.map((cartItem: { item: {
                            harga_menu: string; nama_menu: string }; quantity: number; }, index: number) => (
                            <div key={index} className="flex justify-between items-center mb-2">
                                <span>{cartItem.item.nama_menu} x {cartItem.quantity}</span>
                                <span>Rp {parseFloat(cartItem.item.harga_menu) * cartItem.quantity}</span>
                            </div>
                        ))}
                        <div className="flex justify-between items-center">
                            <span className="font-bold">Total</span>
                            <span className="font-bold">Rp {total}</span>
                        </div>
                    </div>
                    <div className="flex justify-between items-center">
                        <button className="text-gray-700">Batal</button>
                        <button className="bg-[#5a4fcf] text-white px-4 py-2 rounded" onClick={handleCheckout}>Pesan</button>
                    </div>
                    {message && <div className="mt-4 p-2 bg-green-100 text-green-700 rounded">{message}</div>}
                </div>
            </div>
            </div>
        </div>
    );
}

export default Payment;
