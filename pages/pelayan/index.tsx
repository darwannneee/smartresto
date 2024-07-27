import Head from 'next/head';
import "@/app/globals.css";
import Navbar from '@/components/navbar/navbar';

const tables = [
  { id: 'T1', status: 'available', amount: 4, duration: '0h' },
  { id: 'T2', status: 'occupied', amount: 4, duration: '10h' },
  { id: 'T3', status: 'available', amount: 6, duration: '0h' },
  { id: 'T4', status: 'occupied', amount: 4, duration: '10h' },
  { id: 'T5', status: 'available', amount: 4, duration: '0h' },
  { id: 'T6', status: 'occupied', amount: 8, duration: '0.23h' },
  { id: 'T7', status: 'available', amount: 6, duration: '0h' },
  { id: 'T8', status: 'available', amount: 4, duration: '0h' },
  { id: 'T9', status: 'occupied', amount: 4, duration: '0.17h' },
  { id: 'T10', status: 'available', amount: 8, duration: '0h' },
  { id: 'T11', status: 'occupied', amount: 4, duration: '0.10h' },
  { id: 'T12', status: 'available', amount: 6, duration: '0h' },
  { id: 'T13', status: 'occupied', amount: 8, duration: '0.45h' },
  { id: 'T14', status: 'available', amount: 4, duration: '0h' },
  { id: 'T15', status: 'available', amount: 8, duration: '0h' },
  { id: 'T16', status: 'occupied', amount: 4, duration: '1.32h' },
];

export default function Kasir() {
  return (
    <div>
      <Head>
        <title>Restaurant Floor Plan</title>
      </Head>
      <main className="min-h-screen">
        <Navbar />
        <div className="container mx-auto p-6">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {tables.map((table) => (
              <div
                key={table.id}
                className={`relative flex flex-col items-center justify-center w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 lg:w-36 lg:h-36 rounded-full shadow-md transition-all duration-200 ease-in-out transform hover:scale-105 ${
                  table.status === 'available' ? 'bg-green-200' : 'bg-red-200'
                }`}
              >
                <div className="text-center">
                  <div className="font-bold text-gray-700">{table.id}</div>
                  <div className="text-sm text-gray-600">{table.amount} Person</div>
                  <div className="text-xs text-gray-500">{table.duration}</div>
                </div>
              </div>
            ))}
          </div>
          <button className='w-36 h-10 bg-[#5a4fcf] rounded-full text-white mt-10'>Pilih Menu</button>
        </div>
      </main>
    </div>
  );
}
