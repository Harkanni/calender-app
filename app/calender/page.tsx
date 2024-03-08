'use client'

import * as React from 'react';
import { styled } from '@mui/material/styles';
import Tooltip from '@mui/material/Tooltip';
import Stack from '@mui/material/Stack';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
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
import dayjs, { Dayjs } from 'dayjs';
import moment from 'moment';

// const dogBreed = ['dogBreed', 'dogBreed', 'dogBreed', 'dogBreed', 'dogBreed']

export default function CommonlyUsedComponents() {
   const [sessionCount, setSessionCount] = React.useState(1);
   const [date, setDate] = React.useState<any | null>(null);
   const [user, setUser] = React.useState({ firstName: '', lastName: '', address: '', 'session-1': '' });
   const [breed, setDogBreed] = React.useState('')

   const [loading, setLoading] = React.useState(false);
   const [modal, setModal] = React.useState(false);

   const [sessionData, setSessionData] = React.useState([]);
   const [sessionState, setSessionState] = React.useState({ time: '', date: '' });




   const pause = (time: number) =>
      new Promise((resolve) => {
         setTimeout(resolve, time);
      });

   const addSession = (index: any) => {
      console.log('addSession index: ', index)
      setSessionCount(sessionCount + 1);
   };

   const handleSetDogBreed = (event: SelectChangeEvent) => {
      // console.log(event)
      setDogBreed(event.target.value);
   };

   const handleSchedule = async () => {
      console.log('schedule creation started');

      setLoading(true)

      await pause(5000);

      setLoading(false);

      // await pause(1);

      setModal(true);

      console.log('schedule created');
   }

   const handleNameChange = (event: any) => {
      const { name, value } = event.target;
      setUser((prevData) => ({
         ...prevData,
         [name]: value,
      }));
   }

   const handleDateChange = (date: any, id: number) => {
      const selectedDate = moment(date).format('MMMM Do YYYY,')
      setDate(date);
      console.log('This is the Index: ', id);
   }

   const handleTimeChange = (date: any, id: number) => {
      const selectedDate = moment(date).format('MMMM Do YYYY,')
      setDate(date);
      console.log('This is the Index: ', id);
   }

   return (
      <UserContext.Provider value={[]}>
         <LocalizationProvider dateAdapter={AdapterMoment}>
            <div className={`${(loading || modal) && 'blurBg'} form-container flex flex-col gap-4 min-w-[70vw] min-h-[70vh] m-auto bg-white rounded-md`}>
               {
                  [...Array(sessionCount)].map((_, index) => {
                     // console.log(index)
                     return (
                        <SessionWrapper key={`${index} session`} id={index}>
                           <DatePicker localeText={{ clockLabelText: () => '' }} disablePast format='ddd. MMMM Do, YYYY' label="Session day" className='flex-1' onChange={(date: any, id) => handleDateChange(date, index)} name={`session-${index}`} />
                           <Spacer />
                           <TimePicker label="Start time" className='flex-1' onChange={(date: any) => handleTimeChange(date, index)} />
                           <Button className='hover:bg-slate-500 flex justify-center' variant="contained" onClick={() => addSession(index)}>
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
                        {dogBreeds.map((dogBreed: string, index: number) => {
                           return (
                              <MenuItem key={index} value={dogBreed}>{dogBreed}</MenuItem>
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
               (loading || modal) && <Summary setModal={setModal} user={user} dogBreed={breed} sessionCount={sessionCount} loading={loading} setLoading={setLoading} />
            }

         </LocalizationProvider>

      </UserContext.Provider>
   );
}