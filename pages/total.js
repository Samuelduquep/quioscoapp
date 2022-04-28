import Layout from "../layout/Layout"
import useQuiosco from "../hooks/useQuiosco"
import { formatearDinero } from "../helpers"

export default function Total(){

    const {pedido, nombre, setNombre, enviarOrden, total} = useQuiosco()

    return (

        <Layout pagina='Resumen'>
            <h1 className=" text-4xl font-black">Tota y Pagar Pedido</h1>
            <p className="text-2xl my-10">Confirma tu pedido</p>
            <form
                onSubmit={enviarOrden}
            >
                <div>
                    <label className="block uppercase text-slate-800 font-bold text-xl" htmlFor="nombre">Nombre del Cliente:</label>
                    <input
                        id="nombre"
                        type="text"
                        className=" bg-gray-100 w-full lg:w-1/3 mt-3 p-3 rounded-md"
                        onChange={(e)=>setNombre(e.target.value)}
                        value={nombre}
                    />
                </div>
                <div className="mt-10">
                    <p className=" text-2xl">Total a pagar: {formatearDinero(total)} <span className=" font-bold"></span></p>
                </div>
                <div className=" mt-5">
                    <input
                        type='submit'
                        className= {` ${pedido.length === 0 ? " bg-gray-300 hover:cursor-not-allowed"  : 'bg-indigo-600 hover:bg-indigo-700 transition-colors hover:cursor-pointer' }   w-full lg:w-auto px-5 py-2 rounded uppercase font-bold text-white text-center `}
                        value='Confirmar Pedido'
                        disabled={pedido.length === 0}
                    />
                </div>
            </form>
         </Layout>
    )
}