import React from 'react';
import Navbar from '@/components/navbar/navbar';
import "@/app/globals.css"

// Import Image
import PeopleIcon from "@/public/assets/img/people.png"
import EarnIcon from "@/public/assets/img/earn.png"

function Kasir() {
  return (
    <main className="p-4">
      <Navbar />
      <div className='mx-10'>
        <h1 className="text-2xl font-bold mb-4">Sales Overview</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white rounded-lg shadow p-4">
              <div className='flex items-center'>
                <img src={EarnIcon.src} alt="People Icon" className='w-12'/>
                <h2 className="text-md font-bold ml-2">Total Pendapatan</h2>
              </div>
              <p className="text-2xl font-bold">650</p>
              <span className="text-green-500 font-semibold">8%</span>
              <p className="text-gray-500">From last week</p>
          </div>
          <div className="bg-white rounded-lg shadow p-4">
            <h2 className="text-lg font-semibold">Average Order</h2>
            <p className="text-2xl font-bold">$1,250</p>
            <span className="text-green-500 font-semibold">10%</span>
            <p className="text-gray-500">From last week</p>
          </div>
          <div className="bg-white rounded-lg shadow p-4">
            <div className='flex items-center'>
              <img src={PeopleIcon.src} alt="People Icon" className='w-12'/>
              <h2 className="text-md font-bold ml-2">Total Customers</h2>
            </div>
            <p className="text-2xl font-bold">650</p>
            <span className="text-green-500 font-semibold">8%</span>
            <p className="text-gray-500">From last week</p>
          </div>
          <div className="bg-white rounded-lg shadow p-4">
            <h2 className="text-lg font-semibold">Product Sold</h2>
            <p className="text-2xl font-bold">450</p>
            <span className="text-red-500 font-semibold">2.5%</span>
            <p className="text-gray-500">From last week</p>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Kasir;
