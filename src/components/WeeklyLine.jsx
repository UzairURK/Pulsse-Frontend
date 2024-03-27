import { ResponsiveLine } from '@nivo/line'
import React, { useState, useEffect } from 'react'
import { useTheme } from '@mui/material'
import { tokens } from '../theme'
import { mockLineDataWeekly as data } from '../data/mockData'
import { API_IP } from '../config'
import { Line, LineChart, XAxis, YAxis, Tooltip, CartesianGrid, Legend, ResponsiveContainer } from 'recharts';
import { Box } from '@mui/material'
const WeeklyLine = ({ isCustomLineColors = false, isDashboard = false, data  }) => {


  const [lineChartData, setLineChartData] = useState(null)


  useEffect(() => {
    if (data && Object.keys(data).length !== 0) {
      const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

      const transformedData = daysOfWeek.map((day, index) => ({
        time: day,
        ENTERED: data.Entered[index] || 0,
        LEFT: data.Left[index] || 0,
        MIN: data.Min[index] || 0,
        MAX: data.Max[index] || 0,
      }));

      setLineChartData(transformedData);
    }
  }, [data]);
  return (
    <Box>
    <ResponsiveContainer
    className='block'
  width="100%"
  height={350}
  sx={{
    width: '1461.37px',
    height: '280.44px',
    top: '119.48px',
    left: '46.62px',
  }}
>
  {/* dummyData1 */}
      <LineChart data={lineChartData}>  
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="time" />
        <YAxis />
        <Tooltip />
        {/* <Legend align="left" marginLeft='10px'/> */}
        <Line type="monotone" dataKey="ENTERED" stroke={'#7646FD'} />
        <Line type="monotone" dataKey="LEFT" stroke={'#FF006B'} />
        <Line type="monotone" dataKey="MAX" stroke={'#FDA3FF'} />
        <Line type="monotone" dataKey="MIN" stroke={'#FFBABA'} />
        
      </LineChart>
      </ResponsiveContainer>
      </Box>
    
  )
}

export default WeeklyLine
