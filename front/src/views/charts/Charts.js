import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { CCard, CCardBody, CCol, CCardHeader, CRow } from '@coreui/react'
import { CChartLine } from '@coreui/react-chartjs'
import { DocsCallout } from 'src/components'

const Charts = () => {
  const random = () => Math.round(Math.random() * 100)

  const [data, setData] = useState({
    labels: [],
    datasets: [
      {
        label: 'Valor',
        data: [],
        backgroundColor: ['rgba(75,192,192,1)', '#ecf0f1', '#50AF95', '#f3ba2f', '#2a71d0'],
        borderColor: 'black',
        borderWidth: 1,
      },
    ],
  })

  const loadAsyncStuff = async () => {
    try {
      const response = await axios.get('http://localhost:3300/results')
      setData({
        labels: response.data.map((chart) => chart.fe_valor),
        datasets: [
          {
            label: 'Valor',
            data: response.data.map((chart) => chart.nu_valor),
            backgroundColor: ['rgba(75,192,192,1)', '#ecf0f1', '#50AF95', '#f3ba2f', '#2a71d0'],
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
        <DocsCallout
          name="Chart"
          href="components/chart"
          content="React wrapper component for Chart.js 3.0, the most popular charting library."
        />
      </CCol>
      <CCol xg={6}>
        <CCard className="mb-4">
          <CCardHeader>Line Chart - Valores</CCardHeader>
          <CCardBody>
            <CChartLine data={data} />
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default Charts
