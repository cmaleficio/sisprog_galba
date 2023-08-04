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
import ReactImg2 from 'src/assets/images/CALENTADOR_TY23_1.png'
import ReactImg3 from 'src/assets/images/TK512_1.png'
import ReactImg4 from 'src/assets/images/TK20006_1.PNG'
import ReactImg5 from 'src/assets/images/Alarmas_1.PNG'
const URL = 'localhost:3300' // o usar Ip local: 10.168.161.47:3300
const socket = io(`http://${URL}`)

const Dashboard = () => {
  const [tableData, settableData] = useState([])
  const [loaded, setLoaded] = useState(false)
  const [error, setError] = useState([])

  useEffect(() => {
    // Establecer conexión con el socket
    socket.on('connect', () => {
      console.log('Conexión establecida con el servidor de socket')
    })

    socket.on(
      'sisprogdata',
      (...args) => {
        console.log('llego la info')
        settableData(args[0]['data'])
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
    const fetchData = async () => {
      const response = await axios.get(`http://${URL}/tables`)
      settableData(response.data)
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
      {loaded && console.log(error) && 'Hubo un error'}
      {loaded && tableData.length > 0 && (
        <CContainer>
          <CRow>
            <h1>
              <center>Despliegue Resumen Campo Temblador</center>
            </h1>
            <h2>
              <center>Estación de producción Temblador 1 (EPT-1)</center>
            </h2>
            <CCol sm={4}>
              {tableData.map((progData, indext) => (
                <CCard key={indext}>
                  <CCardHeader>
                    <h3>
                      <center>
                        <a href="http://localhost:3000/#/tk_20006">{progData[indext].title}</a>
                      </center>
                    </h3>
                  </CCardHeader>
                  <CCardImage orientation="top" src={ReactImg4} />
                  <CCardBody>
                    {tableData?.data?.tableData.map((values, index) => (
                      <>
                        <CTable aling="middle" color="dark" striped hover responsive>
                          <CTableHead>
                            <CTableRow>
                              <CTableHeaderCell>Tabla</CTableHeaderCell>
                              <CTableHeaderCell>Nombre Equipo</CTableHeaderCell>
                              <CTableHeaderCell>Valor Recolectado</CTableHeaderCell>
                              {/* <CTableHeaderCell>Unidad de Medida</CTableHeaderCell> */}
                              <CTableHeaderCell>Hora del Dato</CTableHeaderCell>
                            </CTableRow>
                          </CTableHead>
                          <CTableBody>
                            <>
                              <CTableRow key={index}>
                                <CTableDataCell>{values.title}</CTableDataCell>
                                <CTableDataCell>{values.disp_nombre.split('.')[2]}</CTableDataCell>
                                <CTableDataCell>
                                  {values.nu_valor}
                                  {values.unidad}
                                </CTableDataCell>
                                <CTableDataCell>
                                  {values.fe_valor.split('T')[1].split('.')[0]}
                                </CTableDataCell>
                                {/* hay que hacer un split para mostrar solo la hora */}
                              </CTableRow>
                            </>
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
                                data: tableData.map((value) => value.nu_valor),
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
                      </>
                    ))}
                  </CCardBody>
                </CCard>
              ))}
            </CCol>
          </CRow>
        </CContainer>
      )}
    </>
  )
}

export default Dashboard
