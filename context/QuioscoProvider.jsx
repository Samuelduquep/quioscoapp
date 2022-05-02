import { useState, useEffect, createContext } from "react";
import { useRouter } from "next/router";

import { toast } from "react-toastify";

const QuioscoContext = createContext();

const QuioscoProvider = ({ children }) => {
  const [categorias, setCategorias] = useState([]);
  const [categoriaActual, setCategoriaActual] = useState({});
  const [producto, setProducto] = useState({});
  const [modal, setModal] = useState(false);
  const [pedido, setPedido] = useState([]);
  const [nombre, setNombre] = useState("");
  const [total, setTotal] = useState(0);

  const router = useRouter();

  const obtenerCategorias = async () => {
    const respuesta = await fetch("/api/categorias");
    setCategorias(await respuesta.json());
  };

  useEffect(() => {
    obtenerCategorias();
  }, []);

  useEffect(() => {
    setCategoriaActual(categorias[0]);
  }, [categorias]);

  useEffect(() => {
    const calculoTotal = pedido.reduce(
      (total, producto) => producto.precio * producto.cantidad + total,
      0
    );
    setTotal(calculoTotal);
  }, [pedido]);

  const handleClickCategoria = (id) => {
    const categoria = categorias.filter((c) => c.id === id);
    setCategoriaActual(categoria[0]);
  };

  const handleSetProducto = (producto) => {
    setProducto(producto);
  };

  const handleChangeModal = () => {
    setModal(!modal);
  };

  const handleAgregarPedido = (producto) => {
    if (pedido.some((productoState) => productoState.id === producto.id)) {
      const pedidoActualizado = pedido.map((productoState) =>
        productoState.id === producto.id ? producto : productoState
      );
      setPedido(pedidoActualizado);
      toast.success("👌 Pedido Actualizado!", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      setPedido([...pedido, producto]);
      toast.success("👌 Pedido Agregado!", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
    setModal(false);
  };

  const handleEditarCantidad = (id) => {
    const productoActualizar = pedido.filter((producto) => producto.id === id);
    setProducto(productoActualizar[0]);
    setModal(!modal);
  };

  const handleEliminarPedido = (id) => {
    const pedidoActualizar = pedido.filter((producto) => producto.id !== id);
    setPedido(pedidoActualizar);
    toast.success("👌 Producto Eliminado!", {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  const enviarOrden = async (e) => {
    e.preventDefault();
    if (pedido.length === 0) {
      toast.error("Debes Agregar al menos un producto!", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      return;
    } else if (nombre === "") {
      toast.error("Debes Agregar un Nombre", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      return;
    } else if (nombre.length < 3) {
      toast.error("Nombre muy corto", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      return;
    } else {
      try {
        const respuesta = await fetch("/api/ordenes", {
          method: "POST",
          headers: {
            "Content-Type": "application/json;charset=utf-8",
          },
          body: JSON.stringify({
            pedido,
            nombre,
            total,
            fecha: Date.now().toString(),
          }),
        });

        setCategoriaActual({});
        setPedido([]);
        setNombre("");
        setTotal(0);

        toast.success("👌 Orden enviada a Cocina!", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });

        setTimeout(() => {
          router.push("/");
        }, 5000);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const [click, setClick] = useState(false);
  const [ocultar, setOcultar] = useState(true);

  const handleClick = () => {
    setClick(!click);
    setOcultar(!ocultar);
  };

  return (
    <QuioscoContext.Provider
      value={{
        categorias,
        handleClickCategoria,
        categoriaActual,
        producto,
        handleSetProducto,
        handleChangeModal,
        modal,
        handleAgregarPedido,
        pedido,
        handleEditarCantidad,
        handleEliminarPedido,
        nombre,
        setNombre,
        enviarOrden,
        total,
        handleClick,
        click,
        setClick,
        ocultar,
        setOcultar



      }}
    >
      {children}
    </QuioscoContext.Provider>
  );
};

export { QuioscoProvider };

export default QuioscoContext;
