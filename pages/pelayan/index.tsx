import Head from 'next/head';
import "@/app/globals.css";
import Navbar from '@/components/navbar/navbar';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import Sidebar from '@/components/navbar/sidebar';
import Swal from 'sweetalert2';  // Import SweetAlert2

export default function Kasir() {
  interface Table {
    nomor_meja: number;
    status_meja: string;
    kapasitas: number;
    duration?: string;
  }

  const [tables, setTables] = useState<Table[]>([]);
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

  useEffect(() => {
    const fetchTables = async () => {
      try {
        const response = await axios.get('https://api.smartresto.xyz/api/meja');
        setTables(response.data);
      } catch (error) {
        console.error('Error fetching the table data:', error);
      }
    };

    fetchTables();
  }, []);

  const handleTableClick = (table: Table) => {
    if (table.status_meja === 'tersedia') {
      // Navigate to menu page with the selected table number
      router.push(`/pelayan/menu?table=${table.nomor_meja}`);
    } else {
      // Display SweetAlert2 popup instead of alert
      Swal.fire({
        icon: 'error',
        title: 'Meja tidak tersedia',
        text: 'Silakan pilih meja lain.',
        confirmButtonText: 'Ok'
      });
    }
  };

  const getTableColor = (status: string) => {
    switch (status) {
      case 'available':
        return 'bg-gray-200';
      case 'tidak tersedia':
        return 'bg-blue-200';
      default:
        return 'bg-gray-200';
    }
  };

  const getLegendColor = (status: string) => {
    switch (status) {
      case 'available':
        return 'bg-gray-500';
      case 'tidak tersedia':
        return 'bg-blue-500';
      case 'reserved':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <div>
      <Head>
        <title>Restaurant Floor Plan</title>
      </Head>
      <div className="flex">
        <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
        <div className="md:ml-44 w-full">
          <Navbar toggleSidebar={toggleSidebar} />
          <main className="mt-20 mx-5 md:mx-10 p-6">
            <div className="container mx-auto">
              <div className="grid grid-cols-2 sm:grid-cols-6 md:grid-cols-6 lg:grid-cols-4 gap-4">
                {tables.map((table) => (
                  <div
                    key={table.nomor_meja}
                    onClick={() => handleTableClick(table)}
                    className={`cursor-pointer flex flex-col items-center justify-center w-36 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-48 lg:h-28 rounded-lg shadow-md transition-all duration-200 ease-in-out transform hover:scale-105 ${getTableColor(table.status_meja)}`}
                  >
                    <div className="text-center">
                      <div className="font-bold text-gray-700">A{table.nomor_meja}</div>
                      <div className="text-sm text-gray-500">Kapasitas: {table.kapasitas}</div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 flex justify-center">
                <div className="flex space-x-4">
                  <div className="flex items-center space-x-2">
                    <div className={`w-4 h-4 ${getLegendColor('tersedia')}`} />
                    <div className="text-sm">Tersedia</div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className={`w-4 h-4 ${getLegendColor('tidak tersedia')}`} />
                    <div className="text-sm">Tidak tersedia</div>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
