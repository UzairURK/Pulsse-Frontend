import React, { useState, useEffect } from 'react'
import { Typography, useTheme } from '@mui/material'
import { tokens } from '../theme'
import { useApi } from '../scenes/global/ApiContext' // Import the useApi hook
import Slider from '@mui/material/Slider'
import { API_IP } from '../config'

const CCTVVideo = ({ isDashboard = false, height, customKey }) => {
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)
  const [frameData, setFrameData] = useState(null)

  const [apiData, setApiData] = useState({
    frame: null,
    time: null,
  })

  // useEffect(() => {
  //   const eventSource = new EventSource('https://3762-39-60-208-57.ngrok.io/video_feed')

  //   eventSource.onmessage = event => {

  //     setFrameData(event.data)
  //   }

  //   return () => {
  //     eventSource.close()
  //   }
  // })

  // if (!frameData) {
  //   return <div>Loading...</div>
  // }

  // const base64Image = data:image/jpeg;base64, ${frameData};

  // const [sliderValue, setSliderValue] = useState(35);

  // const fetchDataFromApi = async () => {
  //   try {
  //     const response = await fetch(`${API_IP}/get_frame/${sliderValue}`);

  //     if (!response.ok) {
  //       throw new Error('Network response was not ok');
  //     }

  //     const jsonData = await response.json();

  //     setApiData({
  //       frame: jsonData.frame,
  //       time: jsonData.time,
  //     });
  //   } catch (error) {
  //     console.error('Error fetching data:', error);
  //   }
  // };

  // const handleSliderChange = (event, newValue) => {
  //   setSliderValue(newValue);
  // };

  // const handleSliderChangeCommitted = (event, newValue) => {
  //   fetchDataFromApi();
  // };

  // useEffect(() => {
  //   fetchDataFromApi(); // Fetch data initially

  //   // Set up a timer to fetch data every 5 seconds (5000 milliseconds)
  //   const interval = setInterval(fetchDataFromApi, 500);

  //   // Clean up the timer when the component unmounts
  //   return () => clearInterval(interval);
  // }, [sliderValue]);

  // if (!apiData.frame) {
  //   return <div>Loading...</div>;
  // }

  return (
    <div
      className='cctv-video'
      style={{ padding: '10px' }}
    >
      <div className='video-container'>
        {/* Use apiData.frame instead of frameData.frame */}
        {customKey === undefined ? (
          <Typography>Loading</Typography>
        ) : (
          <img
            alt='Frame'
            height={height}
            src={`${API_IP}video_feed/${customKey}`}
          />
        )}
      </div>
      {/* <div
        className='slider-container'
        style={{ padding: '10px' }}
      >
        <Slider
          // value={sliderValue}
          // onChange={handleSliderChange}
          // onChangeCommitted={handleSliderChangeCommitted}
          min={0}
          max={250}
          step={1}
          valueLabelDisplay='auto'
          valueLabelFormat={value => `${value}%`}
          defaultValue={35}
        />
      </div> */}
    </div>
  )
}

export default CCTVVideo
