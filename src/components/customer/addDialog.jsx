import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  Input,
  InputLabel,
  NativeSelect,
  Select,
  TextField,
} from '@mui/material'
import React, { useRef } from 'react'
import { MenuItem } from 'react-pro-sidebar'
import AddIcon from '@mui/icons-material/Add'

const AddDialog = ({ handleClose, customer, open, handleChange, handleAdd }) => {
  const inputFile = useRef(null)

  return (
    <Dialog
      open={open}
      onClose={handleClose}
    >
      <DialogTitle>Add Customer</DialogTitle>
      <DialogContent>
        <TextField
          sx={{
            mb: 2,
          }}
          autoFocus
          id='name'
          name='name'
          fullWidth
          label='Name'
          variant='standard'
          value={customer.name}
          onChange={handleChange}
        />
        <FormControl
          fullWidth
          sx={{ mb: 2 }}
        >
          <InputLabel
            variant='standard'
            htmlFor='uncontrolled-native'
          >
            Age
          </InputLabel>
          <NativeSelect
            onChange={handleChange}
            inputProps={{
              name: 'gender',
              id: 'uncontrolled-native',
            }}
          >
            <option value='Male'>Male</option>
            <option value='Female'>Female</option>
          </NativeSelect>
        </FormControl>
        {/* <TextField
          sx={{
            mb: 2,
          }}
          select
          fullWidth
          name='gender'
          label='Gender'
          variant='standard'
          value={customer.gender}
          onChange={handleChange}
        >
          {['Male', 'Female', 'Others'].map(option => (
            <MenuItem
              key={option}
              value={option}
            >
              {option}
            </MenuItem>
          ))}
        </TextField> */}
        <input
          type='file'
          ref={inputFile}
          id='file-upload'
          name='fileUpload'
          onChange={handleChange}
          style={{ display: 'none' }}
          accept='image/png, image/jpeg'
        />
        <Button
          color='primary'
          variant='contained'
          startIcon={<AddIcon />}
          onClick={() => {
            inputFile.current.click()
          }}
        ></Button>
      </DialogContent>
      <DialogActions>
        <Button
          color='primary'
          variant='contained'
          onClick={handleClose}
        >
          Cancel
        </Button>
        <Button
          color='primary'
          variant='contained'
          onClick={handleAdd}
        >
          Add
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default AddDialog
