
'use client';

import { Checkbox, Table } from 'flowbite-react';
import { Users } from '@/constants/users';



const EnhancedTable = () => {
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
               <Table.HeadCell>Dog Type</Table.HeadCell>
               <Table.HeadCell>Notes/Comments</Table.HeadCell>
               <Table.HeadCell>Address</Table.HeadCell>
               <Table.HeadCell>Status</Table.HeadCell>
               <Table.HeadCell>
                  <span className="sr-only">Edit</span>
               </Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y">
               {
                  Users.map(user => (
                     <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">

                        <Table.Cell className="p-4">
                           <Checkbox />
                        </Table.Cell>
                        <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                           { user.name }
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
