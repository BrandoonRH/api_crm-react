import { useEffect, useState } from "react"
import Client from "../components/Client";

const Inicio = () => {
  const [clientes, setClientes] = useState([]); 

  useEffect(() => {
    const getClientes = async () => {
      try {
        const url = 'http://localhost:4000/clientes'; 
        const reponse = await fetch(url); 
        const result = await reponse.json()
        setClientes(result)
      } catch (error) {
        console.log(error)
      }
    }

    getClientes(); 

  }, [])

  const handleDelete = async (id) => {
    Swal.fire({
      title: '¿Estas seguro?',
      text: "Esta acción eliminara el cliente!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Eliminar!',
      cancelButtonText: 'Cancelar'
    }).then(async (result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'ELIMINADO!',
          'El cliente se elimino correctamente.',
          'success'
        )
        //Delete Cliente
        try {
          const url = `http://localhost:4000/clientes/${id}`
          const response = await fetch(url, {
            method: 'DELETE'
          })
          await response.json(); 
          const arrayClients = clientes.filter(cliente => cliente.id !== id)
          setClientes(arrayClients)
        } catch (error) {
          console.log(error)
        }
      }
    })
  }//End to handleDelete

  return (
   <>
    <h1 className='font-black text-4xl text-blue-900'>Clientes</h1>
    <p className='mt-3'>Administra tus Clientes</p>

    <table className="w-full mt-5 table-auto shadow-sm bg-white">
      <thead className="bg-blue-800 text-white">
        <tr>
            <th className="p-2">Nombre</th>
            <th className="p-2">Contacto</th>
            <th className="p-2">Empresa</th>
            <th className="p-2">Acciones</th>
        </tr>
      </thead>
      <tbody>
        {clientes.map( cliente => (
              <Client
                key={cliente.id}
                cliente={cliente}
                handleDelete={handleDelete}
              />
          ))}
      </tbody>
    </table>
    
   </>
  )
}

export default Inicio