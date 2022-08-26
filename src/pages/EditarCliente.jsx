import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import Form from '../components/Formulario'


const EditarCliente = () => {
  const [cliente, setCliente] = useState({}); 
  const [cargando, setCargando] = useState(false);
  const {id} = useParams(); 

  useEffect(()=> {
      setCargando(!cargando)
      const getClienteAPI = async () => {
          try {
              const url = `http://localhost:4000/clientes/${id}`; 
              const response = await fetch(url); 
              const result = await response.json(); 
              setCliente(result); 

          } catch (error) {
              console.log(error)
          }

          setTimeout(() => {
              setCargando(false)
          }, 2000);
      }
      getClienteAPI()
  },[])

  return (
    <>
        <h1 className='font-black text-4xl text-blue-900'>Editar Cliente</h1>
        <p className='mt-3'>Llena los siguientes campos para actualizar el cliente</p>
        {cliente?.nameCliente ? (
          <Form
          cliente={cliente}
          cargando={cargando}
        />
        ) : (
            <p className="mt-10 text-4xl text-gray-600 text-center font-bold">No se encontro el Cliente</p>
        )
        }
    </>
  )
}

export default EditarCliente