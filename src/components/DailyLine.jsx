import { ResponsiveLine } from '@nivo/line'
import React, { useState, useEffect } from 'react'
import { useTheme } from '@mui/material'
import { tokens } from '../theme'
import { API_IP } from '../config'
import { Line, LineChart, XAxis, YAxis, Tooltip, CartesianGrid, Legend, ResponsiveContainer } from 'recharts';
import { Box } from '@mui/material'
const DailyLine = ({ isCustomLineColors = false, isDashboard = false, data}) => {
  // console.log(data)
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)

  const [lineChartData, setLineChartData] = useState([])

  const dummyData1 = [];
  const chartData = Object.keys(data).map(timeValue => {
    // Log values to the console
   
    
    
    // Object.keys(data[timeValue]).map(value => { 
      
    // })
    Object.keys(data[timeValue]).map(value => {
    const key = value;
    const correspondingValue = data[timeValue][value];

    
    const dataPoint = {
      time: timeValue,
      ENTERED: data[timeValue]['Enter'], 
      LEFT: data[timeValue]['Exit'],
      INSTORE: data[timeValue]['Instore'],
      MAX: data[timeValue]['Max'],
    }
    dummyData1.push(dataPoint);
  });

    // Return the desired object structure
    return {
      time: timeValue,
      Enter: data[timeValue],
      // Add other properties as needed
    };
  });
  
  useEffect(() => {
    if (data !== undefined && Object.keys(data).length !== 0) {
      const transformedData = Object.keys(data).map(timeValue => ({
        time: timeValue,
        ENTERED: data[timeValue]?.Enter || 0,
        LEFT: data[timeValue]?.Exit || 0,
        INSTORE: data[timeValue]?.Instore || 0,
        // MAX: data[timeValue]?.Max || 0,
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

      <LineChart data={lineChartData}> 
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="time" />
        <YAxis />
        <Tooltip />
        {/* <Legend align="left" marginLeft='10px'/> */}
        <Line type="monotone" dataKey="ENTERED" stroke={'#7646FD'} />
        <Line type="monotone" dataKey="LEFT" stroke={'#FF006B'} />
        <Line type="monotone" dataKey="MAX" stroke={'#FDA3FF'} />
        <Line type="monotone" dataKey="INSTORE" stroke={'#FFBABA'} />
        
      </LineChart>
      </ResponsiveContainer>
      </Box>
    // <ResponsiveLine
    //   data={lineChartData}
    //   theme={{
    //     axis: {
    //       domain: {
    //         line: {
    //           stroke: colors.grey[100],
    //         },
    //       },
    //       legend: {
    //         text: {
    //           fill: colors.grey[100],
    //         },
    //       },
    //       ticks: {
    //         line: {
    //           stroke: colors.grey[100],
    //           strokeWidth: 1,
    //         },
    //         text: {
    //           fill: colors.grey[100],
    //         },
    //       },
    //     },
    //     legends: {
    //       text: {
    //         fill: colors.grey[100],
    //       },
    //     },
    //     tooltip: {
    //       container: {
    //         color: colors.primary[500],
    //       },
    //     },
    //   }}
    //   colors={theme.palette.mode === 'dark' ? customColors : customColors2}
    //   margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
    //   xScale={{ type: 'point' }}
    //   yScale={{
    //     type: 'linear',
    //     min: 'auto',
    //     max: 'auto',
    //     stacked: false,
    //     reverse: false,
    //   }}
    //   yFormat=' >-.2f'
    //   curve='catmullRom'
    //   axisTop={null}
    //   axisRight={null}
    //   axisBottom={{
    //     orient: 'bottom',
    //     tickSize: 0,
    //     tickPadding: 5,
    //     tickRotation: 0,
    //     legend: isDashboard ? undefined : 'time', // added
    //     legendOffset: 36,
    //     legendPosition: 'middle',
    //   }}
    //   axisLeft={{
    //     orient: 'left',
    //     //tickValues: 5, // added
    //     tickSize: 3,
    //     tickPadding: 5,
    //     tickRotation: 0,
    //     legend: isDashboard ? undefined : 'count', // added
    //     legendOffset: -40,
    //     legendPosition: 'middle',
    //   }}
    //   enableGridX={true}
    //   enableGridY={true}
    //   pointSize={8}
    //   pointColor={{ theme: 'background' }}
    //   pointBorderWidth={2}
    //   pointBorderColor={{ from: 'serieColor' }}
    //   pointLabelYOffset={-12}
    //   useMesh={true}
    //   legends={[
    //     {
    //       anchor: 'bottom-right',
    //       direction: 'column',
    //       justify: false,
    //       translateX: 100,
    //       translateY: 0,
    //       itemsSpacing: 0,
    //       itemDirection: 'left-to-right',
    //       itemWidth: 80,
    //       itemHeight: 20,
    //       itemOpacity: 0.75,
    //       symbolSize: 12,
    //       symbolShape: 'circle',
    //       symbolBorderColor: 'rgba(0, 0, 0, .5)',
    //       effects: [
    //         {
    //           on: 'hover',
    //           style: {
    //             itemBackground: 'rgba(0, 0, 0, .03)',
    //             itemOpacity: 1,
    //           },
    //         },
    //       ],
    //     },
    //   ]}
    // />
  )
}

export default DailyLine
