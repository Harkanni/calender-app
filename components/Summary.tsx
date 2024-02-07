import React from 'react'
import MarkIcon from '@mui/icons-material/MarkAsUnread';
import {logo} from '@/assets/index'
import Image from 'next/image';

interface Props {
   setModal: any,
   user: {
      firstName: string,
      lastName: string
   },
   breed: string,
}

const Summary = ({setModal, user, breed} : Props) => {
   const handleCloseModal = () => {
      setModal(false)
   }
   
   return (
      <div className={`summaryContainer flex justify-center items-center`} onClick={handleCloseModal}>
         <div className={`summary rounded-lg flex flex-col justify-center items-center`}>
            <div>
               <Image
                  src={logo}
                  alt='logo'
                  width={250}
                  height={124}
               />
            </div>
            <div className='text-lg font-bold'>Session scheduled successful!</div>
            <div className='flex flex-col gap-4 mt-3'>
               <div className='flex gap-12'>
                  <p className='flex-1 text'>Full Name:</p>
                  <h2>{`${user.firstName} ${user.lastName}`}</h2>
               </div>
               <div className='flex gap-12'>
                  <p className='flex-1'>No. of sessions:</p>
                  <h2>3 sessions</h2>
               </div>
               <div className='flex gap-12'>
                  <p className='flex-1'>Breed:</p>
                  <h2>Golden Retriever</h2>
               </div>
               <div className='flex gap-12'>
                  <p className='flex-1'>Start Date:</p>
                  <h2>Tuesday, 9:00am, 2024</h2>
               </div>
            </div>
         </div>
      </div>
   )
}

export default Summary