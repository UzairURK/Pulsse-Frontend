import { useState, useContext } from 'react'
import { ProSidebar, Menu, MenuItem } from 'react-pro-sidebar'
import { Box, IconButton, Typography, useTheme } from '@mui/material'
import { Link, useNavigate } from 'react-router-dom'
import 'react-pro-sidebar/dist/css/styles.css'
import { tokens } from '../../theme'
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined'
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined'
import BarChartOutlinedIcon from '@mui/icons-material/BarChartOutlined'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import SettingsIcon from '@mui/icons-material/Settings'
import ContactPageIcon from '@mui/icons-material/ContactPage'
import PieChartOutlineOutlinedIcon from '@mui/icons-material/PieChartOutlineOutlined'
import LogoutIcon from '@mui/icons-material/Logout'
import VideocamIcon from '@mui/icons-material/Videocam'
import TimelineOutlinedIcon from '@mui/icons-material/TimelineOutlined'
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined'
import TrendingUpIcon from '@mui/icons-material/TrendingUp'
import AuthService from '../../api_services/auth.service'
import ISDepartmentDashboard from '../dashboard/ISDepartmentDashboard'
import Person2OutlinedIcon from '@mui/icons-material/Person2Outlined'
import DataObjectOutlinedIcon from '@mui/icons-material/DataObjectOutlined'
import SidebarContext from './SidebarContextt/SidebarContext'
// Menu Item Component
const Item = ({ title, to, icon, selected, setSelected, setChild, left }) => {
  // console.log(selected)
  const theme = useTheme()
  const navigate = useNavigate()
  const colors = tokens(theme.palette.mode)
  // Determine the color based on the title
  const textColor =
    title === 'Home' ||
    title === 'User' ||
    title === 'Branches' ||
    title === 'Settings' ||
    title === 'Logout User'
      ? '#777777'
      : '#000000'
  const fontsize =
    title === 'Home' ||
    title === 'User' ||
    title === 'Branches' ||
    title === 'Settings' ||
    title === 'Logout User'
      ? '14px'
      : '12px'
  const fontfamily =
    title === 'Home' ||
    title === 'User' ||
    title === 'Branches' ||
    title === 'Settings' ||
    title === 'Logout User'
      ? 'Product Sans'
      : 'Noto Sans JP'
  const fontWeight =
    title === 'Home' ||
    title === 'User' ||
    title === 'Branches' ||
    title === 'Settings' ||
    title === 'Logout User'
      ? 700
      : 400
  const lineheight =
    title === 'Home' ||
    title === 'User' ||
    title === 'Branches' ||
    title === 'Settings' ||
    title === 'Logout User'
      ? '16.98px'
      : '17.38px'
  return (
    <Box>
      <MenuItem
        active={selected === title}
        style={{
          color: textColor,
          width: '100%',
          fontFamily: fontfamily,
          fontSize: '20px',
          fontWeight: fontWeight,
          lineHeight: lineheight,
          letterSpacing: '0em',
          marginLeft: left, // Adjust this value as needed
        }}
        onClick={() => {
          setSelected(title)
          if (title === 'CS Department' || title === 'IS Department' || title === 'EE Department') {
            setChild('Branch')
          } else if (
            title === 'User Management' ||
            title === 'Customer Management' ||
            title === 'Contact' ||
            title === 'Profile Form' ||
            title === 'CCTV Video'
          ) {
            setChild('User')
          } else {
            setChild('')
          }
          if (title === 'Logout User') {
            AuthService.logout()
              .then(res => console.log(res))
              .catch(err => console.log(err))

            sessionStorage.clear()

            navigate(0)
          }
        }}
        icon={icon}
        color={selected === title ? '#4E00FE' : '#00000'}
        
      >
        <Typography>{title}</Typography>
        <Link to={to} />
      </MenuItem>
    </Box>
  )
}

const Sidebar = () => {
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [selected, setSelected] = useState('Dashboard')
  const [child, setChild] = useState('')
  const [isExpanded, setIsExpanded] = useState(false)
  const { sidebarExpanded, setSidebarExpanded } = useContext(SidebarContext)
  // console.log(sidebarExpanded)
  return (
    <Box
      sx={{
        width: '20px',
        height: '100vh',
        position: 'fixed',
        paddingTop: '70px',
        backgroundColor: 'white',
        '& .pro-sidebar-inner': {
          background: `${colors.primary[400]} !important`,
        },
        '& .pro-icon-wrapper': {
          backgroundColor: 'transparent !important',
        },
        // '& .pro-inner-item': {
        //   padding: '5px 30px 5px 20px !important',
        // },
        '& .pro-inner-item:hover': {
          color: '#4E00FE !important', //#187ed9
          // Animation properties
          animationTimingFunction: 'ease-out',
          animationDuration: '300ms',
        },

        '& .pro-menu-item.active': {
          color: '#4C00E6 !important',
          background: '#E2D5FF',
          borderRadius: '5px',
        },
      }}
    >
      <ProSidebar
        collapsed={isExpanded}
        onMouseEnter={() => {
          setIsExpanded(false)
          setSidebarExpanded({ ...sidebarExpanded, isCollapsed: false })
          // console.log(sidebarExpanded.isCollapsed)
        }}
        onMouseLeave={() => {
          setIsExpanded(true)
          setSidebarExpanded({ ...sidebarExpanded, isCollapsed: true })
          // console.log(sidebarExpanded.isCollapsed)
        }}

        // onMouseLeave={() => setIsExpanded(true)}
      >
        <Menu iconShape='square'>
          <Box
            paddingLeft={isCollapsed ? '5%' : '5%'}
            paddingRight={isCollapsed ? '5%' : '5%'}
            // width={'10px'}
          >
            {/* Menu Items */}
            <Item
              title='Home'
              to='/'
              icon={
                <svg
                  width='28'
                  height='29'
                  viewBox='0 0 28 29'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    d='M23.3334 9.884L16.3334 3.74733C15.6918 3.17339 14.861 2.85608 14.0001 2.85608C13.1392 2.85608 12.3085 3.17339 11.6668 3.74733L4.66678 9.884C4.29621 10.2154 4.00049 10.622 3.79933 11.0766C3.59816 11.5313 3.49616 12.0235 3.50011 12.5207V22.7173C3.50011 23.6456 3.86886 24.5358 4.52524 25.1922C5.18161 25.8486 6.07185 26.2173 7.00011 26.2173H21.0001C21.9284 26.2173 22.8186 25.8486 23.475 25.1922C24.1314 24.5358 24.5001 23.6456 24.5001 22.7173V12.509C24.5024 12.0138 24.3996 11.5238 24.1985 11.0713C23.9974 10.6188 23.7025 10.2141 23.3334 9.884ZM16.3334 23.884H11.6668V18.0507C11.6668 17.7412 11.7897 17.4445 12.0085 17.2257C12.2273 17.0069 12.524 16.884 12.8334 16.884H15.1668C15.4762 16.884 15.7729 17.0069 15.9917 17.2257C16.2105 17.4445 16.3334 17.7412 16.3334 18.0507V23.884ZM22.1668 22.7173C22.1668 23.0268 22.0439 23.3235 21.8251 23.5423C21.6063 23.7611 21.3095 23.884 21.0001 23.884H18.6668V18.0507C18.6668 17.1224 18.298 16.2322 17.6417 15.5758C16.9853 14.9194 16.095 14.5507 15.1668 14.5507H12.8334C11.9052 14.5507 11.0149 14.9194 10.3586 15.5758C9.70219 16.2322 9.33344 17.1224 9.33344 18.0507V23.884H7.00011C6.69069 23.884 6.39395 23.7611 6.17515 23.5423C5.95636 23.3235 5.83344 23.0268 5.83344 22.7173V12.509C5.83365 12.3433 5.86914 12.1796 5.93753 12.0288C6.00593 11.8779 6.10566 11.7433 6.23011 11.634L13.2301 5.509C13.443 5.32196 13.7167 5.21881 14.0001 5.21881C14.2835 5.21881 14.5572 5.32196 14.7701 5.509L21.7701 11.634C21.8946 11.7433 21.9943 11.8779 22.0627 12.0288C22.1311 12.1796 22.1666 12.3433 22.1668 12.509V22.7173Z'
                    fill='#777777'
                  />
                </svg>
              }
              selected={selected}
              setSelected={setSelected}
              setChild={setChild}
            />
            <Item
              title='User'
              to='/'
              icon={
                <svg
                  width='28'
                  height='28'
                  viewBox='0 0 28 28'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    d='M13.9998 4.6665C15.2375 4.6665 16.4245 5.15817 17.2997 6.03334C18.1748 6.90851 18.6665 8.09549 18.6665 9.33317C18.6665 10.5708 18.1748 11.7578 17.2997 12.633C16.4245 13.5082 15.2375 13.9998 13.9998 13.9998C12.7622 13.9998 11.5752 13.5082 10.7 12.633C9.82484 11.7578 9.33317 10.5708 9.33317 9.33317C9.33317 8.09549 9.82484 6.90851 10.7 6.03334C11.5752 5.15817 12.7622 4.6665 13.9998 4.6665ZM13.9998 6.99984C13.381 6.99984 12.7875 7.24567 12.3499 7.68325C11.9123 8.12084 11.6665 8.71433 11.6665 9.33317C11.6665 9.95201 11.9123 10.5455 12.3499 10.9831C12.7875 11.4207 13.381 11.6665 13.9998 11.6665C14.6187 11.6665 15.2122 11.4207 15.6498 10.9831C16.0873 10.5455 16.3332 9.95201 16.3332 9.33317C16.3332 8.71433 16.0873 8.12084 15.6498 7.68325C15.2122 7.24567 14.6187 6.99984 13.9998 6.99984ZM13.9998 15.1665C17.1148 15.1665 23.3332 16.7182 23.3332 19.8332V23.3332H4.6665V19.8332C4.6665 16.7182 10.8848 15.1665 13.9998 15.1665ZM13.9998 17.3832C10.5348 17.3832 6.88317 19.0865 6.88317 19.8332V21.1165H21.1165V19.8332C21.1165 19.0865 17.4648 17.3832 13.9998 17.3832Z'
                    fill='#777777'
                  />
                </svg>
              }
              selected={selected}
              setSelected={setSelected}
              setChild={setChild}
            />
            <div
              className='group'
              // style={{
              //   width: '174px',
              //   height: '193px',
              //   top: '202px',
              //   left: '40px',
              //   marginTop: '15px'

              // }}
            >
              {!isExpanded && (
                <>
                  <Item
                    title='User Management'
                    to='/users'
                    // icon={<PersonOutlinedIcon />}
                    selected={selected}
                    setSelected={setSelected}
                    setChild={setChild}
                    left='30px'
                  />
                  <Item
                    title='Customer Management'
                    to='/customers'
                    // icon={<PersonOutlinedIcon />}
                    selected={selected}
                    setSelected={setSelected}
                    setChild={setChild}
                    left='30px'
                  />
                  <Item
                    title='Contact'
                    to='/'
                    // icon={<PersonOutlinedIcon />}
                    selected={selected}
                    setSelected={setSelected}
                    setChild={setChild}
                    left='30px'
                  />
                  <Item
                    title='Profile Form'
                    to='/form'
                    // icon={<PersonOutlinedIcon />}
                    selected={selected}
                    setSelected={setSelected}
                    setChild={setChild}
                    left='30px'
                  />
                  <Item
                    title='CCTV Video'
                    to='/video'
                    // icon={<PersonOutlinedIcon />}
                    selected={selected}
                    setSelected={setSelected}
                    setChild={setChild}
                    left='30px'
                  />
                </>
              )}
            </div>

            <div
              className='group'
              // style={{
              //   width: '174px',
              //   height: '193px',
              //   top: '202px',
              //   left: '40px',
              //   marginTop: '70px'

              // }}
            >
              <Item
                title='Branches'
                to='/'
                icon={
                  <svg
                    width='28'
                    height='28'
                    viewBox='0 0 28 28'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path
                      fill-rule='evenodd'
                      clip-rule='evenodd'
                      d='M17.5002 7.00001C17.5004 7.72406 17.2761 8.43037 16.8583 9.02167C16.4404 9.61296 15.8495 10.0602 15.1669 10.3017V12.8333H18.6669C19.5951 12.8333 20.4854 13.2021 21.1417 13.8585C21.7981 14.5148 22.1669 15.4051 22.1669 16.3333V17.6983C22.9456 17.9736 23.602 18.5152 24.02 19.2276C24.4379 19.94 24.5906 20.7772 24.451 21.5913C24.3114 22.4053 23.8884 23.1438 23.257 23.6762C22.6255 24.2086 21.8261 24.5006 21.0002 24.5006C20.1743 24.5006 19.3749 24.2086 18.7434 23.6762C18.112 23.1438 17.689 22.4053 17.5494 21.5913C17.4098 20.7772 17.5625 19.94 17.9804 19.2276C18.3984 18.5152 19.0548 17.9736 19.8335 17.6983V16.3333C19.8335 16.0239 19.7106 15.7272 19.4918 15.5084C19.273 15.2896 18.9763 15.1667 18.6669 15.1667H9.33353C9.02411 15.1667 8.72737 15.2896 8.50857 15.5084C8.28978 15.7272 8.16686 16.0239 8.16686 16.3333V17.6983C8.94561 17.9736 9.60197 18.5152 10.02 19.2276C10.4379 19.94 10.5906 20.7772 10.451 21.5913C10.3114 22.4053 9.88843 23.1438 9.25696 23.6762C8.6255 24.2086 7.82614 24.5006 7.0002 24.5006C6.17425 24.5006 5.3749 24.2086 4.74343 23.6762C4.11196 23.1438 3.68904 22.4053 3.54942 21.5913C3.4098 20.7772 3.56247 19.94 3.98044 19.2276C4.39842 18.5152 5.05479 17.9736 5.83353 17.6983V16.3333C5.83353 15.4051 6.20228 14.5148 6.85866 13.8585C7.51503 13.2021 8.40527 12.8333 9.33353 12.8333H12.8335V10.3017C12.2282 10.088 11.6933 9.71198 11.2872 9.21477C10.8812 8.71756 10.6197 8.11829 10.5312 7.48247C10.4428 6.84665 10.5309 6.19876 10.7859 5.60963C11.0408 5.02049 11.4528 4.51279 11.9769 4.14203C12.5009 3.77127 13.1168 3.55172 13.7572 3.50739C14.3976 3.46305 15.0379 3.59563 15.608 3.89064C16.1782 4.18565 16.6562 4.63173 16.9899 5.18011C17.3236 5.72849 17.5002 6.35807 17.5002 7.00001ZM14.0002 5.83334C13.6908 5.83334 13.394 5.95626 13.1752 6.17505C12.9564 6.39384 12.8335 6.69059 12.8335 7.00001C12.8335 7.30943 12.9564 7.60617 13.1752 7.82496C13.394 8.04376 13.6908 8.16667 14.0002 8.16667C14.3096 8.16667 14.6064 8.04376 14.8252 7.82496C15.0439 7.60617 15.1669 7.30943 15.1669 7.00001C15.1669 6.69059 15.0439 6.39384 14.8252 6.17505C14.6064 5.95626 14.3096 5.83334 14.0002 5.83334ZM7.0002 19.8333C6.69078 19.8333 6.39403 19.9563 6.17524 20.1751C5.95645 20.3938 5.83353 20.6906 5.83353 21C5.83353 21.3094 5.95645 21.6062 6.17524 21.825C6.39403 22.0438 6.69078 22.1667 7.0002 22.1667C7.30962 22.1667 7.60636 22.0438 7.82515 21.825C8.04395 21.6062 8.16686 21.3094 8.16686 21C8.16686 20.6906 8.04395 20.3938 7.82515 20.1751C7.60636 19.9563 7.30962 19.8333 7.0002 19.8333ZM21.0002 19.8333C20.6908 19.8333 20.394 19.9563 20.1752 20.1751C19.9564 20.3938 19.8335 20.6906 19.8335 21C19.8335 21.3094 19.9564 21.6062 20.1752 21.825C20.394 22.0438 20.6908 22.1667 21.0002 22.1667C21.3096 22.1667 21.6064 22.0438 21.8252 21.825C22.0439 21.6062 22.1669 21.3094 22.1669 21C22.1669 20.6906 22.0439 20.3938 21.8252 20.1751C21.6064 19.9563 21.3096 19.8333 21.0002 19.8333Z'
                      fill='#777777'
                    />
                  </svg>
                }
                selected={child}
                setSelected={setSelected}
                setChild={setChild}
                
              />
              {!isExpanded && (
                <>
                  <Item
                    title='CS Department'
                    to='/'
                    // icon={<PersonOutlinedIcon />}
                    selected={selected}
                    setSelected={setSelected}
                    setChild={setChild}
                    left='30px'
                  />
                  <Item
                    title='IS Department'
                    to='/ISDepartmentDashboard'
                    // icon={<PersonOutlinedIcon />}
                    selected={selected}
                    setSelected={setSelected}
                    setChild={setChild}
                    left='30px'
                  />
                  <Item
                    title='EE Department'
                    to='/EEDepartmentDashboard'
                    // icon={<PersonOutlinedIcon />}
                    selected={selected}
                    setSelected={setSelected}
                    setChild={setChild}
                    left='30px'
                  />
                </>
              )}
            </div>

            <div
            // style={{
            //   width: '170px',
            //   height: '88px',
            //   top: '898px',
            //   left: '38px',

            // }}
            >
              {!isExpanded && (
                <>
                  <div
                    style={{
                      width: '182px',

                      height: '0px',
                      borderTop: '1px solid #C9C9C9',
                      transform: 'rotate(-0deg)',
                      // position: 'absolute',
                      top: '881px',
                      left: '23px',
                      marginTop: '20px',
                    }}
                  ></div>
                  <Item
                    title='Settings'
                    to='/'
                    icon={
                      <svg
                        width='28'
                        height='28'
                        viewBox='0 0 28 28'
                        fill='none'
                        xmlns='http://www.w3.org/2000/svg'
                      >
                        <path
                          d='M13.9998 9.625C12.8395 9.625 11.7267 10.0859 10.9062 10.9064C10.0858 11.7269 9.62483 12.8397 9.62483 14C9.62483 15.1603 10.0858 16.2731 10.9062 17.0936C11.7267 17.9141 12.8395 18.375 13.9998 18.375C15.1601 18.375 16.2729 17.9141 17.0934 17.0936C17.9139 16.2731 18.3748 15.1603 18.3748 14C18.3748 12.8397 17.9139 11.7269 17.0934 10.9064C16.2729 10.0859 15.1601 9.625 13.9998 9.625ZM11.3748 14C11.3748 13.3038 11.6514 12.6361 12.1437 12.1438C12.636 11.6516 13.3036 11.375 13.9998 11.375C14.696 11.375 15.3637 11.6516 15.856 12.1438C16.3483 12.6361 16.6248 13.3038 16.6248 14C16.6248 14.6962 16.3483 15.3639 15.856 15.8562C15.3637 16.3484 14.696 16.625 13.9998 16.625C13.3036 16.625 12.636 16.3484 12.1437 15.8562C11.6514 15.3639 11.3748 14.6962 11.3748 14ZM11.2348 25.9245C12.1405 26.1406 13.0688 26.25 13.9998 26.25C14.93 26.2486 15.8568 26.1385 16.7613 25.9219C17.0212 25.8606 17.2558 25.7204 17.4329 25.5205C17.6099 25.3206 17.7207 25.0708 17.7501 24.8054L17.9548 22.9416C17.9746 22.7383 18.0424 22.5426 18.1528 22.3707C18.2631 22.1988 18.4128 22.0557 18.5895 21.9531C18.7661 21.8505 18.9646 21.7914 19.1686 21.7807C19.3726 21.77 19.5762 21.808 19.7626 21.8916L21.4732 22.6406C21.7181 22.7484 21.9904 22.7772 22.2525 22.7231C22.5145 22.669 22.7532 22.5347 22.9353 22.3388C24.1993 20.9769 25.1428 19.3497 25.6968 17.5761C25.7763 17.3196 25.7739 17.0447 25.69 16.7896C25.6061 16.5345 25.4449 16.3118 25.2287 16.1525L23.7158 15.0369C23.5506 14.9165 23.4162 14.7587 23.3236 14.5763C23.231 14.394 23.1829 14.1924 23.1831 13.988C23.1834 13.7835 23.232 13.582 23.3251 13.3999C23.4181 13.2179 23.5529 13.0604 23.7185 12.9404L25.2235 11.8291C25.4409 11.6702 25.6031 11.4472 25.6874 11.1914C25.7716 10.9357 25.7737 10.6599 25.6933 10.4029C25.1403 8.62872 24.1963 7.00122 22.931 5.64025C22.748 5.44464 22.5089 5.31056 22.2466 5.2565C21.9842 5.20244 21.7116 5.23104 21.4662 5.33838L19.7635 6.08738C19.5768 6.16873 19.3737 6.20503 19.1704 6.19334C18.9672 6.18164 18.7695 6.12229 18.5934 6.02007C18.4174 5.91785 18.2678 5.77564 18.1569 5.60492C18.0459 5.43421 17.9767 5.23979 17.9548 5.03738L17.7483 3.18238C17.7195 2.9138 17.6071 2.66104 17.4271 2.45966C17.247 2.25828 17.0084 2.11841 16.7447 2.05975C15.8462 1.85898 14.9292 1.75253 14.0086 1.74213C13.0825 1.75309 12.1601 1.85953 11.2558 2.05975C10.9921 2.11741 10.7533 2.25663 10.5731 2.45766C10.393 2.65869 10.2807 2.91133 10.2522 3.17975L10.0448 5.0365C10.0222 5.23922 9.95236 5.43382 9.84099 5.60471C9.72962 5.7756 9.57977 5.91804 9.40346 6.02061C9.22714 6.12318 9.02926 6.18304 8.82565 6.1954C8.62204 6.20775 8.41837 6.17226 8.23095 6.09175L6.5282 5.34188C6.28252 5.23752 6.01077 5.21094 5.74952 5.26569C5.48827 5.32044 5.25006 5.45391 5.06695 5.64813C3.80138 7.01042 2.85664 8.6386 2.30195 10.4134C2.223 10.6698 2.22573 10.9443 2.30976 11.1991C2.39379 11.4538 2.55496 11.6762 2.77095 11.8353L4.28033 12.9483C4.44475 13.0692 4.57842 13.2272 4.67054 13.4094C4.76267 13.5915 4.81067 13.7928 4.81067 13.9969C4.81067 14.2011 4.76267 14.4024 4.67054 14.5845C4.57842 14.7667 4.44475 14.9246 4.28033 15.0456L2.77095 16.1613C2.55415 16.3207 2.39251 16.5438 2.30859 16.7994C2.22467 17.0551 2.22266 17.3306 2.30283 17.5875C2.85726 19.3634 3.802 20.9928 5.06783 22.3563C5.18817 22.4856 5.33407 22.5886 5.49629 22.6586C5.65851 22.7287 5.83351 22.7643 6.0102 22.7631C6.18783 22.7631 6.3637 22.7264 6.52733 22.6555L8.23795 21.9039C8.42453 21.8233 8.62742 21.7875 8.83031 21.7996C9.03321 21.8116 9.23045 21.8711 9.40618 21.9732C9.58191 22.0753 9.73124 22.2173 9.84216 22.3876C9.95307 22.5579 10.0225 22.7519 10.0448 22.9539L10.2505 24.8141C10.2803 25.0781 10.3909 25.3265 10.567 25.5253C10.7432 25.7242 10.9764 25.863 11.2348 25.9245ZM16.0482 24.2926C14.6981 24.5696 13.3059 24.5696 11.9558 24.2926L11.7852 22.7701C11.7018 22.0253 11.3466 21.3374 10.7877 20.8381C10.3501 20.4528 9.81246 20.1991 9.23684 20.1062C8.66121 20.0133 8.07105 20.085 7.53445 20.3131L6.1292 20.9256C5.22269 19.8876 4.5251 18.6843 4.0747 17.3819L5.3207 16.4614C5.70565 16.1777 6.01856 15.8076 6.23421 15.3808C6.44986 14.954 6.56222 14.4825 6.56222 14.0044C6.56222 13.5262 6.44986 13.0547 6.23421 12.6279C6.01856 12.2012 5.70565 11.831 5.3207 11.5474L4.07733 10.6286C4.52825 9.32746 5.22581 8.12544 6.13183 7.08838L7.53183 7.70088C7.9177 7.87127 8.33501 7.95891 8.75683 7.95813C9.508 7.95577 10.2321 7.67741 10.7915 7.176C11.3508 6.67458 11.7063 5.98508 11.7905 5.23863L11.9602 3.71C12.6375 3.57875 13.3252 3.50875 14.0138 3.5C14.6981 3.50875 15.3806 3.57875 16.0526 3.71L16.2153 5.2325C16.2964 5.97944 16.6507 6.67004 17.2102 7.1715C17.6481 7.55918 18.1872 7.81438 18.7646 7.90734C19.342 8.00029 19.9339 7.92717 20.4713 7.6965L21.8713 7.084C22.7786 8.12078 23.4769 9.32323 23.9276 10.6251L22.6825 11.5404C22.2955 11.823 21.9808 12.193 21.7638 12.6203C21.5468 13.0475 21.4337 13.5199 21.4337 13.9991C21.4337 14.4783 21.5468 14.9507 21.7638 15.378C21.9808 15.8052 22.2955 16.1752 22.6825 16.4579L23.9267 17.3766C23.4756 18.6761 22.779 19.8768 21.8748 20.9134L20.4748 20.3009C20.0367 20.1059 19.5587 20.0174 19.0798 20.0426C18.601 20.0677 18.1349 20.2059 17.7196 20.4457C17.3044 20.6855 16.9518 21.0201 16.6906 21.4223C16.4295 21.8245 16.2672 22.2827 16.2171 22.7596L16.0482 24.2926Z'
                          fill='#777777'
                        />
                      </svg>
                    }
                    selected={child}
                    setSelected={setSelected}
                    setChild={setChild}
                  />
                  <Item
                    title='Logout User'
                    to='/'
                    icon={
                      <svg
                        width='20'
                        height='22'
                        viewBox='0 0 20 22'
                        fill='none'
                        xmlns='http://www.w3.org/2000/svg'
                      >
                        <path
                          fill-rule='evenodd'
                          clip-rule='evenodd'
                          d='M13.4998 0.50116C13.653 0.50116 13.8048 0.531337 13.9463 0.589967C14.0878 0.648598 14.2165 0.734533 14.3248 0.842868C14.4331 0.951203 14.5191 1.07982 14.5777 1.22136C14.6363 1.36291 14.6665 1.51462 14.6665 1.66783C14.6665 1.82104 14.6363 1.97274 14.5777 2.11429C14.5191 2.25584 14.4331 2.38445 14.3248 2.49278C14.2165 2.60112 14.0878 2.68706 13.9463 2.74569C13.8048 2.80432 13.653 2.83449 13.4998 2.83449H2.99984V18.0012C2.99984 18.3106 3.12275 18.6073 3.34155 18.8261C3.56034 19.0449 3.85708 19.1678 4.1665 19.1678H13.4998C13.8093 19.1678 14.106 19.2907 14.3248 19.5095C14.5436 19.7283 14.6665 20.0251 14.6665 20.3345C14.6665 20.6439 14.5436 20.9407 14.3248 21.1595C14.106 21.3782 13.8093 21.5012 13.4998 21.5012H4.1665C3.23825 21.5012 2.34801 21.1324 1.69163 20.476C1.03525 19.8197 0.666504 18.9294 0.666504 18.0012V1.66783C0.666504 1.35841 0.78942 1.06166 1.00821 0.842869C1.22701 0.624076 1.52375 0.50116 1.83317 0.50116H13.4998ZM15.4913 6.67633C15.3282 6.51328 15.1205 6.40223 14.8943 6.3572C14.6682 6.31217 14.4337 6.33517 14.2206 6.42331C14.0075 6.51145 13.8253 6.66076 13.697 6.8524C13.5687 7.04403 13.5001 7.26938 13.4998 7.49999V9.83333H6.49984C6.19042 9.83333 5.89367 9.95624 5.67488 10.175C5.45609 10.3938 5.33317 10.6906 5.33317 11C5.33317 11.3094 5.45609 11.6062 5.67488 11.825C5.89367 12.0437 6.19042 12.1667 6.49984 12.1667H13.4998V14.5C13.4999 14.7307 13.5683 14.9562 13.6965 15.148C13.8247 15.3398 14.0069 15.4893 14.2201 15.5776C14.4332 15.6659 14.6678 15.689 14.894 15.644C15.1203 15.599 15.3282 15.4879 15.4913 15.3248L18.9913 11.8248C19.2101 11.606 19.3329 11.3094 19.3329 11C19.3329 10.6906 19.2101 10.3939 18.9913 10.1752L15.4913 6.67633Z'
                          fill='#777777'
                        />
                      </svg>
                    }
                    selected={child}
                    setSelected={setSelected}
                    setChild={setChild}
                  />
                </>
              )}
            </div>
          </Box>
        </Menu>
      </ProSidebar>
    </Box>
  )
}

export default Sidebar
