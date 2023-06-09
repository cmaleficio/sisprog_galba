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
        label: 'Separador 2501 - 1',
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
        label: 'Separador 2501 - 2',
        data: [],
        backgroundColor: ['rgba(75,192,192,1)', '#ecf0f1', '#50AF95', '#f3ba2f', '#2a71d0'],
        borderColor: 'black',
        borderWidth: 1,
      },
    ],
  })

  const loadAsyncStuff = async () => {
    try {
      const response = await axios.get('http://localhost:3300/lit250130')
      const response2 = await axios.get('http://localhost:3300/lit250110')
      const response3 = await axios.get('http://localhost:3300/fit250130')
      const response4 = await axios.get('http://localhost:3300/fit250110')
      const response5 = await axios.get('http://localhost:3300/tit250110')
      const response6 = await axios.get('http://localhost:3300/pit250110')

      setData({
        labels: response.data.map((chart) => chart.fe_valor),
        datasets: [
          {
            label: 'Transmisor de nivel ALTO',
            data: response.data.map((chart) => chart.nu_valor),
            backgroundColor: ['#ecf0f1'],
            borderColor: 'black',
            borderWidth: 1,
          },
          {
            label: 'Transmisor de nivel BAJO',
            data: response2.data.map((chart) => chart.nu_valor),
            backgroundColor: ['#2a71d0'],
            borderColor: 'black',
            borderWidth: 1,
          },
          {
            label: 'Indicador de temperatura',
            data: response5.data.map((chart) => chart.nu_valor),
            backgroundColor: ['lightblue'],
            borderColor: 'black',
            borderWidth: 1,
          },
          {
            label: 'Indicador de presion',
            data: response6.data.map((chart) => chart.nu_valor),
            backgroundColor: ['orange'],
            borderColor: 'black',
            borderWidth: 1,
          },
        ],
      })

      setChart({
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
      })
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
