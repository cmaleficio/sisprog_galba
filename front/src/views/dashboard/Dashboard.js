import React, { useEffect, useState } from 'react'
import axios from 'axios'
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
  const [socket, setSocket] = useState(null)

  useEffect(() => {
    const loadAsyncStuff = async () => {
      try {
        /*const response = await axios.get('http://localhost:3300/rtd')
          setData(response.data) */

        // Establish socket connection
        setSocket(socket)

        // Listen for incoming data
        socket.on('connect', () => {
          console.log('Front Conectado');
        })
        socket.on('data', (newData) => {
          if (!newData) {
            console.log('Aquí hay un problema')
            throw error
          } else {
            setData((prevData) => [...prevData, newData])
          }
        })
      } catch (error) {
        setError(error)
      } finally {
        setLoaded(true)
      }
    }
    loadAsyncStuff()
  }, [])

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
                  <CTableHeaderCell> ID Equipo</CTableHeaderCell>
                  <CTableHeaderCell> Valor Recolectado</CTableHeaderCell>
                  <CTableHeaderCell> Calidad del Dato</CTableHeaderCell>
                  <CTableHeaderCell> Time Stamp</CTableHeaderCell>
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
