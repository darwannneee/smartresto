import "@/app/globals.css";
import Navbar from "@/components/navbar/navbar";
import { useEffect, useState } from "react";
import Modal from "react-modal";

import OrderImage from "@/public/assets/img/order.png";
import Sidebar from "@/components/navbar/sidebar";

// Custom styles for Modal
const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
};

export default function Order() {
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
    const [modalIsOpen, setIsOpen] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState<PesananItem | null>(null);
    const [step, setStep] = useState(1);
    const [paymentMethod, setPaymentMethod] = useState<string | null>(null);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    useEffect(() => {
        const fetchData = () => {
            fetch("https://api.smartresto.xyz/api/pesanan/get")
                .then(response => response.json())
                .then(data => {
                    const filteredData = data.filter((item: PesananItem) => item.status_pesanan === 'bayar');
                    setPesanan(filteredData);
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

            // Refresh the list of pesanan after update
            setPesanan(prevPesanan => prevPesanan.filter(item => item.kode_pesanan !== kode_pesanan));

        } catch (error) {
            console.error("Error updating data:", error);
        }
    };

    const openModal = (order: PesananItem) => {
        setSelectedOrder(order);
        setIsOpen(true);
        setStep(1);
        setPaymentMethod(null);
    };

    const closeModal = () => {
        setIsOpen(false);
        setSelectedOrder(null);
    };

    const handlePaymentMethod = (method: string) => {
        setPaymentMethod(method);
        setStep(2);
    };

    const handleStatusChange = () => {
        if (selectedOrder) {
            updateStatusPesanan(selectedOrder.kode_pesanan, 'selesai');
            closeModal();
        }
    };

    return (
        <div>
            <Navbar toggleSidebar={toggleSidebar} />
            <div className="flex">
                <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
                <main className="p-4 md:pl-56 px-12 pt-24 bg-white min-h-screen w-full">
                    <h1 className="text-2xl font-bold mb-4">Daftar Pesanan</h1>
                    {pesanan.length > 0 ? (
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
                                                onClick={() => openModal(item)}
                                            >
                                                {item.status_pesanan}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-gray-500 text-center">Tidak ada pesanan dengan status "bayar" saat ini.</p>
                    )}
                </main>

                <Modal
                    isOpen={modalIsOpen}
                    onRequestClose={closeModal}
                    style={customStyles}
                    contentLabel="Pilih Metode Pembayaran"
                >
                    {step === 1 && (
                        <div>
                            <h2 className="text-xl font-bold mb-4">Pilih Metode Pembayaran</h2>
                            <div className="grid grid-cols-1 gap-4">
                                <button 
                                    className="bg-blue-500 w-full h-10 rounded-lg p-2 text-center text-white"
                                    onClick={() => handlePaymentMethod('QRIS')}
                                >
                                    QRIS
                                </button>
                                <button 
                                    className="bg-blue-500 w-full h-10 rounded-lg p-2 text-center text-white"
                                    onClick={() => handlePaymentMethod('BCA')}
                                >
                                    BCA
                                </button>
                            </div>
                        </div>
                    )}
                    {step === 2 && (
                        <div>
                            <h2 className="text-xl font-bold mb-4">Scan {paymentMethod}</h2>
                            <p className="text-gray-500 mb-4">Silakan scan kode berikut untuk menyelesaikan pembayaran.</p>
                            <img src="https://www.emoderationskills.com/wp-content/uploads/2010/08/QR1.jpg" alt="QR Code" className="mb-4" />
                            <button 
                                className="bg-green-500 w-full h-10 rounded-lg p-2 text-center text-white"
                                onClick={handleStatusChange}
                            >
                                Selesai
                            </button>
                        </div>
                    )}
                </Modal>
            </div>
        </div>
    );
}
