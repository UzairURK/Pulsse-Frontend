import { useContext } from 'react'
import {
  Box,
  Button,
  CircularProgress,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  useTheme,
} from '@mui/material'
import Header from '../Header'
import { tokens } from '../../theme'
import { useEffect, useState } from 'react'
import CancelIcon from '@mui/icons-material/Cancel'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import UserService from '../../api_services/user.service'
import { DataGrid } from '@mui/x-data-grid'
import { act } from 'react-dom/test-utils'
import SidebarContext from '../../scenes/global/SidebarContextt/SidebarContext'
import SearchIcon from '@mui/icons-material/Search' // Added
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import { MenuItem, Select } from '@mui/material';
const Users = () => {
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)

  const [rows, setRows] = useState([])
  const [loading, setLoading] = useState(true)
  const [active, setActive] = useState(true);

  const verifyUser = id => {
    
    UserService.verifyUser({ id: id })
      .then(res => {
        if (res.msg === 'Successfully Verified') {
          UserService.listUsers()
            .then(res => {
              setRows(res.Data)
              setActive(!active); // Update the active state based on the result
            })
            .catch(err => console.log(err))
        }
      })
      .catch(err => console.log(err))
      console.log("active " +active)
  }

  useEffect(() => {
    setLoading(true)

    UserService.listUsers()
      .then(res => {
        setRows(res.Data)
      })
      .catch(err => console.log(err))

    setLoading(false)
  }, [])
  const { sidebarExpanded } = useContext(SidebarContext)

  const cellStyle = {
    fontFamily: 'Product Sans',
    fontSize: '16px',
    fontWeight: 700,
    lineHeight: '19px',
    letterSpacing: '0em',
    textAlign: 'left',
    color: '#5F6369',
    border: '1px solid #DADCE0',
  };
  const rowCellStyle = {
    fontFamily: 'Noto Sans JP',
    fontSize: '16px',
    fontWeight: 400,
    lineHeight: '23px',
    letterSpacing: '0em',
    textAlign: 'left',
    color: '#000000',
    border: '1px solid #DADCE0',
  };
  const [searchQuery, setSearchQuery] = useState('');
  const handleSearch = (value) => {
    setSearchQuery(value);
  };
  // Filter rows based on the search query
  // const filteredRows = rows.filter((row) =>
  //   row.email.toLowerCase().includes(searchQuery.toLowerCase())

  // );
  const filteredRows = rows.filter((row) => {
    const searchData = `${row.email} ${row.id} ${row.fullname} ${row.is_active}`.toLowerCase();
    return searchData.includes(searchQuery.toLowerCase());
  });
  
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const handleChange = (event) => {
    setRowsPerPage(event.target.value);
  };
  const options = Array.from({ length: 20 }, (_, i) => (i + 1) * 5); // Generate numbers from 5 onward and multiples of 5
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const displayedRows = filteredRows.slice(startIndex, endIndex);
  const handleChangeRowsPerPage = (value) => {
    setRowsPerPage(value);
    setCurrentPage(1); // Reset the current page when rows per page changes
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, Math.ceil(filteredRows.length / rowsPerPage)));
  };
  const transitionStyle = {
    transition: 'margin-top 0.3s ease-in-out, margin-left 0.3s ease-in-out',
  };

  const handleClick = (row) => {
    console.log(row)
  };
  return (
    <Box mt={sidebarExpanded.isCollapsed ? 10 : 10}
         ml={sidebarExpanded.isCollapsed ? 10 : 34}
         sx={transitionStyle}
    >
      
      <Box
        display='flex'
        justifyContent='space-between'
        alignItems='center'
      >
        <Header title='User Management' />
      </Box>
      <Box
        display='grid'
        gridTemplateColumns='repeat(12, 1fr)'
        gridAutoRows='140px'
        gap='20px'
        fontStyle={{
          marginLeft: 30,
        }}
      >
        <Box
          gridColumn='span 12'
          gridRow='span 4'
          backgroundColor={colors.primary[400]}
          border={`1px solid ${colors.primary[900]}`}
          borderRadius='20px'
        >
        <Box sx={{
        height: 300,
        width: '100%',
        '& .super-app-theme--header': {
          backgroundColor: 'rgba(255, 7, 0, 0.55)',
        },
      }}>
        {/* Search Bar  */}
        
        <Box mb={1} style={{
        // width: '683px',
        height: '44px',
        top: '13px',
        left: '437px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        borderRadius: '8px',
        boxShadow: '0px 1px 2px 0px #1018280D',
        padding: '10px 14px', 
        gap: '8px',
      }}>
        <Box style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        
      }}>
                
        <img
        src="data:image/svg+xml,%3Csvg width='18' height='18' viewBox='0 0 18 18' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M16.5 16.5L12.875 12.875M14.8333 8.16667C14.8333 11.8486 11.8486 14.8333 8.16667 14.8333C4.48477 14.8333 1.5 11.8486 1.5 8.16667C1.5 4.48477 4.48477 1.5 8.16667 1.5C11.8486 1.5 14.8333 4.48477 14.8333 8.16667Z' stroke='%23667085' stroke-width='1.66667' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E"
        alt="Search"
        style={{ width: '18px', height: '18px' }}
        onClick={handleSearch}
      /> 
        <input
        type="text"
        placeholder="Search"
        onChange={(e) => handleSearch(e.target.value)}
        style={{
          width: '100%',
          height: '100%',
          border: 'none',
          outline: 'none',
          fontFamily: 'Noto Sans',
          fontSize: '16px',
          fontWeight: 400,
          lineHeight: '24px',
          letterSpacing: '0em',
          backgroundColor: '#FFFFFF',
        }}
                />
            </Box>
      <Box style={{
        display: 'flex',
      }}>
                
           
    <Box
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
      }}
    >
    <Typography
      variant="body1"
      style={{
        fontFamily: 'Lato',
        fontSize: '14px',
        fontWeight: 400,
        lineHeight: '17px',
        letterSpacing: '0em',
        textAlign: 'left',
        color: '#777777',
      }}
    >
      Rows per page:
    </Typography>

      <Select
  variant="standard"
  value={rowsPerPage}
  onChange={handleChange}
  sx={{ boxShadow: 'none', '.MuiOutlinedInput-notchedOutline': { border: 0 } }}
  style={{ width: '5px', borderBottom: 'none' }}
  IconComponent={null} // Hide default icon
  MenuProps={{ disableUnderline: true }} // Hide underline
>
  {options.map((option) => (
    <MenuItem key={option} value={option}>{option}</MenuItem>
  ))}
    </Select>
  <svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M3.72659 6.52235C3.75717 6.56676 3.79809 6.60308 3.84582 6.62817C3.89355 6.65325 3.94667 6.66636 4.00059 6.66636C4.05451 6.66636 4.10763 6.65325 4.15536 6.62817C4.20309 6.60308 4.24401 6.56676 4.27459 6.52235L7.27459 2.18902C7.30932 2.13903 7.32968 2.08049 7.33347 2.01975C7.33726 1.95901 7.32433 1.89839 7.29609 1.84448C7.26784 1.79057 7.22537 1.74543 7.17327 1.71397C7.12117 1.6825 7.06145 1.66592 7.00059 1.66602H1.00059C0.939871 1.66627 0.880369 1.68306 0.828483 1.7146C0.776597 1.74614 0.73429 1.79123 0.706112 1.84501C0.677934 1.8988 0.664951 1.95925 0.668559 2.01986C0.672167 2.08047 0.69223 2.13895 0.726589 2.18902L3.72659 6.52235Z" fill="#777777"/>
</svg>

              </Box>
                <Box className="flex"
                // style={{display}}
                >
          
  <div className="ml-2 flex mt-2" 
  style={{
    fontFamily: 'Lato',
    fontSize: '14px',
    fontWeight: 400,
    lineHeight: '17px',
    letterSpacing: '0em',
    textAlign: 'left',
    color: '#AEAEAE',
    cursor: 'pointer', 
  }}
  onClick={() => setCurrentPage(currentPage - 1)}
  >
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M18.493 9.10596L11.9395 15.5971L18.493 22.0883" stroke="#AEAEAE" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
     </svg>

    <p className='mt-2'>Prev</p>
    
  </div>
                
            {[...Array(Math.ceil(filteredRows.length / rowsPerPage)).keys()].map((pageNumber) => (
              <div className="ml-2 mt-4" key={pageNumber}>
                <span
                  onClick={() => setCurrentPage(pageNumber + 1)}
                  style={{
                    cursor: 'pointer',
                    fontWeight: pageNumber + 1 === currentPage ? 'bold' : 'normal',
                  }}
                >
                  {pageNumber + 1}
                </span>
              </div>
            ))}
    <div className="ml-2 flex mt-2" 
  style={{
    fontFamily: 'Lato',
    fontSize: '14px',
    fontWeight: 400,
    lineHeight: '17px',
    letterSpacing: '0em',
    textAlign: 'left',
    color: '#AEAEAE',
    cursor: 'pointer', 
  }}
  onClick={() => setCurrentPage(currentPage + 1)}
  >
    <svg width="61" height="32" viewBox="0 0 61 32" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M10.1268 11.969V22H9.44775C9.34042 22 9.24942 21.9813 9.17475 21.944C9.10475 21.9067 9.03475 21.8437 8.96475 21.755L3.16175 14.195C3.17108 14.3117 3.17808 14.426 3.18275 14.538C3.18742 14.65 3.18975 14.755 3.18975 14.853V22H1.99975V11.969H2.69975C2.76042 11.969 2.81175 11.9737 2.85375 11.983C2.89575 11.9877 2.93308 11.9993 2.96575 12.018C2.99842 12.032 3.03108 12.0553 3.06375 12.088C3.09642 12.116 3.13142 12.1533 3.16875 12.2L8.97175 19.753C8.96242 19.6317 8.95308 19.515 8.94375 19.403C8.93908 19.2863 8.93675 19.1767 8.93675 19.074V11.969H10.1268ZM16.9244 17.681C16.9244 17.3917 16.8824 17.128 16.7984 16.89C16.7191 16.6473 16.6001 16.4397 16.4414 16.267C16.2874 16.0897 16.0984 15.9543 15.8744 15.861C15.6504 15.763 15.3961 15.714 15.1114 15.714C14.5141 15.714 14.0404 15.889 13.6904 16.239C13.3451 16.5843 13.1304 17.065 13.0464 17.681H16.9244ZM17.9324 21.006C17.7784 21.1927 17.5941 21.356 17.3794 21.496C17.1647 21.6313 16.9337 21.7433 16.6864 21.832C16.4437 21.9207 16.1917 21.986 15.9304 22.028C15.6691 22.0747 15.4101 22.098 15.1534 22.098C14.6634 22.098 14.2107 22.0163 13.7954 21.853C13.3847 21.685 13.0277 21.4423 12.7244 21.125C12.4257 20.803 12.1924 20.4063 12.0244 19.935C11.8564 19.4637 11.7724 18.9223 11.7724 18.311C11.7724 17.8163 11.8471 17.3543 11.9964 16.925C12.1504 16.4957 12.3697 16.1247 12.6544 15.812C12.9391 15.4947 13.2867 15.2473 13.6974 15.07C14.1081 14.888 14.5701 14.797 15.0834 14.797C15.5081 14.797 15.9001 14.8693 16.2594 15.014C16.6234 15.154 16.9361 15.3593 17.1974 15.63C17.4634 15.896 17.6711 16.2273 17.8204 16.624C17.9697 17.016 18.0444 17.464 18.0444 17.968C18.0444 18.164 18.0234 18.2947 17.9814 18.36C17.9394 18.4253 17.8601 18.458 17.7434 18.458H13.0044C13.0184 18.906 13.0791 19.2957 13.1864 19.627C13.2984 19.9583 13.4524 20.236 13.6484 20.46C13.8444 20.6793 14.0777 20.845 14.3484 20.957C14.6191 21.0643 14.9224 21.118 15.2584 21.118C15.5711 21.118 15.8394 21.083 16.0634 21.013C16.2921 20.9383 16.4881 20.859 16.6514 20.775C16.8147 20.691 16.9501 20.614 17.0574 20.544C17.1694 20.4693 17.2651 20.432 17.3444 20.432C17.4471 20.432 17.5264 20.4717 17.5824 20.551L17.9324 21.006ZM25.3032 22H24.1062C24.0035 22 23.9219 21.9743 23.8612 21.923C23.8052 21.867 23.7585 21.8063 23.7212 21.741L21.9362 18.962C21.9175 19.0273 21.8965 19.0927 21.8732 19.158C21.8545 19.2187 21.8265 19.2747 21.7892 19.326L20.1372 21.741C20.0905 21.8063 20.0392 21.867 19.9832 21.923C19.9319 21.9743 19.8595 22 19.7662 22H18.6532L21.1382 18.36L18.7512 14.909H19.9482C20.0509 14.909 20.1255 14.9253 20.1722 14.958C20.2189 14.9907 20.2609 15.0373 20.2982 15.098L22.0412 17.758C22.0785 17.6227 22.1369 17.492 22.2162 17.366L23.7422 15.126C23.7842 15.0607 23.8285 15.0093 23.8752 14.972C23.9265 14.93 23.9872 14.909 24.0572 14.909H25.2052L22.8182 18.297L25.3032 22ZM28.6288 22.112C28.0688 22.112 27.6372 21.9557 27.3338 21.643C27.0352 21.3303 26.8858 20.88 26.8858 20.292V15.952H26.0318C25.9572 15.952 25.8942 15.931 25.8428 15.889C25.7915 15.8423 25.7658 15.7723 25.7658 15.679V15.182L26.9278 15.035L27.2148 12.844C27.2288 12.774 27.2592 12.718 27.3058 12.676C27.3572 12.6293 27.4225 12.606 27.5018 12.606H28.1318V15.049H30.1828V15.952H28.1318V20.208C28.1318 20.5067 28.2042 20.7283 28.3488 20.873C28.4935 21.0177 28.6802 21.09 28.9088 21.09C29.0395 21.09 29.1515 21.0737 29.2448 21.041C29.3428 21.0037 29.4268 20.964 29.4968 20.922C29.5668 20.88 29.6252 20.8427 29.6718 20.81C29.7232 20.7727 29.7675 20.754 29.8048 20.754C29.8702 20.754 29.9285 20.7937 29.9798 20.873L30.3438 21.468C30.1292 21.6687 29.8702 21.8273 29.5668 21.944C29.2635 22.056 28.9508 22.112 28.6288 22.112Z" fill="#4E00FE"/>
<path d="M41.9153 9.08838L48.4688 15.5796L41.9153 22.0707" stroke="#4E00FE" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

    
  </div>
          </Box>
          </Box>
            </Box>
            
      
            <TableContainer component={Paper}>
              <Table style={{
                fontFamily: 'Product Sans', fontSize: '16px', color: '#5F6369',
                border: '1px solid #DADCE0',
              }}
                sx={{
                  borderCollapse: 'collapse',
              }}
              >
        <TableHead>
          <TableRow sx={{ fontFamily: 'Product Sans', fontSize: '16px', fontWeight: 700, lineHeight: '19px', letterSpacing: '0em', textAlign: 'left', color: '#5F6369' }}>
            <TableCell sx={cellStyle}>ID</TableCell>
            <TableCell sx={cellStyle}>Email</TableCell>
            <TableCell sx={cellStyle}>Name</TableCell>
            <TableCell sx={cellStyle}>Status</TableCell>
            <TableCell sx={{cellStyle}}>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
                  {displayedRows.map((row, index) => (
                <TableRow key={index}
                sx={{ backgroundColor: row.is_active ? '#FFFFFF' : '#F8F9FA' }}>
              <TableCell sx={rowCellStyle}>{row.id}</TableCell>
              <TableCell sx={rowCellStyle}>{row.email}</TableCell>
              <TableCell sx={rowCellStyle}>{row.fullname}</TableCell>
              <TableCell sx={rowCellStyle}>{row.is_active ? (
              <Button
                variant="contained"
                style={{
                  width: '145px',
                  height: '34px',
                  // top: '6px',
                  // left: '776px',
                  borderRadius: '5px',
                  gap: '10px',
                  background: '#009421',
                  color: "#FFFFFF",
                  fontFamily: 'Noto Sans JP',
                  fontWeight: 500,
                  fontSize: '16px',
                  lineHeight: '23.17px',
                }}
                
              >
                Verified
              </Button>
            ) : (
              <Button
                variant="contained"
                style={{
                  width: '145px',
                  height: '34px',
                  // top: '6px',
                  // left: '776px',
                  borderRadius: '5px',
                  // gap: '10px',
                  background: '#ECB017',
                  color: "#FFFFFF",
                  fontFamily: 'Noto Sans JP',
                  fontWeight: 500,
                  fontSize: '16px',
                  lineHeight: '23.17px',
                }}
              >
                Not Verified
              </Button>
            )}

                      </TableCell>
              <TableCell sx={rowCellStyle}>
                <div className='flex'>
                  <div className='ml-2'>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect width="24" height="24" rx="3" fill="#BF75F9"/>
                  <path d="M12 9.6C11.4213 9.6 10.8664 9.85286 10.4572 10.3029C10.0481 10.753 9.81818 11.3635 9.81818 12C9.81818 12.6365 10.0481 13.247 10.4572 13.6971C10.8664 14.1471 11.4213 14.4 12 14.4C12.5787 14.4 13.1336 14.1471 13.5428 13.6971C13.9519 13.247 14.1818 12.6365 14.1818 12C14.1818 11.3635 13.9519 10.753 13.5428 10.3029C13.1336 9.85286 12.5787 9.6 12 9.6ZM12 16C11.0356 16 10.1107 15.5786 9.4287 14.8284C8.74675 14.0783 8.36364 13.0609 8.36364 12C8.36364 10.9391 8.74675 9.92172 9.4287 9.17157C10.1107 8.42143 11.0356 8 12 8C12.9644 8 13.8893 8.42143 14.5713 9.17157C15.2532 9.92172 15.6364 10.9391 15.6364 12C15.6364 13.0609 15.2532 14.0783 14.5713 14.8284C13.8893 15.5786 12.9644 16 12 16ZM12 6C8.36364 6 5.25818 8.488 4 12C5.25818 15.512 8.36364 18 12 18C15.6364 18 18.7418 15.512 20 12C18.7418 8.488 15.6364 6 12 6Z" fill="white"/>
                  </svg>
                </div>
                  <div className='ml-2' onClick={() => handleClick(row)}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g clip-path="url(#clip0_1_6275)">
                  <rect width="24" height="24" rx="3" fill="#ECB730"/>
                  <path d="M12.7778 5C12.976 5.00022 13.1667 5.07613 13.3108 5.21222C13.455 5.3483 13.5417 5.5343 13.5534 5.7322C13.565 5.9301 13.5006 6.12496 13.3734 6.27698C13.2461 6.429 13.0656 6.5267 12.8688 6.55011L12.7778 6.55556H6.55556V17.4444H17.4444V11.2222C17.4447 11.024 17.5206 10.8333 17.6567 10.6892C17.7927 10.545 17.9787 10.4583 18.1766 10.4466C18.3745 10.435 18.5694 10.4994 18.7214 10.6267C18.8734 10.7539 18.9711 10.9344 18.9946 11.1312L19 11.2222V17.4444C19.0001 17.8369 18.8519 18.2149 18.5851 18.5026C18.3182 18.7904 17.9525 18.9667 17.5611 18.9961L17.4444 19H6.55556C6.16311 19.0001 5.78511 18.8519 5.49735 18.5851C5.20959 18.3182 5.03332 17.9525 5.00389 17.5611L5 17.4444V6.55556C4.99988 6.16311 5.14809 5.78511 5.41494 5.49735C5.68179 5.20959 6.04755 5.03332 6.43889 5.00389L6.55556 5H12.7778ZM17.6334 5.26678C17.7734 5.12728 17.9612 5.0463 18.1587 5.04027C18.3563 5.03424 18.5487 5.10361 18.6969 5.2343C18.8451 5.365 18.938 5.54721 18.9568 5.74392C18.9755 5.94064 18.9187 6.13712 18.7978 6.29344L18.7332 6.36733L11.0332 14.0666C10.8933 14.206 10.7054 14.287 10.5079 14.2931C10.3104 14.2991 10.118 14.2297 9.96978 14.099C9.82157 13.9683 9.72865 13.7861 9.70991 13.5894C9.69117 13.3927 9.74801 13.1962 9.86889 13.0399L9.93344 12.9668L17.6334 5.26678Z" fill="white"/>
                  </g>
                  <defs>
                  <clipPath id="clip0_1_6275">
                  <rect width="24" height="24" rx="3" fill="white"/>
                  </clipPath>
                  </defs>
                  </svg>
                </div>
                  <div className='ml-2'>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect width="24" height="24" rx="3" fill="#D82323"/>
                  <path d="M8.25 19C7.8375 19 7.4845 18.8478 7.191 18.5434C6.8975 18.2391 6.7505 17.8727 6.75 17.4444V7.33333H6V5.77778H9.75V5H14.25V5.77778H18V7.33333H17.25V17.4444C17.25 17.8722 17.1033 18.2386 16.8097 18.5434C16.5162 18.8483 16.163 19.0005 15.75 19H8.25ZM15.75 7.33333H8.25V17.4444H15.75V7.33333ZM9.75 15.8889H11.25V8.88889H9.75V15.8889ZM12.75 15.8889H14.25V8.88889H12.75V15.8889Z" fill="white"/>
                  </svg>
                  </div>
                  

                </div>
              </TableCell>
            </TableRow>
          ))}
          <form>
          <input type="text"/>
          <input type="text"/>
          <button type="submit">Submit</button>
        </form>
        </TableBody>
      </Table>
    </TableContainer>
            </Box>
         
        </Box>
      </Box>
    </Box>
  )
}

export default Users
