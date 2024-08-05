import "@/app/globals.css";
import Navbar from "@/components/navbar/navbar";
import { useEffect, useState } from "react";

// Import Image
import OrderImage from "@/public/assets/img/order.png";

export default function Pesanan() {
    interface PesananItem {
        kode_pesanan: string;
        nomor_meja: string;
        id_pelanggan: string;
        kode_menu: string;
        total_harga: number;
        status_pesanan: string;
        tanggal_pesanan: string;
        id_kasir: string;
    }

    const [pesanan, setPesanan] = useState<PesananItem[]>([]);

    useEffect(() => {
        const fetchData = () => {
            fetch("http://localhost:3001/api/pesanan/get")
                .then(response => response.json())
                .then(data => {
                    const sortedData = data.sort((a: PesananItem, b: PesananItem) => {
                        const order = [
                            'perlu diantar',
                            'bahan habis',
                            'perlu dimasak',
                            'sedang dimasak',
                            'bayar',
                            'selesai'
                        ];
                        return order.indexOf(a.status_pesanan) - order.indexOf(b.status_pesanan);
                    });
                    setPesanan(sortedData);
                })
                .catch(error => console.error("Error fetching data:", error));
        };

        fetchData(); // Initial fetch
        const interval = setInterval(fetchData, 5000); // Fetch data every 5 seconds

        return () => clearInterval(interval); // Cleanup interval on component unmount
    }, []);

    const updateStatusPesanan = async (kode_pesanan: string, status_pesanan: string) => {
        try {
            const response = await fetch("http://localhost:3001/api/pesanan/ubah", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ kode_pesanan, status_pesanan })
            });

            if (!response.ok) {
                throw new Error('Failed to update order status');
            }

            const responseData = await response.json();

            // Refresh the list of pesanan after update
            setPesanan(prevPesanan => prevPesanan.map(item =>
                item.kode_pesanan === kode_pesanan ? { ...item, status_pesanan } : item
            ));

        } catch (error) {
            console.error("Error updating data:", error);
        }
    };

    const handleStatusChange = (kode_pesanan: string, currentStatus: string) => {
        let newStatus = currentStatus;

        switch (currentStatus) {
            case 'perlu diantar':
                newStatus = 'bayar';
                break;
            default:
                break;
        }

        updateStatusPesanan(kode_pesanan, newStatus);
    };

    return (
        <>
        <Navbar />
        <main className="p-4 px-12 pt-5 bg-gray-100 min-h-screen">
            <h1 className="text-2xl font-bold mb-4">Daftar Pesanan</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {pesanan.map((item) => (
                    <div key={item.kode_pesanan} className="flex justify-center items-center bg-white p-4 w-72 rounded-lg shadow">
                        <div className="flex flex-col justify-center items-center text-center">
                            <img src={OrderImage.src} className="w-14 mb-3" alt="" />
                            <h2 className="text-lg font-bold mb-2">Pesanan #{item.kode_pesanan}</h2>
                            <p className="text-gray-500 mb-1">Nomor Meja: {item.nomor_meja}</p>
                            <p className="text-gray-500 mb-1">ID Pelanggan: {item.id_pelanggan}</p>
                            <p className="text-gray-500 mb-1">Kode Menu: {item.kode_menu}</p>
                            <p className="text-gray-500 mb-1">Total Harga: Rp {item.total_harga.toLocaleString()}</p>
                            <p className="text-gray-500 mb-2">{new Date(item.tanggal_pesanan).toLocaleString()}</p>
                            <div className="grid">
                                <button 
                                    className="bg-green-500 w-40 h-10 rounded-lg p-2 text-center text-white"
                                    onClick={() => handleStatusChange(item.kode_pesanan, item.status_pesanan)}
                                >
                                    {item.status_pesanan}
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </main>
        </>
    );
}
