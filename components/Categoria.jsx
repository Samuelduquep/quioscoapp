import Image from "next/image"
import useQuiosco from "../hooks/useQuiosco"
import { useRouter } from "next/router";

const Categoria = ({categoria}) => {
    const {categoriaActual, handleClickCategoria, handleClick} = useQuiosco()
    const {nombre, icono, id} = categoria
    const router = useRouter()
  return (
    <div className={`${categoriaActual?.id === id ? 'bg-amber-300' : ''} flex items-center place-content-between gap-4 w-full border p-5 hover:bg-sky-200 transition-colors hover:cursor-pointer`}
    onClick={()=> {
      handleClickCategoria(id),
      handleClick()
      router.push('/')
    }}
    >
        <div>
            <Image
            width={70}
            height={70}
            src={`/assets/img/icono_${icono}.svg`}
            alt={`Imagen Icono ${nombre}`}
            className="mr-5"
            />
        </div>
            

            <p className="text-2xl font-bold">
                {nombre}
            </p>
      
    </div>
  )
}

export default Categoria