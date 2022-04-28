import Image from 'next/image'
import { formatearDinero } from '../helpers'
import useQuiosco from '../hooks/useQuiosco'


const Producto = ({producto}) => {
    const {nombre, imagen, precio} = producto
    const {handleSetProducto, handleChangeModal} = useQuiosco()

  return (
    <div className='border p-4 flex flex-col items-center justify-between'>
      <Image src={`/assets/img/${imagen}.jpg`} width={400} height={500} alt={`imagen producto ${nombre}`}/>
      <div className='flex flex-col'>
          <h3 className='m-4 text-2xl font-bold'>{nombre}</h3>
          <p className=' m-4 font-black text-4xl text-amber-500'>{formatearDinero(precio)}</p>
      </div>
      <button
            type='button'
            className='bg-indigo-600 hover:bg-indigo-800 text-white w-full p-4 rounded-md uppercase font-bold'
            onClick={()=>{
                handleChangeModal()
                handleSetProducto(producto)}
            }
          >
              Agregar
          </button>
    </div>
  )
}

export default Producto
