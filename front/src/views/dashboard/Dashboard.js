import React, { useEffect, useState } from 'react'
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
import io from 'socket.io-client'

const Dashboard = () => {
  /*   const [data, setData] = useState([])
  useEffect(() => {
      // Escuchar el evento "realtime-data" emitido desde el servidor
    socket.on('update_notification', newData => {
      // Actualizar el estado de los datos con los nuevos datos recibidos
      setData(newData)
    })

    return () => {
      // Desconectar del servidor cuando el componente se desmonta
      socket.disconnect()
    }
  }, []) */
  const [data, setData] = useState([])
  const [error, setError] = useState('')
  const [loaded, setLoaded] = useState(false)
  useEffect(() => {
    const loadAsyncStuff = async () => {
      try {
        const socket = io('http://localhost:3000') // definir socket dentro de la función
        socket.on('update_notification', (msg) => {
          setData(msg) //actualizar los datos cada vez que se reciba un mensaje
        })
        // Escucha el evento "updateTable" enviado por el servidor Socket.io
        socket.on('update_notification', (newData) => {
          setData(newData)
        })
        // Limpia el evento después de que el componente sea desmontado
        return () => {
          socket.off('updateTable')
        }
      } catch (error) {
        setError(error)
      } finally {
        setLoaded(true)
      }
    }
    loadAsyncStuff()
  }, [])

  return (
    <CRow>
      <CCol xs>
        <CCard className="mb-4">
          <CCardHeader>Analisis de Datos</CCardHeader>
          <CCardBody>
            <CTable align="middle" className="mb-0 border" hover responsive>
              <CTableHead color="light">
                <CTableRow>
                  <CTableHeaderCell>ID Equipo</CTableHeaderCell>
                  <CTableHeaderCell>Nombre</CTableHeaderCell>
                  <CTableHeaderCell>Valor Recolectado</CTableHeaderCell>
                  <CTableHeaderCell>Time Stamp</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {data.map((item, index) => (
                  <CTableRow key={index}>
                    <CTableDataCell>
                      <div>{item.catalogo_tag_id}</div>
                    </CTableDataCell>
                    <CTableDataCell>
                      <div>{item.nombre}</div>
                    </CTableDataCell>
                    <CTableDataCell>
                      <strong>{item.nu_valor}</strong>
                    </CTableDataCell>
                    <CTableDataCell>
                      <strong>{item.fe_valor}</strong>
                    </CTableDataCell>
                  </CTableRow>
                ))}
              </CTableBody>
            </CTable>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default Dashboard
