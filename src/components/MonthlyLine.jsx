import { ResponsiveLine } from '@nivo/line'
import React, { useState, useEffect } from 'react'
import { useTheme } from '@mui/material'
import { tokens } from '../theme'
import { mockLineDataMonthly as data } from '../data/mockData'
import { API_IP } from '../config'
import { Line, LineChart, XAxis, YAxis, Tooltip, CartesianGrid, Legend, ResponsiveContainer } from 'recharts';
import { Box } from '@mui/material'
const MonthlyLine = ({ isCustomLineColors = false, isDashboard = false, data }) => {
  console.log(data)
  const theme = useTheme()

  const [lineChartData, setLineChartData] = useState([]);

  useEffect(() => {
    if (data && Object.keys(data).length !== 0) {
      const daysOfMonth = Array.from({ length: data.Entered.length }, (_, index) => index + 1);

      const transformedData = daysOfMonth.map((day) => ({
        time: day.toString(),
        ENTERED: data.Entered[day - 1] || 0,
        LEFT: data.Left[day - 1] || 0,
        MIN: data.Min[day - 1] || 0,
        MAX: data.Max[day - 1] || 0,
      }));

      setLineChartData(transformedData);
    }
  }, [data]);


  return (
    <Box>
    <ResponsiveContainer width="100%" height={350}>
      <LineChart data={lineChartData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="time" />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey="ENTERED" stroke="#7646FD" />
        <Line type="monotone" dataKey="LEFT" stroke="#FF006B" />
        <Line type="monotone" dataKey="MAX" stroke="#FDA3FF" />
        <Line type="monotone" dataKey="MIN" stroke="#FFBABA" />
      </LineChart>
    </ResponsiveContainer>
  </Box>

  )
}

export default MonthlyLine
