import {useContext} from 'react'
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
import { useEffect, useRef, useState } from 'react'
import CancelIcon from '@mui/icons-material/Cancel'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import CustomerService from '../../api_services/customer.service'
import AddIcon from '@mui/icons-material/Add'
import AddDialog from './addDialog'
import { DataGrid } from '@mui/x-data-grid'
import SidebarContext from '../../scenes/global/SidebarContextt/SidebarContext'
import { MenuItem, Select } from '@mui/material';

const Customers = () => {
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)

  const [rows, setRows] = useState([])
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(true)
  const [customer, setCustomer] = useState({ name: '', gender: '', image: '' })

  const handleChange = e => {
    const { name, value } = e.target

    console.log(e.target)
    if (name === 'fileUpload') setCustomer({ ...customer, image: e.target.files[0] })
    else setCustomer({ ...customer, [name]: value })
  }

  const handleAdd = () => {
    let customerFormData = new FormData()

    customerFormData.append('name', customer.name)
    customerFormData.append('gender', customer.gender)
    customerFormData.append('image', customer.image)

    CustomerService.addCustomer(customerFormData)
      .then(res => {
        console.log(res)

        handleClose()

        CustomerService.listCustomers()
          .then(res => setRows(res.data))
          .catch(err => console.log(err))
      })
      .catch(err => console.log(err))
  }
  const handleClose = () => {
    setOpen(false)
  }
  const handleOpen = () => {
    setOpen(true)
  }

  useEffect(() => {
    setLoading(true)

    CustomerService.listCustomers()
      .then(res => setRows(res.data))
      .catch(err => console.log(err))

    // setRows([{ name: 'asd', gender: 'male', image: '' }])

    setLoading(false)
  }, [])
  // ====================== dummy data =================================


  const rows_ = [ // this is dummy data, whenever we get real data change "rows_" to "rows"
    {
      visitDate: '2024-02-21',
      visits: 5,
      gender: 'Male',
      age: 35,
      group: 'Group A',
      timeIn: '09:00 AM',
      timeOut: '05:00 PM',
      stay: '8 hours',
      action: 'Edit',
    },
    {
      visitDate: '2024-02-20',
      visits: 8,
      gender: 'Female',
      age: 28,
      group: 'Group B',
      timeIn: '10:30 AM',
      timeOut: '04:30 PM',
      stay: '6 hours',
      action: 'Edit',
    },
    {
      visitDate: '2024-02-19',
      visits: 3,
      gender: 'Male',
      age: 45,
      group: 'Group C',
      timeIn: '08:45 AM',
      timeOut: '03:15 PM',
      stay: '6 hours 30 minutes',
      action: 'Edit',
    },
  ];
  // ==============================
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
  const { sidebarExpanded } = useContext(SidebarContext)
  const [searchQuery, setSearchQuery] = useState('');
  const handleSearch = (value) => {
    setSearchQuery(value);
  };
  // Filter rows based on the search query and change name "rows_" to "rows"

  const filteredRows = rows_.filter((row) => {
    const searchData = `${row.visitDate} ${row.visits} ${row.gender} ${row.age} ${row.group} ${row.timeIn} ${row.timeOut} ${row.stay} ${row.action}`.toLowerCase();
    return searchData.includes(searchQuery.toLowerCase());
  });
  
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const handleChange_ = (event) => {
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
  console.log(rows)
  return (
    <Box mt={sidebarExpanded.isCollapsed ? 10 : 10} ml={sidebarExpanded.isCollapsed ? 10 : 34}>
      <Box
        display='flex'
        justifyContent='space-between'
        alignItems='center'
      >
        <Header title='Customer Management' />
        <Box>
          Test
        </Box>
      </Box>
      <Box
        display='grid'
        gridTemplateColumns='repeat(12, 1fr)'
        gridAutoRows='140px'
        gap='20px'
      >
        {/* ROW 1 : Footfall Line Graph*/}

        <Box
          gridColumn='span 12'
          gridRow='span 4'
          backgroundColor={colors.primary[400]}
          border={`1px solid ${colors.primary[900]}`}
          borderRadius='20px'
        >
          <Box
            mt='10px'
            p='0 15px'
          >
            {/* <Box
              mb={1}
              sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <Typography
                variant='h5'
                fontWeight='600'
                color={colors.grey[100]}
              >
                Customers
              </Typography>
              <Button
                color='primary'
                variant='contained'
                onClick={handleOpen}
                startIcon={<AddIcon />}
              >
                Add Customer
              </Button>
            </Box> */}
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
  onChange={handleChange_}
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
    <Box className="flex">
          
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
            <Box>
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
            <TableCell sx={cellStyle}>Visit Date</TableCell>
            <TableCell sx={cellStyle}>Visits</TableCell>
            <TableCell sx={cellStyle}>Gender</TableCell>
            <TableCell sx={cellStyle}>Age</TableCell>
            <TableCell sx={cellStyle}>Group</TableCell>
            
            <TableCell sx={cellStyle}>Time-in</TableCell>
            <TableCell sx={cellStyle}>Time-out</TableCell>
           
            <TableCell sx={cellStyle}>Stay</TableCell>
            
            <TableCell sx={cellStyle}>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        {displayedRows.map((row, index) => (
  <TableRow>
    <TableCell sx={rowCellStyle}>{row.visitDate}</TableCell>
    <TableCell sx={rowCellStyle}>{row.visits}</TableCell>
    <TableCell sx={rowCellStyle}>{row.gender}</TableCell>
    <TableCell sx={rowCellStyle}>{row.age}</TableCell>
    <TableCell sx={rowCellStyle}>{row.group}</TableCell>
    <TableCell sx={rowCellStyle}>{row.timeIn}</TableCell>
    <TableCell sx={rowCellStyle}>{row.timeOut}</TableCell>
    <TableCell sx={rowCellStyle}>{row.stay}</TableCell>
    <TableCell sx={rowCellStyle}>{row.action}</TableCell>
  </TableRow>
))}

        </TableBody>
      </Table>
    </TableContainer>
              {/* <DataGrid
                rows={rows}
                getRowId={row => row.id}
                columns={[
                  { field: 'id', headerName: 'ID' },
                  { field: 'fullname', headerName: 'Name' },
                  { field: 'gender', headerName: 'Gender' },
                ]}
              /> */}
              {/* <TableContainer component={Paper}>
                <Table sx={{ minWidth: 450 }}>
                  <TableHead>
                    <TableRow>
                      <TableCell>ID</TableCell>
                      <TableCell>Name</TableCell>
                      <TableCell>Gender</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody sx={{ minHeight: 150 }}>
                    {loading ? (
                      <Box
                        sx={{
                          width: '427%',
                          minHeight: 150,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <CircularProgress />
                      </Box>
                    ) : rows.length === 0 ? (
                      <Typography>No Data Available</Typography>
                    ) : (
                      rows.map(row => (
                        <TableRow
                          key={row.id}
                          sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                          <TableCell>{row.id}</TableCell>
                          <TableCell>{row.fullname}</TableCell>
                          <TableCell>{row.gender}</TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </TableContainer> */}
            </Box>
          </Box>
        </Box>
      </Box>
      <AddDialog
        open={open}
        customer={customer}
        handleAdd={handleAdd}
        handleClose={handleClose}
        handleChange={handleChange}
      />
    </Box>
  )
}

export default Customers
