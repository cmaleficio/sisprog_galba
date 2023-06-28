import React, { useEffect, useState } from 'react'
import io from 'socket.io-client'
import axios from 'axios'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CDropdown,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CCardImage,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
} from '@coreui/react'
import { CWidgetStatsA } from '@coreui/react'
import { CChartLine } from '@coreui/react-chartjs'
import { cilArrowTop, cilOptions } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import ReactImg from 'src/assets/images/V_2501.PNG'
const socket = io('http://localhost:3300')

const Dashboard = () => {
  const [data, setData] = useState([])
  const [error, setError] = useState('')
  const [loaded, setLoaded] = useState(false)
  const [dataH, setDataH] = useState({
    labels: [],
    datasets: [
      {
        label: 'Otra cosa',
        data: [],
        backgroundColor: ['rgba(75,192,192,1)', '#ecf0f1', '#50AF95', '#f3ba2f', '#2a71d0'],
        borderColor: 'black',
        borderWidth: 1,
      },
    ],
  })

  useEffect(() => {
    socket.on('connect', () => {
      console.log('Conexión establecida con el servidor de socket')
    })

    socket.on('data', (...args) => {
      console.log('llego la info')
      setData(args[0]['data'])
    })
    socket.off('data')
    const loadAsyncStuff = async () => {
      try {
        const response = await axios.get('http://localhost:3300/LIT_250130_V2501')
        setData(response.data)
        const response2 = await axios.get('http://localhost:3300/H_LIT_250130_V2501')
        setDataH({
          labels: response2.dataH.map((dataH) => dataH.fe_valor),
          datasets: [
            {
              label: 'TIT_250130',
              data: response2.dataH.map((dataH) => dataH.nu_valor),
              backgroundColor: ['#ecf0f1'],
              borderColor: 'black',
              borderWidth: 1,
            },
          ],
        })
      } catch (error) {
        setError(error)
        console.log(error)
        socket.on('connect_error', (err) => {
          console.log(err)
          console.log('Error de conexión con el servidor de socket:', err)
          setError('Error de conexión con el servidor de socket')
        })
      } finally {
        setLoaded(true)
      }
    }

    loadAsyncStuff()
  })

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
              <CCardHeader>
                <h3>Separador V_2501</h3>
              </CCardHeader>
              <CCardBody>
                <CCardImage orientation="top" src={ReactImg} />
              </CCardBody>
              <CCardBody>
                {dataH.map((item, index) => (
                  <>
                    <CWidgetStatsA
                      key={item.disp_nombre}
                      className="mb-4"
                      color="primary"
                      value={
                        <>
                          {' '}
                          <span className="fs-6 fw-normal">
                            (40.9% <CIcon icon={cilArrowTop} />)
                          </span>
                        </>
                      } // dato tiempo
                      title="{item.disp_nombre}" // nombre tiempo real
                      action={
                        <CDropdown alignment="end">
                          <CDropdownToggle color="transparent" caret={false} className="p-0">
                            <CIcon icon={cilOptions} className="text-high-emphasis-inverse" />
                          </CDropdownToggle>
                          <CDropdownMenu>
                            <CDropdownItem>Action</CDropdownItem>
                            <CDropdownItem>Another action</CDropdownItem>
                            <CDropdownItem>Something else here...</CDropdownItem>
                            <CDropdownItem disabled>Disabled action</CDropdownItem>
                          </CDropdownMenu>
                        </CDropdown>
                      }
                      chart={
                        <CChartLine
                          className="mt-3 mx-3"
                          style={{ height: 'px' }}
                          data={{
                            labels: data.map((data2) => data2.fe_valor), // Fechas historicas
                            datasets: [
                              {
                                label: 'My First dataset',
                                backgroundColor: 'transparent',
                                borderColor: 'rgba(255,255,255,.55)',
                                pointBackgroundColor: '#321fdb',
                                data: data.map((data2) => data2.nu_valor), // datos Historicos
                              },
                            ],
                          }}
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
                                min: 15,
                                max: 100,
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
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      )}
    </>
  )
}

export default Dashboard
