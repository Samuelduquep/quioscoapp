import Head from "next/head"
import Sidebar from "../components/Sidebar"
import Modal from "../components/Modal" 
import Pasos from "../components/Pasos"
import useQuiosco from "../hooks/useQuiosco"
import { ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';

export default function Layout({children, pagina}) {

    const {modal} = useQuiosco()

    return (
        <>
            <Head>
                <title>Café - {pagina}</title>
                <meta name="description" content="Quiosco Cafetería"/>
                <link rel="shortcut icon" href="/FaviconSamuel.svg"/>
            </Head>

            <div className=" md:flex">
                <aside className="md:w-4/12 xl:w-1/4 2xl:w-1/5 bg-indigo-50 shadow-lg">
                    <Sidebar/>
                </aside>

                <main className=" md:w-8/12 xl:w-3/4 2xl:w-4/5 h-screen md:overflow-y-scroll">
                    <div className=" p-10">
                        <Pasos/>
                        {children}
                    </div>
                </main>
            </div>
            {modal && <Modal/>}
            <ToastContainer/>
        </>
    )
  }