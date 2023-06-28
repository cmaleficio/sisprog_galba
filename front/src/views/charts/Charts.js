import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { CCard, CCardBody, CCol, CCardHeader, CRow } from '@coreui/react'
import { CChartLine } from '@coreui/react-chartjs'
import { DocsCallout } from 'src/components'

const Charts = () => {
  const [data, setData] = useState({
    labels: [],
    datasets: [
      {
        label: 'Separador 2501 - PRESIONES Y TEMPERATURAS',
        data: [],
        backgroundColor: ['rgba(75,192,192,1)', '#ecf0f1', '#50AF95', '#f3ba2f', '#2a71d0'],
        borderColor: 'black',
        borderWidth: 1,
      },
    ],
  })
  const [chart, setChart] = useState({
    labels: [],
    datasets: [
      {
        label: 'Separador 2501 - FLUJO Y NIVELES',
        data: [],
        backgroundColor: ['rgba(75,192,192,1)', '#ecf0f1', '#50AF95', '#f3ba2f', '#2a71d0'],
        borderColor: 'black',
        borderWidth: 1,
      },
    ],
  })

  const loadAsyncStuff = async () => {
    try {
      const response = await axios.get('http://localhost:3300/TIT_25010_P_V2501')
      const response2 = await axios.get('http://localhost:3300/TIT_25010_A_V2501')
      const response3 = await axios.get('http://localhost:3300/TIT_25010_V2501')
      const response4 = await axios.get('http://localhost:3300/PIT_25010_P_V2501')
      const response5 = await axios.get('http://localhost:3300/PIT_25010_A_V2501')
      const response6 = await axios.get('http://localhost:3300/PIT_25010_A_V2501')
      const response7 = await axios.get('http://localhost:3300/PIT_25030_V2501')

      setData({
        labels: response.data.map((chart) => chart.fe_valor),
        datasets: [
          {
            label: 'TIT_25010_P',
            data: response.data.map((chart) => chart.nu_valor),
            backgroundColor: ['#ecf0f1'],
            borderColor: 'black',
            borderWidth: 1,
          },
          {
            label: 'TIT_25010_A',
            data: response2.data.map((chart) => chart.nu_valor),
            backgroundColor: ['#2a71d0'],
            borderColor: 'black',
            borderWidth: 1,
          },
          {
            label: 'TIT_25010',
            data: response3.data.map((chart) => chart.nu_valor),
            backgroundColor: ['lightblue'],
            borderColor: 'black',
            borderWidth: 1,
          },
          {
            label: 'PIT_25010_P',
            data: response4.data.map((chart) => chart.nu_valor),
            backgroundColor: ['#ecf0f1'],
            borderColor: 'black',
            borderWidth: 1,
          },
          {
            label: 'PIT_25010_A',
            data: response5.data.map((chart) => chart.nu_valor),
            backgroundColor: ['#2a71d0'],
            borderColor: 'black',
            borderWidth: 1,
          },
          {
            label: 'PIT_25010',
            data: response6.data.map((chart) => chart.nu_valor),
            backgroundColor: ['lightblue'],
            borderColor: 'black',
            borderWidth: 1,
          },
          {
            label: 'PIT_25020',
            data: response7.data.map((chart) => chart.nu_valor),
            backgroundColor: ['lightblue'],
            borderColor: 'black',
            borderWidth: 1,
          },
        ],
      })

      /*setChart({
        labels: response.data.map((chart) => chart.fe_valor),
        datasets: [
          {
            label: 'FLUJO 1',
            data: response3.data.map((chart) => chart.nu_valor),
            backgroundColor: ['darkblue'],
            borderColor: 'black',
            borderWidth: 1,
          },
          {
            label: 'FLUJO 2',
            data: response4.data.map((chart) => chart.nu_valor),
            backgroundColor: ['lightgreen'],
            borderColor: 'black',
            borderWidth: 1,
          },
        ],
      }) */
    } catch (err) {
      throw err
    }
  }

  useEffect(() => {
    loadAsyncStuff()
  }, []) // call once, on mount

  return (
    <CRow>
      <CCol xs={12}>
        {/* <DocsCallout
          name="Chart"
          href="components/chart"
          content="React wrapper component for Chart.js 3.0, the most popular charting library."
        /> */}
      </CCol>
      <CCol xg={6}>
        <CCard className="mb-4">
          <CCardHeader>Tendencias - Separador 2501</CCardHeader>
          <CCardBody>
            <CChartLine data={data} />
            <CChartLine data={chart} />
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default Charts
