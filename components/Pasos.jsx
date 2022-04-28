import { useRouter } from "next/router";

const pasos = [
    {paso: 1, nombre: 'Menú', url: '/'},
    {paso: 2, nombre: 'Resumen', url: '/resumen'},
    {paso: 3, nombre: 'Pagar', url: '/total'},
]

const Pasos = () => {

    const router = useRouter()

    const calcularProgreso = ()=>{
        let valor;
        if(router.pathname === '/'){
            valor = 2
        } else if( router.pathname === '/resumen'){
            valor = 50
        } else {
            valor = 100
        }

        return valor
    }

  return (
    <>
     <div className=" flex justify-between mb-4">
        {pasos.map(paso=>(
            <button
                onClick={()=>{
                    router.push(paso.url)
                }}
                className="md:text-xl uppercase px-3 py-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                key={paso.paso}>
                {paso.nombre}
            </button>
        ))}     
    </div> 
    <div className=" bg-gray-100 mb-10 p-2">
        <div 
            className=" rounded-full bg-amber-300 text-ms leading-none h-2 text-center text-white"
            style={{width: `${calcularProgreso()}%`}}
        ></div>
    </div>
    </>
  )
}
  

export default Pasos;
