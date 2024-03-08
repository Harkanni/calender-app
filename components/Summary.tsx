import React from 'react'
import MarkIcon from '@mui/icons-material/MarkAsUnread';
import { logo } from '@/assets/index'
import Image from 'next/image';
import LoadingScreen from './loadingScreen';

interface Props {
   setModal: any,
   user: {
      firstName: string,
      lastName: string
   },
   dogBreed: string,
   sessionCount: number,
   loading: boolean,
   setLoading: (loading: boolean) => void
}

const MiniComponent = ({ setModal, user, dogBreed, sessionCount, loading, setLoading }: Props) => {
   return (
      <>
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
               <h2>{`${sessionCount} session${sessionCount > 1 ? 's' : ''}`}</h2>
            </div>
            <div className='flex gap-12'>
               <p className='flex-1'>Dog Breed:</p>
               <h2>{dogBreed}</h2>
            </div>
            <div className='flex gap-12'>
               <p className='flex-1'>Start Date:</p>
               <h2>Tuesday, 9:00am, 2024</h2>
            </div>
         </div>
      </>
   )
}

const Summary = ({ setModal, user, dogBreed, sessionCount, loading, setLoading }: Props) => {
   console.log(user)
   const handleCloseModal = () => {
      setModal(false)
      setLoading(false)
   }

   return (
      <div className={`summaryContainer flex justify-center items-center`} onClick={handleCloseModal}>
         <div className={`summary rounded-lg flex flex-col justify-center items-center`}>
            {
               loading ? <LoadingScreen color='black' type='bars' /> : <MiniComponent setModal={setModal} user={user} dogBreed={dogBreed} sessionCount={sessionCount} loading setLoading={setLoading} />
            }


            {/* {loading && <LoadingScreen color='black' type='bars' />} */}

         </div>
      </div>
   )
}

export default Summary