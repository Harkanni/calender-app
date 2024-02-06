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
// import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';

const ProSpan = styled('span')({
   display: 'inline-block',
   height: '1em',
   width: '1em',
   verticalAlign: 'middle',
   marginLeft: '0.3em',
   marginBottom: '0.08em',
   backgroundSize: 'contain',
   backgroundRepeat: 'no-repeat',
   backgroundImage: 'url(https://mui.com/static/x/pro.svg)',
});

export default function CommonlyUsedComponents() {
   return (
      <LocalizationProvider dateAdapter={AdapterDayjs}>
         <div className={`form-container min-w-[70vw] min-h-[70vh] m-auto bg-white rounded-md`}>
            <DatePicker label="Basic date picker" />
            <TimePicker label="Basic time picker" />
         </div>
      </LocalizationProvider>
   );
}