import React, { useEffect, useState } from 'react'
import io from 'socket.io-client'
import axios from 'axios'
import { CCard, CCol, CRow, CCardImage, CWidgetStatsA } from '@coreui/react'
import { CChartLine } from '@coreui/react-chartjs'
import ReactImg from 'src/assets/images/V_2501_1.PNG'
const socket = io('http://10.168.161.40:3300')

//

const Dashboard = () => {
  const [error, setError] = useState('')
  const [loaded, setLoaded] = useState(false)

  const [sisprogData, setSisprogData] = useState([])

  useEffect(() => {
    // Establecer conexión con el socket
    socket.on('connect', () => {
      console.log('Conexión establecida con el servidor de socket')
    })

    socket.on(
      'sisprogdata',
      (...args) => {
        console.log('llego la info sisprogdata', args[0]['data'])
        setSisprogData(args[0]['data'])
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

  // TODO: necesitas escuchar un evento de socket que cuando la tabla cambien te envie la data de sisprogData y la actualizas

  useEffect(() => {
    // declare the data fetching function
    const fetchData = async () => {
      const response = await axios.get('http://10.168.161.40:3300/V2501')
      setSisprogData(response.data)
      setLoaded(true)
    }

    // call the function
    fetchData()
      // make sure to catch any error
      .catch(console.error)
  }, [])

  useEffect(() => {
    setLoaded(true)
  }, [])

  return (
    <>
      {!loaded && 'Cargando'}
      {loaded && error && 'Hubo un error'}
      {loaded && sisprogData.length > 0 && (
        <CRow>
          <CCol>
            <CCard>
              <h2>Separador V-2501</h2>
              <CCardImage orientation="top" src={ReactImg} />
            </CCard>
            {sisprogData?.map((progData, indexP) => (
              <CCard key={indexP}>
                <CRow>
                  <h3>{progData?.title}</h3>
                  {progData?.points?.map((point, index) => (
                    <CCol sm={4} key={index}>
                      <>
                        <CWidgetStatsA
                          className="mb-4"
                          color={progData.color}
                          value={<>{point?.realtimeData[0].title}</>}
                          title={point.realtimeData[0].disp_nombre?.split('.')[2]} //{item.disp_nombre}
                          chart={
                            <CChartLine
                              key={index}
                              className="mt-3 mx-3"
                              style={{ height: '70px' }}
                              data={point?.graphData}
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
                    </CCol>
                  ))}
                </CRow>
              </CCard>
            ))}
          </CCol>
        </CRow>
      )}
    </>
  )
}

export default Dashboard
