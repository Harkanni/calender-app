import React from 'react'
import styles from '@/app/dashboard.module.css'

const Navbar = () => {
  return (
    <div className={`${styles.navbar} flex items-center justify-between p-4 border-b-2`}>
      <div className='flex gap-1 items-center'>
         <div className={`w-3 h-3 rounded-lg bg-blue-800`}></div>
         <div className={`w-3 h-3 rounded-lg bg-blue-900 mr-2`}></div>
         <span>Logo</span>
      </div>
      <div className={`flex gap-4`}>
         <span>notification icon</span>
         <div>Bovi John</div>
         <span>dropdown icon</span>
      </div>
    </div>
  )
}

export default Navbar