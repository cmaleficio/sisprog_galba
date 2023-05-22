import React, { useEffect, useState } from 'react'
import io from 'socket.io-client'
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
    // Establecer conexión con el socket
    socket.on('connect', () => {
      console.log('Conexión establecida con el servidor de socket')
    })

    socket.on('data', (...args) => {
      console.log(args[0]['data'])
      const prevData = ''
      setData((prevData) => [...prevData, args])
      console.log(prevData)
    })

    // Escuchar eventos 'data' y actualizar los datos en tiempo real
    /*     socket.on('notification', (newData) => {
      if (!newData) {
        console.log('Aquí hay un problema')
        setError('Error al recibir los datos en tiempo real')
      } else {
        console.log('data', newData)
        setData((prevData) => [...prevData, newData])
      }
    }) */

    // Manejar errores de conexión
    socket.on('connect_error', (err) => {
      console.log('Error de conexión con el servidor de socket:', err)
      setError('Error de conexión con el servidor de socket')
    })

    // Limpiar los listeners del socket al desmontar el componente
    return () => {
      socket.off('connect')
      socket.off('data')
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
