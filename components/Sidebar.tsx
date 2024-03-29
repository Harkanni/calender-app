import React from 'react'
import styles from '@/app/dashboard.module.css'

import { RiDashboardFill } from "react-icons/ri";
import { FaUserAlt } from "react-icons/fa";
import { SlCalender } from "react-icons/sl";
import Link from 'next/link';


const Sidebar = () => {
   return (
      <section className={`flex flex-col gap-10 w-[30%] flerrrx-[2rem] p-10 ${styles['box-shadow']}`}>
         <Link href={'/dashboard'}>
            <div className='flex items-center gap-3'>
               <RiDashboardFill size={25} />
               Dashboard
            </div>
         </Link>
         <Link href={'/coming-soon'}>
            <div className='flex items-center gap-3'>
               <FaUserAlt size={25} />
               User
            </div>
         </Link>
         <Link href={'/coming-soon'}>
            <div className='flex items-center gap-3'>
               <SlCalender size={25} />
               Calender
            </div>
         </Link>

      </section >
   )
}

export default Sidebar