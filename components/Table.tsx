
'use client';

import { Pagination } from "flowbite-react";
import { Checkbox, Table } from 'flowbite-react';
import { Users } from '@/constants/users';
import { Avatar } from '@mui/material';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { avatar, avatar2, avatar3, avatar4, avatar5, avatar6 } from '@/assets';



const EnhancedTable = () => {
   const avatarList = [avatar, avatar2, avatar3, avatar4, avatar5, avatar6]
   const [schedules, setSchedules] = useState([]);
   const [currentPage, setCurrentPage] = useState(1);
   const [totalPages, setTotalPages] = useState(3);

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
            const { schedules: fetchedSchedules, totalPages: fetchedTotalPages } = data;
            console.log(data);
            // Set the fetched schedules and total pages in state
            setSchedules(fetchedSchedules);
            setTotalPages(fetchedTotalPages);
         } catch (error) {
            console.error('Error fetching schedules:', error);
            // Optionally handle error
            alert('Error fetching your appointments, check your internet connection and try again later')
         }
      }

      // Call the function to fetch schedules when the component mounts or currentPage changes
      fetchSchedulesFromBackend();
   }, [currentPage]); // Dependency array includes currentPage to refetch schedules when it changes

   // Function to handle page change
   const handlePageChange = (page: number) => {
      setCurrentPage(page);
   };




   function stringToColor(string: string) {
      let hash = 0;
      let i;

      /* eslint-disable no-bitwise */
      for (i = 0; i < string.length; i += 1) {
         hash = string.charCodeAt(i) + ((hash << 5) - hash);
      }

      let color = '#';

      for (i = 0; i < 3; i += 1) {
         const value = (hash >> (i * 8)) & 0xff;
         color += `00${value.toString(16)}`.slice(-2);
      }
      /* eslint-enable no-bitwise */

      return color;
   }

   function stringAvatar(name: string) {
      return {
         sx: {
            bgcolor: stringToColor(name),
            width: 24, height: 24,
            // padding: 2
         },
         children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
      };
   }

   function getRandomItemFromArray(array: any) {
      // Shuffle the array to ensure randomness
      const shuffledArray = array.slice().sort(() => Math.random() - 0.5);

      // Initialize an index to keep track of the next item to select
      let currentIndex = 0;

      // Return a function that selects the next item from the shuffled array
      return function () {
         if (currentIndex >= shuffledArray.length) {
            return null; // Array is exhausted
         } else {
            return shuffledArray[currentIndex++];
         }
      }();
   }


   return (
      <>
         <div className="overflow-x-auto">
            <Table hoverable>
               <Table.Head className='bg-[black]'>
                  <Table.HeadCell className="p-4">
                     <Checkbox />
                  </Table.HeadCell>
                  <Table.HeadCell>clients name</Table.HeadCell>
                  <Table.HeadCell>Email Address</Table.HeadCell>
                  <Table.HeadCell>Dog Service</Table.HeadCell>
                  <Table.HeadCell>Date/Time</Table.HeadCell>
                  <Table.HeadCell>DogType</Table.HeadCell>
                  <Table.HeadCell>Notes/Comments</Table.HeadCell>
                  <Table.HeadCell>Address</Table.HeadCell>
                  <Table.HeadCell>Status</Table.HeadCell>
               </Table.Head>
               <Table.Body className="divide-y">
                  {
                     schedules.map((schedule: any, id:number) => (
                        <Table.Row key={id} className="bg-white dark:border-gray-700 dark:bg-gray-800">

                           <Table.Cell className="p-4">
                              <Checkbox />
                           </Table.Cell>
                           <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white flex items-center gap-2 p-8">
                              <div>
                                 <Avatar {...stringAvatar(schedule.firstName + ' ' + schedule.lastName)}>
                                    <Image
                                       src={getRandomItemFromArray(avatarList)}
                                       alt='Bovi John'
                                    />
                                 </Avatar>
                              </div>
                              <div> {schedule.firstName + ' ' + schedule.lastName} </div>
                           </Table.Cell>
                           <Table.Cell>{schedule.email || 'No email'}</Table.Cell>
                           <Table.Cell className='whitespace-nowrap w-[10rem] overflow-hidden text-ellipsis'>{schedule.service || 'Dog daycare'}</Table.Cell>
                           <Table.Cell>
                              {
                                 schedule.session.map((item: any) => (
                                    <p className='whitespace-nowrap w-[10rem] overflow-hidden text-ellipsis'>{item.date}</p>
                                 ))
                              }
                           </Table.Cell>
                           <Table.Cell className='whitespace-nowrap w-[10rem] overflow-hidden text-ellipsis'>{schedule.dogBreed}</Table.Cell>
                           <Table.Cell>
                              <p className='whitespace-nowrap w-[10rem] overflow-hidden text-ellipsis'>{schedule.address || 'No comment'}</p>
                           </Table.Cell>
                           <Table.Cell className='whitespace-nowrap w-[10rem] overflow-hidden text-ellipsis'>{schedule.address || 'No address'}</Table.Cell>
                           <Table.Cell>{schedule.status || 'Confirmed'}</Table.Cell>
                        </Table.Row>
                     ))
                  }
               </Table.Body>
            </Table>
         </div>

         {/* Pagination controls */}

         <div className="flex overflow-x-auto sm:justify-center">
            <Pagination className="cursor-pointer" currentPage={currentPage} totalPages={totalPages < 1 ? 2 : totalPages} onPageChange={() => handlePageChange(1)} showIcons defaultValue={2}/>
         </div>
      </>

   );
}


export default EnhancedTable
