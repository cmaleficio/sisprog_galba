import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {
  CAvatar,
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
import CIcon from '@coreui/icons-react'
import { cibCcMastercard, cifUs, cilPeople } from '@coreui/icons'
/* import {io} from 'socket.io-client';

const socket = io ('http://localhost:3001')
socket.on("connect",() => {
    displayMessage(`Estas conectado with id: ${socket.id}`)
}) */

import avatar1 from 'src/assets/images/avatars/1.jpg'

const realtimeDash = () => {
  const tableExample = [
    {
      avatar: { src: avatar1, status: 'success' },
      user: {
        name: 'Yiorgos Avraamu',
        new: true,
        registered: 'Jan 1, 2021',
      },
      country: { name: 'USA', flag: cifUs },
      usage: {
        value: 50,
        period: 'Jun 11, 2021 - Jul 10, 2021',
        color: 'success',
      },
      payment: { name: 'Mastercard', icon: cibCcMastercard },
      activity: '10 sec ago',
    },
  ]

  const [realTimeData, setData] = useState([])
  const [error, setError] = useState('')
  const [loaded, setLoaded] = useState(false)
  useEffect(() => {
    const loadAsyncStuff = async () => {
      try {
        const response = await axios.get('http://localhost:3300/results')
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
        <CCol>
          <CCard className="mb-4">
            <CCardHeader>Real Time Data</CCardHeader>
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
                  {realTimeData.map((item, index) => (
                    <CTableRow v-for="item in tableItems" key={index}>
                      <CTableDataCell>
                        <div>{item.catalogo_tag_id}</div>
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

export default realtimeDash
