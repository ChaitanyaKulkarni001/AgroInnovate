import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Form, Button, Table } from 'react-bootstrap'

export default function HarvestCalendarPage() {
  const [cropType, setCropType] = useState('wheat')
  const [month, setMonth] = useState('')
  const [advice, setAdvice] = useState(null)

  const fetchAdvice = async () => {
    const params = new URLSearchParams()
    if (cropType) params.append('crop_type', cropType)
    if (month) params.append('month', month)
    const { data } = await axios.get(`/api/harvest-advice/?${params.toString()}`)
    setAdvice(data)
  }

  useEffect(() => { fetchAdvice() }, [])

  return (
    <div>
      <h3>Harvest Calendar</h3>
      <Form className='mb-3' onSubmit={(e)=>{e.preventDefault(); fetchAdvice()}}>
        <Form.Group className='mb-2'>
          <Form.Label>Crop Type</Form.Label>
          <Form.Control value={cropType} onChange={(e)=>setCropType(e.target.value)} placeholder='e.g., wheat, rice, maize' />
        </Form.Group>
        <Form.Group className='mb-2'>
          <Form.Label>Month (1-12)</Form.Label>
          <Form.Control value={month} onChange={(e)=>setMonth(e.target.value)} placeholder='optional' />
        </Form.Group>
        <Button type='submit' variant='success'>Get Advice</Button>
      </Form>

      {advice && (
        <Table bordered>
          <tbody>
            <tr><td><strong>Crop</strong></td><td>{advice.crop_type}</td></tr>
            <tr><td><strong>Current Month</strong></td><td>{advice.current_month}</td></tr>
            <tr><td><strong>Good to Sow Now</strong></td><td>{advice.good_to_sow_now ? 'Yes' : 'No'}</td></tr>
            <tr><td><strong>Good to Harvest Now</strong></td><td>{advice.good_to_harvest_now ? 'Yes' : 'No'}</td></tr>
            <tr><td><strong>Suggested Sow Months</strong></td><td>{(advice.suggested_sow_months || []).join(', ')}</td></tr>
            <tr><td><strong>Suggested Harvest Months</strong></td><td>{(advice.suggested_harvest_months || []).join(', ')}</td></tr>
            <tr><td><strong>Price Insight</strong></td><td>{advice.price_insight}</td></tr>
          </tbody>
        </Table>
      )}
    </div>
  )
}
