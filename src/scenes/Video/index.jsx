import { useContext } from 'react'
import { Box } from "@mui/material";
import Header from "../../components/Header";
import CCTVVideo from "../../components/CCTVVideo"
import SidebarContext from '../../scenes/global/SidebarContextt/SidebarContext'
import VideoImg from './Assets/VideoImg.jpg';
const transitionStyle = {
  transition: 'margin-top 0.3s ease-in-out, margin-left 0.3s ease-in-out',
};
const CCTV = () => {
  const { sidebarExpanded } = useContext(SidebarContext)
  const gridItemStyle = {
    width: '368.65px',
    height: '201.65px',
    top: '47px',
    borderRadius: '10px',
    // Add other styles as needed
  };

  return (
    <Box mt={sidebarExpanded.isCollapsed ? 10 : 10}
         ml={sidebarExpanded.isCollapsed ? 10 : 34}
         sx={transitionStyle}
    >
      <Header title="CCTV" subtitle="" />
      {/* <Box height="75vh">
        <CCTVVideo />
      </Box> */}
      <div className="grid grid-cols-12 gap-4"
           style={{ width: '1552px', height: '890px', top: '100px', left: '138px', padding: '0px 1px 0px 0px' }}
      >
      {/* First Row */}
        <div className="col-span-6 p-4 grid grid-cols-12 gap-4" style={{ width: '762.77px', height: '419.44px', top: '47px', left: '788.23px', borderRadius: '10px', boxShadow: '0px 2px 10px 0px #0000001A' }}>
          
          <div className="col-span-6" style={gridItemStyle}>
          {/* <img src={VideoImg} style={{width: '100%', height: '100%', borderRadius: '10px'}} alt="Video" /> */}
          <CCTVVideo customKey={3}
              height='315vh'
              isDashboard={true}/>
          </div>
          <div className="col-span-6" style={gridItemStyle}>
          <CCTVVideo customKey={3}
              height='315vh'
              isDashboard={true}/>
          </div>

      {/* Second Row */}
          <div className="col-span-6" style={gridItemStyle}>
          <CCTVVideo customKey={3}
              height='315vh'
              isDashboard={true}/>
          </div>
          <div className="col-span-6" style={gridItemStyle}>
          <CCTVVideo customKey={3}
              height='315vh'
              isDashboard={true}/>
          </div>
        </div>
        
        <div className="col-span-6 p-4" style={{ width: '762.77px', height: '419.44px', top: '47px', left: '788.23px', borderRadius: '10px' }}>
        <CCTVVideo customKey={3}
              height='315vh'
              isDashboard={true}/>
        </div>

      {/* Second Row */}
        <div className="col-span-6 p-4" style={{ width: '762.77px', height: '419.44px', top: '47px', left: '788.23px', borderRadius: '10px'}}>
        <CCTVVideo customKey={3}
              height='315vh'
              isDashboard={true}/>
        </div>
        <div className="col-span-6 p-4 grid grid-cols-12 gap-4" style={{ width: '762.77px', height: '419.44px', top: '47px', left: '788.23px', borderRadius: '10px', boxShadow: '0px 2px 10px 0px #0000001A' }}>
        <div className="col-span-6" style={gridItemStyle}>
        <CCTVVideo customKey={3}
              height='315vh'
              isDashboard={true}/>
          </div>
          <div className="col-span-6" style={gridItemStyle}>
          <CCTVVideo customKey={3}
              height='315vh'
              isDashboard={true}/>
          </div>

      {/* Second Row */}
          <div className="col-span-6" style={gridItemStyle}>
          <CCTVVideo customKey={3}
              height='315vh'
              isDashboard={true}/>
          </div>
          <div className="col-span-6" style={gridItemStyle}>
          <CCTVVideo customKey={3}
              height='315vh'
              isDashboard={true}/>
          </div>
          </div>

    </div>
    </Box>
  );
};

export default CCTV;