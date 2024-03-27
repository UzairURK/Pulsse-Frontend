import React, { useState, useEffect, useContext } from 'react'
import { Box, Button, IconButton, Typography, useTheme, Select, MenuItem } from '@mui/material'
import { tokens } from '../../theme'
import DownloadOutlinedIcon from '@mui/icons-material/DownloadOutlined'
import LoginIcon from '@mui/icons-material/Login'
import LogoutIcon from '@mui/icons-material/Logout'
import StorefrontIcon from '@mui/icons-material/Storefront'
import GroupsIcon from '@mui/icons-material/Groups'
import PersonAddIcon from '@mui/icons-material/PersonAdd'
import ReplayIcon from '@mui/icons-material/Replay'
import Header from '../../components/Header'
import CountLineChart from '../../components/CountLineChart'
import GCountLineChart from '../../components/GCountLineChart'
import DailyLineChart from '../../components/DailyLine'
import WeeklyLineChart from '../../components/WeeklyLine'
import MonthlyLineChart from '../../components/MonthlyLine'
import FiveMinuteLineChart from '../../components/FiveMinuteLine'
import CurrentCountsLine from '../../components/CurrentCountsLine'
// import BarChart from '../../components/BarChart'
// import PieChart from '../../components/PieChart'
import { PieChart, Pie, Cell } from 'recharts'
import StatBox from '../../components/StatBox'
import ProgressCircle from '../../components/ProgressCircle'
import CCTVVideo from '../../components/CCTVVideo'
import { useApi } from '../../scenes/global/ApiContext'
import CountLiveMinute from '../../components/CountLiveMinute'
import CustomerTable from '../../components/CustomerTable'
import PieChartGroup from '../../components/PieChartGroup'
import EngagementBarGraph from '../../components/EngagementBarGraph'
import { mockUserData as userData } from '../../data/mockData'
import RepeatRatioPie from '../../components/RepeatRatioPie'
import DashboardService from '../../api_services/dashboard.service'
import SidebarContext from '../../scenes/global/SidebarContextt/SidebarContext'
import VideoImg from './Assets/VideoImg.jpg'
import {
  VictoryPie,
  VictoryLabel,
  VictoryAxis,
  VictoryBar,
  VictoryChart,
  VictoryStack,
  VictoryTheme,
} from 'victory'
// import { BarChart, XAxis, YAxis, Tooltip, CartesianGrid, Bar, defs, linearGradient, stop  } from 'recharts';
import Barchart from './Barchart'
import TableCustomer from './TableCustomer'
import { API_IP } from '../../config'
// import { PieChart, Pie, Cell, Legend, ResponsiveContainer } from 'recharts';
const transitionStyle = {
  transition: 'margin-top 0.3s ease-in-out, margin-left 0.3s ease-in-out, width 0.3s ease-in-out',
}
const EEDepartmentDashboard = () => {
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)
  const { apiData } = useApi()

  const [currentTime, setCurrentTime] = useState('')
  const [currentDate, setCurrentDate] = useState('')
  const [chartType, setChartType] = useState('Today')
  const [data, setData] = useState({})
  const [genderRatio, setGenderRatio] = useState([])
  const [repeatRatio, setRepeatRatio] = useState([])
  const [groupRatio, setGroupRatio] = useState([])
  const [engagement, setEngagement] = useState([])

  const renderChart = () => {
    if (chartType === 'Today') {
      return (
        <DailyLineChart
          isDashboard={true}
          data={data.footfall}
        />
      )
    } else if (chartType === 'Weekly') {
      return (
        <WeeklyLineChart
          isDashboard={true}
          data={data.weekly_data}
        />
      )
    } else if (chartType === 'Monthly') {
      return (
        <MonthlyLineChart
          isDashboard={true}
          data={data.monthly_data}
        />
      )
    }
    //else if (chartType === "MinutesLive") {
    //return <FiveMinuteLineChart isDashboard={true} />;
    // }
  }

  useEffect(() => {
    const interval = setInterval(() => {
      DashboardService.getData({ key: 3 }) 
        .then(res => {
          setData(res.Data)
          setGenderRatio([
            { x: 'Male Ratio', y: res.Data.gender_ratio.male_ratio },
            { x: 'Female Ratio', y: res.Data.gender_ratio.female_ratio },
          ])
          setRepeatRatio([
            { x: 'New Customers', y: res.Data.repeat_ratio.new_customers },
            { x: 'Repeat Customers', y: res.Data.repeat_ratio.repeat_customers },
          ])
          setGroupRatio([
            { x: 'Group Ratio', y: res.Data.group_ratio.group_ratio },
            { x: 'Non Group Ratio', y: res.Data.group_ratio.non_group_ratio },
          ])
          
          setEngagement([
            { category: 'Avg', value: res.Data.engagement.avg_time, fill: 'url(#gradient1)' },
            { category: 'Min', value: res.Data.engagement.min_time, fill: 'url(#gradient2)' },
            { category: 'Max', value: res.Data.engagement.max_time, fill: 'url(#gradient1)' },
          ])
        })
        .catch(err => console.log(err))
    }, 30000)

    return () => clearInterval(interval)
  }, [data])





  const dataDummy = [
    { x: 'PHP', y: 400 },
    { x: 'Python', y: 300 },
    { x: 'Javascript', y: 900 },
  ]

  const COLORS = ['#4663FD', '#7646FD', '#B9DDFF']

  const { sidebarExpanded } = useContext(SidebarContext)

  const gradientColors = ['url(#gradient1)', 'url(#gradient2)', 'url(#gradient3)']

  // ==================================
  // Dummy data
  const datadummy2 = [
    { x: 'Section 1', y: 104 },
    { x: 'Section 2', y: 46 },
  ]
  // Calculate total sum of values
  const total = datadummy2.reduce((acc, cur) => acc + cur.y, 0)
  // Gradient colors for each section
  const gradientColors_ = ['url(#gradient4)', 'url(#gradient5)']

  // Custom label component to display percentage in the middle
  const CustomLabel = ({ x, y, datum }) => {
    return (
      <g
        style={{
          marginTop: '20px',
        }}
      >
        <text
          x={x}
          y={y}
          textAnchor='middle'
          dominantBaseline='middle'
        >
          {`${datum.y}%`}
        </text>
      </g>
    )
  }

  // For Engagement:

  const dataEngagement = [
    { category: 'A', value: 40, fill: 'url(#gradient1)' },
    { category: 'B', value: 30, fill: 'url(#gradient2)' },
    { category: 'C', value: 50, fill: 'url(#gradient1)' },
  ]

  const gradientColorsEng = [
    'linear-gradient(90.92deg, 0%, #7646FD 0%, #B847FE 100%)',
    'linear-gradient(98.22deg, 0%, #BAB9FF 0%, #EDB9FF 100%)',
    'linear-gradient(93.86deg, 0%, #9071FD 0%, #D971FD 100%)',
  ]

  // Gender Time Line
  const dataGender = [
    {
      female_count: 10,
      hour: '10',
      male_count: 20,
    },
    
    {
      female_count: 30,
      hour: '12',
      male_count: 40,
    },
    {
      female_count: 40,
      hour: '7',
      male_count: 50,
    },
    
    {
      female_count: 20,
      hour: '11',
      male_count: 30,
    },
    {
      female_count: 60,
      hour: '9',
      male_count: 70,
    },
    {
      female_count: 50,
      hour: '8',
      male_count: 60,
    },
  ]

console.log(data.genderTimeLine)

useEffect(() => {
  if (data && data.genderTimeline) {
      const keys = Object.keys(data.genderTimeline);
      console.log(keys); // Output the keys to the console
  } else {
      console.error('data or data.genderTimeline is undefined or null');
  }
}, [data && data.genderTimeline]);

// console.log(typeof dataGender);

  
  const customBarColor = `linear-gradient(180deg, #4663FD 0%, #8B72FF 100%)`
  return (
    <Box
      // mb={2.5}
      // mt={10}
      // ml={sidebarExpanded.isCollapsed ? 15 : 40}
      sx={{ ...transitionStyle, width: sidebarExpanded.isCollapsed ? '92vw' : '81vw' }}
      // // className='dashboard'
      mt={sidebarExpanded.isCollapsed ? 10 : 10}
      ml={sidebarExpanded.isCollapsed ? 10 : 34}
    >
      {/* HEADER */}
      <Box
        display='flex'
        justifyContent='space-between'
        alignItems='center'
      >
        <Header
          marginLeft={0}
          title='CSE DEPARTMENT'
          subtitle={''}
        />

        <Box>
          <Typography
            variant='h5'
            fontWeight='600'
            color={colors.grey[100]}
          >
            {currentTime}  {currentDate}
          </Typography>
        </Box>
      </Box>

      {/* ROW 1 : Footfall Line Graph*/}

      <Box className='chartsdashboard'
        gridRow='span 2'
        gridColumn='span 12'
        // sx={{
        //   // width: '1549.99px',
        //   // width: sidebarExpanded.isCollapsed ? '1549.99px' : '1419.06px',
        //   top: '54px',
        //   left: '1px',
        //   height: '440px',
        //   px: '21px',
        //   py: '16px',
        //   mb: '25px',
        //   borderRadius: '20px',
        //   background: '#FFFFFF',
        //   boxShadow: '0px 2px 10px 0px #0000001A',
        // }}
      >
        <Box
          p='0 30px'
          display='flex '
          justifyContent='space-between'
          alignItems='center'
        >
          <Box sx={{ mb: '15px' }}>
            <div className='flex items-center'>
              <Typography
                variant='h5'
                fontWeight='600'
                color={colors.grey[100]}
                sx={{
                  color: '#946EFF',
                  fontFamily: 'Noto Sans',
                  fontSize: '20px',
                  fontWeight: 600,
                  lineHeight: '27px',
                  letterSpacing: '0em',
                  textAlign: 'left',
                }}
              >
                FOOTFALL
              </Typography>
              <svg
                width='19'
                height='18'
                viewBox='0 0 19 18'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
                className='mr-2'
              >
                <path
                  d='M9.74414 1.49854C13.8871 1.49854 17.2456 4.85703 17.2456 9.00004C17.2456 13.1423 13.8871 16.5 9.74414 16.5C5.60114 16.5008 2.24414 13.1423 2.24414 9.00004C2.24339 4.85703 5.60114 1.49854 9.74414 1.49854ZM9.74114 7.68604C9.55734 7.68629 9.38003 7.75402 9.24288 7.87638C9.10572 7.99874 9.01828 8.1672 8.99714 8.34979L8.99189 8.43678L8.99489 12.5633L8.99939 12.6503C9.02035 12.8332 9.10787 13.002 9.24528 13.1246C9.38269 13.2472 9.56039 13.3149 9.74452 13.3149C9.92864 13.3149 10.1063 13.2472 10.2437 13.1246C10.3812 13.002 10.4687 12.8332 10.4896 12.6503L10.4941 12.5625L10.4911 8.43604L10.4859 8.34828C10.4642 8.16585 10.3763 7.99773 10.2389 7.87579C10.1015 7.75386 9.9241 7.6866 9.74039 7.68678M9.74414 4.87504C9.4952 4.87504 9.25646 4.97393 9.08043 5.14995C8.90441 5.32598 8.80552 5.56472 8.80552 5.81366C8.80552 6.0626 8.90441 6.30134 9.08043 6.47737C9.25646 6.65339 9.4952 6.75229 9.74414 6.75229C9.99308 6.75229 10.2318 6.65339 10.4078 6.47737C10.5839 6.30134 10.6828 6.0626 10.6828 5.81366C10.6828 5.56472 10.5839 5.32598 10.4078 5.14995C10.2318 4.97393 9.99308 4.87504 9.74414 4.87504Z'
                  fill='#BDBDBD'
                />
              </svg>
            </div>
          </Box>
          <Box>
            <Select
              value={chartType}
              onChange={e => setChartType(e.target.value)}
              // className='chartSelect'
              sx={{
                width: 150,
                height: 35,
                '@media (max-width: 630px)': {
                  width: 90,
                  height: 25,
                },
                '@media (max-width: 480px)': {
                  width: 80,
                  height: 25,
                },
                '@media (max-width: 380px)': {
                  width: 70,
                  height: 25,
                }
              }}
            >
              <MenuItem value='Today'>Today</MenuItem>
              <MenuItem value='Weekly'>This Week</MenuItem>
              <MenuItem value='Monthly'>Last Month</MenuItem>
              <MenuItem value='MinutesLive'>5 Minute</MenuItem> *
            </Select>
          </Box>
        </Box>
        {data?.footfall !== undefined ? (
          <Box
          // height='250px'
          // m='-20px 0 0 0'
          >
            {/* Chart */}
            {renderChart()}
            <div
              className='flex'
              style={{
                background: '#FFFFFF',
              }}
            >
              <div className='flex items-center chartsdashboardFooter'>
                <svg
                  width='14'
                  height='4'
                  viewBox='0 0 14 4'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <rect
                    x='0.677734'
                    y='0.5'
                    width='13'
                    height='3'
                    rx='1.5'
                    fill='#7646FD'
                  />
                </svg>

                <div className='ml-2'>
                  <p className='font-NotoSans text-base font-normal leading-4 text-left text-gray-700'>
                    Entered
                  </p>
                </div>
              </div>
              <div className='flex items-center chartsdashboardFooter'>
                <svg
                  width='19'
                  height='18'
                  viewBox='0 0 19 18'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <rect
                    x='3.01758'
                    y='7.5'
                    width='13'
                    height='3'
                    rx='1.5'
                    fill='#FF006B'
                  />
                </svg>

                <div className='ml-2'>
                  <p className='font-NotoSans text-base font-normal leading-4 text-left text-gray-700'>
                    Left
                  </p>
                </div>
              </div>
              <div className='flex items-center chartsdashboardFooter'>
                <svg
                  width='14'
                  height='4'
                  viewBox='0 0 14 4'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <rect
                    x='0.353516'
                    y='0.5'
                    width='13'
                    height='3'
                    rx='1.5'
                    fill='#FDA3FF'
                  />
                </svg>

                <div className='ml-2'>
                  <p className='font-NotoSans text-base font-normal leading-4 text-left text-gray-700'>
                    Max
                  </p>
                </div>
              </div>
              <div className='flex items-center chartsdashboardFooter'>
                <svg
                  width='19'
                  height='18'
                  viewBox='0 0 19 18'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <rect
                    x='2.69141'
                    y='7.5'
                    width='13'
                    height='3'
                    rx='1.5'
                    fill='#FFBABA'
                  />
                </svg>

                <div className='ml-2'>
                  <p className='font-NotoSans text-base font-normal leading-4 text-left text-gray-700'>
                    InStore
                  </p>
                </div>
              </div>
            </div>
          </Box>
        ) : (
          <Typography>Loading</Typography>
        )}
      </Box>

      <Box
        className='grid-container'
      >
        <div
          className='childbox1'
          // style={{
          //   height: '397.98px',
          //   top: '508.02px',
          //   left: '529.41px',
          //   background: '#FFFFFF',
          //   borderRadius: '10px',
          //   boxShadow: '0px 2px 10px 0px #0000001A',
          // }}
        >
           {/* Video Feed code here. */}
          <img
            src={`${API_IP}video_feed/${1}`}
            style={{ width: '100%', height: '100%', borderRadius: '10px' }}
            alt='Video'
          />
        </div>
        <div
          className='childbox2'
          // style={{
          //   // width: '504px',
          //   paddingLeft: '30px',
          //   paddingRight: '30px',
          //   paddingTop: '18px',
          //   paddingBottom: '18px',
          //   top: '508.02px',
          //   left: '529.41px',
          //   height: '397.98px',
          //   background: '#FFFFFF',
          //   borderRadius: '10px',
          //   boxShadow: '0px 2px 10px 0px #0000001A',
          //   display: 'flex',
          //   flexDirection: 'column',
          //   alignItems: 'center',
          // }}
        >
          <div
            className='col-start-2 col-span-4 flex items-center'
            style={{
              width: '100%',
              fontFamily: 'Noto Sans',
              fontSize: '20px',
              fontWeight: 600,
              lineHeight: '27px',
              letterSpacing: '0em',
              textAlign: 'left',
              color: '#946EFF',
            }}
          >
            Gender Ratio
          </div>
          <div className='flex mt-5'>
            <div>
              <svg style={{ width: '120%', height: '200%' }}>
                <defs>
                  <linearGradient
                    id='gradient1'
                    x1='0%'
                    y1='0%'
                    x2='100%'
                    y2='100%'
                  >
                    <stop
                      offset='0%'
                      stopColor='#7B4AFE'
                    />
                    <stop
                      offset='100%'
                      stopColor='#CC82FF'
                    />
                  </linearGradient>
                  <linearGradient
                    id='gradient2'
                    x1='0%'
                    y1='0%'
                    x2='100%'
                    y2='100%'
                  >
                    <stop
                      offset='0%'
                      stopColor='#B8EDFF'
                    />
                    <stop
                      offset='100%'
                      stopColor='#BBBAFF'
                    />
                  </linearGradient>
                  <linearGradient
                    id='gradient3'
                    x1='0%'
                    y1='0%'
                    x2='100%'
                    y2='100%'
                  >
                    <stop
                      offset='0%'
                      stopColor='#4764FE'
                    />
                    <stop
                      offset='100%'
                      stopColor='#8E71FE'
                    />
                  </linearGradient>
                </defs>
                <VictoryPie
                  standalone={false}
                  data={genderRatio}
                  colorScale={gradientColors}
                  radius={130}
                  labelComponent={<></>}
                  style={{ labels: { fill: 'none' } }}
                  width={300}
                  height={300}
                />
              </svg>
            </div>
            <div className='mt-20 mr-10'>
              <div className='flex flex-col items-center gap-5'>
                <div className='flex items-center'>
                  <svg
                    width='29'
                    height='29'
                    viewBox='0 0 29 29'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path
                      d='M24.0798 7.43555V14.4355H21.7464V11.4314L17.1089 16.0397C17.4784 16.5842 17.7603 17.1628 17.9548 17.7757C18.1492 18.3886 18.2464 19.0252 18.2464 19.6855C18.2464 21.4744 17.6242 22.9911 16.3798 24.2355C15.1353 25.48 13.6186 26.1022 11.8298 26.1022C10.0409 26.1022 8.5242 25.48 7.27975 24.2355C6.03531 22.9911 5.41309 21.4744 5.41309 19.6855C5.41309 17.8967 6.03531 16.38 7.27975 15.1355C8.5242 13.8911 10.0409 13.2689 11.8298 13.2689C12.4714 13.2689 13.1034 13.361 13.7256 13.5454C14.3478 13.7297 14.9214 14.0167 15.4464 14.4064L20.0839 9.76888H17.0798V7.43555H24.0798ZM11.8298 15.6022C10.702 15.6022 9.73947 16.0008 8.94225 16.798C8.14503 17.5953 7.74642 18.5578 7.74642 19.6855C7.74642 20.8133 8.14503 21.7758 8.94225 22.573C9.73947 23.3703 10.702 23.7689 11.8298 23.7689C12.9575 23.7689 13.92 23.3703 14.7173 22.573C15.5145 21.7758 15.9131 20.8133 15.9131 19.6855C15.9131 18.5578 15.5145 17.5953 14.7173 16.798C13.92 16.0008 12.9575 15.6022 11.8298 15.6022Z'
                      fill='#4663FD'
                    />
                  </svg>

                  <span
                    style={{
                      fontFamily: 'Avenir',
                      fontSize: '16px',
                      fontWeight: 400,
                      lineHeight: '22px',
                      letterSpacing: '-0.0375em',
                      textAlign: 'center',
                      color: '#000000',
                    }}
                  >
                    {data.gender_ratio?.male_ratio}%
                  </span>
                </div>

                <div className='flex items-center'>
                  <svg
                    width='29'
                    height='29'
                    viewBox='0 0 29 29'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path
                      d='M13.5811 26.389V24.0557H11.2477V21.7223H13.5811V19.2723C12.0449 19.0001 10.7857 18.2659 9.80339 17.0697C8.82106 15.8734 8.33028 14.4882 8.33106 12.914C8.33106 11.1446 8.95833 9.64266 10.2129 8.40833C11.4674 7.174 12.9791 6.55644 14.7477 6.55566C16.5172 6.55566 18.0292 7.17322 19.2837 8.40833C20.5383 9.64344 21.1652 11.1453 21.1644 12.914C21.1644 14.489 20.6732 15.8746 19.6909 17.0708C18.7086 18.2671 17.4497 19.0009 15.9144 19.2723V21.7223H18.2477V24.0557H15.9144V26.389H13.5811ZM14.7477 17.0557C15.8755 17.0557 16.838 16.6571 17.6352 15.8598C18.4324 15.0626 18.8311 14.1001 18.8311 12.9723C18.8311 11.8446 18.4324 10.8821 17.6352 10.0848C16.838 9.28761 15.8755 8.889 14.7477 8.889C13.6199 8.889 12.6574 9.28761 11.8602 10.0848C11.063 10.8821 10.6644 11.8446 10.6644 12.9723C10.6644 14.1001 11.063 15.0626 11.8602 15.8598C12.6574 16.6571 13.6199 17.0557 14.7477 17.0557Z'
                      fill='#7646FD'
                    />
                  </svg>

                  <span
                    style={{
                      fontFamily: 'Avenir',
                      fontSize: '16px',
                      fontWeight: 400,
                      lineHeight: '22px',
                      letterSpacing: '-0.0375em',
                      textAlign: 'center',
                      color: '#000000',
                    }}
                  >
                    {data.gender_ratio?.female_ratio}%
                  </span>
                </div>

                {/* <div className='flex items-center'>
                  <svg
                    width='29'
                    height='29'
                    viewBox='0 0 29 29'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path
                      d='M13.661 17.0473C14.5593 15.4257 16.286 14.469 17.2893 13.034C18.351 11.529 17.756 8.71733 14.746 8.71733C12.7743 8.71733 11.806 10.2107 11.3976 11.4473L8.37598 10.1757C9.20431 7.69066 11.456 5.55566 14.7343 5.55566C17.476 5.55566 19.3543 6.804 20.311 8.36733C21.1276 9.709 21.606 12.2173 20.346 14.084C18.946 16.149 17.6043 16.779 16.881 18.109C16.5893 18.6457 16.4726 18.9957 16.4726 20.7223H13.101C13.0893 19.8123 12.9493 18.3307 13.661 17.0473ZM17.0793 25.389C17.0793 26.6723 16.0293 27.7223 14.746 27.7223C13.4626 27.7223 12.4126 26.6723 12.4126 25.389C12.4126 24.1057 13.4626 23.0557 14.746 23.0557C16.0293 23.0557 17.0793 24.1057 17.0793 25.389Z'
                      fill='#B9DDFF'
                    />
                  </svg>

                  <span
                    style={{
                      fontFamily: 'Avenir',
                      fontSize: '16px',
                      fontWeight: 400,
                      lineHeight: '22px',
                      letterSpacing: '-0.0375em',
                      textAlign: 'center',
                      color: '#000000',
                    }}
                  >
                    51%
                  </span>
                </div> */}
              </div>
            </div>
          </div>
        </div>
        <div
          className='childbox3'
          // style={{
          //   // width: '498px',
          //   height: '397.98px',
          //   top: '508.02px',
          //   left: '529.41px',
          //   background: '#FFFFFF',
          //   borderRadius: '10px',
          //   boxShadow: '0px 2px 10px 0px #0000001A',
          // }}
        >
          <div
            className='col-start-2 col-span-4 flex items-center ml-8'
            style={{
              width: '100%',
              fontFamily: 'Noto Sans',
              fontSize: '20px',
              fontWeight: 600,
              lineHeight: '27px',
              letterSpacing: '0em',
              textAlign: 'left',
              color: '#946EFF',
            }}
          >
            Customers Today
          </div>
          {/* <div class='flex-none h-30 grid grid-cols-12 gap-4'></div> */}

          <div class='flex h-30 grid grid-cols-12 gap-4'>
            <div className='col-start-2 col-span-4 flex items-center'>
              <svg
                width='17'
                height='19'
                viewBox='0 0 17 19'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  d='M5.8418 1.4834H15.8418V15.4834C15.8418 16.0138 15.6311 16.5225 15.256 16.8976C14.8809 17.2727 14.3722 17.4834 13.8418 17.4834H5.8418M8.8418 12.4834L11.8418 9.4834M11.8418 9.4834L8.8418 6.4834M11.8418 9.4834H1.8418'
                  stroke='#7646FD'
                  stroke-width='2'
                  stroke-linecap='round'
                  stroke-linejoin='round'
                />
              </svg>

              <p class='ml-5 font-lato text-base font-medium leading-6 text-left text-gray-700'>
                Entered
              </p>
            </div>

            <div className='col-start-9 col-span-4 font-lato text-base font-medium leading-6 text-left text-gray-700'>
              {data.customers_today?.Entered}
            </div>
          </div>

          <div class='flex h-30 grid grid-cols-12 gap-4'>
            <div className='col-start-2 col-span-4 flex items-center'>
              <svg
                width='25'
                height='25'
                viewBox='0 0 25 25'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  d='M15.8418 4.48535H5.8418V18.4854C5.8418 19.0158 6.05251 19.5245 6.42758 19.8996C6.80266 20.2746 7.31136 20.4854 7.8418 20.4854H15.8418M16.8418 15.4854L19.8418 12.4854M19.8418 12.4854L16.8418 9.48535M19.8418 12.4854H9.8418'
                  stroke='#7646FD'
                  stroke-width='2'
                  stroke-linecap='round'
                  stroke-linejoin='round'
                />
              </svg>

              <p class='ml-5 font-lato text-base font-medium leading-6 text-left text-gray-700'>
                Left
              </p>
            </div>
            <div className='col-start-9 col-span-4 font-lato text-base font-medium leading-6 text-left text-gray-700'>
              {data.customers_today?.Left}
            </div>
          </div>

          <div class='flex h-30 grid grid-cols-12 gap-4'>
            <div className='col-start-2 col-span-4 flex items-center'>
              <svg
                width='20'
                height='21'
                viewBox='0 0 20 21'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  d='M17.8381 9.1044V17.4834C17.8381 18.0138 17.6274 18.5225 17.2523 18.8976C16.8773 19.2727 16.3686 19.4834 15.8381 19.4834H3.84613C3.31587 19.4831 2.80742 19.2723 2.43256 18.8973C2.0577 18.5222 1.84713 18.0137 1.84713 17.4834V9.1044M5.34413 7.2334L5.84413 1.4834M5.34413 7.2334C5.34413 10.1354 9.84213 10.1354 9.84213 7.2334M5.34413 7.2334C5.34413 10.4094 0.189129 9.7534 0.911129 6.9854L1.95613 2.9784C2.06781 2.55043 2.31821 2.17155 2.66815 1.90104C3.01809 1.63054 3.44783 1.48366 3.89013 1.4834H15.7941C16.2364 1.48366 16.6662 1.63054 17.0161 1.90104C17.366 2.17155 17.6164 2.55043 17.7281 2.9784L18.7731 6.9854C19.4951 9.7544 14.3401 10.4094 14.3401 7.2334M9.84213 7.2334V1.4834M9.84213 7.2334C9.84213 10.1354 14.3401 10.1354 14.3401 7.2334M14.3401 7.2334L13.8401 1.4834'
                  stroke='#7646FD'
                  stroke-width='1.5'
                  stroke-linecap='round'
                  stroke-linejoin='round'
                />
              </svg>

              <p class='ml-5 font-lato text-base font-medium leading-6 text-left text-gray-700'>
                In-Store
              </p>
            </div>
            <div className='col-start-9 col-span-4 font-lato text-base font-medium leading-6 text-left text-gray-700'>
              {data.customers_today?.In_store}
            </div>
          </div>

          <div class='flex h-30 grid grid-cols-12 gap-4'>
            <div className='col-start-2 col-span-4 flex items-center'>
              <svg
                width='25'
                height='25'
                viewBox='0 0 25 25'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  d='M15.8418 12.4834C18.0518 12.4834 19.8418 10.6934 19.8418 8.4834C19.8418 6.2734 18.0518 4.4834 15.8418 4.4834C13.6318 4.4834 11.8418 6.2734 11.8418 8.4834C11.8418 10.6934 13.6318 12.4834 15.8418 12.4834ZM6.8418 10.4834V8.4834C6.8418 7.9334 6.3918 7.4834 5.8418 7.4834C5.2918 7.4834 4.8418 7.9334 4.8418 8.4834V10.4834H2.8418C2.2918 10.4834 1.8418 10.9334 1.8418 11.4834C1.8418 12.0334 2.2918 12.4834 2.8418 12.4834H4.8418V14.4834C4.8418 15.0334 5.2918 15.4834 5.8418 15.4834C6.3918 15.4834 6.8418 15.0334 6.8418 14.4834V12.4834H8.8418C9.3918 12.4834 9.8418 12.0334 9.8418 11.4834C9.8418 10.9334 9.3918 10.4834 8.8418 10.4834H6.8418ZM15.8418 14.4834C13.1718 14.4834 7.8418 15.8234 7.8418 18.4834V19.4834C7.8418 20.0334 8.2918 20.4834 8.8418 20.4834H22.8418C23.3918 20.4834 23.8418 20.0334 23.8418 19.4834V18.4834C23.8418 15.8234 18.5118 14.4834 15.8418 14.4834Z'
                  fill='#7646FD'
                />
              </svg>

              <p class='ml-5 font-lato text-base font-medium leading-6 text-left text-gray-700'>
                New
              </p>
            </div>
            <div className='col-start-9 col-span-4 font-lato text-base font-medium leading-6 text-left text-gray-700'>
              {data.customers_today?.New}
            </div>
          </div>

          <div class='flex h-30 grid grid-cols-12 gap-4'>
            <div className='col-start-2 col-span-4 flex items-center'>
              <svg
                width='25'
                height='25'
                viewBox='0 0 25 25'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  d='M3.53476 5.38887L4.85663 6.42246C6.65898 4.11855 9.4621 2.63965 12.6098 2.63965C18.0449 2.63965 22.4441 7.03418 22.4512 12.4717C22.4582 17.9139 18.0496 22.3271 12.6098 22.3271C8.36054 22.3271 4.73944 19.6318 3.36132 15.8561C3.32616 15.7576 3.37773 15.6475 3.47616 15.6146L4.80507 15.1576C4.8514 15.1417 4.90211 15.1446 4.94635 15.1656C4.99059 15.1867 5.02484 15.2242 5.04179 15.2701C5.08398 15.3873 5.13085 15.5045 5.18007 15.6193C5.58554 16.5803 6.16679 17.4428 6.90741 18.1834C7.64206 18.9194 8.51188 19.5067 9.46913 19.9131C10.4605 20.3326 11.5176 20.5459 12.6051 20.5459C13.6949 20.5459 14.7496 20.3326 15.741 19.9131C16.6992 19.5084 17.5693 18.9209 18.3027 18.1834C19.0394 17.4488 19.626 16.578 20.0301 15.6193C20.4496 14.6256 20.6629 13.5709 20.6629 12.4811C20.6629 11.3912 20.4496 10.3365 20.0301 9.34277C19.6246 8.38184 19.0434 7.51934 18.3027 6.77871C17.5621 6.03809 16.6996 5.45684 15.741 5.04902C14.7496 4.62949 13.6926 4.41621 12.6051 4.41621C11.5152 4.41621 10.4605 4.62949 9.46913 5.04902C8.51095 5.45366 7.64082 6.04118 6.90741 6.77871C6.67538 7.01074 6.45741 7.25684 6.25585 7.51465L7.66679 8.61621C7.69471 8.63781 7.71596 8.66684 7.72811 8.69998C7.74026 8.73312 7.7428 8.76901 7.73546 8.80354C7.72811 8.83806 7.71117 8.86981 7.68659 8.89513C7.662 8.92045 7.63077 8.93832 7.59648 8.94668L3.48085 9.95449C3.36366 9.98262 3.24882 9.89355 3.24882 9.77402L3.23007 5.53418C3.23241 5.37949 3.41288 5.29277 3.53476 5.38887Z'
                  fill='#7646FD'
                />
              </svg>

              <p class='ml-5 font-lato text-base font-medium leading-6 text-left text-gray-700'>
                Returning
              </p>
            </div>
            <div className='col-start-9 col-span-4 font-lato text-base font-medium leading-6 text-left text-gray-700'>
              {data.customers_today?.Repeating}
            </div>
          </div>

          <div class='flex h-30 grid grid-cols-12 gap-4'>
            <div className='col-start-2 col-span-4 flex items-center'>
              <svg
                width='25'
                height='25'
                viewBox='0 0 25 25'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <g clip-path='url(#clip0_1_4756)'>
                  <path
                    d='M12.8418 13.2334C14.4718 13.2334 15.9118 13.6234 17.0818 14.1334C18.1618 14.6134 18.8418 15.6934 18.8418 16.8634V18.4834H6.8418V16.8734C6.8418 15.6934 7.5218 14.6134 8.6018 14.1434C9.7718 13.6234 11.2118 13.2334 12.8418 13.2334ZM4.8418 13.4834C5.9418 13.4834 6.8418 12.5834 6.8418 11.4834C6.8418 10.3834 5.9418 9.4834 4.8418 9.4834C3.7418 9.4834 2.8418 10.3834 2.8418 11.4834C2.8418 12.5834 3.7418 13.4834 4.8418 13.4834ZM5.9718 14.5834C5.6018 14.5234 5.2318 14.4834 4.8418 14.4834C3.8518 14.4834 2.9118 14.6934 2.0618 15.0634C1.69951 15.2183 1.39072 15.4762 1.17382 15.8051C0.95691 16.134 0.841453 16.5194 0.841798 16.9134V18.4834H5.3418V16.8734C5.3418 16.0434 5.5718 15.2634 5.9718 14.5834ZM20.8418 13.4834C21.9418 13.4834 22.8418 12.5834 22.8418 11.4834C22.8418 10.3834 21.9418 9.4834 20.8418 9.4834C19.7418 9.4834 18.8418 10.3834 18.8418 11.4834C18.8418 12.5834 19.7418 13.4834 20.8418 13.4834ZM24.8418 16.9134C24.8418 16.1034 24.3618 15.3834 23.6218 15.0634C22.7449 14.6808 21.7985 14.4833 20.8418 14.4834C20.4518 14.4834 20.0818 14.5234 19.7118 14.5834C20.1118 15.2634 20.3418 16.0434 20.3418 16.8734V18.4834H24.8418V16.9134ZM12.8418 6.4834C14.5018 6.4834 15.8418 7.8234 15.8418 9.4834C15.8418 11.1434 14.5018 12.4834 12.8418 12.4834C11.1818 12.4834 9.8418 11.1434 9.8418 9.4834C9.8418 7.8234 11.1818 6.4834 12.8418 6.4834Z'
                    fill='#7646FD'
                  />
                </g>
                <defs>
                  <clipPath id='clip0_1_4756'>
                    <rect
                      width='24'
                      height='24'
                      fill='white'
                      transform='translate(0.841797 0.483398)'
                    />
                  </clipPath>
                </defs>
              </svg>

              <p class='ml-5 font-lato text-base font-medium leading-6 text-left text-gray-700'>
                Groups
              </p>
            </div>
            <div className='col-start-9 col-span-4 font-lato text-base font-medium leading-6 text-left text-gray-700'>
              {data.customers_today?.Group}
            </div>
          </div>
        </div>
      </Box>
      {/*  */}
      <Box className='grid-container'>
        <div
          className='childbox1_1'
          // style={{
          //   width: '234px',
          //   height: '320px',
          //   top: '1022px',
          //   backgroundColor: '#FFFFFF',
          //   borderRadius: '10px',
          // }}
        >
          <div className='ml-5 mt-5 flex items-center'>
            <div
              className='col-start-2 col-span-4 flex items-center'
              style={{
                width: '70%',
                fontFamily: 'Noto Sans',
                fontSize: '20px',
                fontWeight: 600,
                lineHeight: '27px',
                letterSpacing: '0em',
                textAlign: 'left',
                color: '#946EFF',
              }}
            >
              Repeat Ratio
            </div>
            <div>
              <svg
                width='18'
                height='18'
                viewBox='0 0 18 18'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  d='M9 1.49854C13.143 1.49854 16.5015 4.85703 16.5015 9.00004C16.5015 13.1423 13.143 16.5 9 16.5C4.857 16.5008 1.5 13.1423 1.5 9.00004C1.49925 4.85703 4.857 1.49854 9 1.49854ZM8.997 7.68604C8.8132 7.68629 8.63589 7.75402 8.49874 7.87638C8.36158 7.99874 8.27414 8.1672 8.253 8.34979L8.24775 8.43678L8.25075 12.5633L8.25525 12.6503C8.27621 12.8332 8.36373 13.002 8.50114 13.1246C8.63855 13.2472 8.81625 13.3149 9.00037 13.3149C9.1845 13.3149 9.3622 13.2472 9.49961 13.1246C9.63702 13.002 9.72454 12.8332 9.7455 12.6503L9.75 12.5625L9.747 8.43604L9.74175 8.34828C9.72007 8.16585 9.63219 7.99773 9.49477 7.87579C9.35736 7.75386 9.17996 7.6866 8.99625 7.68678M9 4.87504C8.75106 4.87504 8.51232 4.97393 8.33629 5.14995C8.16027 5.32598 8.06137 5.56472 8.06137 5.81366C8.06137 6.0626 8.16027 6.30134 8.33629 6.47737C8.51232 6.65339 8.75106 6.75229 9 6.75229C9.24894 6.75229 9.48768 6.65339 9.66371 6.47737C9.83973 6.30134 9.93863 6.0626 9.93863 5.81366C9.93863 5.56472 9.83973 5.32598 9.66371 5.14995C9.48768 4.97393 9.24894 4.87504 9 4.87504Z'
                  fill='#BDBDBD'
                />
              </svg>
            </div>
          </div>
          <svg
            viewBox='0 0 183.71 193.04'
            style={{
              width: '100%',
              height: '100%',
            }}
          >
            <defs>
              <linearGradient
                id='gradient1'
                x1='0%'
                y1='0%'
                x2='100%'
                y2='100%'
              >
                <stop
                  offset='0%'
                  stopColor='#B347FE'
                />
                <stop
                  offset='100%'
                  stopColor='#7646FD'
                />
              </linearGradient>
              <linearGradient
                id='gradient2'
                x1='0%'
                y1='0%'
                x2='100%'
                y2='100%'
              >
                <stop
                  offset='0%'
                  stopColor='#E9C9FE'
                />
                <stop
                  offset='100%'
                  stopColor='#BAB9FF'
                />
              </linearGradient>
            </defs>
            <VictoryPie
              standalone={false}
              width={183.71}
              height={193.04}
              data={repeatRatio}
              innerRadius={68}
              labelRadius={100}
              colorScale={['url(#gradient1)', 'url(#gradient2)']}
              style={{ labels: { fill: 'none' } }}
            />
            <VictoryLabel
              textAnchor='middle'
              style={{ fontSize: 20 }}
              x={200}
              y={200}
              text=''
              labelComponent={<></>}
            />
          </svg>

          <div className='ml-5 flex justify-evenly gap-10'>
            <div>
              <svg
                width='47'
                height='19'
                viewBox='0 0 47 19'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  d='M22.8179 3.84731V12.4453H22.2359C22.1439 12.4453 22.0659 12.4293 22.0019 12.3973C21.9419 12.3653 21.8819 12.3113 21.8219 12.2353L16.8479 5.75531C16.8559 5.85531 16.8619 5.95331 16.8659 6.04931C16.8699 6.14531 16.8719 6.23531 16.8719 6.31931V12.4453H15.8519V3.84731H16.4519C16.5039 3.84731 16.5479 3.85131 16.5839 3.85931C16.6199 3.86331 16.6519 3.87331 16.6799 3.88931C16.7079 3.90131 16.7359 3.92131 16.7639 3.94931C16.7919 3.97331 16.8219 4.00531 16.8539 4.04531L21.8279 10.5193C21.8199 10.4153 21.8119 10.3153 21.8039 10.2193C21.7999 10.1193 21.7979 10.0253 21.7979 9.93731V3.84731H22.8179ZM28.6445 8.74331C28.6445 8.49531 28.6085 8.26931 28.5365 8.06531C28.4685 7.85731 28.3665 7.67931 28.2305 7.53131C28.0985 7.37931 27.9365 7.26331 27.7445 7.18331C27.5525 7.09931 27.3345 7.05731 27.0905 7.05731C26.5785 7.05731 26.1725 7.20731 25.8725 7.50731C25.5765 7.80331 25.3925 8.21531 25.3205 8.74331H28.6445ZM29.5085 11.5933C29.3765 11.7533 29.2185 11.8933 29.0345 12.0133C28.8505 12.1293 28.6525 12.2253 28.4405 12.3013C28.2325 12.3773 28.0165 12.4333 27.7925 12.4693C27.5685 12.5093 27.3465 12.5293 27.1265 12.5293C26.7065 12.5293 26.3185 12.4593 25.9625 12.3193C25.6105 12.1753 25.3045 11.9673 25.0445 11.6953C24.7885 11.4193 24.5885 11.0793 24.4445 10.6753C24.3005 10.2713 24.2285 9.80731 24.2285 9.28331C24.2285 8.85931 24.2925 8.46331 24.4205 8.09531C24.5525 7.72731 24.7405 7.40931 24.9845 7.14131C25.2285 6.86931 25.5265 6.65731 25.8785 6.50531C26.2305 6.34931 26.6265 6.27131 27.0665 6.27131C27.4305 6.27131 27.7665 6.33331 28.0745 6.45731C28.3865 6.57731 28.6545 6.75331 28.8785 6.98531C29.1065 7.21331 29.2845 7.49731 29.4125 7.83731C29.5405 8.17331 29.6045 8.55731 29.6045 8.98931C29.6045 9.15731 29.5865 9.26931 29.5505 9.32531C29.5145 9.38131 29.4465 9.40931 29.3465 9.40931H25.2845C25.2965 9.79331 25.3485 10.1273 25.4405 10.4113C25.5365 10.6953 25.6685 10.9333 25.8365 11.1253C26.0045 11.3133 26.2045 11.4553 26.4365 11.5513C26.6685 11.6433 26.9285 11.6893 27.2165 11.6893C27.4845 11.6893 27.7145 11.6593 27.9065 11.5993C28.1025 11.5353 28.2705 11.4673 28.4105 11.3953C28.5505 11.3233 28.6665 11.2573 28.7585 11.1973C28.8545 11.1333 28.9365 11.1013 29.0045 11.1013C29.0925 11.1013 29.1605 11.1353 29.2085 11.2033L29.5085 11.5933ZM39.2397 6.36731L37.2717 12.4453H36.4257C36.3217 12.4453 36.2497 12.3773 36.2097 12.2413L34.8657 8.11931C34.8337 8.02731 34.8077 7.93531 34.7877 7.84331C34.7677 7.74731 34.7477 7.65331 34.7277 7.56131C34.7077 7.65331 34.6877 7.74731 34.6677 7.84331C34.6477 7.93531 34.6217 8.02931 34.5897 8.12531L33.2217 12.2413C33.1857 12.3773 33.1057 12.4453 32.9817 12.4453H32.1777L30.2097 6.36731H31.0497C31.1337 6.36731 31.2037 6.38931 31.2597 6.43331C31.3197 6.47731 31.3597 6.52931 31.3797 6.58931L32.5437 10.5013C32.6117 10.7893 32.6657 11.0613 32.7057 11.3173C32.7417 11.1853 32.7777 11.0513 32.8137 10.9153C32.8537 10.7793 32.8957 10.6413 32.9397 10.5013L34.2237 6.56531C34.2437 6.50531 34.2777 6.45531 34.3257 6.41531C34.3777 6.37531 34.4397 6.35531 34.5117 6.35531H34.9797C35.0597 6.35531 35.1257 6.37531 35.1777 6.41531C35.2297 6.45531 35.2657 6.50531 35.2857 6.56531L36.5397 10.5013C36.5837 10.6413 36.6237 10.7793 36.6597 10.9153C36.6957 11.0513 36.7297 11.1853 36.7617 11.3173C36.7817 11.1853 36.8057 11.0533 36.8337 10.9213C36.8657 10.7853 36.8997 10.6453 36.9357 10.5013L38.1237 6.58931C38.1437 6.52531 38.1817 6.47331 38.2377 6.43331C38.2937 6.38931 38.3597 6.36731 38.4357 6.36731H39.2397Z'
                  fill='#212121'
                />
                <ellipse
                  cx='4.34069'
                  cy='9.6408'
                  rx='4.28796'
                  ry='4.29119'
                  fill='url(#paint0_linear_1_4988)'
                />
                <defs>
                  <linearGradient
                    id='paint0_linear_1_4988'
                    x1='4.34069'
                    y1='5.34961'
                    x2='4.34069'
                    y2='13.932'
                    gradientUnits='userSpaceOnUse'
                  >
                    <stop stop-color='#4E00FE' />
                    <stop
                      offset='1'
                      stop-color='#B448FF'
                    />
                  </linearGradient>
                </defs>
              </svg>
            </div>
            <svg
              width='83'
              height='19'
              viewBox='0 0 83 19'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M19.0464 8.01131C19.3824 8.01131 19.6784 7.97131 19.9344 7.89131C20.1944 7.80731 20.4104 7.69131 20.5824 7.54331C20.7584 7.39131 20.8904 7.21131 20.9784 7.00331C21.0664 6.79531 21.1104 6.56531 21.1104 6.31331C21.1104 5.80131 20.9424 5.41531 20.6064 5.15531C20.2704 4.89531 19.7664 4.76531 19.0944 4.76531H17.8224V8.01131H19.0464ZM23.0184 12.4453H21.9864C21.7744 12.4453 21.6184 12.3633 21.5184 12.1993L19.2864 9.12731C19.2184 9.03131 19.1444 8.96331 19.0644 8.92331C18.9884 8.87931 18.8684 8.85731 18.7044 8.85731H17.8224V12.4453H16.6644V3.84731H19.0944C19.6384 3.84731 20.1084 3.90331 20.5044 4.01531C20.9004 4.12331 21.2264 4.28131 21.4824 4.48931C21.7424 4.69731 21.9344 4.94931 22.0584 5.24531C22.1824 5.53731 22.2444 5.86531 22.2444 6.22931C22.2444 6.53331 22.1964 6.81731 22.1004 7.08131C22.0044 7.34531 21.8644 7.58331 21.6804 7.79531C21.5004 8.00331 21.2784 8.18131 21.0144 8.32931C20.7544 8.47731 20.4584 8.58931 20.1264 8.66531C20.2744 8.74931 20.4024 8.87131 20.5104 9.03131L23.0184 12.4453ZM27.6171 8.74331C27.6171 8.49531 27.5811 8.26931 27.5091 8.06531C27.4411 7.85731 27.3391 7.67931 27.2031 7.53131C27.0711 7.37931 26.9091 7.26331 26.7171 7.18331C26.5251 7.09931 26.3071 7.05731 26.0631 7.05731C25.5511 7.05731 25.1451 7.20731 24.8451 7.50731C24.5491 7.80331 24.3651 8.21531 24.2931 8.74331H27.6171ZM28.4811 11.5933C28.3491 11.7533 28.1911 11.8933 28.0071 12.0133C27.8231 12.1293 27.6251 12.2253 27.4131 12.3013C27.2051 12.3773 26.9891 12.4333 26.7651 12.4693C26.5411 12.5093 26.3191 12.5293 26.0991 12.5293C25.6791 12.5293 25.2911 12.4593 24.9351 12.3193C24.5831 12.1753 24.2771 11.9673 24.0171 11.6953C23.7611 11.4193 23.5611 11.0793 23.4171 10.6753C23.2731 10.2713 23.2011 9.80731 23.2011 9.28331C23.2011 8.85931 23.2651 8.46331 23.3931 8.09531C23.5251 7.72731 23.7131 7.40931 23.9571 7.14131C24.2011 6.86931 24.4991 6.65731 24.8511 6.50531C25.2031 6.34931 25.5991 6.27131 26.0391 6.27131C26.4031 6.27131 26.7391 6.33331 27.0471 6.45731C27.3591 6.57731 27.6271 6.75331 27.8511 6.98531C28.0791 7.21331 28.2571 7.49731 28.3851 7.83731C28.5131 8.17331 28.5771 8.55731 28.5771 8.98931C28.5771 9.15731 28.5591 9.26931 28.5231 9.32531C28.4871 9.38131 28.4191 9.40931 28.3191 9.40931H24.2571C24.2691 9.79331 24.3211 10.1273 24.4131 10.4113C24.5091 10.6953 24.6411 10.9333 24.8091 11.1253C24.9771 11.3133 25.1771 11.4553 25.4091 11.5513C25.6411 11.6433 25.9011 11.6893 26.1891 11.6893C26.4571 11.6893 26.6871 11.6593 26.8791 11.5993C27.0751 11.5353 27.2431 11.4673 27.3831 11.3953C27.5231 11.3233 27.6391 11.2573 27.7311 11.1973C27.8271 11.1333 27.9091 11.1013 27.9771 11.1013C28.0651 11.1013 28.1331 11.1353 28.1811 11.2033L28.4811 11.5933ZM31.7081 12.5413C31.2281 12.5413 30.8581 12.4073 30.5981 12.1393C30.3421 11.8713 30.2141 11.4853 30.2141 10.9813V7.26131H29.4821C29.4181 7.26131 29.3641 7.24331 29.3201 7.20731C29.2761 7.16731 29.2541 7.10731 29.2541 7.02731V6.60131L30.2501 6.47531L30.4961 4.59731C30.5081 4.53731 30.5341 4.48931 30.5741 4.45331C30.6181 4.41331 30.6741 4.39331 30.7421 4.39331H31.2821V6.48731H33.0401V7.26131H31.2821V10.9093C31.2821 11.1653 31.3441 11.3553 31.4681 11.4793C31.5921 11.6033 31.7521 11.6653 31.9481 11.6653C32.0601 11.6653 32.1561 11.6513 32.2361 11.6233C32.3201 11.5913 32.3921 11.5573 32.4521 11.5213C32.5121 11.4853 32.5621 11.4533 32.6021 11.4253C32.6461 11.3933 32.6841 11.3773 32.7161 11.3773C32.7721 11.3773 32.8221 11.4113 32.8661 11.4793L33.1781 11.9893C32.9941 12.1613 32.7721 12.2973 32.5121 12.3973C32.2521 12.4933 31.9841 12.5413 31.7081 12.5413ZM39.1409 6.36731V12.4453H38.5049C38.3529 12.4453 38.2569 12.3713 38.2169 12.2233L38.1329 11.5693C37.8689 11.8613 37.5729 12.0973 37.2449 12.2773C36.9169 12.4533 36.5409 12.5413 36.1169 12.5413C35.7849 12.5413 35.4909 12.4873 35.2349 12.3793C34.9829 12.2673 34.7709 12.1113 34.5989 11.9113C34.4269 11.7113 34.2969 11.4693 34.2089 11.1853C34.1249 10.9013 34.0829 10.5873 34.0829 10.2433V6.36731H35.1509V10.2433C35.1509 10.7033 35.2549 11.0593 35.4629 11.3113C35.6749 11.5633 35.9969 11.6893 36.4289 11.6893C36.7449 11.6893 37.0389 11.6153 37.3109 11.4673C37.5869 11.3153 37.8409 11.1073 38.0729 10.8433V6.36731H39.1409ZM41.8483 7.58531C42.0403 7.16931 42.2763 6.84531 42.5563 6.61331C42.8363 6.37731 43.1783 6.25931 43.5823 6.25931C43.7103 6.25931 43.8323 6.27331 43.9483 6.30131C44.0683 6.32931 44.1743 6.37331 44.2663 6.43331L44.1883 7.23131C44.1643 7.33131 44.1043 7.38131 44.0083 7.38131C43.9523 7.38131 43.8703 7.36931 43.7623 7.34531C43.6543 7.32131 43.5323 7.30931 43.3963 7.30931C43.2043 7.30931 43.0323 7.33731 42.8803 7.39331C42.7323 7.44931 42.5983 7.53331 42.4783 7.64531C42.3623 7.75331 42.2563 7.88931 42.1603 8.05331C42.0683 8.21331 41.9843 8.39731 41.9083 8.60531V12.4453H40.8343V6.36731H41.4463C41.5623 6.36731 41.6423 6.38931 41.6863 6.43331C41.7303 6.47731 41.7603 6.55331 41.7763 6.66131L41.8483 7.58531ZM46.2134 7.24931C46.3454 7.10131 46.4854 6.96731 46.6334 6.84731C46.7814 6.72731 46.9374 6.62531 47.1014 6.54131C47.2694 6.45331 47.4454 6.38731 47.6294 6.34331C47.8174 6.29531 48.0194 6.27131 48.2354 6.27131C48.5674 6.27131 48.8594 6.32731 49.1114 6.43931C49.3674 6.54731 49.5794 6.70331 49.7474 6.90731C49.9194 7.10731 50.0494 7.34931 50.1374 7.63331C50.2254 7.91731 50.2694 8.23131 50.2694 8.57531V12.4453H49.1954V8.57531C49.1954 8.11531 49.0894 7.75931 48.8774 7.50731C48.6694 7.25131 48.3514 7.12331 47.9234 7.12331C47.6074 7.12331 47.3114 7.19931 47.0354 7.35131C46.7634 7.50331 46.5114 7.70931 46.2794 7.96931V12.4453H45.2054V6.36731H45.8474C45.9994 6.36731 46.0934 6.44131 46.1294 6.58931L46.2134 7.24931ZM53.0248 6.36731V12.4453H51.9568V6.36731H53.0248ZM53.2528 4.45931C53.2528 4.56331 53.2308 4.66131 53.1868 4.75331C53.1468 4.84131 53.0908 4.92131 53.0188 4.99331C52.9508 5.06131 52.8688 5.11531 52.7728 5.15531C52.6808 5.19531 52.5828 5.21531 52.4788 5.21531C52.3748 5.21531 52.2768 5.19531 52.1848 5.15531C52.0968 5.11531 52.0188 5.06131 51.9508 4.99331C51.8828 4.92131 51.8288 4.84131 51.7888 4.75331C51.7488 4.66131 51.7288 4.56331 51.7288 4.45931C51.7288 4.35531 51.7488 4.25731 51.7888 4.16531C51.8288 4.06931 51.8828 3.98731 51.9508 3.91931C52.0188 3.84731 52.0968 3.79131 52.1848 3.75131C52.2768 3.71131 52.3748 3.69131 52.4788 3.69131C52.5828 3.69131 52.6808 3.71131 52.7728 3.75131C52.8688 3.79131 52.9508 3.84731 53.0188 3.91931C53.0908 3.98731 53.1468 4.06931 53.1868 4.16531C53.2308 4.25731 53.2528 4.35531 53.2528 4.45931ZM55.7876 7.24931C55.9196 7.10131 56.0596 6.96731 56.2076 6.84731C56.3556 6.72731 56.5116 6.62531 56.6756 6.54131C56.8436 6.45331 57.0196 6.38731 57.2036 6.34331C57.3916 6.29531 57.5936 6.27131 57.8096 6.27131C58.1416 6.27131 58.4336 6.32731 58.6856 6.43931C58.9416 6.54731 59.1536 6.70331 59.3216 6.90731C59.4936 7.10731 59.6236 7.34931 59.7116 7.63331C59.7996 7.91731 59.8436 8.23131 59.8436 8.57531V12.4453H58.7696V8.57531C58.7696 8.11531 58.6636 7.75931 58.4516 7.50731C58.2436 7.25131 57.9256 7.12331 57.4976 7.12331C57.1816 7.12331 56.8856 7.19931 56.6096 7.35131C56.3376 7.50331 56.0856 7.70931 55.8536 7.96931V12.4453H54.7796V6.36731H55.4216C55.5736 6.36731 55.6676 6.44131 55.7036 6.58931L55.7876 7.24931ZM63.589 9.47531C63.805 9.47531 63.995 9.44531 64.159 9.38531C64.323 9.32531 64.461 9.24131 64.573 9.13331C64.685 9.02531 64.769 8.89731 64.825 8.74931C64.881 8.59731 64.909 8.43131 64.909 8.25131C64.909 7.87931 64.795 7.58331 64.567 7.36331C64.343 7.14331 64.017 7.03331 63.589 7.03331C63.157 7.03331 62.827 7.14331 62.599 7.36331C62.375 7.58331 62.263 7.87931 62.263 8.25131C62.263 8.43131 62.291 8.59731 62.347 8.74931C62.407 8.89731 62.493 9.02531 62.605 9.13331C62.717 9.24131 62.855 9.32531 63.019 9.38531C63.183 9.44531 63.373 9.47531 63.589 9.47531ZM65.515 12.7753C65.515 12.6273 65.473 12.5073 65.389 12.4153C65.305 12.3233 65.191 12.2513 65.047 12.1993C64.907 12.1473 64.743 12.1113 64.555 12.0913C64.367 12.0673 64.167 12.0493 63.955 12.0373C63.747 12.0253 63.535 12.0133 63.319 12.0013C63.103 11.9893 62.895 11.9693 62.695 11.9413C62.471 12.0453 62.287 12.1773 62.143 12.3373C62.003 12.4933 61.933 12.6773 61.933 12.8893C61.933 13.0253 61.967 13.1513 62.035 13.2673C62.107 13.3873 62.215 13.4893 62.359 13.5733C62.503 13.6613 62.683 13.7293 62.899 13.7773C63.119 13.8293 63.377 13.8553 63.673 13.8553C63.961 13.8553 64.219 13.8293 64.447 13.7773C64.675 13.7253 64.867 13.6513 65.023 13.5553C65.183 13.4593 65.305 13.3453 65.389 13.2133C65.473 13.0813 65.515 12.9353 65.515 12.7753ZM66.601 6.60731V7.00331C66.601 7.13531 66.517 7.21931 66.349 7.25531L65.659 7.34531C65.795 7.60931 65.863 7.90131 65.863 8.22131C65.863 8.51731 65.805 8.78731 65.689 9.03131C65.577 9.27131 65.421 9.47731 65.221 9.64931C65.021 9.82131 64.781 9.95331 64.501 10.0453C64.221 10.1373 63.917 10.1833 63.589 10.1833C63.305 10.1833 63.037 10.1493 62.785 10.0813C62.657 10.1613 62.559 10.2473 62.491 10.3393C62.423 10.4273 62.389 10.5173 62.389 10.6093C62.389 10.7533 62.447 10.8633 62.563 10.9393C62.683 11.0113 62.839 11.0633 63.031 11.0953C63.223 11.1273 63.441 11.1473 63.685 11.1553C63.933 11.1633 64.185 11.1773 64.441 11.1973C64.701 11.2133 64.953 11.2433 65.197 11.2873C65.445 11.3313 65.665 11.4033 65.857 11.5033C66.049 11.6033 66.203 11.7413 66.319 11.9173C66.439 12.0933 66.499 12.3213 66.499 12.6013C66.499 12.8613 66.433 13.1133 66.301 13.3573C66.173 13.6013 65.987 13.8173 65.743 14.0053C65.499 14.1973 65.199 14.3493 64.843 14.4613C64.491 14.5773 64.093 14.6353 63.649 14.6353C63.205 14.6353 62.817 14.5913 62.485 14.5033C62.153 14.4153 61.877 14.2973 61.657 14.1493C61.437 14.0013 61.271 13.8293 61.159 13.6333C61.051 13.4413 60.997 13.2393 60.997 13.0273C60.997 12.7273 61.091 12.4733 61.279 12.2653C61.467 12.0573 61.725 11.8913 62.053 11.7673C61.873 11.6873 61.729 11.5813 61.621 11.4493C61.517 11.3133 61.465 11.1313 61.465 10.9033C61.465 10.8153 61.481 10.7253 61.513 10.6333C61.545 10.5373 61.593 10.4433 61.657 10.3513C61.725 10.2553 61.807 10.1653 61.903 10.0813C61.999 9.99731 62.111 9.92331 62.239 9.85931C61.939 9.69131 61.705 9.46931 61.537 9.19331C61.369 8.91331 61.285 8.58931 61.285 8.22131C61.285 7.92531 61.341 7.65731 61.453 7.41731C61.569 7.17331 61.729 6.96731 61.933 6.79931C62.137 6.62731 62.379 6.49531 62.659 6.40331C62.943 6.31131 63.253 6.26531 63.589 6.26531C63.853 6.26531 64.099 6.29531 64.327 6.35531C64.555 6.41131 64.763 6.49531 64.951 6.60731H66.601Z'
                fill='#212121'
              />
              <ellipse
                cx='5.15319'
                cy='9.6408'
                rx='4.28796'
                ry='4.29119'
                fill='url(#paint0_linear_1_4991)'
              />
              <defs>
                <linearGradient
                  id='paint0_linear_1_4991'
                  x1='5.15319'
                  y1='5.34961'
                  x2='5.15319'
                  y2='13.932'
                  gradientUnits='userSpaceOnUse'
                >
                  <stop stop-color='#957AFF' />
                  <stop
                    offset='1'
                    stop-color='#DCC5FF'
                  />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>

        {/* second  */}
        <div
          className='childbox2_2'
          
        >
          <div className='ml-5 mt-5 flex items-center'>
            <div
              className='col-start-2 col-span-4 flex items-center'
              style={{
                width: '65%',
                fontFamily: 'Noto Sans',
                fontSize: '20px',
                fontWeight: 600,
                lineHeight: '27px',
                letterSpacing: '0em',
                textAlign: 'left',
                color: '#946EFF',
              }}
            >
              Group Trend
            </div>
            <div>
              <svg
                width='18'
                height='18'
                viewBox='0 0 18 18'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  d='M9 1.49854C13.143 1.49854 16.5015 4.85703 16.5015 9.00004C16.5015 13.1423 13.143 16.5 9 16.5C4.857 16.5008 1.5 13.1423 1.5 9.00004C1.49925 4.85703 4.857 1.49854 9 1.49854ZM8.997 7.68604C8.8132 7.68629 8.63589 7.75402 8.49874 7.87638C8.36158 7.99874 8.27414 8.1672 8.253 8.34979L8.24775 8.43678L8.25075 12.5633L8.25525 12.6503C8.27621 12.8332 8.36373 13.002 8.50114 13.1246C8.63855 13.2472 8.81625 13.3149 9.00037 13.3149C9.1845 13.3149 9.3622 13.2472 9.49961 13.1246C9.63702 13.002 9.72454 12.8332 9.7455 12.6503L9.75 12.5625L9.747 8.43604L9.74175 8.34828C9.72007 8.16585 9.63219 7.99773 9.49477 7.87579C9.35736 7.75386 9.17996 7.6866 8.99625 7.68678M9 4.87504C8.75106 4.87504 8.51232 4.97393 8.33629 5.14995C8.16027 5.32598 8.06137 5.56472 8.06137 5.81366C8.06137 6.0626 8.16027 6.30134 8.33629 6.47737C8.51232 6.65339 8.75106 6.75229 9 6.75229C9.24894 6.75229 9.48768 6.65339 9.66371 6.47737C9.83973 6.30134 9.93863 6.0626 9.93863 5.81366C9.93863 5.56472 9.83973 5.32598 9.66371 5.14995C9.48768 4.97393 9.24894 4.87504 9 4.87504Z'
                  fill='#BDBDBD'
                />
              </svg>
            </div>
          </div>

          <svg style={{ width: '100%', height: '200%' }}>
            <defs>
              {/* Define gradient colors */}
              <linearGradient
                id='gradient4'
                x1='0%'
                y1='0%'
                x2='100%'
                y2='100%'
              >
                <stop
                  offset='0%'
                  stopColor='#5356FD'
                />
                <stop
                  offset='100%'
                  stopColor='#C745FD'
                />
              </linearGradient>
              <linearGradient
                id='gradient5'
                x1='0%'
                y1='0%'
                x2='100%'
                y2='100%'
              >
                <stop
                  offset='0%'
                  stopColor='#E9C8FD'
                />
                <stop
                  offset='100%'
                  stopColor='#BAB9FF'
                />
              </linearGradient>
            </defs>
            {/* Render VictoryPie with customizations */}
            <VictoryPie
              textAnchor='middle'
              verticalAnchor='middle'
              standalone={false}
              data={groupRatio}
              colorScale={gradientColors_}
              radius={80}
              labelComponent={<CustomLabel />}
              width={200}
              height={250}
              labelRadius={({ innerRadius }) => innerRadius + 40}
            />
          </svg>

          <div className='ml-5 flex justify-evenly gap-10'>
            <div>
              <svg
                width='59'
                height='19'
                viewBox='0 0 59 19'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  d='M22.7832 8.31131V11.6113C22.3512 11.9233 21.8892 12.1573 21.3972 12.3133C20.9092 12.4653 20.3732 12.5413 19.7892 12.5413C19.0972 12.5413 18.4732 12.4353 17.9172 12.2233C17.3612 12.0073 16.8852 11.7073 16.4892 11.3233C16.0972 10.9353 15.7952 10.4713 15.5832 9.93131C15.3712 9.39131 15.2652 8.79731 15.2652 8.14931C15.2652 7.49331 15.3672 6.89531 15.5712 6.35531C15.7792 5.81531 16.0732 5.35331 16.4532 4.96931C16.8332 4.58131 17.2952 4.28131 17.8392 4.06931C18.3832 3.85731 18.9912 3.75131 19.6632 3.75131C20.0032 3.75131 20.3192 3.77731 20.6112 3.82931C20.9032 3.87731 21.1732 3.94931 21.4212 4.04531C21.6692 4.13731 21.8992 4.25131 22.1112 4.38731C22.3232 4.51931 22.5212 4.66931 22.7052 4.83731L22.3752 5.36531C22.3232 5.44531 22.2552 5.49731 22.1712 5.52131C22.0912 5.54131 22.0012 5.52131 21.9012 5.46131C21.8052 5.40531 21.6952 5.33731 21.5712 5.25731C21.4472 5.17731 21.2952 5.10131 21.1152 5.02931C20.9392 4.95331 20.7292 4.88931 20.4852 4.83731C20.2452 4.78531 19.9592 4.75931 19.6272 4.75931C19.1432 4.75931 18.7052 4.83931 18.3132 4.99931C17.9212 5.15531 17.5872 5.38131 17.3112 5.67731C17.0352 5.96931 16.8232 6.32531 16.6752 6.74531C16.5272 7.16131 16.4532 7.62931 16.4532 8.14931C16.4532 8.68931 16.5292 9.17331 16.6812 9.60131C16.8372 10.0253 17.0572 10.3873 17.3412 10.6873C17.6292 10.9833 17.9772 11.2093 18.3852 11.3653C18.7932 11.5213 19.2512 11.5993 19.7592 11.5993C20.1592 11.5993 20.5132 11.5553 20.8212 11.4673C21.1332 11.3753 21.4372 11.2493 21.7332 11.0893V9.19931H20.3952C20.3192 9.19931 20.2572 9.17731 20.2092 9.13331C20.1652 9.08931 20.1432 9.03531 20.1432 8.97131V8.31131H22.7832ZM25.233 7.58531C25.425 7.16931 25.661 6.84531 25.941 6.61331C26.221 6.37731 26.563 6.25931 26.967 6.25931C27.095 6.25931 27.217 6.27331 27.333 6.30131C27.453 6.32931 27.559 6.37331 27.651 6.43331L27.573 7.23131C27.549 7.33131 27.489 7.38131 27.393 7.38131C27.337 7.38131 27.255 7.36931 27.147 7.34531C27.039 7.32131 26.917 7.30931 26.781 7.30931C26.589 7.30931 26.417 7.33731 26.265 7.39331C26.117 7.44931 25.983 7.53331 25.863 7.64531C25.747 7.75331 25.641 7.88931 25.545 8.05331C25.453 8.21331 25.369 8.39731 25.293 8.60531V12.4453H24.219V6.36731H24.831C24.947 6.36731 25.027 6.38931 25.071 6.43331C25.115 6.47731 25.145 6.55331 25.161 6.66131L25.233 7.58531ZM30.906 6.27131C31.35 6.27131 31.75 6.34531 32.106 6.49331C32.462 6.64131 32.766 6.85131 33.018 7.12331C33.27 7.39531 33.462 7.72531 33.594 8.11331C33.73 8.49731 33.798 8.92731 33.798 9.40331C33.798 9.88331 33.73 10.3153 33.594 10.6993C33.462 11.0833 33.27 11.4113 33.018 11.6833C32.766 11.9553 32.462 12.1653 32.106 12.3133C31.75 12.4573 31.35 12.5293 30.906 12.5293C30.458 12.5293 30.054 12.4573 29.694 12.3133C29.338 12.1653 29.034 11.9553 28.782 11.6833C28.53 11.4113 28.336 11.0833 28.2 10.6993C28.068 10.3153 28.002 9.88331 28.002 9.40331C28.002 8.92731 28.068 8.49731 28.2 8.11331C28.336 7.72531 28.53 7.39531 28.782 7.12331C29.034 6.85131 29.338 6.64131 29.694 6.49331C30.054 6.34531 30.458 6.27131 30.906 6.27131ZM30.906 11.6953C31.506 11.6953 31.954 11.4953 32.25 11.0953C32.546 10.6913 32.694 10.1293 32.694 9.40931C32.694 8.68531 32.546 8.12131 32.25 7.71731C31.954 7.31331 31.506 7.11131 30.906 7.11131C30.602 7.11131 30.336 7.16331 30.108 7.26731C29.884 7.37131 29.696 7.52131 29.544 7.71731C29.396 7.91331 29.284 8.15531 29.208 8.44331C29.136 8.72731 29.1 9.04931 29.1 9.40931C29.1 10.1293 29.248 10.6913 29.544 11.0953C29.844 11.4953 30.298 11.6953 30.906 11.6953ZM40.1506 6.36731V12.4453H39.5146C39.3626 12.4453 39.2666 12.3713 39.2266 12.2233L39.1426 11.5693C38.8786 11.8613 38.5826 12.0973 38.2546 12.2773C37.9266 12.4533 37.5506 12.5413 37.1266 12.5413C36.7946 12.5413 36.5006 12.4873 36.2446 12.3793C35.9926 12.2673 35.7806 12.1113 35.6086 11.9113C35.4366 11.7113 35.3066 11.4693 35.2186 11.1853C35.1346 10.9013 35.0926 10.5873 35.0926 10.2433V6.36731H36.1606V10.2433C36.1606 10.7033 36.2646 11.0593 36.4726 11.3113C36.6846 11.5633 37.0066 11.6893 37.4386 11.6893C37.7546 11.6893 38.0486 11.6153 38.3206 11.4673C38.5966 11.3153 38.8506 11.1073 39.0826 10.8433V6.36731H40.1506ZM42.918 10.9813C43.114 11.2453 43.328 11.4313 43.56 11.5393C43.792 11.6473 44.052 11.7013 44.34 11.7013C44.908 11.7013 45.344 11.4993 45.648 11.0953C45.952 10.6913 46.104 10.1153 46.104 9.36731C46.104 8.97131 46.068 8.63131 45.996 8.34731C45.928 8.06331 45.828 7.83131 45.696 7.65131C45.564 7.46731 45.402 7.33331 45.21 7.24931C45.018 7.16531 44.8 7.12331 44.556 7.12331C44.208 7.12331 43.902 7.20331 43.638 7.36331C43.378 7.52331 43.138 7.74931 42.918 8.04131V10.9813ZM42.864 7.30931C43.12 6.99331 43.416 6.73931 43.752 6.54731C44.088 6.35531 44.472 6.25931 44.904 6.25931C45.256 6.25931 45.574 6.32731 45.858 6.46331C46.142 6.59531 46.384 6.79331 46.584 7.05731C46.784 7.31731 46.938 7.64131 47.046 8.02931C47.154 8.41731 47.208 8.86331 47.208 9.36731C47.208 9.81531 47.148 10.2333 47.028 10.6213C46.908 11.0053 46.734 11.3393 46.506 11.6233C46.282 11.9033 46.006 12.1253 45.678 12.2893C45.354 12.4493 44.988 12.5293 44.58 12.5293C44.208 12.5293 43.888 12.4673 43.62 12.3433C43.356 12.2153 43.122 12.0393 42.918 11.8153V14.5033H41.844V6.36731H42.486C42.638 6.36731 42.732 6.44131 42.768 6.58931L42.864 7.30931Z'
                  fill='#212121'
                />
                <ellipse
                  cx='4.63465'
                  cy='9.6408'
                  rx='4.33582'
                  ry='4.29119'
                  fill='url(#paint0_linear_1_5009)'
                />
                <defs>
                  <linearGradient
                    id='paint0_linear_1_5009'
                    x1='4.63465'
                    y1='5.34961'
                    x2='4.63465'
                    y2='13.932'
                    gradientUnits='userSpaceOnUse'
                  >
                    <stop stop-color='#4E00FE' />
                    <stop
                      offset='1'
                      stop-color='#BB48FE'
                    />
                  </linearGradient>
                </defs>
              </svg>
            </div>
            <svg
              width='84'
              height='19'
              viewBox='0 0 84 19'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M17.3655 12.4453H16.2015V3.84731H17.3655V12.4453ZM20.227 7.24931C20.359 7.10131 20.499 6.96731 20.647 6.84731C20.795 6.72731 20.951 6.62531 21.115 6.54131C21.283 6.45331 21.459 6.38731 21.643 6.34331C21.831 6.29531 22.033 6.27131 22.249 6.27131C22.581 6.27131 22.873 6.32731 23.125 6.43931C23.381 6.54731 23.593 6.70331 23.761 6.90731C23.933 7.10731 24.063 7.34931 24.151 7.63331C24.239 7.91731 24.283 8.23131 24.283 8.57531V12.4453H23.209V8.57531C23.209 8.11531 23.103 7.75931 22.891 7.50731C22.683 7.25131 22.365 7.12331 21.937 7.12331C21.621 7.12331 21.325 7.19931 21.049 7.35131C20.777 7.50331 20.525 7.70931 20.293 7.96931V12.4453H19.219V6.36731H19.861C20.013 6.36731 20.107 6.44131 20.143 6.58931L20.227 7.24931ZM29.8705 7.81331C29.6705 7.54531 29.4545 7.35931 29.2225 7.25531C28.9905 7.14731 28.7305 7.09331 28.4425 7.09331C27.8785 7.09331 27.4445 7.29531 27.1405 7.69931C26.8365 8.10331 26.6845 8.67931 26.6845 9.42731C26.6845 9.82331 26.7185 10.1633 26.7865 10.4473C26.8545 10.7273 26.9545 10.9593 27.0865 11.1433C27.2185 11.3233 27.3805 11.4553 27.5725 11.5393C27.7645 11.6233 27.9825 11.6653 28.2265 11.6653C28.5785 11.6653 28.8845 11.5853 29.1445 11.4253C29.4085 11.2653 29.6505 11.0393 29.8705 10.7473V7.81331ZM30.9385 3.60731V12.4453H30.3025C30.1505 12.4453 30.0545 12.3713 30.0145 12.2233L29.9185 11.4853C29.6585 11.7973 29.3625 12.0493 29.0305 12.2413C28.6985 12.4333 28.3145 12.5293 27.8785 12.5293C27.5305 12.5293 27.2145 12.4633 26.9305 12.3313C26.6465 12.1953 26.4045 11.9973 26.2045 11.7373C26.0045 11.4773 25.8505 11.1533 25.7425 10.7653C25.6345 10.3773 25.5805 9.93131 25.5805 9.42731C25.5805 8.97931 25.6405 8.56331 25.7605 8.17931C25.8805 7.79131 26.0525 7.45531 26.2765 7.17131C26.5005 6.88731 26.7745 6.66531 27.0985 6.50531C27.4265 6.34131 27.7945 6.25931 28.2025 6.25931C28.5745 6.25931 28.8925 6.32331 29.1565 6.45131C29.4245 6.57531 29.6625 6.74931 29.8705 6.97331V3.60731H30.9385ZM33.7533 6.36731V12.4453H32.6853V6.36731H33.7533ZM33.9813 4.45931C33.9813 4.56331 33.9593 4.66131 33.9153 4.75331C33.8753 4.84131 33.8193 4.92131 33.7473 4.99331C33.6793 5.06131 33.5973 5.11531 33.5013 5.15531C33.4093 5.19531 33.3113 5.21531 33.2073 5.21531C33.1033 5.21531 33.0053 5.19531 32.9133 5.15531C32.8253 5.11531 32.7473 5.06131 32.6793 4.99331C32.6113 4.92131 32.5573 4.84131 32.5173 4.75331C32.4773 4.66131 32.4573 4.56331 32.4573 4.45931C32.4573 4.35531 32.4773 4.25731 32.5173 4.16531C32.5573 4.06931 32.6113 3.98731 32.6793 3.91931C32.7473 3.84731 32.8253 3.79131 32.9133 3.75131C33.0053 3.71131 33.1033 3.69131 33.2073 3.69131C33.3113 3.69131 33.4093 3.71131 33.5013 3.75131C33.5973 3.79131 33.6793 3.84731 33.7473 3.91931C33.8193 3.98731 33.8753 4.06931 33.9153 4.16531C33.9593 4.25731 33.9813 4.35531 33.9813 4.45931ZM40.7161 6.36731L38.2381 12.4453H37.2781L34.8001 6.36731H35.6701C35.7581 6.36731 35.8301 6.38931 35.8861 6.43331C35.9421 6.47731 35.9801 6.52931 36.0001 6.58931L37.5421 10.5013C37.5901 10.6493 37.6321 10.7933 37.6681 10.9333C37.7041 11.0733 37.7381 11.2133 37.7701 11.3533C37.8021 11.2133 37.8361 11.0733 37.8721 10.9333C37.9081 10.7933 37.9521 10.6493 38.0041 10.5013L39.5641 6.58931C39.5881 6.52531 39.6281 6.47331 39.6841 6.43331C39.7401 6.38931 39.8061 6.36731 39.8821 6.36731H40.7161ZM42.8236 6.36731V12.4453H41.7556V6.36731H42.8236ZM43.0516 4.45931C43.0516 4.56331 43.0296 4.66131 42.9856 4.75331C42.9456 4.84131 42.8896 4.92131 42.8176 4.99331C42.7496 5.06131 42.6676 5.11531 42.5716 5.15531C42.4796 5.19531 42.3816 5.21531 42.2776 5.21531C42.1736 5.21531 42.0756 5.19531 41.9836 5.15531C41.8956 5.11531 41.8176 5.06131 41.7496 4.99331C41.6816 4.92131 41.6276 4.84131 41.5876 4.75331C41.5476 4.66131 41.5276 4.56331 41.5276 4.45931C41.5276 4.35531 41.5476 4.25731 41.5876 4.16531C41.6276 4.06931 41.6816 3.98731 41.7496 3.91931C41.8176 3.84731 41.8956 3.79131 41.9836 3.75131C42.0756 3.71131 42.1736 3.69131 42.2776 3.69131C42.3816 3.69131 42.4796 3.71131 42.5716 3.75131C42.6676 3.79131 42.7496 3.84731 42.8176 3.91931C42.8896 3.98731 42.9456 4.06931 42.9856 4.16531C43.0296 4.25731 43.0516 4.35531 43.0516 4.45931ZM48.5384 7.81331C48.3384 7.54531 48.1224 7.35931 47.8904 7.25531C47.6584 7.14731 47.3984 7.09331 47.1104 7.09331C46.5464 7.09331 46.1124 7.29531 45.8084 7.69931C45.5044 8.10331 45.3524 8.67931 45.3524 9.42731C45.3524 9.82331 45.3864 10.1633 45.4544 10.4473C45.5224 10.7273 45.6224 10.9593 45.7544 11.1433C45.8864 11.3233 46.0484 11.4553 46.2404 11.5393C46.4324 11.6233 46.6504 11.6653 46.8944 11.6653C47.2464 11.6653 47.5524 11.5853 47.8124 11.4253C48.0764 11.2653 48.3184 11.0393 48.5384 10.7473V7.81331ZM49.6064 3.60731V12.4453H48.9704C48.8184 12.4453 48.7224 12.3713 48.6824 12.2233L48.5864 11.4853C48.3264 11.7973 48.0304 12.0493 47.6984 12.2413C47.3664 12.4333 46.9824 12.5293 46.5464 12.5293C46.1984 12.5293 45.8824 12.4633 45.5984 12.3313C45.3144 12.1953 45.0724 11.9973 44.8724 11.7373C44.6724 11.4773 44.5184 11.1533 44.4104 10.7653C44.3024 10.3773 44.2484 9.93131 44.2484 9.42731C44.2484 8.97931 44.3084 8.56331 44.4284 8.17931C44.5484 7.79131 44.7204 7.45531 44.9444 7.17131C45.1684 6.88731 45.4424 6.66531 45.7664 6.50531C46.0944 6.34131 46.4624 6.25931 46.8704 6.25931C47.2424 6.25931 47.5604 6.32331 47.8244 6.45131C48.0924 6.57531 48.3304 6.74931 48.5384 6.97331V3.60731H49.6064ZM56.2913 6.36731V12.4453H55.6553C55.5033 12.4453 55.4073 12.3713 55.3673 12.2233L55.2833 11.5693C55.0193 11.8613 54.7233 12.0973 54.3953 12.2773C54.0673 12.4533 53.6913 12.5413 53.2673 12.5413C52.9353 12.5413 52.6413 12.4873 52.3853 12.3793C52.1333 12.2673 51.9213 12.1113 51.7493 11.9113C51.5773 11.7113 51.4473 11.4693 51.3593 11.1853C51.2753 10.9013 51.2333 10.5873 51.2333 10.2433V6.36731H52.3013V10.2433C52.3013 10.7033 52.4053 11.0593 52.6133 11.3113C52.8253 11.5633 53.1473 11.6893 53.5793 11.6893C53.8953 11.6893 54.1893 11.6153 54.4613 11.4673C54.7373 11.3153 54.9913 11.1073 55.2233 10.8433V6.36731H56.2913ZM61.2787 9.70931C60.7867 9.72531 60.3667 9.76531 60.0187 9.82931C59.6747 9.88931 59.3927 9.96931 59.1727 10.0693C58.9567 10.1693 58.7987 10.2873 58.6987 10.4233C58.6027 10.5593 58.5547 10.7113 58.5547 10.8793C58.5547 11.0393 58.5807 11.1773 58.6327 11.2933C58.6847 11.4093 58.7547 11.5053 58.8427 11.5813C58.9347 11.6533 59.0407 11.7073 59.1607 11.7433C59.2847 11.7753 59.4167 11.7913 59.5567 11.7913C59.7447 11.7913 59.9167 11.7733 60.0727 11.7373C60.2287 11.6973 60.3747 11.6413 60.5107 11.5693C60.6507 11.4973 60.7827 11.4113 60.9067 11.3113C61.0347 11.2113 61.1587 11.0973 61.2787 10.9693V9.70931ZM57.8287 7.22531C58.1647 6.90131 58.5267 6.65931 58.9147 6.49931C59.3027 6.33931 59.7327 6.25931 60.2047 6.25931C60.5447 6.25931 60.8467 6.31531 61.1107 6.42731C61.3747 6.53931 61.5967 6.69531 61.7767 6.89531C61.9567 7.09531 62.0927 7.33731 62.1847 7.62131C62.2767 7.90531 62.3227 8.21731 62.3227 8.55731V12.4453H61.8487C61.7447 12.4453 61.6647 12.4293 61.6087 12.3973C61.5527 12.3613 61.5087 12.2933 61.4767 12.1933L61.3567 11.6173C61.1967 11.7653 61.0407 11.8973 60.8887 12.0133C60.7367 12.1253 60.5767 12.2213 60.4087 12.3013C60.2407 12.3773 60.0607 12.4353 59.8687 12.4753C59.6807 12.5193 59.4707 12.5413 59.2387 12.5413C59.0027 12.5413 58.7807 12.5093 58.5727 12.4453C58.3647 12.3773 58.1827 12.2773 58.0267 12.1453C57.8747 12.0133 57.7527 11.8473 57.6607 11.6473C57.5727 11.4433 57.5287 11.2033 57.5287 10.9273C57.5287 10.6873 57.5947 10.4573 57.7267 10.2373C57.8587 10.0133 58.0727 9.81531 58.3687 9.64331C58.6647 9.47131 59.0507 9.33131 59.5267 9.22331C60.0027 9.11131 60.5867 9.04731 61.2787 9.03131V8.55731C61.2787 8.08531 61.1767 7.72931 60.9727 7.48931C60.7687 7.24531 60.4707 7.12331 60.0787 7.12331C59.8147 7.12331 59.5927 7.15731 59.4127 7.22531C59.2367 7.28931 59.0827 7.36331 58.9507 7.44731C58.8227 7.52731 58.7107 7.60131 58.6147 7.66931C58.5227 7.73331 58.4307 7.76531 58.3387 7.76531C58.2667 7.76531 58.2047 7.74731 58.1527 7.71131C58.1007 7.67131 58.0567 7.62331 58.0207 7.56731L57.8287 7.22531ZM65.0535 3.60731V12.4453H63.9855V3.60731H65.0535Z'
                fill='#212121'
              />
              <ellipse
                cx='5.03699'
                cy='9.6408'
                rx='4.33582'
                ry='4.29119'
                fill='url(#paint0_linear_1_5013)'
              />
              <defs>
                <linearGradient
                  id='paint0_linear_1_5013'
                  x1='5.03699'
                  y1='5.34961'
                  x2='5.03699'
                  y2='13.932'
                  gradientUnits='userSpaceOnUse'
                >
                  <stop stop-color='#E9C9FE' />
                  <stop
                    offset='1'
                    stop-color='#957AFF'
                  />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>

        <div
          className='childbox3_3'>
          
          <div className='ml-5 mt-5 flex items-center'>
            <div
              className='col-start-2 col-span-4 flex items-center'
              style={{
                width: '60%',
                fontFamily: 'Noto Sans',
                fontSize: '20px',
                fontWeight: 600,
                lineHeight: '27px',
                letterSpacing: '0em',
                textAlign: 'left',
                color: '#946EFF',
              }}
            >
              Engagement
            </div>
            
            <svg
              width='16'
              height='16'
              viewBox='0 0 16 16'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M8 0.498535C12.143 0.498535 15.5015 3.85703 15.5015 8.00004C15.5015 12.1423 12.143 15.5 8 15.5C3.857 15.5008 0.5 12.1423 0.5 8.00004C0.49925 3.85703 3.857 0.498535 8 0.498535ZM7.997 6.68604C7.8132 6.68629 7.63589 6.75402 7.49874 6.87638C7.36158 6.99874 7.27414 7.1672 7.253 7.34979L7.24775 7.43678L7.25075 11.5633L7.25525 11.6503C7.27621 11.8332 7.36373 12.002 7.50114 12.1246C7.63855 12.2472 7.81625 12.3149 8.00037 12.3149C8.1845 12.3149 8.3622 12.2472 8.49961 12.1246C8.63702 12.002 8.72454 11.8332 8.7455 11.6503L8.75 11.5625L8.747 7.43604L8.74175 7.34828C8.72007 7.16585 8.63219 6.99773 8.49477 6.87579C8.35736 6.75386 8.17996 6.6866 7.99625 6.68678M8 3.87504C7.75106 3.87504 7.51232 3.97393 7.33629 4.14995C7.16027 4.32598 7.06137 4.56472 7.06137 4.81366C7.06137 5.0626 7.16027 5.30134 7.33629 5.47737C7.51232 5.65339 7.75106 5.75229 8 5.75229C8.24894 5.75229 8.48768 5.65339 8.66371 5.47737C8.83973 5.30134 8.93863 5.0626 8.93863 4.81366C8.93863 4.56472 8.83973 4.32598 8.66371 4.14995C8.48768 3.97393 8.24894 3.87504 8 3.87504Z'
                fill='#BDBDBD'
              />
            </svg>
          </div>
          
          <VictoryChart
            theme={VictoryTheme.material}
            domainPadding={{ y: 40, x: 28 }}
            // padding={{ left: 100, right: 50, top: 50, bottom: 50 }}
            height={300}
            width={380}
            horizontal
          >
            <VictoryAxis dependentAxis />
            <VictoryAxis />
            <defs>
              <linearGradient
                id='gradient1'
                x1='0%'
                y1='0%'
                x2='100%'
                y2='100%'
              >
                <stop
                  offset='0%'
                  stopColor='#7646FD'
                />
                <stop
                  offset='100%'
                  stopColor='#B847FE'
                />
              </linearGradient>
              <linearGradient
                id='gradient2'
                x1='0%'
                y1='0%'
                x2='100%'
                y2='100%'
              >
                <stop
                  offset='0%'
                  stopColor='#BAB9FF'
                />
                <stop
                  offset='100%'
                  stopColor='#EDB9FF'
                />
              </linearGradient>
              <linearGradient
                id='gradient3'
                x1='0%'
                y1='0%'
                x2='100%'
                y2='100%'
              >
                <stop
                  offset='0%'
                  stopColor='#9071FD'
                />
                <stop
                  offset='100%'
                  stopColor='#D971FD'
                />
              </linearGradient>
            </defs>
            <VictoryBar
              horizontal
              data={engagement}
              x='category'
              y='value'
              barWidth={({ index }) => 45}
              style={{
                data: {
                  fill: ({ datum }) => datum.fill,
                  height: '25px',
                  // gradientColorsEng[dataEngagement.indexOf(datum)],
                },
              }}
            />
          </VictoryChart>
        </div>

        
        
      </Box>
      {/* Fourth Gender Time Line */}
      <Box className='chartsdashboard'> 
      <div
          className='flex flex-col space-between'
          // style={{
          //   // width: '962px',
          //   // height: '416px',
          //   // top: '1022px',
          //   // backgroundColor: '#FFFFFF',
          //   // borderRadius: '10px',
          // }}
        >
          <div className='ml-5  flex items-center'>
            <div
              className='col-start-2 col-span-4 flex items-center'
              style={{
                width: '25%',
                fontFamily: 'Noto Sans',
                fontSize: '20px',
                fontWeight: 600,
                lineHeight: '27px',
                letterSpacing: '0em',
                textAlign: 'left',
                color: '#946EFF',
              }}
            >
              Gender Timeline
            </div>

            <svg
              width='16'
              height='16'
              viewBox='0 0 16 16'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M8 0.498535C12.143 0.498535 15.5015 3.85703 15.5015 8.00004C15.5015 12.1423 12.143 15.5 8 15.5C3.857 15.5008 0.5 12.1423 0.5 8.00004C0.49925 3.85703 3.857 0.498535 8 0.498535ZM7.997 6.68604C7.8132 6.68629 7.63589 6.75402 7.49874 6.87638C7.36158 6.99874 7.27414 7.1672 7.253 7.34979L7.24775 7.43678L7.25075 11.5633L7.25525 11.6503C7.27621 11.8332 7.36373 12.002 7.50114 12.1246C7.63855 12.2472 7.81625 12.3149 8.00037 12.3149C8.1845 12.3149 8.3622 12.2472 8.49961 12.1246C8.63702 12.002 8.72454 11.8332 8.7455 11.6503L8.75 11.5625L8.747 7.43604L8.74175 7.34828C8.72007 7.16585 8.63219 6.99773 8.49477 6.87579C8.35736 6.75386 8.17996 6.6866 7.99625 6.68678M8 3.87504C7.75106 3.87504 7.51232 3.97393 7.33629 4.14995C7.16027 4.32598 7.06137 4.56472 7.06137 4.81366C7.06137 5.0626 7.16027 5.30134 7.33629 5.47737C7.51232 5.65339 7.75106 5.75229 8 5.75229C8.24894 5.75229 8.48768 5.65339 8.66371 5.47737C8.83973 5.30134 8.93863 5.0626 8.93863 4.81366C8.93863 4.56472 8.83973 4.32598 8.66371 4.14995C8.48768 3.97393 8.24894 3.87504 8 3.87504Z'
                fill='#BDBDBD'
              />
            </svg>
          </div>
          <VictoryChart
            width={600}
            height={210}
            theme={VictoryTheme.material}
            domainPadding={{ y: 50, x: 15 }}
            // padding={{ left: 100, right: 50, top: 50, bottom: 50 }}
          >
            <VictoryAxis dependentAxis />
            <VictoryAxis />
            <defs>
              <linearGradient
                id='gradient1'
                x1='0%'
                y1='0%'
                x2='100%'
                y2='100%'
              >
                <stop
                  offset='0%'
                  stopColor='#7646FD'
                />
                <stop
                  offset='100%'
                  stopColor='#B847FE'
                />
              </linearGradient>
              <linearGradient
                id='gradient2'
                x1='0%'
                y1='0%'
                x2='100%'
                y2='100%'
              >
                <stop
                  offset='0%'
                  stopColor='#BAB9FF'
                />
                <stop
                  offset='100%'
                  stopColor='#EDB9FF'
                />
              </linearGradient>
              <linearGradient
                id='gradient3'
                x1='0%'
                y1='0%'
                x2='100%'
                y2='100%'
              >
                <stop
                  offset='0%'
                  stopColor='#9071FD'
                />
                <stop
                  offset='100%'
                  stopColor='#D971FD'
                />
              </linearGradient>
            </defs>
            <VictoryStack
            // style={{
            //   data: {
            //     fill: ({ datum }) => datum.fill,
            //     height: '25px',
            //   },
            // }}
            >
              <VictoryBar
                x='hour'
                y='male_count'
                data={data.genderTimeLine}
                barWidth={({ index }) => 18}
                style={{
                  data: {
                    fill: ({ datum }) => 'url(#gradient3)',
                    height: '18.2px',
                  },
                }}
              />
              <VictoryBar
                x='hour'
                y='female_count'
                data={data.genderTimeLine}
                barWidth={({ index }) => 18}
                style={{
                  data: {
                    fill: ({ datum }) => 'url(#gradient1)',
                    height: '18.2px',
                  },
                }}
              />
            </VictoryStack>
          </VictoryChart>
          {/* <Barchart
            data={dataGender}
            xKey='name'
            yKey='pv'
          /> */}
        </div>

      </Box>
      <Box className='tabledashboard'>
        <TableCustomer />
      </Box>

      {/* Row 2: CCTV Video + card */}

      {/* <Box
          gridColumn='span 9'
          gridRow='span 3'
          backgroundColor={colors.primary[400]}
          border={`1px solid ${colors.primary[900]}`}
          borderRadius='20px'
        >
          <Box
            mt='10px'
            p='0 0px'
            display='flex '
            justifyContent='space-between'
            alignItems='center'
          >
            <Box>
              <Typography
                variant='h5'
                fontWeight='600'
                margin='15px 0 0 25px'
                color={colors.grey[100]}
              >
                CCTV VIDEO
              </Typography>
              <Typography
                variant='h3'
                fontWeight='bold'
                marginLeft='25px'
                color={
                  theme.palette.mode === 'dark' ? colors.greenAccent[500] : colors.blueAccent[150]
                }
                marginBottom='5px'
              >
                Live
              </Typography>
            </Box>
          </Box>
          <Box
            height='250px'
            m='0px 0 0 0'
            display='flex'
            justifyContent='center'
          >
            <CCTVVideo
              customKey={3}
              height='315vh'
              isDashboard={true}
            />
          </Box>
        </Box> */}

      {/* CARD */}
      {/* <Box
          gridColumn='span 3'
          gridRow='span 3'
          backgroundColor={colors.primary[400]}
          border={`1px solid ${colors.primary[900]}`}
          borderRadius='20px'
        >
          <Box
            mt='10px'
            p='0 0px'
            display='flex '
            justifyContent='space-between'
            alignItems='center'
          >
            <Box>
              <Typography
                variant='h5'
                fontWeight='700'
                margin='15px 0 15px 35px'
                alignItems='center'
                color={colors.grey[200]}
              >
                CUSTOMERS TODAY
              </Typography>
            </Box>
          </Box>

          <Box
            display='flex'
            flexDirection='column' // Set the container to display items vertically
            alignItems='center'
          >
            {[
              {
                icon: (
                  <LoginIcon
                    sx={{
                      fontSize: '26px',
                      color:
                        theme.palette.mode === 'dark'
                          ? colors.redAccent[500]
                          : colors.blueAccent[150],
                    }}
                  />
                ),
                label: 'Entered',
                value: data.customers_today?.Entered,
              },
              {
                icon: (
                  <LogoutIcon
                    sx={{
                      fontSize: '26px',
                      color:
                        theme.palette.mode === 'dark'
                          ? colors.redAccent[500]
                          : colors.blueAccent[150],
                    }}
                  />
                ),
                label: 'Left',
                value: data.customers_today?.Left,
              },
              {
                icon: (
                  <StorefrontIcon
                    sx={{
                      fontSize: '26px',
                      color:
                        theme.palette.mode === 'dark'
                          ? colors.redAccent[500]
                          : colors.blueAccent[150],
                    }}
                  />
                ),
                label: 'In-Store',
                value: data.customers_today?.In_store,
              },
              {
                icon: (
                  <PersonAddIcon
                    sx={{
                      fontSize: '26px',
                      color:
                        theme.palette.mode === 'dark'
                          ? colors.redAccent[500]
                          : colors.blueAccent[150],
                    }}
                  />
                ),
                label: 'New',
                value: data.customers_today?.New,
              },
              {
                icon: (
                  <ReplayIcon
                    sx={{
                      fontSize: '26px',
                      color:
                        theme.palette.mode === 'dark'
                          ? colors.redAccent[500]
                          : colors.blueAccent[150],
                    }}
                  />
                ),
                label: 'Returning',
                value: data.customers_today?.Repeating,
              },
              {
                icon: (
                  <GroupsIcon
                    sx={{
                      fontSize: '26px',
                      color:
                        theme.palette.mode === 'dark'
                          ? colors.redAccent[500]
                          : colors.blueAccent[150],
                    }}
                  />
                ),
                label: 'Groups',
                value: data.customers_today?.Group,
              },
            ].map((item, index) => (
              <Box
                key={index}
                p='15px 15px'
                m='0px 25px'
                display='flex'
                justifyContent='space-between'
                width='100%' // Make each row equally spaced and centered
              >
                <Box
                  display='flex'
                  alignItems='center'
                >
                  {item.icon}
                  <Typography
                    variant='h5'
                    fontWeight='600'
                    color={colors.grey[100]}
                    paddingLeft='10px'
                  >
                    {item.label}
                  </Typography>
                </Box>
                <Typography
                  variant='h5'
                  fontWeight='600'
                  color={colors.grey[100]}
                  paddingRight='8px'
                >
                  {item.value}
                </Typography>
              </Box>
            ))}
          </Box>
        </Box> */}

      {/* ROW 3: Gender, Repeat Ratio Pie Chart, Group Trend, Engagement, BAR Graph */}
      {/* Gender Ratio Pie */}
      {/* <Box
          gridColumn='span 4'
          gridRow='span 2'
          backgroundColor={colors.primary[400]}
          border={`1px solid ${colors.primary[900]}`}
          borderRadius='20px'
        >
          <Box
            mt='25px'
            ml='20px'
          >
            <Typography
              variant='h5'
              fontWeight='600'
              color={colors.grey[100]}
            >
              GENDER RATIO
            </Typography>
          </Box>

          {data.gender_ratio === undefined ? (
            <Typography>Loading</Typography>
          ) : (
            <Box height='220px'>
              <PieChart
                isDashboard={true}
                data={data.gender_ratio}
              />
            </Box>
          )}
        </Box> */}

      {/* <Box
          gridColumn='span 4'
          gridRow='span 2'
          backgroundColor={colors.primary[400]}
          border={`1px solid ${colors.primary[900]}`}
          borderRadius='20px'
        >
          <Box
            mt='25px'
            ml='20px'
          >
            <Typography
              variant='h5'
              fontWeight='600'
              color={colors.grey[100]}
            >
              REPEAT RATIO
            </Typography>
          </Box>

          {data.repeat_ratio !== undefined ? (
            <Box height='220px'>
              <RepeatRatioPie
                isDashboard={true}
                data={data.repeat_ratio}
              />
            </Box>
          ) : (
            <Typography>Loading</Typography>
          )}
        </Box>

        <Box
          gridColumn='span 4'
          gridRow='span 2'
          backgroundColor={colors.primary[400]}
          border={`1px solid ${colors.primary[900]}`}
          borderRadius='20px'
        >
          <Box
            mt='25px'
            ml='20px'
          >
            <Typography
              variant='h5'
              fontWeight='600'
              color={colors.grey[100]}
            >
              GROUP RATIO
            </Typography>
          </Box>

          {data.group_ratio === undefined ? (
            <Typography>Loading</Typography>
          ) : (
            <Box height='220px'>
              <PieChartGroup
                isDashboard={true}
                data={data.group_ratio}
              />
            </Box>
          )}
        </Box> */}

      {/* ROW: ENgagement ad Gender BARS */}

      {/* <Box
          gridColumn='span 6'
          gridRow='span 2'
          backgroundColor={colors.primary[400]}
          border={`1px solid ${colors.primary[900]}`}
          borderRadius='20px'
        >
          <Typography
            variant='h5'
            fontWeight='600'
            sx={{ padding: '30px 30px 0 30px' }}
          >
            DAILY GENDER DISTRIBUTION
          </Typography>
          {data.gender_distribution !== undefined ? (
            <Box
              height='250px'
              mt='-20px'
            >
              <BarChart
                height='30vh'
                isDashboard={true}
                data={data.gender_distribution}
              />
            </Box>
          ) : (
            <Typography>Loading</Typography>
          )}
        </Box>

        <Box
          gridColumn='span 6'
          gridRow='span 2'
          backgroundColor={colors.primary[400]}
          p='30px'
          border={`1px solid ${colors.primary[900]}`}
          borderRadius='20px'
        >
          <Typography
            variant='h5'
            fontWeight='600'
          >
            ENGAGEMENT
          </Typography>
          {data.engagement !== undefined ? (
            <Box
              height='250px'
              mt='-20px'
            >
              <EngagementBarGraph
                height='30vh'
                isDashboard={true}
                data={data.engagement}
              />
            </Box>
          ) : (
            <Typography>Loading</Typography>
          )}
        </Box> */}

      {/* USERS DATA TABLE */}
      {/* <Box
          gridColumn='span 12'
          height={300}
          backgroundColor={colors.primary[400]}
        >
          {data.table !== undefined ? (
            <Box
              height={350}
              sx={{ marginBottom: '35px' }}
            >
              <CustomerTable
                isDashboard={true}
                users={data.table}
                height='300px'
              />
            </Box>
          ) : (
            <Typography>Loading</Typography>
          )}
        </Box> */}

      {/* XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX */}

      {/*  four stat boxes 

        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={count}
            subtitle="PEOPLE COUNT"
            progress="0.75"
            increase={time}
            icon={
              <PeopleIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>

        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={groupCount}
            subtitle="GROUP COUNT"
            progress="0.80"
            increase={time}
            icon={
              <GroupsIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>

        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={unknown}
            subtitle="MEN"
            progress="0.50"
            increase="+21%"
            icon={
              <ManIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={female}
            subtitle="WOMEN"
            progress="0.30"
            increase="+5%"
            icon={
              <Woman2Icon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box> */}

      {/* ROW 3: CCTV Video and Min/Max Count per minute Line Graph */}
      {/* <Box
          gridColumn="span 5"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
        >
          <Box
            mt="25px"
            p="0 30px"
            display="flex "
            justifyContent="space-between"
            alignItems="center"
          >
            <Box>
              <Typography
                variant="h5"
                fontWeight="600"
                color={colors.grey[100]}
              >
                CCTV VIDEO
              </Typography>
              <Typography
                variant="h3"
                fontWeight="bold"
                color={colors.greenAccent[500]}
                marginBottom="5px"
              >
                Live
              </Typography>
            </Box>
          </Box>
          <Box
            height="250px"
            m="0px 0 0 0"
            display="flex"
            justifyContent="center"
          >
            <CCTVVideo isDashboard={true} height="180vh" />
          </Box>
        </Box> */}

      {/* <Box
          gridColumn="span 7"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
        >
          <Box
            mt="25px"
            p="0 30px"
            display="flex "
            justifyContent="space-between"
            alignItems="center"
          >
            <Box>
              <Typography
                variant="h5"
                fontWeight="600"
                color={colors.grey[100]}
              >
                MIN/MAX COUNT PER MINUTE
              </Typography>
              <Typography
                variant="h3"
                fontWeight="bold"
                color={colors.greenAccent[500]}
              >
                Min and Max people in a minute
              </Typography>
            </Box>
            <Box>
              <IconButton>
                <DownloadOutlinedIcon
                  sx={{ fontSize: "26px", color: colors.greenAccent[500] }}
                />
              </IconButton>
            </Box>
          </Box>
          <Box height="250px" m="-20px 0 0 0">
            <CountLiveMinute isDashboard={true} />
          </Box>
        </Box> */}

      {/* LINE live */}

      {/* <Box
          gridColumn="span 12"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
        >
          <Box
            mt="25px"
            p="0 30px"
            display="flex "
            justifyContent="space-between"
            alignItems="center"
          >
            <Box>
              <Typography
                variant="h5"
                fontWeight="600"
                color={colors.grey[100]}
              >
                LIVE COUNTS
              </Typography>
              <Typography
                variant="h3"
                fontWeight="bold"
                color={colors.greenAccent[500]}
              >
                Individual | Group
              </Typography>
            </Box>
          </Box>
          <Box height="250px" m="-20px 0 0 0">
            <CurrentCountsLine isDashboard={true} />
          </Box>
        </Box> */}

      {/* LINE GCOUNT */}
      {/* <Box
          gridColumn="span 6"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
        >
          <Box
            mt="25px"
            p="0 30px"
            display="flex "
            justifyContent="space-between"
            alignItems="center"
          >
            <Box>
              <Typography
                variant="h5"
                fontWeight="600"
                color={colors.grey[100]}
              >
                GROUP COUNT HOURLY
              </Typography>
              <Typography
                variant="h3"
                fontWeight="bold"
                color={colors.greenAccent[500]}
              >
                18 groups today
              </Typography>
            </Box>
          </Box>
          <Box height="250px" m="-20px 0 0 0">
            <GCountLineChart isDashboard={true} />
          </Box>
        </Box> */}

      {/* ROW 4 */}

      {/* LINE */}
      {/* <Box
          gridColumn="span 7"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
        >
          <Box
            mt="25px"
            p="0 30px"
            display="flex "
            justifyContent="space-between"
            alignItems="center"
          >
            <Box>
              <Typography
                variant="h5"
                fontWeight="600"
                color={colors.grey[100]}
              >
                HOURLY FOOTFALL
              </Typography>
              <Typography
                variant="h3"
                fontWeight="bold"
                color={colors.greenAccent[500]}
              >
                XXX individuals today
              </Typography>
            </Box>
            <Box>
              <IconButton>
                <DownloadOutlinedIcon
                  sx={{ fontSize: "26px", color: colors.greenAccent[500] }}
                />
              </IconButton>
            </Box>
          </Box>
          <Box height="250px" m="-20px 0 0 0">
            <CountLineChart isDashboard={true} />
          </Box>
        </Box> */}
    </Box>

    // </Box>
  )
}

export default EEDepartmentDashboard
