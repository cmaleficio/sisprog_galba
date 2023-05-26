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
  const [isLoading, setIsLoading] = useState(true)
  const [data, setData] = useState(null)

  useEffect(() => {
    fetch('http://localhost:3300/rtd')
      .then((res) => {
        return res.json()
      })
      .then((data) => {
        setTimeout(() => {
          setData(data)
          setIsLoading(false)
        }, 10000)
      })
  }, [])

  if (isLoading) {
    return (
      <div className="App">
        <h1>Cargando...</h1>
      </div>
    )
  }

  return (
    <>
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
    </>
  )
}

export default Dashboard
