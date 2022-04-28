import { useRouter } from "next/router";

const pasos = [
    {paso: 1, nombre: 'Menú', url: '/'},
    {paso: 2, nombre: 'Resumen', url: '/resumen'},
    {paso: 3, nombre: 'Datos y Total', url: '/total'},
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
     <div className=" flex justify-between bg-green-300 p-10">
        {pasos.map(paso=>(
            <button
                onClick={()=>{
                    router.push(paso.url)
                }}
                className=" text-2xl font-bold uppercase"
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
