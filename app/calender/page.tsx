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

import { UserContext } from '@/constants/UserContext';
import SendIcon from '@mui/icons-material/Send'
import AddIcon from '@mui/icons-material/AddCircleRounded';
import { dogBreeds } from '@/constants/dogBreeds';
import Summary from '@/components/Summary';

// const dogBreed = ['dogBreed', 'dogBreed', 'dogBreed', 'dogBreed', 'dogBreed']

export default function CommonlyUsedComponents() {
   const [sessionCount, setSessionCount] = React.useState(1);
   const [user, setUser] = React.useState({ firstName: '', lastName: '', address: '' });
   const [breed, setDogBreed] = React.useState('')

   const [loading, setLoading] = React.useState(false);
   const [modal, setModal] = React.useState(false);




   const pause = () =>
      new Promise((resolve) => {
         setTimeout(resolve, 5000);
      });

   const addSession = () => {
      setSessionCount(sessionCount + 1);
   };

   const handleSetDogBreed = (event: SelectChangeEvent) => {
      console.log(event)
      setDogBreed(event.target.value);
   };

   const handleSchedule = async () => {
      console.log('schedule creation started');

      setLoading(true)
      
      await pause();
      
      setLoading(false);
      
      console.log('schedule created');
   }

   const handleNameChange = (event: any) => {
      const { name, value } = event.target;
      setUser((prevData) => ({
         ...prevData,
         [name]: value,
      }));
   }

   return (
      <UserContext.Provider value={[]}>
         <LocalizationProvider dateAdapter={AdapterDayjs}>
            <div className={`${modal && 'blurBg'} form-container flex flex-col gap-4 min-w-[70vw] min-h-[70vh] m-auto bg-white rounded-md`}>
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
                  <TextField id="outlined-basic" label="First name" name='firstName' variant="outlined" className='flex-1' value={user.firstName} onChange={handleNameChange} />
                  <Spacer />
                  <TextField id="outlined-basic" label="Last name" name='lastName' variant="outlined" className='flex-1' value={user.lastName} onChange={handleNameChange} />
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
                     name='address'
                     value={user.address}
                     onChange={handleNameChange}
                  />
               </SessionWrapper>

               <Button className='text-black text-bold p-4 w-[40%] hover:bg-slate-500' variant="contained" endIcon={<SendIcon />} onClick={handleSchedule}>
                  Schedule
               </Button>


            </div>
            {
               loading && <Summary setModal={setModal} user={user} dogBreed={breed} sessionCount={sessionCount} loading setLoading={setLoading} />
            }

         </LocalizationProvider>

      </UserContext.Provider>
   );
}