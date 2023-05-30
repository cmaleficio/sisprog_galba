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
} from '@coreui/react'

const socket = io('http://localhost:3300')

const Dashboard = () => {
  const [data, setData] = useState([])
  const [error, setError] = useState('')
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const loadAsyncStuff = async () => {
      try {
        const response = await axios.get('http://localhost:3300/rtd')
        setData(response.data)
      } catch (error) {
        setError(error)
      } finally {
        setLoaded(true)
      }
    }

    loadAsyncStuff()
  })

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
  }, [data])

  return (
    <>
      {!loaded && 'Cargando'}
      {loaded && error && 'Hubo un error'}
      {loaded && data.length > 0 && (
        <CCard>
          <CCardHeader>
            <h3>Datos en tiempo real</h3>
          </CCardHeader>
          <CCardBody>
            <CTable striped>
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell>ID Equipo</CTableHeaderCell>
                  <CTableHeaderCell>Valor Recolectado</CTableHeaderCell>
                  <CTableHeaderCell>Calidad del Dato</CTableHeaderCell>
                  <CTableHeaderCell>Time Stamp</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {data.map((item, index) => (
                  <CTableRow key={index}>
                    <CTableDataCell>{item.real_tag_id}</CTableDataCell>
                    <CTableDataCell>{item.nu_valor}</CTableDataCell>
                    <CTableDataCell>{item.in_calidad_dato}</CTableDataCell>
                    <CTableDataCell>{item.fe_valor}</CTableDataCell>
                  </CTableRow>
                ))}
              </CTableBody>
            </CTable>
          </CCardBody>
        </CCard>
      )}
    </>
  )
}

export default Dashboard
