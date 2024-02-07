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


import SendIcon from '@mui/icons-material/Send'
import AddIcon from '@mui/icons-material/AddCircleRounded';
import { dogBreeds } from '@/constants/dogBreeds';

// const dogBreed = ['dogBreed', 'dogBreed', 'dogBreed', 'dogBreed', 'dogBreed']

export default function CommonlyUsedComponents() {
   const [sessionCount, setSessionCount] = React.useState(1);
   const [breed, setDogBreed] = React.useState('')

   const [loading, setLoading] = React.useState(false);

   const addSession = () => {
      setSessionCount(sessionCount + 1);
   };

   const handleSetDogBreed = (event: SelectChangeEvent) => {
      console.log(event)
      setDogBreed(event.target.value);
   };

   const handleSchedule = () => {
      console.log('schedule created');
   }

   return (
      <LocalizationProvider dateAdapter={AdapterDayjs}>
         <div className={`form-container flex flex-col gap-4 min-w-[70vw] min-h-[70vh] m-auto bg-white rounded-md`}>
            {
               [...Array(sessionCount)].map((_, index) => {
                  console.log(index)
                  return (
                     <SessionWrapper key={`${index} session`}>
                        <DatePicker label="Session day" className='flex-1' />
                        <Spacer />
                        <TimePicker label="Start time" className='flex-1' />
                        <Button className='hover:bg-slate-500 flex justify-center' variant="contained" onClick={addSession}>
                           <AddIcon color='action' />
                        </Button>
                     </SessionWrapper>
                  )
               })
            }

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

            <Button className='text-black text-bold p-4 w-[40%] hover:bg-slate-500' variant="contained" endIcon={<SendIcon />} onClick={handleSchedule}>
               Schedule
            </Button>


         </div>
      </LocalizationProvider>
   );
}