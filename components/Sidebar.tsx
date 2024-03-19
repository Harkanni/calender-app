import React from 'react'
import styles from '@/app/dashboard.module.css'
const Sidebar = () => {
  return (
    <section className={`flex-[2rem] p-4 ${styles['box-shadow']}`}>
      <div>Dashboard</div>
      <div>User</div>
      <div>Calender</div>
    </section>
  )
}

export default Sidebar