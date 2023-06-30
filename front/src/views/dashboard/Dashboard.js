import React, { useEffect, useState } from 'react'
import io from 'socket.io-client'
import axios from 'axios'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CCardImage,
} from '@coreui/react'
import ReactImg from 'src/assets/images/V_2501.PNG'
const socket = io('http://localhost:3300')

const Dashboard = () => {
  const [data, setData] = useState([])
  const [error, setError] = useState('')
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const loadAsyncStuff = async () => {
      try {
        const response = await axios.get('http://localhost:3300/V_2501a')
        setData(response.data)
      } catch (error) {
        setError(error)
      } finally {
        setLoaded(true)
      }
    }

    loadAsyncStuff()
  }, [])

  useEffect(() => {
    // Establecer conexión con el socket
    socket.on('connect', () => {
      console.log('Conexión establecida con el servidor de socket')
    })

    socket.on(
      'data',
      (...args) => {
        console.log('llego la info')
        setData(args[0]['data'])
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

  useEffect(() => {
    setLoaded(true)
  }, [])

  return (
    <>
      {!loaded && 'Cargando'}
      {loaded && error && 'Hubo un error'}
      {loaded && data.length > 0 && (
        <CRow>
          <CCol>
            <CCard>
              <CCardHeader>
                <h3>Separador V_2501</h3>
              </CCardHeader>
              <CCardBody>
                <CCardImage orientation="top" src={ReactImg} />
                <h2>Entrada de Liquido</h2>
                <CTable aling="middle" color="dark" striped hover responsive>
                  <CTableHead>
                    <CTableRow>
                      <CTableHeaderCell>Nombre Equipo</CTableHeaderCell>
                      <CTableHeaderCell>Valor Recolectado</CTableHeaderCell>
                      <CTableHeaderCell>Calidad del Dato</CTableHeaderCell>
                      <CTableHeaderCell>Time Stamp</CTableHeaderCell>
                    </CTableRow>
                  </CTableHead>
                  <CTableBody>
                    {data.map((item, index) => (
                      <>
                        <CTableRow key={index}>
                          <CTableDataCell>{item.disp_nombre}</CTableDataCell>
                          <CTableDataCell>{item.nu_valor}</CTableDataCell>
                          <CTableDataCell>{item.in_calidad_dato}</CTableDataCell>
                          <CTableDataCell>{item.fe_valor}</CTableDataCell>
                        </CTableRow>
                      </>
                    ))}
                  </CTableBody>
                </CTable>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      )}
    </>
  )
}

export default Dashboard
