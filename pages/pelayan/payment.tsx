import React from 'react';
import "@/app/globals.css"
import Navbar from '@/components/navbar/navbar';
const Payment = () => {
  return (
    <main>
      <Navbar />
      <div className="min-h-screen bg-gray-100 p-6 flex justify-center items-center">
        <div className="bg-white p-8 rounded shadow-md w-full max-w-lg">
          <h2 className="text-2xl font-bold mb-4">Payment details</h2>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Full name</label>
            <input type="text" className="w-full p-2 border rounded" value="Komol Kuchkarov" />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Card Details</label>
            <input type="text" className="w-full p-2 border rounded mb-2" value="8950 9004 0000 4900" />
            <div className="flex space-x-2">
              <input type="text" className="w-1/3 p-2 border rounded" placeholder="MM / YY" />
              <input type="text" className="w-1/3 p-2 border rounded" placeholder="CVV" />
            </div>
          </div>
          <div className="mb-4">
            <button className="text-blue-500">+ Add address or tax ID</button>
          </div>
          <div className="flex justify-between items-center mb-4">
            <div>
              <span className="text-lg font-semibold">Single</span>
              <button className="text-blue-500 ml-2">Change plan</button>
            </div>
            <div className="text-lg font-semibold">$8.00</div>
          </div>
          <div className="flex justify-between items-center mb-4">
            <span className="text-gray-500">Paid monthly</span>
            <span className="text-gray-500">$8.00</span>
          </div>
          <div className="flex justify-between items-center mb-4">
            <span className="text-gray-500">Updates</span>
            <span className="text-gray-500">Free</span>
          </div>
          <div className="flex justify-between items-center mb-4">
            <span className="text-lg font-semibold">Due today</span>
            <span className="text-lg font-semibold">$8.00</span>
          </div>
          <div className="mb-4 text-sm text-gray-500">
            By upgrading, you authorize Pixelsz to modify your subscription term, and charge, credit, and/or prorate your workspace accordingly.
          </div>
          <div className="flex justify-between items-center">
            <button className="text-gray-700">Cancel</button>
            <button className="bg-orange-500 text-white px-4 py-2 rounded">Subscribe</button>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Payment;
