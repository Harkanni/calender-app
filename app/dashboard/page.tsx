import Navbar from '@/components/Navbar'
import React from 'react'
import styles from '@/app/dashboard.module.css'

const page = () => {
  return (
    <div className={`${styles['dashboard-wrapper']}`}>
      <Navbar />
      Dashboard
    </div>
  )
}

export default page