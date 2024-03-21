import Navbar from '@/components/Navbar'
import React from 'react'
import styles from '@/app/dashboard.module.css'
import Sidebar from '@/components/Sidebar'
import MainSection from '@/components/MainSection'

const page = () => {
   return (
      <div className={`${styles['dashboard-wrapper']}`}>
         <Navbar />
         <section className={`flex gap-`}>
            <Sidebar />
            <MainSection />
         </section>
      </div>
   )
}

export default page