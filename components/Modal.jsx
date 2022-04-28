import useQuiosco from "../hooks/useQuiosco";
import Image from "next/image";
import { formatearDinero } from "../helpers";
import { useState, useEffect } from "react";

const Modal = () => {
  const { handleChangeModal, producto, handleAgregarPedido, pedido } = useQuiosco();
  const { imagen, nombre, precio } = producto;
  const [cantidad, setCantidad] = useState(1);
  const [edicion, setEdicion] = useState(false)

  useEffect(() => {
    if(pedido.some(pedidoState=>pedidoState.id === producto.id)){
        const productoEdicion = pedido.find(pedidoState=>pedidoState.id === producto.id)
        setEdicion(true)
        setCantidad(productoEdicion.cantidad)
    } 
  }, [producto, pedido])

  return (
    <div className="w-full h-full bg-black bg-opacity-80 top-0 left-0 fixed flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-lg p-4 flex flex-col items-center relative m-8 md:w-2/3 lg:w-1/2">
        <div className=" absolute right-5 top-5 z-10">
          <button
           onClick={() => {
            handleChangeModal();
          }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-7 w-7 bg-white rounded-full"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </button>
        </div>
        <div className="bg-slate-200 rounded-md gap-5 flex flex-col md:flex-row items-center p-4">
          <div className="md:w-1/2">
            <Image
              width={300}
              height={400}
              alt={`imagen producto ${nombre}`}
              src={`/assets/img/${imagen}.jpg`}
              className=" rounded-md"
            />
          </div>
          <div className="p-2 md:w-1/2">
            <h1 className=" text-4xl font-bold m-5 text-center">{nombre}</h1>
            <p className=" m-5 font-black text-5xl text-center text-amber-500">
              {formatearDinero(precio)}
            </p>
            <div className="flex gap-4 mt-5 justify-center">
              <button
                type="button"
                onClick={() => {
                  if (cantidad >= 2) {
                    setCantidad(cantidad - 1);
                  }
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-7 w-7"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </button>
              <p className="text-3xl">{cantidad}</p>
              <button
                type="button"
                onClick={() => {
                  if (cantidad <= 19) {
                    setCantidad(cantidad + 1);
                  }
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-7 w-7"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </button>
            </div>
            <p className=" text-md font-bold m-5 text-center">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure
              commodi, nesciunt voluptas veritatis tempore
            </p>
            {edicion && (
                  <p className="text-md font-bold m-5 p-2 rounded-sm text-center text-white bg-green-500">Producto En el Carrito</p>
            )}
          
            <button
              onClick={() => {
                handleAgregarPedido({...producto, cantidad})
              }}
              className=" bg-indigo-800 hover:bg-cyan-600 text-white w-full p-4 mt-2 rounded-md uppercase font-bold transition-colors"
            >
              {edicion ? 'Guardar Cambios' : 'Agregar'}
            </button>
          </div>
        </div>
        {/* <div className="mt-4 lg:self-end w-full md:w-min">
          <button
            onClick={(e) => {
              handleChangeModal();
            }}
            className="bg-indigo-600 hover:bg-indigo-800 text-white w-full p-4 mt-2 rounded-md uppercase font-bold"
          >
            Cerrar
          </button>
        </div> */}
      </div>
    </div>
  );
};

export default Modal;
