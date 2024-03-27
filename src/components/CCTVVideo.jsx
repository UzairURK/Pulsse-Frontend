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



  return (
    
      <>
        {/* Use apiData.frame instead of frameData.frame */}
        {customKey === undefined ? (
          <Typography>Loading</Typography>
        ) : (
          <img
            alt='Frame'
            style={{width: '100%', height: '100%', borderRadius: '10px'}}
            src={`${API_IP}video_feed/${customKey}`}
          />
        )}
      </>
      
      
    
  )
}

export default CCTVVideo
