import React, { useEffect, useState } from 'react'
import io from 'socket.io-client'
import axios from 'axios'
import {
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
  CContainer,
  CCard,
  CCardBody,
} from '@coreui/react'
import { CChart } from '@coreui/react-chartjs'
import ReactImg from 'src/assets/images/V_2501.PNG'
const socket = io('http://localhost:3300')

const Dashboard = () => {
  const [tk20006Data, settk20006Data] = useState([])
  const [sepV2501Data, setsepV2501Data] = useState([])
  const [mvSepV2501Data, setmvSepV2501Data] = useState([])
  const [error, setError] = useState('')
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get('http://localhost:3300/mvTk20006')
      settk20006Data(response.data)
      setLoaded(true)
    }
    const fetchData2 = async () => {
      const response = await axios.get('http://localhost:3300/mvSepV2501')
      setsepV2501Data(response.data)
      setLoaded(true)
    }
    const fetchData3 = async () => {
      const response = await axios.get('http://localhost:3300/mvSepV2501Graph')
      setmvSepV2501Data(response.data)
      setLoaded(true)
    }

    // call the function
    fetchData()
    fetchData2()
    fetchData3()
      // make sure to catch any error
      .catch(console.error)
  }, [])

  useEffect(() => {
    // Establecer conexión con el socket
    socket.on('connect', () => {
      console.log('Conexión establecida con el servidor de socket')
    })

    socket.on(
      'sisprogdata',
      (...args) => {
        console.log('llego la info')
        settk20006Data(args[0]['sisprogdata'])
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
      {loaded && tk20006Data.length > 0 && (
        <CContainer fluid>
          <CRow>
            <h1>
              <center>Despliegue Resumen Campo Temblador</center>
            </h1>
            <h2>
              <center>Estación de producción Temblador 1 (EPT-1)</center>
            </h2>
            <CCol sm={4}>
              <CCard>
                <CCardHeader>
                  <h3>
                    <center>
                      <a href="http://localhost:3000/#/tk_20006">TK_20006</a>
                    </center>
                  </h3>
                </CCardHeader>
                <CCardImage orientation="top" src={ReactImg} />
                <CCardBody>
                  <CTable aling="middle" color="dark" striped hover responsive>
                    <CTableHead>
                      <CTableRow>
                        <CTableHeaderCell>Nombre Equipo</CTableHeaderCell>
                        <CTableHeaderCell>Valor Recolectado</CTableHeaderCell>
                        {/* <CTableHeaderCell>Unidad de Medida</CTableHeaderCell> */}
                        <CTableHeaderCell>Hora del Dato</CTableHeaderCell>
                      </CTableRow>
                    </CTableHead>
                    <CTableBody>
                      {tk20006Data.map((item, index) => (
                        <>
                          <CTableRow key={index}>
                            <CTableDataCell>{item.disp_nombre.split('.')[2]}</CTableDataCell>
                            <CTableDataCell>{item.nu_valor}</CTableDataCell>
                            <CTableDataCell>
                              {item.fe_valor.split('T')[1].split('.')[0]}
                            </CTableDataCell>
                            {/* hay que hacer un split para mostrar solo la hora */}
                          </CTableRow>
                        </>
                      ))}
                    </CTableBody>
                  </CTable>
                  <CChart
                    type="bar"
                    className="mb-2"
                    style={{ height: '275px' }}
                    data={{
                      labels: ['Nivel de Crudo', 'Nivel de Interfaz'],
                      datasets: [
                        {
                          label: ['Nivel de Crudo'],
                          backgroundColor: ['#631A19', '#240404'],
                          data: tk20006Data.map((value) => value.nu_valor),
                        },
                      ],
                    }}
                    labels="Niveles de Crudo e Interfaz"
                    options={{
                      maintainAspectRatio: true,
                      plugins: {
                        legend: {
                          labels: {},
                        },
                      },
                      scales: {
                        x: {
                          grid: {},
                          ticks: {},
                        },
                        y: {
                          min: 1,
                          max: 36,
                          grid: {},
                          ticks: {},
                        },
                      },
                    }}
                  />
                </CCardBody>
              </CCard>
            </CCol>
            <CCol sm={4}>
              <CCard>
                <CCardHeader>
                  <h2>
                    <center>
                      <a href="http://localhost:3000/#/Dashboard">SEPARADOR V-2501</a>
                    </center>
                  </h2>
                </CCardHeader>
                <CCardImage orientation="top" src={ReactImg} />
                <CCardBody>
                  <CTable aling="middle" color="dark" striped hover responsive>
                    <CTableHead>
                      <CTableRow>
                        <CTableHeaderCell>Nombre Equipo</CTableHeaderCell>
                        <CTableHeaderCell>Valor Recolectado</CTableHeaderCell>
                        {/* <CTableHeaderCell>Unidad de Medida</CTableHeaderCell> */}
                        <CTableHeaderCell>Hora del Dato</CTableHeaderCell>
                      </CTableRow>
                    </CTableHead>
                    <CTableBody>
                      {sepV2501Data.map((item, index) => (
                        <>
                          <CTableRow key={index}>
                            <CTableDataCell>{item.disp_nombre.split('.')[2]}</CTableDataCell>
                            <CTableDataCell>{item.nu_valor}</CTableDataCell>
                            <CTableDataCell>
                              {item.fe_valor.split('T')[1].split('.')[0]}
                            </CTableDataCell>
                            {/* hay que hacer un split para mostrar solo la hora */}
                          </CTableRow>
                        </>
                      ))}
                    </CTableBody>
                  </CTable>
                  <CChart
                    type="bar"
                    className="mb-2"
                    style={{ height: '275px' }}
                    data={{
                      labels: ['LIT-250110', 'LIT-250130'],
                      datasets: [
                        {
                          label: ['Niveles de Entrada y Salida V2501'],
                          backgroundColor: ['#229954', '#310202'],
                          data: mvSepV2501Data.map((value) => value.nu_valor),
                        },
                      ],
                    }}
                    labels="Niveles de Crudo e Interfaz"
                    options={{
                      maintainAspectRatio: true,
                      plugins: {
                        legend: {
                          labels: {},
                        },
                      },
                      scales: {
                        x: {
                          grid: {},
                          ticks: {},
                        },
                        y: {
                          grid: {},
                          ticks: {},
                        },
                      },
                    }}
                  />
                </CCardBody>
              </CCard>
            </CCol>
            <CCol sm={4}>
              <CCard>
                <CCardHeader>
                  <h2>
                    <center>
                      <a href="http://localhost:3000/#/Dashboard">SEPARADOR V-2501</a>
                    </center>
                  </h2>
                </CCardHeader>
                <CCardImage orientation="top" src={ReactImg} />
                <CCardBody>
                  <CTable aling="middle" color="dark" striped hover responsive>
                    <CTableHead>
                      <CTableRow>
                        <CTableHeaderCell>Nombre Equipo</CTableHeaderCell>
                        <CTableHeaderCell>Valor Recolectado</CTableHeaderCell>
                        {/* <CTableHeaderCell>Unidad de Medida</CTableHeaderCell> */}
                        <CTableHeaderCell>Hora del Dato</CTableHeaderCell>
                      </CTableRow>
                    </CTableHead>
                    <CTableBody>
                      {sepV2501Data.map((item, index) => (
                        <>
                          <CTableRow key={index}>
                            <CTableDataCell>{item.disp_nombre.split('.')[2]}</CTableDataCell>
                            <CTableDataCell>{item.nu_valor}</CTableDataCell>
                            <CTableDataCell>
                              {item.fe_valor.split('T')[1].split('.')[0]}
                            </CTableDataCell>
                            {/* hay que hacer un split para mostrar solo la hora */}
                          </CTableRow>
                        </>
                      ))}
                    </CTableBody>
                  </CTable>
                  <CChart
                    type="bar"
                    className="mb-2"
                    style={{ height: '275px' }}
                    data={{
                      labels: ['LIT-250110', 'LIT-250130'],
                      datasets: [
                        {
                          label: ['Niveles de Entrada y Salida V2501'],
                          backgroundColor: ['#229954', '#310202'],
                          data: mvSepV2501Data.map((value) => value.nu_valor),
                        },
                      ],
                    }}
                    labels="Niveles de Crudo e Interfaz"
                    options={{
                      maintainAspectRatio: true,
                      plugins: {
                        legend: {
                          labels: {},
                        },
                      },
                      scales: {
                        x: {
                          grid: {},
                          ticks: {},
                        },
                        y: {
                          grid: {},
                          ticks: {},
                        },
                      },
                    }}
                  />
                </CCardBody>
              </CCard>
            </CCol>
          </CRow>
        </CContainer>
      )}
    </>
  )
}

export default Dashboard
