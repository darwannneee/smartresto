import React, { useEffect, useState } from 'react';
import Navbar from '@/components/navbar/navbar';
import "@/app/globals.css";

// Import Image
import EarnIcon from "@/public/assets/img/earn.png";
import Sidebar from '@/components/navbar/sidebar';

// Define the type for the order objects
interface Order {
  kode_pesanan: number;
  nomor_meja: number;
  id_pelanggan: number;
  kode_menu: string;
  total_harga: number;
  status_pesanan: string;
  tanggal_pesanan: string;
  id_kasir: number;
}

function Laporan() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [dailyOrders, setDailyOrders] = useState<Order[]>([]);
  const [weeklyOrders, setWeeklyOrders] = useState<Order[]>([]);
  const [monthlyOrders, setMonthlyOrders] = useState<Order[]>([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
      setIsSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    // Fetch orders data from API
    fetch('https://api.smartresto.xyz/api/pesanan/get')
      .then(response => response.json())
      .then(data => {
        setOrders(data);
        filterOrders(data);
      })
      .catch(error => console.error('Error fetching orders:', error));
  }, []);

  const filterOrders = (data: Order[]) => {
    const today = new Date();
    const startOfDay = new Date(today.setHours(0, 0, 0, 0));
    const startOfWeek = new Date(today.setDate(today.getDate() - today.getDay()));
    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);

    // Filter pesanan yang tidak memiliki status 'bahan habis'
    const validOrders = data.filter(order => order.status_pesanan !== 'bahan habis');

    const daily = validOrders.filter(order => new Date(order.tanggal_pesanan) >= startOfDay);
    const weekly = validOrders.filter(order => new Date(order.tanggal_pesanan) >= startOfWeek);
    const monthly = validOrders.filter(order => new Date(order.tanggal_pesanan) >= startOfMonth);

    setDailyOrders(daily);
    setWeeklyOrders(weekly);
    setMonthlyOrders(monthly);
};

  return (
    <div>
      <Navbar toggleSidebar={toggleSidebar} />

      <div className="">
        <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

        <div className='mx-10 md:pl-48 pt-24'>
          <h1 className="text-2xl text-center md:text-left font-bold mb-4">Rekap Penjualan</h1>
          <div className="flex justify-center pt-3">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mx-auto">
              <div className="bg-white md:w-full w-72 rounded-lg shadow p-4">
                <div className='flex items-center'>
                  <img src={EarnIcon.src} alt="Earn Icon" className='w-12' />
                  <h2 className="text-md font-bold ml-2">Total Pendapatan Harian</h2>
                </div>
                <p className="text-2xl font-bold pt-2">Rp {dailyOrders.reduce((acc, order) => acc + order.total_harga, 0).toLocaleString()}</p>
                <span className="text-green-500 font-semibold">Harian</span>
                <p className="text-gray-500">From today</p>
              </div>
              <div className="bg-white md:w-full w-72 rounded-lg shadow p-4">
                <div className='flex items-center'>
                  <img src={EarnIcon.src} alt="Earn Icon" className='w-12' />
                  <h2 className="text-md ml-3 font-semibold">Total Pendapatan Mingguan</h2>
                </div>
                <p className="text-2xl font-bold pt-2">Rp {weeklyOrders.reduce((acc, order) => acc + order.total_harga, 0).toLocaleString()}</p>
                <span className="text-green-500 font-semibold">Mingguan</span>
                <p className="text-gray-500">From this week</p>
              </div>
              <div className="bg-white md:w-full w-72  rounded-lg shadow p-4">
                <div className='flex items-center'>
                  <img src={EarnIcon.src} alt="Earn Icon" className='w-12' />
                  <h2 className="text-md font-bold ml-2">Total Orderan Harian</h2>
                </div>
                <p className="text-2xl font-bold">{dailyOrders.length}</p>
                <span className="text-green-500 font-semibold">Total</span>
                <p className="text-gray-500">From today</p>
              </div>
              <div className="bg-white md:w-full w-72 rounded-lg shadow p-4">
                <div className='flex items-center'>
                  <img src={EarnIcon.src} alt="Earn Icon" className='w-12' />
                  <h2 className="text-md font-bold ml-2">Total Orderan Mingguan</h2>
                </div>
                <p className="text-2xl font-bold">{weeklyOrders.length}</p>
                <span className="text-green-500 font-semibold">Total</span>
                <p className="text-gray-500">From this week</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Laporan;
