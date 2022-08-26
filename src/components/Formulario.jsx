import { Formik, Form, Field } from "formik"
import { useNavigate } from "react-router-dom"
import * as Yup from 'yup'
import Alert from "./Alert"
import Spinner from "../components/Spinner";


const Formulario = ({cliente, cargando}) => {

  const navigate = useNavigate()

  const newClientShema = Yup.object().shape({
      nameCliente: Yup.string()
                      .min(5, 'El Nombre es muy Corto')
                      .max(35, 'EL Nombre es muy Largo')
                      .required('El Nombre del Cliente es Obligatorio'),
      empresaCliente: Yup.string()
                      .required('La Empresa del Cliente es Obligatorio'),
      emailCliente: Yup.string().email('El Email no es Válido').required('EL Email es Obligatorio'),
      telefonoCliente: Yup.number().integer('Número no Valido').positive('Número no Válido').typeError('El Télefono no es Válido'),
  })

  const handleSubmit = async (values) => {
   try {
    let response
    if(cliente.id){
      //Edit Client 
      const url = `${import.meta.env.VITE_API_URL}${cliente.id}`;
       response = await fetch(url, {
        method: 'PUT', 
        body: JSON.stringify(values),
        headers: {
          'Content-Type' : 'application/json'
        }
      }) 
    }else{
      //Create a new Client
      const url = import.meta.env.VITE_API_URL;
       response = await fetch(url, {
        method: 'POST', 
        body: JSON.stringify(values),
        headers: {
          'Content-Type' : 'application/json'
        }
      }) 
    }
    await response.json()
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Acción Exitosa!',
      showConfirmButton: false,
      timer: 1500
    })
    navigate('/clientes')

   } catch (error) {
    console.log(error)
   }

  }//end to handleSubmit

  return (
    cargando ? <Spinner/> : (
            <div className="bg-white mt-10 px-5 py-10 rounded-md shadow-md md:w-3/4 mx-auto">
                <h1 className="text-gray-500 font-bold text-xl uppercase text-center">{cliente?.nameCliente ? 'Editar Cliente' : 'Agregar Cliente'}</h1>

                <Formik
                  initialValues={{
                    nameCliente: cliente?.nameCliente ?? '',
                    empresaCliente: cliente?.empresaCliente ?? '',
                    emailCliente: cliente?.emailCliente ?? '',
                    telefonoCliente: cliente?.telefonoCliente ?? '',
                    notasCliente: cliente?.notasCliente ?? ''
                  }}
                  enableReinitialize={true}
                  onSubmit= { async (values, {resetForm}) => {
                    await handleSubmit(values)
                    resetForm()
                  }}
                  validationSchema={newClientShema}
                >
                  { ({errors, touched}) => {
                    //console.log(data)
                  return ( 
                    <Form className="mt-10">
                      <div className="mb-4">
                          <label htmlFor="nameCliente" className="text-gray-600">Nombre: </label>
                          <Field
                            id="nameCliente"
                            name= "nameCliente"
                            type="text"
                            className="mt-2 block w-full p-3 bg-gray-100 rounded-lg"
                            placeholder="Nombre del Cliente"
                          />
                        {errors.nameCliente && touched.nameCliente ? 
                        (
                          <Alert>{errors.nameCliente}</Alert>
                        ): null }
                      </div>
                      <div className="mb-4">
                          <label htmlFor="empresaCliente" className="text-gray-600">Empresa: </label>
                          <Field
                            id="empresaCliente"
                            name="empresaCliente"
                            type="text"
                            className="mt-2 block w-full p-3 bg-gray-100 rounded-lg"
                            placeholder="Empresa del Cliente"
                          />
                          {errors.empresaCliente && touched.empresaCliente ? 
                        (
                          <Alert>{errors.empresaCliente}</Alert>
                        ): null }
                      </div>
                      <div className="mb-4">
                          <label htmlFor="emailCliente" className="text-gray-600">Email: </label>
                          <Field
                            id="emailCliente"
                            name="emailCliente"
                            type="email"
                            className="mt-2 block w-full p-3 bg-gray-100 rounded-lg"
                            placeholder="Email del Cliente"
                          />
                          {errors.emailCliente && touched.emailCliente ? 
                        (
                          <Alert>{errors.emailCliente}</Alert>
                        ): null }
                      </div>
                      <div className="mb-4">
                          <label htmlFor="telefonoCliente" className="text-gray-600">Telefono: </label>
                          <Field
                            id="telefonoCliente"
                            name="telefonoCliente"
                            type="tel"
                            className="mt-2 block w-full p-3 bg-gray-100 rounded-lg"
                            placeholder="Telefono del Cliente"
                          />
                          {errors.telefonoCliente && touched.telefonoCliente ? 
                        (
                          <Alert>{errors.telefonoCliente}</Alert>
                        ): null }
                      </div>
                      <div className="mb-4">
                          <label htmlFor="notasCliente" className="text-gray-600">Notas: </label>
                          <Field
                            as="textarea"
                            id="notasCliente"
                            name="notasCliente"
                            type="text"
                            className="mt-2 block w-full p-3 bg-gray-100 rounded-lg h-40"
                            placeholder="Notas del Cliente"
                          />
                      </div>
                      <input type="submit" value={cliente?.nameCliente ? 'Actualizar Cliente' : 'Guardar Cliente'} className="mt-5 w-full text-white p-3 bg-blue-800 uppercase font-bold text-lg hover:bg-blue-400 cursor-pointer"/>
                    </Form>
                    )}}
                </Formik>
            </div>
    )
  )
}
Formulario.defaultProps = {
  cliente:{},
  cargando: false
}
export default Formulario