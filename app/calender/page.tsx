'use client'

import axios from 'axios';
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

import styles from '@/app/style.module.css'
import { UserContext } from '@/constants/UserContext';
import SendIcon from '@mui/icons-material/Send'
import AddIcon from '@mui/icons-material/AddCircleRounded';
import { dogBreeds } from '@/constants/dogBreeds';
import { Services } from '@/constants/services'
import Summary from '@/components/Summary';
import dayjs, { Dayjs } from 'dayjs';
import moment from 'moment';


// import useTheme from '@mui/material/styles/useTheme';
import theme from '@/constants/themes';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { lime, purple, common } from '@mui/material/colors';

// const dogBreed = ['dogBreed', 'dogBreed', 'dogBreed', 'dogBreed', 'dogBreed']

export default function CommonlyUsedComponents() {
   // const theme = useTheme();
   const [sessionCount, setSessionCount] = React.useState(1);
   const [date, setDate] = React.useState<any | null>(null);
   const [time, setTime] = React.useState<any | null>(null);
   const [user, setUser] = React.useState({ firstName: '', lastName: '', email: '', address: '', 'session': '' });
   const [breed, setDogBreed] = React.useState('')
   const [service, setDogService] = React.useState('')

   const [loading, setLoading] = React.useState(false);
   const [modal, setModal] = React.useState(false);

   const [sessionData, setSessionData] = React.useState<any>([{ time: '', date: '' }]);
   const [sessionState, setSessionState] = React.useState({ time: '', date: '' });






   const pause = (time: number) =>
      new Promise((resolve) => {
         setTimeout(resolve, time);
      });

   const addSession = (index: any) => {
      console.log('addSession index: ', index)
      setSessionCount(sessionCount + 1);
      console.log('This is time: ', sessionState.time, 'This is date : ', sessionState.date, 'This is session : ', sessionState)
      let state = [...sessionData, sessionState]
      setSessionData([...state])
      setSessionState({ time: '', date: '' })
      console.log('state: ', state)
   };

   const handleSetDogBreed = (event: SelectChangeEvent) => {
      // console.log(event)
      setDogBreed(event.target.value);
   };
   const handleSetDogService = (event: SelectChangeEvent) => {
      // console.log(event)
      setDogService(event.target.value);
   };

   // DEMO SCHEDULE HANDLER
   // const handleSchedule = async () => {
   //    console.log('schedule creation started');

   //    console.log('Attempting to create schedule');

   //    // Validate user information
   //    if (!user.firstName || !user.lastName) {
   //       alert('Please enter your first name, last name, and phone number.');
   //       return; // Stop the function from proceeding
   //    }

   //    // Validate sessionData
   //    const isValid = sessionData.some((session: { date: string, time: string }) => session.date && session.time);

   //    if (!isValid) {
   //       alert('Please enter at least one schedule with both date and time.');
   //       return; // Stop the function from proceeding
   //    }

   //    setLoading(true)

   //    await pause(5000);

   //    setLoading(false);

   //    // await pause(1);

   //    setModal(true);

   //    console.log('schedule created');
   //    console.log(sessionData)
   // }

   const handleSchedule = async () => {
      let name = user.firstName + ' ' + user.lastName
      setLoading(true);

      // Assuming your API endpoint is '/api/schedule'

      console.log('Attempting to create schedule');


      // const apiEndpoint = 'http://localhost:8080/api/v1/calender/createSchedule';
      const apiEndpoint = 'https://alert-trench-coat-foal.cyclic.app/api/v1/calender/createSchedule';

      try {
         // Validate user information
         if (!user.firstName || !user.lastName || !user.address || !user.email) {
            alert('Please enter your first name, last name, address and phone number.');
            return; // Stop the function from proceeding
         }

         if (!breed) {
            alert('Please select your dogBreed ')
            return; // Stop the function from proceeding
         }

         // Validate sessionData
         const isValid = sessionData.some((session: { date: string, time: string }) => session.date && session.time);

         if (!isValid) {
            alert('Please enter at least one schedule with both date and time.');
            return; // Stop the function from proceeding
         }



         // Make a POST request to the API with the sessionData
         const response = await axios.post(apiEndpoint, { ...user, name, "locationId": "JnzQAd6IWawdFzuBDK0q", dogBreed: breed, session: sessionData });

         // Check if the request was successful (status code 2xx)
         if (response.status === 200) {
            setModal(true);
            console.log('Schedule created successfully: ', user);
         } else {
            console.error('Failed to create schedule:', response.statusText);
            // Handle error appropriately, e.g., show an error message
            console.error('Failed to create schedule:', response.data.error);
            alert(`Failed to create schedule. ${response.data.error}`);
         }
      } catch (error: any) {
         console.error('An error occurred while creating the schedule:', error.message);
         // Handle error appropriately, e.g., show an error message
         console.error('An unexpected error occurred:', error);
         alert('An unexpected error occurred. Please try again later.');
      } finally {
         setLoading(false);
      }
   };


   const handleNameChange = (event: any) => {
      const { name, value } = event.target;
      setUser((prevData) => ({
         ...prevData,
         [name]: value,
      }));
   }

   const handleDateChange = (date: any, id: any) => {
      console.log(id, moment(date).format('ddd. MMMM Do, YYYY'));

      // Update sessionState
      const updatedSessionState = { ...sessionState, date: moment(date).format('ddd. MMMM Do, YYYY') };
      setSessionState(updatedSessionState);

      // IF UPDATING SESSION DATA
      if (sessionData[id]) {
         // Update the specific session in the sessionData array
         const updatedSessionData = sessionData.map((session: any, index: any) =>
            index === id ? { ...session, date: moment(date).format('ddd. MMMM Do, YYYY') } : session
         );

         console.log("This is edited session: ", updatedSessionData[id]);
         setSessionData(updatedSessionData);
      }
   };

   const handleTimeChange = (time: any, id: any) => {
      console.log(id, moment(time).format('HH:mm a'));

      // Update sessionState
      const updatedSessionState = { ...sessionState, time: moment(time).format('HH:mm a') };
      setSessionState(updatedSessionState);

      // IF UPDATING SESSION DATA
      if (sessionData[id]) {
         // Update the specific session in the sessionData array
         const updatedSessionData = sessionData.map((session: any, index: any) =>
            index === id ? { ...session, time: moment(time).format('HH:mm a') } : session
         );

         console.log("This is edited session: ", updatedSessionData[id]);
         setSessionData(updatedSessionData);
      }
   };

   const handleDateOrTimeChange = (value: any, field: any, id: any) => {
      console.log("Date: ", value, " Field: ", field)
      const formattedValue =
         field === 'date'
            ? moment(value).format('ddd. MMMM Do, YYYY')
            : moment(value).format('HH:mm a');

      setSessionState((prevState) => ({ ...prevState, [field]: value }));

      if (sessionData[id]) {
         const updatedSessionData = sessionData.map((session: any, index: any) =>
            index === id ? { ...session, [field]: value } : session
         );
         setSessionData(updatedSessionData);
      }
   };

   const shouldDisableDate = (date: Dayjs) => {
      const day = date.day(); // Get the day of the week (0 for Sunday, 1 for Monday, etc.)
      return day !== 0 && day !== 6 && day != 5 && day != 4; // Disable all days except Sunday (0) and Saturday (6)
      // console.log(day)
   };




   return (
      <ThemeProvider theme={theme}>
         <UserContext.Provider value={[]}>
            <LocalizationProvider dateAdapter={AdapterMoment}>
               <div className='body'>
                  <div className={`${(loading || modal) && 'blurBg'} form-container flex flex-col gap-4 min-w-[70vw] min-h-[70vh] ${styles.container}  m-auto bg-white rounded-md`}>
                     {
                        [...Array(sessionCount)].map((_, index) => {
                           // console.log(index)
                           return (
                              <SessionWrapper key={`${index} session`} id={index}>
                                 <DatePicker shouldDisableDate={shouldDisableDate} localeText={{ clockLabelText: () => '' }} disablePast format='ddd. MMMM Do, YYYY' label="Session day" className={`flex-1 ${styles.datePicker}`} value={date} onChange={(date: any, id) => handleDateOrTimeChange(date, 'date', index)} name={'date'} />
                                 <Spacer />
                                 <TimePicker label="Start time" className={`flex-1 ${styles.timePicker}`} onChange={(time: any) => handleDateOrTimeChange(time, 'time', index)} name='time' value={time} />
                                 <Button color='warning' className={`hover:bg-slate-500 flex justify-center ${styles.lg_addSession}`} variant="contained" onClick={() => addSession(index)}>
                                    <AddIcon color='action' />
                                 </Button>
                              </SessionWrapper>
                           )
                        })
                     }
                     <Button color='warning' className={`hover:bg-slate-500 flex justify-center p-4 mb-4 ${styles.sm_addSession}`} variant="contained" onClick={() => addSession(sessionCount)}>
                        <AddIcon color='action' />
                     </Button>

                     <SessionWrapper>
                        <TextField id="outlined-basic" label="First name" name='firstName' variant="outlined" className={`flex-1 ${styles.textField}`} value={user.firstName} onChange={handleNameChange} />
                        <Spacer />
                        <TextField id="outlined-basic" label="Last name" name='lastName' variant="outlined" className={`flex-1 ${styles.textField}`} value={user.lastName} onChange={handleNameChange} />
                     </SessionWrapper>

                     <SessionWrapper>
                        <TextField id="outlined-basic" label="Email" name='email' variant="outlined" className={`flex-1 ${styles.textField}`} value={user.email} onChange={handleNameChange} />
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
                        <FormControl fullWidth>
                           <InputLabel id="demo-simple-select-service-label">Select service 🐶</InputLabel>
                           <Select
                              labelId="demo-simple-select-service-label"
                              id="demo-simple-select-service"
                              value={service}
                              label="Select Dog Breed 🐶"
                              onChange={(event) => handleSetDogService(event)}
                           >
                              {Services.map((service: string, index: number) => {
                                 return (
                                    <MenuItem key={index} value={service}>{service}</MenuItem>
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

                     <Button color='warning' className={`text-black p-4 w-[40%] hover:bg-slate-500 ${styles.scheduleBTN}`} variant="contained" endIcon={<SendIcon />} onClick={handleSchedule}>
                        Schedule
                     </Button>


                  </div>
                  {
                     (loading || modal) && <Summary setModal={setModal} user={user} dogBreed={breed} sessionCount={sessionCount} loading={loading} setLoading={setLoading} />
                  }

               </div>

            </LocalizationProvider>

         </UserContext.Provider>
      </ThemeProvider>
   );
}