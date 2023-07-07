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
import { CChartLine } from '@coreui/react-chartjs'
import ReactImg from 'src/assets/images/TK20006_1.PNG'
const socket = io('http://localhost:3300')

const Dashboard = () => {
  const [data, setData] = useState([])
  const [data2, setData2] = useState({
    labels: [],
    datasets: [
      {
        label: [],
        data: [],
        backgroundColor: ['rgba(75,192,192,1)', '#ecf0f1', '#50AF95', '#f3ba2f', '#2a71d0'],
        borderColor: 'black',
        borderWidth: 1,
      },
    ],
  })
  const [data3, setData3] = useState([])
  const [data4, setData4] = useState({
    labels: [],
    datasets: [
      {
        label: [],
        data: [],
        backgroundColor: ['rgba(75,192,192,1)', '#ecf0f1', '#50AF95', '#f3ba2f', '#2a71d0'],
        borderColor: 'black',
        borderWidth: 1,
      },
    ],
  })
  const [data5, setData5] = useState([])
  const [data6, setData6] = useState({
    labels: [],
    datasets: [
      {
        label: [],
        data: [],
        backgroundColor: ['rgba(75,192,192,1)', '#ecf0f1', '#50AF95', '#f3ba2f', '#2a71d0'],
        borderColor: 'black',
        borderWidth: 1,
      },
    ],
  })
  const [tmp, setTmp] = useState([])
  const [tmp2, setTmp2] = useState({
    labels: [],
    datasets: [
      {
        label: [],
        data: [],
        backgroundColor: ['rgba(75,192,192,1)', '#ecf0f1', '#50AF95', '#f3ba2f', '#2a71d0'],
        borderColor: 'black',
        borderWidth: 1,
      },
    ],
  })
  const [tmp3, setTmp3] = useState([])
  const [tmp4, setTmp4] = useState({
    labels: [],
    datasets: [
      {
        label: [],
        data: [],
        backgroundColor: ['rgba(75,192,192,1)', '#ecf0f1', '#50AF95', '#f3ba2f', '#2a71d0'],
        borderColor: 'black',
        borderWidth: 1,
      },
    ],
  })
  const [tmp5, setTmp5] = useState([])
  const [tmp6, setTmp6] = useState({
    labels: [],
    datasets: [
      {
        label: [],
        data: [],
        backgroundColor: ['rgba(75,192,192,1)', '#ecf0f1', '#50AF95', '#f3ba2f', '#2a71d0'],
        borderColor: 'black',
        borderWidth: 1,
      },
    ],
  })

  const [error, setError] = useState('')
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    //Entrada de liquido
    const loadAsyncStuff = async () => {
      try {
        const response = await axios.get('http://localhost:3300/lit20006_rt')
        setData(response.data)
        const response2 = await axios.get('http://localhost:3300/lit20006_ht')
        setData2({
          labels: response2.data.map((chart) => chart.fe_valor),
          datasets: [
            {
              label: 'Pulgadas',
              data: response2.data.map((chart) => chart.nu_valor),
              backgroundColor: ['#ecf0f1'],
              borderColor: 'black',
              borderWidth: 2,
            },
          ],
        })
        const response3 = await axios.get('http://localhost:3300/lit20006A_rt')
        setData3(response3.data)
        const response4 = await axios.get('http://localhost:3300/lit20006A_ht')
        setData4({
          labels: response4.data.map((chart) => chart.fe_valor),
          datasets: [
            {
              label: 'Pulgadas',
              data: response4.data.map((chart) => chart.nu_valor),
              backgroundColor: ['#ecf0f1'],
              borderColor: 'black',
              borderWidth: 2,
            },
          ],
        })
        const response5 = await axios.get('http://localhost:3300/tit20001_rt')
        setData5(response5.data)
        const response6 = await axios.get('http://localhost:3300/tit20001_ht')
        setData6({
          labels: response6.data.map((chart) => chart.fe_valor),
          datasets: [
            {
              label: 'Pulgadas',
              data: response6.data.map((chart) => chart.nu_valor),
              backgroundColor: ['#ecf0f1'],
              borderColor: 'black',
              borderWidth: 2,
            },
          ],
        })
        const restmp = await axios.get('http://localhost:3300/tit20001_rt')
        setTmp(restmp.data)
        const restmp2 = await axios.get('http://localhost:3300/tit20001_ht')
        setTmp2({
          labels: restmp2.data.map((chart) => chart.fe_valor),
          datasets: [
            {
              label: 'Pulgadas',
              data: restmp2.data.map((chart) => chart.nu_valor),
              backgroundColor: ['#ecf0f1'],
              borderColor: 'black',
              borderWidth: 2,
            },
          ],
        })
        const restmp3 = await axios.get('http://localhost:3300/tit20002_rt')
        setTmp3(restmp3.data)
        const restmp4 = await axios.get('http://localhost:3300/tit20002_ht')
        setTmp4({
          labels: restmp4.data.map((chart) => chart.fe_valor),
          datasets: [
            {
              label: 'Pulgadas',
              data: restmp4.data.map((chart) => chart.nu_valor),
              backgroundColor: ['#ecf0f1'],
              borderColor: 'black',
              borderWidth: 2,
            },
          ],
        })
        const restmp5 = await axios.get('http://localhost:3300/tit20003_rt')
        setTmp5(restmp5.data)
        const restmp6 = await axios.get('http://localhost:3300/tit20003_ht')
        setTmp6({
          labels: restmp6.data.map((chart) => chart.fe_valor),
          datasets: [
            {
              label: 'Pulgadas',
              data: response6.data.map((chart) => chart.nu_valor),
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
  }, [data])

  return (
    <>
      {!loaded && 'Cargando'}
      {loaded && error && 'Hubo un error'}
      {loaded && data.length > 0 && (
        <CRow>
          <CCol>
            <CCard>
              <h2>Tanque 20006</h2>
              <CCardImage orientation="top" src={ReactImg} />
              <CRow>
                <h3>Entrada de Liquido</h3>
                <CCol sm={4}>
                  {data.map((item, index) => (
                    <>
                      <CWidgetStatsA
                        className="mb-4"
                        color="primary"
                        value={<>{item.nu_valor} Pulg</>}
                        title="LIT_20006" //{item.disp_nombre}
                        chart={
                          <CChartLine
                            key={index}
                            className="mt-4 mx-2"
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
                <CCol sm={4}>
                  {data3.map((item, index) => (
                    <>
                      <CWidgetStatsA
                        className="mb-4"
                        color="primary"
                        value={<>{item.nu_valor} Pulg</>}
                        title="LIT_20006A" //{item.disp_nombre}
                        chart={
                          <CChartLine
                            key={index}
                            className="mt-4 mx-2"
                            style={{ height: '70px' }}
                            data={data4}
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
                <CCol sm={4}>
                  {data5.map((item, index) => (
                    <>
                      <CWidgetStatsA
                        className="mb-4"
                        color="primary"
                        value={<>{item.nu_valor} °F</>}
                        title="TIT_20006" //{item.disp_nombre}
                        chart={
                          <CChartLine
                            key={index}
                            className="mt-4 mx-2"
                            style={{ height: '70px' }}
                            data={data6}
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
              <CRow>
                <h3>Temperaturas</h3>
                <CCol sm={4}>
                  {tmp.map((item, index) => (
                    <>
                      <CWidgetStatsA
                        className="mb-4"
                        color="danger"
                        value={<>{item.nu_valor}°F</>}
                        title="TIT_20001" //{item.disp_nombre}
                        chart={
                          <CChartLine
                            key={index}
                            className="mt-4 mx-2"
                            style={{ height: '70px' }}
                            data={tmp2}
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
                <CCol sm={4}>
                  {tmp3.map((item, index) => (
                    <>
                      <CWidgetStatsA
                        className="mb-4"
                        color="danger"
                        value={<>{item.nu_valor} °F</>}
                        title="TIT_20002" //{item.disp_nombre}
                        chart={
                          <CChartLine
                            key={index}
                            className="mt-4 mx-2"
                            style={{ height: '70px' }}
                            data={tmp4}
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
                <CCol sm={4}>
                  {tmp5.map((item, index) => (
                    <>
                      <CWidgetStatsA
                        className="mb-4"
                        color="danger"
                        value={<>{item.nu_valor} °F</>}
                        title="TIT_20003" //{item.disp_nombre}
                        chart={
                          <CChartLine
                            key={index}
                            className="mt-4 mx-2"
                            style={{ height: '70px' }}
                            data={tmp6}
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
          </CCol>
        </CRow>
      )}
    </>
  )
}

export default Dashboard
