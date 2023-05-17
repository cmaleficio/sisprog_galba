import React, { useEffect, useState } from 'react'
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

const Dashboard = () => {
  const [data, setData] = useState([])
  const [error, setError] = useState('')
  const [loaded, setLoaded] = useState(false)
  useEffect(() => {
    const loadAsyncStuff = async () => {
      try {
        const response = await axios.get('http://localhost:3300/gtd')
        setData(response.data)
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
        <CRow>
          <CCol xs>
            <CCard className="mb-4">
              <CCardHeader>Analisis de Datos</CCardHeader>
              <CCardBody>
                <CTable align="middle" className="mb-0 border" hover responsive>
                  <CTableHead color="light">
                    <CTableRow>
                      <CTableHeaderCell>ID Equipo</CTableHeaderCell>
                      <CTableHeaderCell>Valor Recolectado</CTableHeaderCell>
                      <CTableHeaderCell>Time Stamp</CTableHeaderCell>
                    </CTableRow>
                  </CTableHead>
                  <CTableBody>
                    {data.map((item, index) => (
                      <CTableRow v-for="item in tableItems" key={index}>
                        <CTableDataCell>
                          <div>{item.real_tag_id}</div>
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
      )}
    </>
  )
}

export default Dashboard
