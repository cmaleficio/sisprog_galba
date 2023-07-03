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
  CWidgetStatsA,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilArrowTop } from '@coreui/icons'
import { CChartLine } from '@coreui/react-chartjs'
import ReactImg from 'src/assets/images/V_2501.PNG'
const socket = io('http://localhost:3300')

const Dashboard = () => {
  const [data, setData] = useState([])
  const [error, setError] = useState('')
  const [loaded, setLoaded] = useState(false)
  const [data2, setData2] = useState({
    labels: [],
    datasets: [
      {
        label: 'LIT_250130',
        data: [],
        backgroundColor: ['rgba(75,192,192,1)', '#ecf0f1', '#50AF95', '#f3ba2f', '#2a71d0'],
        borderColor: 'black',
        borderWidth: 1,
      },
    ],
  })

  useEffect(() => {
    const loadAsyncStuff = async () => {
      try {
        const response = await axios.get('http://localhost:3300/lit250130_rt')
        setData(response.data)
        const response2 = await axios.get('http://localhost:3300/lit250130_ht')
        setData2({
          labels: response2.data.map((chart) => chart.fe_valor),
          datasets: [
            {
              label: 'LIT_250130',
              data: response2.data.map((chart) => chart.nu_valor),
              backgroundColor: ['#ecf0f1'],
              borderColor: 'black',
              borderWidth: 2,
            },
          ],
        })
      } catch (error) {
        setError(error)
        console.log(error)
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
              <h2>Charts</h2>
              <CRow>
                <CCol sm={6}>
                  {data.map((item, index) => (
                    <>
                      <CWidgetStatsA
                        className="mb-4"
                        color="primary"
                        value={<>{item.nu_valor} Pulg</>}
                        title="LIT_250130" //{item.disp_nombre}
                        chart={
                          <CChartLine
                            className="mt-3 mx-3"
                            style={{ height: '70px' }}
                            data={data2}
                            options={{
                              plugins: {
                                legend: {
                                  display: false,
                                },
                              },
                              maintainAspectRatio: false,
                              scales: {
                                x: {
                                  grid: {
                                    display: false,
                                    drawBorder: false,
                                  },
                                  ticks: {
                                    display: false,
                                  },
                                },
                                y: {
                                  min: 85,
                                  max: 93,
                                  display: false,
                                  grid: {
                                    display: false,
                                  },
                                  ticks: {
                                    display: false,
                                  },
                                },
                              },
                              elements: {
                                line: {
                                  borderWidth: 1,
                                  tension: 0.4,
                                },
                                point: {
                                  radius: 4,
                                  hitRadius: 10,
                                  hoverRadius: 4,
                                },
                              },
                            }}
                          />
                        }
                      />
                    </>
                  ))}
                </CCol>
                <CCol sm={6}>
                  {data.map((item, index) => (
                    <>
                      <CWidgetStatsA
                        className="mb-4"
                        color="primary"
                        value={<>{item.nu_valor} Pulg</>}
                        title={item.disp_nombre}
                        chart={
                          <CChartLine
                            className="mt-3 mx-3"
                            style={{ height: '70px' }}
                            data={data2}
                            options={{
                              plugins: {
                                legend: {
                                  display: false,
                                },
                              },
                              maintainAspectRatio: false,
                              scales: {
                                x: {
                                  grid: {
                                    display: false,
                                    drawBorder: false,
                                  },
                                  ticks: {
                                    display: false,
                                  },
                                },
                                y: {
                                  min: 85,
                                  max: 93,
                                  display: false,
                                  grid: {
                                    display: false,
                                  },
                                  ticks: {
                                    display: false,
                                  },
                                },
                              },
                              elements: {
                                line: {
                                  borderWidth: 1,
                                  tension: 0.4,
                                },
                                point: {
                                  radius: 4,
                                  hitRadius: 10,
                                  hoverRadius: 4,
                                },
                              },
                            }}
                          />
                        }
                      />
                    </>
                  ))}
                </CCol>
              </CRow>
            </CCard>
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
