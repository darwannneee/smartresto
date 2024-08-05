import React, { useState } from 'react';
import Navbar from '@/components/navbar/navbar';
import axios from 'axios';
import "@/app/globals.css"

export default function TambahKaryawan() {
  const [formData, setFormData] = useState({
    id_karyawan: '',
    nama: '',
    jenis_kelamin: '',
    username: '',
    password: '',
    nomor_hp: '',
    email: '',
    jabatan: ''
  });

  const handleChange = (e: any) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/api/employee/add', formData);
      console.log(response.data);
      alert('Karyawan berhasil ditambahkan');
    } catch (error) {
      console.error('There was an error!', error);
      alert('Terjadi kesalahan, coba lagi');
    }
  };

  return (
    <main className="p-4">
      <Navbar />
      <div className="max-w-4xl mx-auto mt-8">
        <h1 className="text-2xl font-bold mb-6">Tambah Karyawan</h1>
        <form className="bg-white p-6 rounded-lg shadow-lg space-y-4" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="col-span-1">
              <label className="block text-gray-700 font-bold mb-2" htmlFor="id_karyawan">
                ID Karyawan
              </label>
              <input 
                type="text" 
                id="id_karyawan" 
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300" 
                placeholder="ID Karyawan" 
                value={formData.id_karyawan}
                onChange={handleChange}
              />
            </div>
            <div className="col-span-1">
              <label className="block text-gray-700 font-bold mb-2" htmlFor="nama">
                Nama
              </label>
              <input 
                type="text" 
                id="nama" 
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300" 
                placeholder="Nama Lengkap" 
                value={formData.nama}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="col-span-1">
              <label className="block text-gray-700 font-bold mb-2" htmlFor="jenis_kelamin">
                Jenis Kelamin
              </label>
              <select 
                id="jenis_kelamin" 
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                value={formData.jenis_kelamin}
                onChange={handleChange}
              >
                <option value="">Pilih Jenis Kelamin</option>
                <option value="laki-laki">Laki-laki</option>
                <option value="perempuan">Perempuan</option>
              </select>
            </div>
            <div className="col-span-1">
              <label className="block text-gray-700 font-bold mb-2" htmlFor="username">
                Username
              </label>
              <input 
                type="text" 
                id="username" 
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300" 
                placeholder="Username" 
                value={formData.username}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="col-span-1">
              <label className="block text-gray-700 font-bold mb-2" htmlFor="password">
                Password
              </label>
              <input 
                type="password" 
                id="password" 
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300" 
                placeholder="Password" 
                value={formData.password}
                onChange={handleChange}
              />
            </div>
            <div className="col-span-1">
              <label className="block text-gray-700 font-bold mb-2" htmlFor="nomor_hp">
                Nomor HP
              </label>
              <input 
                type="tel" 
                id="nomor_hp" 
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300" 
                placeholder="Nomor HP" 
                value={formData.nomor_hp}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="col-span-1">
              <label className="block text-gray-700 font-bold mb-2" htmlFor="email">
                Email
              </label>
              <input 
                type="email" 
                id="email" 
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300" 
                placeholder="Email" 
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div className="col-span-1">
              <label className="block text-gray-700 font-bold mb-2" htmlFor="jabatan">
                Jabatan
              </label>
              <select 
                id="jabatan" 
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                value={formData.jabatan}
                onChange={handleChange}
              >
                <option value="">Pilih Jabatan</option>
                <option value="kasir">Kasir</option>
                <option value="pelayan">Pelayan</option>
                <option value="koki">Koki</option>
                <option value="manager">Manager</option>
              </select>
            </div>
          </div>
          <div className="text-right">
            <button 
              type="submit" 
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring"
            >
              Tambah Karyawan
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
