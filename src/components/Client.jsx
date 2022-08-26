import { useNavigate } from "react-router-dom";

const Client = ( {cliente, handleDelete} ) => {
    const navigate = useNavigate()

    const {nameCliente, empresaCliente, emailCliente, telefonoCliente, notasCliente, id} = cliente; 

  return (
    <tr className='border-b hover:bg-gray-100'>
        <td className='p-3'>{nameCliente}</td>
        <td className='p-3'>
            <p><span className='text-gray-700 uppercase font-bold'>Email:</span>{emailCliente}</p>
            <p><span className='text-gray-700 uppercase font-bold'>Tel:</span>{telefonoCliente}</p>
        </td>
        <td className='p-3'>{empresaCliente}</td>
        <td className='p-3'>
            <button onClick={() => navigate(`/clientes/${id}`)} type='button' className='bg-yellow-600 rounded-md hover:bg-yellow-900 block w-full text-white p-2 uppercase font-bold text-sm'>Ver</button>
            <button onClick={() => navigate(`/clientes/editar/${id}`) } type='button' className='bg-blue-600 rounded-md hover:bg-blue-900 block w-full text-white p-2 uppercase font-bold text-sm mt-3'>Editar</button>
            <button onClick={() => handleDelete(id)} type='button' className='bg-red-600 rounded-md hover:bg-red-900 block w-full text-white p-2 uppercase font-bold text-sm mt-3'>Eliminar</button>
        </td>
    </tr>
  )
}

export default Client