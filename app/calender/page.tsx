'use client'

import * as React from 'react';
import { styled } from '@mui/material/styles';
import Tooltip from '@mui/material/Tooltip';
import Stack from '@mui/material/Stack';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import Session from '@/components/SessionWrapper';
import SessionWrapper from '@/components/SessionWrapper';
import Spacer from '@/components/Spacer';
import { Button, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, TextField } from '@mui/material';
// import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';


import SendIcon from '@mui/icons-material/Send';
import { dogBreeds } from '@/constants/dogBreeds';

// const dogBreed = ['dogBreed', 'dogBreed', 'dogBreed', 'dogBreed', 'dogBreed']

export default function CommonlyUsedComponents() {
   const [breed, setDogBreed] = React.useState('')

   const handleSetDogBreed = (event: SelectChangeEvent) => {
      console.log(event)
      setDogBreed(event.target.value);
   };
   return (
      <LocalizationProvider dateAdapter={AdapterDayjs}>
         <div className={`form-container flex flex-col gap-4 min-w-[70vw] min-h-[70vh] m-auto bg-white rounded-md`}>
            <SessionWrapper>
               <DatePicker label="Session day" className='flex-1' />
               <Spacer />
               <TimePicker label="Start time" className='flex-1' />
            </SessionWrapper>

            <SessionWrapper>
               <TextField id="outlined-basic" label="First name" variant="outlined" className='flex-1' />
               <Spacer />
               <TextField id="outlined-basic" label="Last name" variant="outlined" className='flex-1' />
            </SessionWrapper>

            <SessionWrapper>
               <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Select Dog Breed 🐶</InputLabel>
                  <Select
                     labelId="demo-simple-select-label"
                     id="demo-simple-select"
                     value={breed}
                     label="Select Dog Breed 🐶"
                     onChange={(event) => handleSetDogBreed(event)}
                  >
                     {dogBreeds.map((dogBreed: string) => {
                        return (
                           <MenuItem value={dogBreed}>{dogBreed}</MenuItem>
                        )
                     })}
                  </Select>
               </FormControl>
            </SessionWrapper>

            <SessionWrapper>
               <TextField
                  id="outlined-multiline-flexible"
                  label="Address"
                  multiline
                  maxRows={4}
                  minRows={4}
                  fullWidth
               />
            </SessionWrapper>

            <Button fullWidth={false} className='text-black text-bold' variant="contained" endIcon={<SendIcon />}>
               Schedule
            </Button>
         </div>
      </LocalizationProvider>
   );
}