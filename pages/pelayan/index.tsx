import Head from 'next/head';
import "@/app/globals.css";
import Navbar from '@/components/navbar/navbar';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

export default function Kasir() {
  interface Table {
    nomor_meja: number;
    status_meja: string;
    kapasitas: number;
    duration?: string;
  }

  const [tables, setTables] = useState<Table[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchTables = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/meja');
        setTables(response.data);
      } catch (error) {
        console.error('Error fetching the table data:', error);
      }
    };

    fetchTables();
  }, []);

  const handleTableClick = (table: Table) => {
    if (table.status_meja === 'available') {
      // Navigate to menu page with the selected table number
      router.push(`/pelayan/menu?table=${table.nomor_meja}`);
    }
  };

  const getTableColor = (status: string) => {
    switch (status) {
      case 'available':
        return 'bg-gray-200';
      case 'occupied':
        return 'bg-blue-200';
      case 'reserved':
        return 'bg-red-200';
      default:
        return 'bg-gray-200';
    }
  };

  const getLegendColor = (status: string) => {
    switch (status) {
      case 'available':
        return 'bg-gray-500';
      case 'occupied':
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
      <main className="min-h-screen">
        <Navbar />
        <div className="container mx-auto p-6">
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
                <div className={`w-4 h-4 ${getLegendColor('available')}`} />
                <div className="text-sm">Available</div>
              </div>
              <div className="flex items-center space-x-2">
                <div className={`w-4 h-4 ${getLegendColor('occupied')}`} />
                <div className="text-sm">Dine in</div>
              </div>
              <div className="flex items-center space-x-2">
                <div className={`w-4 h-4 ${getLegendColor('reserved')}`} />
                <div className="text-sm">Reserved</div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
