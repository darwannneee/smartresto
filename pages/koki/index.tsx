import Head from "next/head"
import Navbar from "@/components/navbar/navbar"

export default function Koki() {
    return (
        <main>
            {/* Head */}
            <Head>
                {/* Title */}
                <title>Koki</title>
            </Head>

            <Navbar />
            <h1>Hi</h1>
        </main>
    )
}