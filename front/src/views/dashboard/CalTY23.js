import React, { useEffect, useState } from 'react'
import io from 'socket.io-client'
import axios from 'axios'
import { CCard, CCol, CRow, CCardImage, CWidgetStatsA, CContainer, CImage } from '@coreui/react'
import { CChartLine } from '@coreui/react-chartjs'
import ReactImg from 'src/assets/images/CALENTADOR_TY23_1.png'
const socket = io('http://localthost:3300')

const Dashboard = () => {
  const [error, setError] = useState('')
  const [loaded, setLoaded] = useState(false)

  const [sisprogData, setSisprogData] = useState([])

  useEffect(() => {
    // Establecer conexión con el socket
    socket.on('connect', () => {
      console.log('Conexión establecida con el servidor de socket')
    })

    socket.on(
      'sisprogdata',
      (...args) => {
        console.log('llego la info sisprogdata', args[0]['data'])
        setSisprogData(args[0]['data'])
      },
      socket.off('data'),
    )

    // Manejar errores de conexión
    socket.on('connect_error', (err) => {
      console.log(err)
      console.log('Error de conexión con el servidor de socket:', err)
      setError('Error de conexión con el servidor de socket')
    })

    // Limpiar los listeners del socket al desmontar el componente
    return () => {
      socket.off('connect')
      socket.off('connect_error')
    }
  }, [])

  // TODO: necesitas escuchar un evento de socket que cuando la tabla cambien te envie la data de sisprogData y la actualizas

  useEffect(() => {
    // declare the data fetching function
    const fetchData = async () => {
      const response = await axios.get('http://localhost:3300/sisprogdata')
      setSisprogData(response.data)
      setLoaded(true)
    }

    // call the function
    fetchData()
      // make sure to catch any error
      .catch(console.error)
  }, [])

  useEffect(() => {
    setLoaded(true)
  }, [])

  return (
    <>
      <CContainer fluid>
        <CRow>
          <CCol>
            <h2>HOLA AQUI VA LA IMAGEN REFRENCIAL DEL EQUIPO</h2>
            <CImage fluid src=".src/assets/images/CALENTADOR_TY23.PNG" />
          </CCol>
          <CCol>
            <h2>AQUI VA LA data VISUAL</h2>
          </CCol>
          <CCol>
            <h2>AQUI VA LA data VISUAL2</h2>
          </CCol>
          <CCol>
            <h2>AQUI VA LA data VISUAL3</h2>
          </CCol>
        </CRow>

        <CRow>
          <CCol>
            <h2>AQUI DEBERIA IR UNA TABLA CON EL RESUMEN DE DATOS</h2>
          </CCol>
        </CRow>
      </CContainer>
      <h1>Contenedor</h1>
      <CContainer fluid>
        <CRow>
          <CCol>
            <h2>HOLA AQUI VA LA IMAGEN REFRENCIAL DEL EQUIPO</h2>
            <CImage fluid src=".src/assets/images/CALENTADOR_TY23.PNG" />
          </CCol>
          <CCol>
            <h2>AQUI VA LA data VISUAL</h2>
          </CCol>
          <CCol>
            <h2>AQUI VA LA data VISUAL2</h2>
          </CCol>
          <CCol>
            <h2>AQUI VA LA data VISUAL3</h2>
          </CCol>
        </CRow>

        <CRow>
          <CCol>
            <h2>AQUI DEBERIA IR UNA TABLA CON EL RESUMEN DE DATOS</h2>
          </CCol>
        </CRow>
      </CContainer>
    </>
  )
}

export default Dashboard
