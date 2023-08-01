import React, { useState, useEffect } from 'react'
import io from 'socket.io-client'
import axios from 'axios'
import { CCard, CCardBody, CCol, CCardHeader, CRow, CContainer } from '@coreui/react'
import { CChartLine, CChart } from '@coreui/react-chartjs'
const socket = io('http://localhost:3300')

const Charts = () => {
  const [error, setError] = useState('')
  const [loaded, setLoaded] = useState(false)

  const [Graph_V2501, setGraphV2501] = useState([])

  useEffect(() => {
    // Establecer conexión con el socket
    socket.on('connect', () => {
      console.log('Conexión establecida con el servidor de socket')
    })

    socket.on(
      'sisprogdata',
      (...args) => {
        console.log('llego la info sisprogdata', args[0]['data'])
        setGraphV2501(args[0]['data'])
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
      const response = await axios.get('http://localhost:3300/Graph_V2501')
      setGraphV2501(response.data)
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
    <CContainer>
      <CRow>
        <CCol xg={6}>
          <CCard className="mb-4">
            <CCardHeader>{Graph_V2501}</CCardHeader>
            <CCardBody></CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </CContainer>
  )
}

export default Charts
