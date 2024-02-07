import React from 'react'

const Summary = () => {
   return (
      <div className={`summaryContainer flex justify-center items-center`}>
         <div className={`summary rounded-lg flex flex-col justify-center items-center`}>
            <div className='flex flex-col gap-4'>
               <div className='flex gap-12'>
                  <p className='flex-1'>Full Name:</p>
                  <h2>Adeleke David</h2>
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