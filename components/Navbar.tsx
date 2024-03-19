import React from 'react'
import Avatar from '@mui/material/Avatar';
import styles from '@/app/dashboard.module.css'
import { VscBellDot } from "react-icons/vsc";
import { FaCaretDown } from "react-icons/fa";
import { avatar } from '@/assets';
import Image from 'next/image';



const Navbar = () => {
   return (
      <div className={`${styles.navbar} flex items-center justify-between p-4 border-b-2`}>
         <div className='flex gap-1 items-center'>
            <div className={`w-3 h-3 rounded-lg bg-blue-800`}></div>
            <div className={`w-3 h-3 rounded-lg bg-blue-900 mr-2`}></div>
            <span>Logo</span>
         </div>
         <div className={`flex gap-4 items-center`}>
            <span className='mr-4'><VscBellDot size={23} /></span>
            <div className='flex gap-2 items-center'>
               <p>Bovi John </p>
               <Avatar
                  alt="Bovi John"
                  sx={{ width: 30, height: 30 }}
               >
                  <Image
                     src={avatar}
                     alt='Bovi John'
                  />
               </Avatar>
            </div>
            <span className='-ml-2'>
               <FaCaretDown color='green' size={22} />
            </span>
         </div>
      </div>
   )
}

export default Navbar