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
import ReactImg from 'src/assets/images/V_2501.PNG'
const socket = io('http://localhost:3300')

const Dashboard = () => {
  //Entrada de liquido
  const [data, setData] = useState([])
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
  //Salida control de crudo
  const [scc, setScc] = useState([])
  const [scc2, setScc2] = useState({
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
  const [scc3, setScc3] = useState([])
  const [scc4, setScc4] = useState({
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
  const [scc5, setScc5] = useState([])
  const [scc6, setScc6] = useState({
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
  //Salida control de crudo
  const [scp, setScp] = useState([])
  const [scp2, setScp2] = useState({
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
  const [scp3, setScp3] = useState([])
  const [scp4, setScp4] = useState({
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
  const [scp5, setScp5] = useState([])
  const [scp6, setScp6] = useState({
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
  //Flujo de crudo
  const [fdc, setFdc] = useState([])
  const [fdc2, setFdc2] = useState({
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
  const [fdc3, setFdc3] = useState([])
  const [fdc4, setFdc4] = useState({
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
  const [fdc5, setFdc5] = useState([])
  const [fdc6, setFdc6] = useState({
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
  //Flujo de Agua
  const [fda, setFda] = useState([])
  const [fda2, setFda2] = useState({
    labels: [],
    datasets: [
      {
        label: '',
        data: [],
        backgroundColor: ['rgba(75,192,192,1)', '#ecf0f1', '#50AF95', '#f3ba2f', '#2a71d0'],
        borderColor: 'black',
        borderWidth: 1,
      },
    ],
  })
  const [fda3, setFda3] = useState([])
  const [fda4, setFda4] = useState({
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
  const [fda5, setFda5] = useState([])
  const [fda6, setFda6] = useState({
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
        const response = await axios.get('http://localhost:3300/lit250130_rt')
        setData(response.data)
        const response2 = await axios.get('http://localhost:3300/lit250130_ht')
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
        const response3 = await axios.get('http://localhost:3300/lic250130_sp_rt')
        setData3(response3.data)
        const response4 = await axios.get('http://localhost:3300/lic250130_sp_ht')
        setData4({
          labels: response4.data.map((chart) => chart.fe_valor),
          datasets: [
            {
              label: 'Pulg',
              data: response4.data.map((chart) => chart.nu_valor),
              backgroundColor: ['#ecf0f1'],
              borderColor: 'black',
              borderWidth: 2,
            },
          ],
        })
        const response5 = await axios.get('http://localhost:3300/lic250130_so_rt')
        setData5(response5.data)
        const response6 = await axios.get('http://localhost:3300/lic250130_so_ht')
        setData6({
          labels: response6.data.map((chart) => chart.fe_valor),
          datasets: [
            {
              label: '% de Apertura',
              data: response6.data.map((chart) => chart.nu_valor),
              backgroundColor: ['#ecf0f1'],
              borderColor: 'black',
              borderWidth: 2,
            },
          ],
        })
        //Salida Control de crudo
        const response7 = await axios.get('http://localhost:3300/lit250110_rt')
        setScc(response7.data)
        const response8 = await axios.get('http://localhost:3300/lit250110_ht')
        setScc2({
          labels: response8.data.map((chart) => chart.fe_valor),
          datasets: [
            {
              label: 'Pulg',
              data: response8.data.map((chart) => chart.nu_valor),
              backgroundColor: ['#ecf0f1'],
              borderColor: 'black',
              borderWidth: 2,
            },
          ],
        })
        const response9 = await axios.get('http://localhost:3300/lic250110_sp_rt')
        setScc3(response9.data)
        const response10 = await axios.get('http://localhost:3300/lic250110_sp_ht')
        setScc4({
          labels: response10.data.map((chart) => chart.fe_valor),
          datasets: [
            {
              label: 'Pulg',
              data: response10.data.map((chart) => chart.nu_valor),
              backgroundColor: ['#ecf0f1'],
              borderColor: 'black',
              borderWidth: 2,
            },
          ],
        })
        const response11 = await axios.get('http://localhost:3300/lic250110_so_rt')
        setScc5(response11.data)
        const response12 = await axios.get('http://localhost:3300/lic250110_so_ht')
        setScc6({
          labels: response12.data.map((chart) => chart.fe_valor),
          datasets: [
            {
              label: '% Apertura',
              data: response12.data.map((chart) => chart.nu_valor),
              backgroundColor: ['#ecf0f1'],
              borderColor: 'black',
              borderWidth: 2,
            },
          ],
        })
        //Salida Control de presion
        const response13 = await axios.get('http://localhost:3300/pit250120_rt')
        setScp(response13.data)
        const response14 = await axios.get('http://localhost:3300/pit250120_ht')
        setScp2({
          labels: response14.data.map((chart) => chart.fe_valor),
          datasets: [
            {
              label: 'PSI',
              data: response14.data.map((chart) => chart.nu_valor),
              backgroundColor: ['#ecf0f1'],
              borderColor: 'black',
              borderWidth: 2,
            },
          ],
        })
        const response15 = await axios.get('http://localhost:3300/pit250120_sp_rt')
        setScp3(response15.data)
        const response16 = await axios.get('http://localhost:3300/pit250120_sp_ht')
        setScp4({
          labels: response16.data.map((chart) => chart.fe_valor),
          datasets: [
            {
              label: 'PSI',
              data: response16.data.map((chart) => chart.nu_valor),
              backgroundColor: ['#ecf0f1'],
              borderColor: 'black',
              borderWidth: 2,
            },
          ],
        })
        const response17 = await axios.get('http://localhost:3300/pit250120_so_rt')
        setScp5(response17.data)
        const response18 = await axios.get('http://localhost:3300/pit250120_so_ht')
        setScp6({
          labels: response18.data.map((chart) => chart.fe_valor),
          datasets: [
            {
              label: '% Apertura',
              data: response18.data.map((chart) => chart.nu_valor),
              backgroundColor: ['#ecf0f1'],
              borderColor: 'black',
              borderWidth: 2,
            },
          ],
        })
        //Flujo de Crudo
        const response19 = await axios.get('http://localhost:3300/fit250110_rt')
        setFdc(response19.data)
        const response20 = await axios.get('http://localhost:3300/fit250110_ht')
        setFdc2({
          labels: response20.data.map((chart) => chart.fe_valor),
          datasets: [
            {
              label: 'BOPD',
              data: response20.data.map((chart) => chart.nu_valor),
              backgroundColor: ['#ecf0f1'],
              borderColor: 'black',
              borderWidth: 2,
            },
          ],
        })
        const response21 = await axios.get('http://localhost:3300/fit250110_p_rt')
        setFdc3(response21.data)
        const response22 = await axios.get('http://localhost:3300/fit250110_p_ht')
        setFdc4({
          labels: response22.data.map((chart) => chart.fe_valor),
          datasets: [
            {
              label: 'BOPD',
              data: response22.data.map((chart) => chart.nu_valor),
              backgroundColor: ['#ecf0f1'],
              borderColor: 'black',
              borderWidth: 2,
            },
          ],
        })
        const response23 = await axios.get('http://localhost:3300/fit250110_a_rt')
        setFdc5(response23.data)
        const response24 = await axios.get('http://localhost:3300/fit250110_a_ht')
        setFdc6({
          labels: response24.data.map((chart) => chart.fe_valor),
          datasets: [
            {
              label: 'BOPD',
              data: response24.data.map((chart) => chart.nu_valor),
              backgroundColor: ['#ecf0f1'],
              borderColor: 'black',
              borderWidth: 2,
            },
          ],
        })
        //Flujo de Crudo
        const response25 = await axios.get('http://localhost:3300/fit250130_rt')
        setFda(response25.data)
        const response26 = await axios.get('http://localhost:3300/fit250130_ht')
        setFda2({
          labels: response26.data.map((chart) => chart.fe_valor),
          datasets: [
            {
              label: 'BOPD',
              data: response26.data.map((chart) => chart.nu_valor),
              backgroundColor: ['#ecf0f1'],
              borderColor: 'black',
              borderWidth: 2,
            },
          ],
        })
        const response27 = await axios.get('http://localhost:3300/fit250130_p_rt')
        setFda3(response27.data)
        const response28 = await axios.get('http://localhost:3300/fit250130_p_ht')
        setFda4({
          labels: response28.data.map((chart) => chart.fe_valor),
          datasets: [
            {
              label: 'BOPD',
              data: response28.data.map((chart) => chart.nu_valor),
              backgroundColor: ['#ecf0f1'],
              borderColor: 'black',
              borderWidth: 2,
            },
          ],
        })
        const response29 = await axios.get('http://localhost:3300/fit250130_a_rt')
        setFda5(response29.data)
        const response30 = await axios.get('http://localhost:3300/fit250130_a_ht')
        setFda6({
          labels: response30.data.map((chart) => chart.fe_valor),
          datasets: [
            {
              label: 'BOPD',
              data: response30.data.map((chart) => chart.nu_valor),
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
  }, [])

  return (
    <>
      {!loaded && 'Cargando'}
      {loaded && error && 'Hubo un error'}
      {loaded && data.length > 0 && (
        <CRow>
          <CCol>
            <CCard>
              <h2>Separador V-2501</h2>
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
                        title="LIT_250130" //{item.disp_nombre}
                        chart={
                          <CChartLine
                            key={index}
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
                                  min: 83,
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
                <CCol sm={4}>
                  {data3.map((item, index) => (
                    <>
                      <CWidgetStatsA
                        className="mb-4"
                        color="primary"
                        value={<>{item.nu_valor} SetPoint</>}
                        title="LIC-250130"
                        chart={
                          <CChartLine
                            className="mt-3 mx-3"
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
                                  min: 83,
                                  max: 90,
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
                        value={<>{item.nu_valor} % </>}
                        title="LIC-250130"
                        chart={
                          <CChartLine
                            className="mt-3 mx-3"
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
                                  min: 55,
                                  max: 70,
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
              <CRow>
                <h3>Salida Control de Crudo</h3>
                <CCol sm={4}>
                  {scc.map((item, index) => (
                    <>
                      <CWidgetStatsA
                        className="mb-4"
                        color="secondary"
                        value={<>{item.nu_valor} Pulg</>}
                        title="LIT_250110" //{item.disp_nombre}
                        chart={
                          <CChartLine
                            key={index}
                            className="mt-3 mx-3"
                            style={{ height: '70px' }}
                            data={scc2}
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
                  {scc3.map((item, index) => (
                    <>
                      <CWidgetStatsA
                        className="mb-4"
                        color="secondary"
                        value={<>{item.nu_valor} SetPoint</>}
                        title="LIC-250110"
                        chart={
                          <CChartLine
                            className="mt-3 mx-3"
                            style={{ height: '70px' }}
                            data={scc4}
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
                  {scc5.map((item, index) => (
                    <>
                      <CWidgetStatsA
                        className="mb-4"
                        color="secondary"
                        value={<>{item.nu_valor} %</>}
                        title="LIC-250130"
                        chart={
                          <CChartLine
                            className="mt-3 mx-3"
                            style={{ height: '70px' }}
                            data={scc6}
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
            <CCard>
              <CRow>
                <h3>Salida Control de Presión</h3>
                <CCol sm={4}>
                  {scp.map((item, index) => (
                    <>
                      <CWidgetStatsA
                        className="mb-4"
                        color="warning"
                        value={<>{item.nu_valor} Pulg</>}
                        title="LIT_250110" //{item.disp_nombre}
                        chart={
                          <CChartLine
                            key={index}
                            className="mt-3 mx-3"
                            style={{ height: '70px' }}
                            data={scp2}
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
                  {scp3.map((item, index) => (
                    <>
                      <CWidgetStatsA
                        className="mb-4"
                        color="warning"
                        value={<>{item.nu_valor} Pulg</>}
                        title="LIT_250110" //{item.disp_nombre}
                        chart={
                          <CChartLine
                            className="mt-3 mx-3"
                            style={{ height: '70px' }}
                            data={scp4}
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
                  {scp5.map((item, index) => (
                    <>
                      <CWidgetStatsA
                        className="mb-4"
                        color="warning"
                        value={<>{item.nu_valor} %</>}
                        title="LIT_250110" //{item.disp_nombre}
                        chart={
                          <CChartLine
                            className="mt-3 mx-3"
                            style={{ height: '70px' }}
                            data={scp6}
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
            <CCard>
              <CRow>
                <h3>Flujo de crudo</h3>
                <CCol sm={4}>
                  {fdc.map((item, index) => (
                    <>
                      <CWidgetStatsA
                        className="mb-4"
                        color="success"
                        value={<>{item.nu_valor} BOPD</>}
                        title="FIT_250110 - Dato Instantaneo" //{item.disp_nombre}
                        chart={
                          <CChartLine
                            key={index}
                            className="mt-3 mx-3"
                            style={{ height: '70px' }}
                            data={fdc2}
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
                  {fdc3.map((item, index) => (
                    <>
                      <CWidgetStatsA
                        className="mb-4"
                        color="success"
                        value={<>{item.nu_valor} BOPD </>}
                        title="Prom. Hora en Curso" //{item.disp_nombre}
                        chart={
                          <CChartLine
                            className="mt-3 mx-3"
                            style={{ height: '70px' }}
                            data={fdc4}
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
                  {fdc5.map((item, index) => (
                    <>
                      <CWidgetStatsA
                        className="mb-4"
                        color="success"
                        value={<>{item.nu_valor} BOPD</>}
                        title="Prom. Hora Anterior" //{item.disp_nombre}
                        chart={
                          <CChartLine
                            className="mt-3 mx-3"
                            style={{ height: '70px' }}
                            data={fdc6}
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
            <CCard>
              <CRow>
                <h3>Flujo de Agua</h3>
                <CCol sm={4}>
                  {fda.map((item, index) => (
                    <>
                      <CWidgetStatsA
                        className="mb-4"
                        color="dark"
                        value={<>{item.nu_valor} BaPD</>}
                        title="FIT_250130 - Dato Instantaneo" //{item.disp_nombre}
                        chart={
                          <CChartLine
                            key={index}
                            className="mt-3 mx-3"
                            style={{ height: '70px' }}
                            data={fda2}
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
                  {fda3.map((item, index) => (
                    <>
                      <CWidgetStatsA
                        className="mb-4"
                        color="dark"
                        value={<>{item.nu_valor} BaPD </>}
                        title="Prom. Hora en Curso" //{item.disp_nombre}
                        chart={
                          <CChartLine
                            className="mt-3 mx-3"
                            style={{ height: '70px' }}
                            data={fda4}
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
                  {fda5.map((item, index) => (
                    <>
                      <CWidgetStatsA
                        className="mb-4"
                        color="dark"
                        value={<>{item.nu_valor} BaPD</>}
                        title="Prom. Hora Anterior" //{item.disp_nombre}
                        chart={
                          <CChartLine
                            className="mt-3 mx-3"
                            style={{ height: '70px' }}
                            data={fda6}
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
            {/* <CCard>
              <CCardHeader>
                <h3>Separador V_2501</h3>
              </CCardHeader>
              <CCardBody>
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
            </CCard> */}
          </CCol>
        </CRow>
      )}
    </>
  )
}

export default Dashboard
