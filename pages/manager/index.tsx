import "@/app/globals.css"
import Navbar from "@/components/navbar/navbar"
import Karyawan from "./karyawan"

export default function Manager() {
    return (
        <main>
            <Navbar />

            {/*  */}
            <Karyawan />
        </main>
    )
}