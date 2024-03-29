import Image from "next/image"
import useQuiosco from "../hooks/useQuiosco"
import Categoria from "./Categoria"

const Sidebar = () => {

  const {categorias} = useQuiosco()

  return (
    <>
    <div className=" p-10 flex justify-center content-center">
       <Image width={300} height={100} src="/assets/img/logo.svg" alt="Imagen Logotipo"/>
    </div>
     
      <nav className="mt-10">
        {categorias.map(categoria=>(
          <Categoria
            key={categoria.id}
            categoria={categoria}
          />
        ))}
      </nav>
    </>
  )
}

export default Sidebar
