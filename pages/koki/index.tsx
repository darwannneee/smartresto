import Head from "next/head";
import Navbar from "@/components/navbar/navbar";
import { useEffect, useState } from "react";

// Import Image
import OrderImage from "@/public/assets/img/order.png";

export default function Koki() {
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
        fetch("http://localhost:3001/api/pesanan/get")
            .then(response => response.json())
            .then(data => {
                const filteredData = data.filter((item: PesananItem) => item.status_pesanan === 'perlu dimasak' || item.status_pesanan === 'sedang dimasak');
                setPesanan(filteredData);
            })
            .catch(error => console.error("Error fetching data:", error));
    }, []);

    const updateStatusPesanan = (kode_pesanan: string, status_pesanan: string) => {
        fetch("http://localhost:3001/api/pesanan/ubah", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ kode_pesanan, status_pesanan })
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            // Refresh the list of pesanan after update
            setPesanan(pesanan.map(item => 
                item.kode_pesanan === kode_pesanan ? { ...item, status_pesanan } : item
            ));
        })
        .catch(error => console.error("Error updating data:", error));
    };

    const handleButuhDimasak = (kode_pesanan: string, currentStatus: string) => {
        const newStatus = currentStatus === 'sedang dimasak' ? 'perlu diantar' : 'sedang dimasak';
        updateStatusPesanan(kode_pesanan, newStatus);
    };

    const handleBahanHabis = (kode_pesanan: string) => {
        updateStatusPesanan(kode_pesanan, 'bahan habis');
    };

    return (
        <>
        <Head>
            <title>Koki</title>
        </Head>
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
                                    onClick={() => handleButuhDimasak(item.kode_pesanan, item.status_pesanan)}
                                >
                                    {item.status_pesanan}
                                </button>
                                {item.status_pesanan === 'perlu dimasak' && (
                                    <button 
                                        className="bg-red-500 w-40 h-10 rounded-lg mt-2 text-center text-white"
                                        onClick={() => handleBahanHabis(item.kode_pesanan)}
                                    >
                                        Bahan habis
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </main>
        </>
    );
}
