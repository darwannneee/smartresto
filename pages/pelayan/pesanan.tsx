import "@/app/globals.css";
import Navbar from "@/components/navbar/navbar";
import { useEffect, useState } from "react";

// Import Image
import OrderImage from "@/public/assets/img/order.png";
import Sidebar from "@/components/navbar/sidebar";

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
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };


    useEffect(() => {
        const fetchData = () => {
            fetch("https://api.smartresto.xyz/api/pesanan/get")
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
            const response = await fetch("https://api.smartresto.xyz/api/pesanan/ubah", {
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

    const getButtonClass = (status: string) => {
        switch (status) {
            case 'perlu dimasak':
                return 'bg-yellow-500 hover:bg-yellow-600'; // Warna kuning
            case 'bahan habis':
                return 'bg-red-500 hover:bg-red-600'; // Warna merah
            case 'sedang dimasak':
                return 'bg-blue-500 hover:bg-blue-600'; // Warna biru
            case 'perlu diantar':
                return 'bg-orange-500 hover:bg-orange-600'; // Warna oranye
            case 'bayar':
                return 'bg-green-500 hover:bg-green-600'; // Warna hijau
            case 'selesai':
                return 'bg-gray-500 hover:bg-gray-600'; // Warna abu-abu
            default:
                return 'bg-gray-500 hover:bg-gray-600'; // Default warna abu-abu
        }
    };

    const renderPesananItems = (items: PesananItem[]) => {
        if (items.length === 0) {
            return <p className="text-center text-gray-500">Tidak ada pesanan dengan status ini.</p>;
        }
    
        return items.map(item => (
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
                            className={`w-40 h-10 rounded-lg p-2 text-center text-white ${getButtonClass(item.status_pesanan)}`}
                            onClick={() => handleStatusChange(item.kode_pesanan, item.status_pesanan)}
                        >
                            {item.status_pesanan}
                        </button>
                    </div>
                </div>
            </div>
        ));
    };

    const perluDimasak = pesanan.filter(item => item.status_pesanan === 'perlu dimasak');
    const bahanHabis = pesanan.filter(item => item.status_pesanan === 'bahan habis');
    const sedangDimasak = pesanan.filter(item => item.status_pesanan === 'sedang dimasak');
    const perluDiantar = pesanan.filter(item => item.status_pesanan === 'perlu diantar');
    const bayar = pesanan.filter(item => item.status_pesanan === 'bayar');
    const selesai = pesanan.filter(item => item.status_pesanan === 'selesai');

    return (
        <div>
        <Navbar toggleSidebar={toggleSidebar} />
        <div className="">
            <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
        <main className="p-4 pl-10 md:pl-56 pt-24 bg-gray-100 min-h-screen w-full">
            <h1 className="text-2xl font-bold mb-4">Daftar Pesanan</h1>
            
            <section className="mb-8">
                <h2 className="text-xl font-semibold mb-2">Perlu Dimasak</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {renderPesananItems(perluDimasak)}
                </div>
            </section>

            <section className="mb-8">
                <h2 className="text-xl font-semibold mb-2">Bahan Habis</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {renderPesananItems(bahanHabis)}
                </div>
            </section>

            <section className="mb-8">
                <h2 className="text-xl font-semibold mb-2">Sedang Dimasak</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {renderPesananItems(sedangDimasak)}
                </div>
            </section>

            <section className="mb-8">
                <h2 className="text-xl font-semibold mb-2">Perlu Diantar</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {renderPesananItems(perluDiantar)}
                </div>
            </section>

            <section className="mb-8">
                <h2 className="text-xl font-semibold mb-2">Bayar</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {renderPesananItems(bayar)}
                </div>
            </section>

            <section className="mb-8">
                <h2 className="text-xl font-semibold mb-2">Selesai</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {renderPesananItems(selesai)}
                </div>
            </section>

        </main>
        </div>
        </div>
    );
}
