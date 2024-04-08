'use client'


import React, { useState, useEffect } from 'react'
import styles from '@/app/dashboard.module.css'
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers';
import moment from 'moment';

import { countUserStatus } from '@/constants/analytics'
import EnhancedTable from './Table';
import { Users } from '@/constants/users';

const MainSection = () => {
   const [sessionCount, setSessionCount] = React.useState(1);
   const [date, setDate] = React.useState<any | null>(null);
   const [time, setTime] = React.useState<any | null>(null);
   const [user, setUser] = React.useState({ firstName: '', lastName: '', address: '', 'session': '' });
   const [breed, setDogBreed] = React.useState('')

   const [loading, setLoading] = React.useState(false);
   const [modal, setModal] = React.useState(false);

   const [sessionData, setSessionData] = React.useState<any>([{ time: '', date: '' }]);
   const [sessionState, setSessionState] = React.useState({ time: '', date: '' });

   const Analytics = countUserStatus(Users)



   const [schedules, setSchedules] = useState([]);
   const [currentPage, setCurrentPage] = useState(1);
   const [totalPages, setTotalPages] = useState(3);
   const [totalClients, setTotalClients] = useState<any>()

   useEffect(() => {
      // Function to fetch schedules from the backend
      async function fetchSchedulesFromBackend() {
         try {
            // Make an API call to fetch schedules for the current page
            const response = await fetch(`https://alert-trench-coat-foal.cyclic.app/api/v1/calender/schedules?page=${currentPage}&perPage=5`);
            if (!response.ok) {
               throw new Error('Failed to fetch schedules');
            }
            // Parse the JSON response
            const data = await response.json();
            // Extract schedules and total pages from the response
            const { schedules: fetchedSchedules, totalPages: fetchedTotalPages, totalClients } = data;
            console.log(data);
            // Set the fetched schedules and total pages in state
            setSchedules(fetchedSchedules);
            setTotalPages(fetchedTotalPages);
            setTotalClients(totalClients)
         } catch (error) {
            console.error('Error fetching schedules:', error);
            // Optionally handle error
            alert('Error fetching your appointments, check your internet connection and try again later')
         }
      }

      // Call the function to fetch schedules when the component mounts or currentPage changes
      fetchSchedulesFromBackend();
   }, [currentPage]); // Dependency array includes currentPage to refetch schedules when it changes


   const handleDateOrTimeChange = (value: any, field: any, id: any) => {
      console.log("Date: ", value, " Field: ", field)
      const formattedValue =
         field === 'date'
            ? moment(value).format('ddd. MMMM Do, YYYY')
            : moment(value).format('HH:mm a');

      setSessionState((prevState) => ({ ...prevState, [field]: formattedValue }));

      if (sessionData[id]) {
         const updatedSessionData = sessionData.map((session: any, index: any) =>
            index === id ? { ...session, [field]: formattedValue } : session
         );
         setSessionData(updatedSessionData);
      }
   };

   const HandleSpecificCount = ({ title }: { title: string }) => {
      let count = 0;
      if (title == 'Clients') count = totalClients
      if (title == 'Bookings') count = totalClients
      if (title == 'Pending') count = 0
      if (title == 'Revenue') count = 1500
      return (
         <>{count}</>
      )
   }

   const handleGetAccessToken = async () => {
      try {
         const response = await fetch(`https://marketplace.gohighlevel.com/oauth/chooselocation?response_type=code&redirect_uri=http://localhost:3000/redirectHere&client_id=66023b6f76979edf38194d72-lu7t76eg&scope=calendars.readonly calendars.write calendars/events.readonly contacts.readonly contacts.write`,);
         
         if (!response.ok) {
            throw new Error('Failed to fetch schedules');
         }
      } catch (error) {
         console.error('Error fetching access code:', error);
      }
   }





   return (
      <LocalizationProvider dateAdapter={AdapterMoment}>
         <div className={`w-[80%] flerrrx-[40rem] p-10 ${styles['box-shadow']}`}>
            <div className='flex'>
               <div>
                  <h1 className='mb-3'>Set Date Available</h1>
                  <DatePicker localeText={{ clockLabelText: () => '' }} disablePast label="" className='flex-1' value={date} onChange={(date: any, id) => handleDateOrTimeChange(date, 'date', id)} name={'date'} />
               </div>
               <div onClick={() => handleGetAccessToken()}>
                  Get Access Token Now
               </div>
            </div>

            <div className='flex justify-between mt-10 mb-4'>
               <span>Overview</span>
               <span>Today</span>
            </div>

            <div className='flex gap-4'>
               {
                  Analytics.map((field, index) => (
                     <div key={index} className='p-4 bg-[#b6e2ea] rounded-lg flex-1 analytics'>
                        <p className='mb-2'>{field.title}</p>
                        <p className='font-black text-lg mb-1'>
                           <HandleSpecificCount title={field.title} />
                        </p>
                        <p className='text-sm'>{field.desc}</p>
                     </div>
                  ))
               }
            </div>


            <div className='mt-20'>
               <h1 className='font-black mb-1'>Booking Overview</h1>
               <p className='font-light text-sm mb-5'>All service bookings Overview</p>
            </div>

            <div>
               <EnhancedTable schedules={schedules} setSchedules={setSchedules} currentPage={currentPage} setCurrentPage={setCurrentPage} totalPages={totalPages} setTotalPages={setTotalPages} />
            </div>
         </div>

      </LocalizationProvider>
   )
}

export default MainSection