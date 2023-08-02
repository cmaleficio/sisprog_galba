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
const socket = io('http://10.168.161.40:3300')

const Dashboard = () => {
  const [tk20006Data, settk20006Data] = useState([])
  const [sepV2501Data, setsepV2501Data] = useState([])
  const [mvSepV2501Data, setmvSepV2501Data] = useState([])
  const [mvTk501Data, setmvTk501Data] = useState([])
  const [mvEx002, setmvEx002Data] = useState([])
  const [mvTqybmbData, setTqybmbData] = useState([])
  const [control, setControlData] = useState([])
  const [error, setError] = useState('')
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responses = await Promise.all([
          axios.get('http://10.168.161.40:3300/mvTk20006'),
          axios.get('http://10.168.161.40:3300/mvSepV2501'),
          axios.get('http://10.168.161.40:3300/mvSepV2501Graph'),
          axios.get('http://10.168.161.40:3300/mvTk501'),
          axios.get('http://10.168.161.40:3300/ex002'),
          axios.get('http://10.168.161.40:3300/tqybmb'),
        ])
        settk20006Data(responses[0].data)
        setsepV2501Data(responses[1].data)
        setmvSepV2501Data(responses[2].data)
        setmvTk501Data(responses[3].data)
        setmvEx002Data(responses[4].data)
        setTqybmbData(responses[5].data)
        setLoaded(true)
      } catch (error) {
        setError(error.message)
      }
    }
    const fetchData2 = async () => {
      const response = await axios.get('http://10.168.161.40:3300/mvTk20006')
      setControlData(response.data)
    }

    fetchData()
    fetchData2()
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
        fetchData(args[0]['sisprogdata'])
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
      {loaded && control.length > 0 && (
        <CContainer>
          <CRow>
            <h1>
              <center>Despliegue Resumen Campo Temblador</center>
            </h1>
            <h2>
              <center>Estación de producción Temblador 1 (EPT-1)</center>
            </h2>
            <CCol>
              <CCard>
                <CCardHeader>
                  <h3>
                    <center>
                      <a href="http://localhost:3000/#/tk_20006">TK_20006</a>
                    </center>
                  </h3>
                </CCardHeader>
                <CCardImage orientation="top" src={ReactImg4} />
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
            <CCol>
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
                          min: 0,
                          max: 90,
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
          <CRow>
            <CCol>
              <CCard>
                <CCardHeader>
                  <h2>
                    <center>
                      <a href="http://localhost:3000/#/TK501">TK 501/2</a>
                    </center>
                  </h2>
                </CCardHeader>
                <CCardImage orientation="top" src={ReactImg3} />
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
                      {mvTk501Data.map((item, index) => (
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
                      labels: ['LIT-501'],
                      datasets: [
                        {
                          label: ['Nivel de tanque'],
                          backgroundColor: ['#229954', '#310202'],
                          data: mvTk501Data.map((value) => value.nu_valor),
                        },
                      ],
                    }}
                    labels="Niveles de Crudo"
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
                          max: 6,
                          grid: {},
                          ticks: {},
                        },
                      },
                    }}
                  />
                </CCardBody>
              </CCard>
            </CCol>
            <CCol>
              <CCard>
                <CCardHeader>
                  <h2>
                    <center>
                      <a href="http://localhost:3000/#/TK501">EX-002 (Calentador) TY-23</a>
                    </center>
                  </h2>
                </CCardHeader>
                <CCardImage orientation="top" src={ReactImg2} />
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
                      {mvEx002.map((item, index) => (
                        <>
                          <CTableRow key={index}>
                            <CTableDataCell>{item.disp_nombre.split('.')[1]}</CTableDataCell>
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
                </CCardBody>
              </CCard>
            </CCol>
          </CRow>
          <CRow>
            <CCol sm={6}>
              <CCard>
                <CCardHeader>
                  <h2>
                    <center>
                      <a href="http://localhost:3000/#">Tanque de 1500 BL y Bomba</a>
                    </center>
                  </h2>
                </CCardHeader>
                <CCardImage orientation="top" src={ReactImg5} />
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
                      {mvTqybmbData.map((item, index) => (
                        <>
                          <CTableRow key={index}>
                            <CTableDataCell>{item.disp_nombre.split('.')[1]}</CTableDataCell>
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
                      labels: ['LIT-501'],
                      datasets: [
                        {
                          label: ['Nivel de tanque'],
                          backgroundColor: ['#229954', '#310202'],
                          data: mvTqybmbData.map((value) => value.nu_valor),
                        },
                      ],
                    }}
                    labels="Niveles de Crudo"
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
                          min: 0,
                          max: 25,
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
