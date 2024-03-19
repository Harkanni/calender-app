'use client'


import React from 'react'
import styles from '@/app/dashboard.module.css'
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers';
import moment from 'moment';

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



   return (
      <LocalizationProvider dateAdapter={AdapterMoment}>
         <div className={`flex-[40rem] p-10 ${styles['box-shadow']}`}>
            <h1 className='mb-2'>Set Date Available</h1>
            <DatePicker localeText={{ clockLabelText: () => '' }} disablePast format='ddd. MMMM Do, YYYY' label="" className='flex-1' value={date} onChange={(date: any, id) => handleDateOrTimeChange(date, 'date', id)} name={'date'} />
         </div>

         <div className='flex justify-between'>
            <span>Overview</span>
            <span>Today</span>
         </div>

      </LocalizationProvider>
   )
}

export default MainSection