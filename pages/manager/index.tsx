import "@/app/globals.css";
import Navbar from "@/components/navbar/navbar";
import Sidebar from "@/components/navbar/sidebar";
import React, { useEffect, useState } from "react";
import axios from "axios";

// Placeholder SVG for profile image
const ProfileSVG = ({ initials }: { initials: string }) => (
    <svg height="40" width="40" xmlns="http://www.w3.org/2000/svg">
        <circle cx="20" cy="20" r="20" fill="#ccc" />
        <text x="50%" y="50%" textAnchor="middle" dy=".3em" fontSize="15" fill="#fff">
            {initials}
        </text>
    </svg>
);

export default function Manager() {
    interface KaryawanItem {
        id_pelayan?: string;
        id_koki?: string;
        id_kasir?: string;
        nama_pelayan?: string;
        nama_koki?: string;
        nama_kasir?: string;
        jenis_kelamin: string;
        username: string;
        nomor_hp: string;
        email: string;
        role: string;
    }

    const [karyawan, setKaryawan] = useState<KaryawanItem[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [successModalIsOpen, setSuccessModalIsOpen] = useState(false);
    const [errorModalIsOpen, setErrorModalIsOpen] = useState(false);
    const [successMessage, setSuccessMessage] = useState<string>('');
    const [errorMessage, setErrorMessage] = useState<string>('');
    const [currentEmployee, setCurrentEmployee] = useState<KaryawanItem | null>(null);
    const [newEmployee, setNewEmployee] = useState({
        id_karyawan: '',
        nama: '',
        jenis_kelamin: '',
        username: '',
        password: '',
        nomor_hp: '',
        email: '',
        jabatan: ''
    });

    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const pelayanResponse = await axios.get("https://api.smartresto.xyz/api/pelayan");
                const kokiResponse = await axios.get("https://api.smartresto.xyz/api/koki");
                const kasirResponse = await axios.get("https://api.smartresto.xyz/api/kasir");

                const pelayanData = pelayanResponse.data.map((item: any) => ({ ...item, role: "Pelayan" }));
                const kokiData = kokiResponse.data.map((item: any) => ({ ...item, role: "Koki" }));
                const kasirData = kasirResponse.data.map((item: any) => ({ ...item, role: "Kasir" }));

                setKaryawan([...pelayanData, ...kokiData, ...kasirData]);
            } catch (error) {
                setErrorMessage("Error fetching data.");
                setErrorModalIsOpen(true);
            }
        };

        fetchData();
    }, []);

    const handleDelete = async () => {
        try {
            const id = currentEmployee?.id_pelayan || currentEmployee?.id_koki || currentEmployee?.id_kasir;
            if (!id || !currentEmployee) return;
    
            const response = await axios.delete(`https://api.smartresto.xyz/api/${currentEmployee.role.toLowerCase()}/${id}`);
            if (response.status === 200) { // Mengecek jika response berhasil
                setKaryawan(karyawan.filter(item => item.id_pelayan !== id && item.id_koki !== id && item.id_kasir !== id));
                setSuccessMessage('Berhasil menghapus karyawan!');
                setSuccessModalIsOpen(true);
                setIsDeleteModalOpen(false);
                setCurrentEmployee(null);
            } else {
                throw new Error("Gagal menghapus karyawan.");
            }
        } catch (error) {
            setErrorMessage("Error deleting data.");
            setErrorModalIsOpen(true);
        }
    };

    const openDeleteModal = (employee: KaryawanItem) => {
        setCurrentEmployee(employee);
        setIsDeleteModalOpen(true);
    };

    const handleEdit = (employee: KaryawanItem) => {
        setCurrentEmployee(employee);
        setIsModalOpen(true);
    };

    const handleModalClose = () => {
        setIsModalOpen(false);
        setIsDeleteModalOpen(false);
        setIsAddModalOpen(false);
        setSuccessModalIsOpen(false);
        setErrorModalIsOpen(false);
        setCurrentEmployee(null);
    };

    const handleModalSubmit = async (data: KaryawanItem) => {
        try {
            const id = data.id_pelayan || data.id_koki || data.id_kasir;
            if (!id) return;
    
            const response = await axios.put(`https://api.smartresto.xyz/api/${data.role.toLowerCase()}/${id}`, data);
            if (response.status === 200) { // Mengecek jika response berhasil
                setKaryawan(karyawan.map(item =>
                    item.id_pelayan === id || item.id_koki === id || item.id_kasir === id ? data : item
                ));
                setSuccessMessage('Berhasil mengubah karyawan!');
                setSuccessModalIsOpen(true);
                setIsModalOpen(false);
                setCurrentEmployee(null);
            } else {
                throw new Error("Gagal mengubah karyawan.");
            }
        } catch (error) {
            setErrorMessage("Error updating data.");
            setErrorModalIsOpen(true);
        }
    };

    const handleAddEmployee = async (e: any) => {
        e.preventDefault();
    
        // Cek apakah semua field telah diisi
        const { id_karyawan, nama, jenis_kelamin, username, password, nomor_hp, email, jabatan } = newEmployee;
        if (!id_karyawan || !nama || !jenis_kelamin || !username || !password || !nomor_hp || !email || !jabatan) {
            setErrorMessage('Semua field harus diisi.');
            setErrorModalIsOpen(true);
            return;
        }
    
        try {
            const response = await axios.post('https://api.smartresto.xyz/api/employee/add', {
                id_karyawan,
                nama,
                jenis_kelamin,
                username,
                password,
                nomor_hp,
                email,
                jabatan
            });
    
            const newEmp = {
                ...response.data.data, // Data dari respons API
                role: jabatan.charAt(0).toUpperCase() + jabatan.slice(1) // Capitalize role
            };
    
            setKaryawan([...karyawan, newEmp]); // Tambahkan karyawan baru ke daftar
            setSuccessMessage('Berhasil menambahkan karyawan!');
            setSuccessModalIsOpen(true);
            setIsAddModalOpen(false);
            setNewEmployee({
                id_karyawan: '',
                nama: '',
                jenis_kelamin: '',
                username: '',
                password: '',
                nomor_hp: '',
                email: '',
                jabatan: ''
            });
        } catch (error) {
            console.error(error);
            setErrorMessage('Terjadi kesalahan, coba lagi');
            setErrorModalIsOpen(true);
        }
    };
    
    

    const handleAddChange = (e: any) => {
        setNewEmployee({
            ...newEmployee,
            [e.target.id]: e.target.value
        });
    };

    return (
        <div>
            <Navbar toggleSidebar={toggleSidebar} />
            <div className="flex">
                <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
                <div className="flex-1 mx-8 md:pl-40 md:mx-16 pt-24">
                    <h1 className="text-2xl font-bold mb-4">Daftar Karyawan</h1>
                    <button
                        className="bg-green-500 text-white px-4 py-2 rounded mb-4"
                        onClick={() => setIsAddModalOpen(true)}
                    >
                        Tambah Karyawan
                    </button>
                    <div className="overflow-x-auto mt-4">
                        <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
                            <thead>
                                <tr className="w-full bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                                    <th className="py-3 px-6 text-left">Profile</th>
                                    <th className="py-3 px-6 text-left">ID</th>
                                    <th className="py-3 px-6 text-left">Nama</th>
                                    <th className="py-3 px-6 text-left">Jenis Kelamin</th>
                                    <th className="py-3 px-6 text-left">Username</th>
                                    <th className="py-3 px-6 text-left">Nomor HP</th>
                                    <th className="py-3 px-6 text-left">Email</th>
                                    <th className="py-3 px-6 text-left">Role</th>
                                    <th className="py-3 px-6 text-left">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="text-gray-600 text-sm font-light">
                                {karyawan.map((item, index) => {
                                    const name = item.nama_pelayan || item.nama_koki || item.nama_kasir;
                                    const initials = (name ?? "")
                                        .split(" ")
                                        .map((word) => word[0])
                                        .join("");
                                    const id = item.id_pelayan || item.id_koki || item.id_kasir;
                                    return (
                                        <tr key={index} className="border-b border-gray-200 hover:bg-gray-100">
                                            <td className="py-3 px-6 text-left">
                                                <ProfileSVG initials={initials} />
                                            </td>
                                            <td className="py-3 px-6 text-left">{id}</td>
                                            <td className="py-3 px-6 text-left">{name}</td>
                                            <td className="py-3 px-6 text-left">{item.jenis_kelamin}</td>
                                            <td className="py-3 px-6 text-left">{item.username}</td>
                                            <td className="py-3 px-6 text-left">{item.nomor_hp}</td>
                                            <td className="py-3 px-6 text-left">{item.email}</td>
                                            <td className="py-3 px-6 text-left">{item.role}</td>
                                            <td className="py-3 px-6 text-left">
                                                <button 
                                                    className="text-blue-500 mr-2" 
                                                    onClick={() => handleEdit(item)}
                                                >
                                                    Ubah
                                                </button>
                                                <button 
                                                    className="text-red-500" 
                                                    onClick={() => openDeleteModal(item)}
                                                >
                                                    Hapus
                                                </button>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Modal for Editing */}
            {isModalOpen && currentEmployee && (
                <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg w-1/3">
                        <h2 className="text-2xl font-bold mb-4">Edit Karyawan</h2>
                        <form onSubmit={(e) => {
                            e.preventDefault();
                            handleModalSubmit(currentEmployee);
                        }}>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2">
                                    Nama
                                </label>
                                <input 
                                    type="text" 
                                    name="nama"
                                    value={currentEmployee.nama_pelayan || currentEmployee.nama_koki || currentEmployee.nama_kasir || ''}
                                    onChange={(e) => setCurrentEmployee({ ...currentEmployee, [currentEmployee.role.toLowerCase() === 'pelayan' ? 'nama_pelayan' : currentEmployee.role.toLowerCase() === 'koki' ? 'nama_koki' : 'nama_kasir']: e.target.value })}
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2">
                                    Jenis Kelamin
                                </label>
                                <input 
                                    type="text" 
                                    name="jenis_kelamin"
                                    value={currentEmployee.jenis_kelamin}
                                    onChange={(e) => setCurrentEmployee({ ...currentEmployee, jenis_kelamin: e.target.value })}
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2">
                                    Username
                                </label>
                                <input 
                                    type="text" 
                                    name="username"
                                    value={currentEmployee.username}
                                    onChange={(e) => setCurrentEmployee({ ...currentEmployee, username: e.target.value })}
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2">
                                    Nomor HP
                                </label>
                                <input 
                                    type="text" 
                                    name="nomor_hp"
                                    value={currentEmployee.nomor_hp}
                                    onChange={(e) => setCurrentEmployee({ ...currentEmployee, nomor_hp: e.target.value })}
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2">
                                    Email
                                </label>
                                <input 
                                    type="email" 
                                    name="email"
                                    value={currentEmployee.email}
                                    onChange={(e) => setCurrentEmployee({ ...currentEmployee, email: e.target.value })}
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                />
                            </div>
                            <div className="flex items-center justify-between">
                                <button 
                                    type="submit" 
                                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                >
                                    Simpan
                                </button>
                                <button 
                                    type="button" 
                                    onClick={handleModalClose} 
                                    className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                >
                                    Batal
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Modal for Adding */}
            {isAddModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg w-1/3">
                        <h2 className="text-2xl font-bold mb-4">Tambah Karyawan</h2>
                        <form className="space-y-4" onSubmit={handleAddEmployee}>
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
                                        value={newEmployee.id_karyawan}
                                        onChange={handleAddChange}
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
                                        value={newEmployee.nama}
                                        onChange={handleAddChange}
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
                                        value={newEmployee.jenis_kelamin}
                                        onChange={handleAddChange}
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
                                        value={newEmployee.username}
                                        onChange={handleAddChange}
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
                                        value={newEmployee.password}
                                        onChange={handleAddChange}
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
                                        value={newEmployee.nomor_hp}
                                        onChange={handleAddChange}
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
                                        value={newEmployee.email}
                                        onChange={handleAddChange}
                                    />
                                </div>
                                <div className="col-span-1">
                                    <label className="block text-gray-700 font-bold mb-2" htmlFor="jabatan">
                                        Jabatan
                                    </label>
                                    <select 
                                        id="jabatan" 
                                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                                        value={newEmployee.jabatan}
                                        onChange={handleAddChange}
                                    >
                                        <option value="">Pilih Jabatan</option>
                                        <option value="kasir">Kasir</option>
                                        <option value="pelayan">Pelayan</option>
                                        <option value="koki">Koki</option>
                                        <option value="manager">Manager</option>
                                    </select>
                                </div>
                            </div>
                            <div className="flex items-center justify-between">
                                <button 
                                    type="submit" 
                                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                >
                                    Tambah Karyawan
                                </button>
                                <button 
                                    type="button" 
                                    onClick={handleModalClose} 
                                    className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                >
                                    Batal
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Modal for Deleting */}
            {isDeleteModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg w-1/3">
                        <h2 className="text-2xl font-bold mb-4">Konfirmasi Penghapusan</h2>
                        <p>Apakah kamu yakin ingin menghapus karyawan ini?</p>
                        <div className="flex items-center justify-between mt-4">
                            <button 
                                onClick={handleDelete} 
                                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            >
                                Hapus
                            </button>
                            <button 
                                onClick={handleModalClose} 
                                className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            >
                                Batal
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Modal for Success */}
            {successModalIsOpen && (
                <div className="fixed inset-0 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
                        <h2 className="text-lg font-bold mt-10 mb-4">Berhasil</h2>
                        <p className="text-gray-700 mb-4">{successMessage}</p>
                        <div className="text-right">
                            <button 
                                onClick={handleModalClose} 
                                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring"
                            >
                                OK
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Modal for Error */}
            {errorModalIsOpen && (
                <div className="fixed inset-0 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
                        <h2 className="text-lg font-bold mt-10 mb-4">Error</h2>
                        <p className="text-gray-700 mb-4">{errorMessage}</p>
                        <div className="text-right">
                            <button 
                                onClick={handleModalClose} 
                                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring"
                            >
                                OK
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
