'use client';

import * as React from 'react';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { Box, Button, TextField } from '@mui/material';

export default function BasicTimePicker() {
  const [value, setValue] = React.useState(null);

  return (
    <Box
      sx={{
        border: 2,
        width: '32ch',
        borderRadius: '5px',
        borderColor: 'blue',
      }}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoContainer components={['TimePicker']} sx={{ m: 1, width: '30ch' }}>
          <TimePicker
            label='Event Start'
            value={value}
            onChange={() => setValue(value)}
          />
        </DemoContainer>

        <DemoContainer components={['TimePicker']} sx={{ m: 1, width: '30ch' }}>
          <TimePicker
            label='Event End'
            value={value}
            onChange={() => setValue(value)}
          />
        </DemoContainer>
      </LocalizationProvider>
      <Box
        component='form'
        sx={{ '& > :not(style)': { m: 1, width: '30ch' } }}
        noValidate
        autoComplete='off'>
        <TextField
          slotProps={{ htmlInput: { maxLength: 200 } }}
          label='Event Text'
          variant='outlined'
        />
      </Box>
      <Box
        component='form'
        sx={{ '& > :not(style)': { m: 1, width: '30ch' } }}
        noValidate
        autoComplete='off'>
        <Button variant='contained' onClick={() => {}}>
          Save event
        </Button>
      </Box>
    </Box>
  );
}
