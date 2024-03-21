
'use client';

import { Checkbox, Table } from 'flowbite-react';
import { Users } from '@/constants/users';
import { Avatar } from '@mui/material';
import Image from 'next/image';
import { avatar, avatar2, avatar3, avatar4, avatar5, avatar6 } from '@/assets';



const EnhancedTable = () => {
   const avatarList = [avatar, avatar2, avatar3, avatar4, avatar5, avatar6]
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
      return function() {
          if (currentIndex >= shuffledArray.length) {
              return null; // Array is exhausted
          } else {
              return shuffledArray[currentIndex++];
          }
      }();
  }


   return (
      <div className="overflow-x-auto">
         <Table hoverable>
            <Table.Head className='bg-[black]'>
               <Table.HeadCell className="p-4">
                  <Checkbox />
               </Table.HeadCell>
               <Table.HeadCell>clients name</Table.HeadCell>
               <Table.HeadCell>Email Address</Table.HeadCell>
               <Table.HeadCell>Date/Time</Table.HeadCell>
               <Table.HeadCell>DogType</Table.HeadCell>
               <Table.HeadCell>Notes/Comments</Table.HeadCell>
               <Table.HeadCell>Address</Table.HeadCell>
               <Table.HeadCell>Status</Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y">
               {
                  Users.map(user => (
                     <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">

                        <Table.Cell className="p-4">
                           <Checkbox />
                        </Table.Cell>
                        <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white flex items-center gap-2 p-8">
                           <div>
                              <Avatar {...stringAvatar(user.name)}>
                                 <Image
                                    src={getRandomItemFromArray(avatarList)}
                                    alt='Bovi John'
                                 />
                              </Avatar>
                           </div>
                           <div> {user.name} </div>
                        </Table.Cell>
                        <Table.Cell>{user.email}</Table.Cell>
                        <Table.Cell>{user.date}</Table.Cell>
                        <Table.Cell>{user.breed}</Table.Cell>
                        <Table.Cell>{user.comment}</Table.Cell>
                        <Table.Cell>{user.address}</Table.Cell>
                        <Table.Cell>{user.status}</Table.Cell>
                     </Table.Row>
                  ))
               }
            </Table.Body>
         </Table>
      </div>
   );
}


export default EnhancedTable
