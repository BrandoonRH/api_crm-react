import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import Spinner from "../components/Spinner";

const VerCliente = () => {
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
    Object.keys(cliente).length === 0 ? <p className="text-4xl text-gray-700 text-center">No hay Resultados</p> : (

            <div>
                {cargando ? <Spinner/> : (
                    <>
                        <h1 className='font-black text-4xl text-blue-900'>Ver Cliente: {cliente.nameCliente}</h1>
                        <p className='mt-3'>Infomración del Cliente</p>
                        {
                            cliente.nameCliente && (
                            <p className="text-4xl text-gray-500 mt-10">
                            <span className="text-gray-800 uppercase font-bold">Cliente: </span>
                                {cliente.nameCliente}
                            </p>
                        )}
                        
                        {
                            cliente.emailCliente && (
                            <p className="text-2xl text-gray-500 mt-4 ">
                                    <span className="text-gray-800 uppercase font-bold">Empresa: </span>
                                    {cliente.empresaCliente}
                            </p>
                        )}
                        
                        {
                        cliente.emailCliente && (
                            <p className="text-2xl text-gray-500 mt-4 ">
                                <span className="text-gray-800 uppercase font-bold">Email: </span>
                                {cliente.emailCliente}
                            </p>
                        )}
                        
                    {
                        cliente.telefonoCliente && (
                            <p className="text-2xl text-gray-500 mt-4 ">
                            <span className="text-gray-800 uppercase font-bold">Teléfono: </span>
                            {cliente.telefonoCliente}
                        </p>
                        )}

                        {cliente.notasCliente && (
                            <p className="text-2xl text-gray-500 mt-4 ">
                            <span className="text-gray-800 uppercase font-bold">Notas: </span>
                            {cliente.notasCliente}
                            </p>
                        )}
                    </>
                )}
            
            </div>
    )
  )
}

export default VerCliente