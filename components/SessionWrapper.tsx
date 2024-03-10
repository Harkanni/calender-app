import React from 'react'
import styles from "@/app/style.module.css"

const SessionWrapper = ({ children, id }: Readonly<{ children: React.ReactNode, id?:number }>) => {
   return (
      <div className={`session-wrapper w-[100%] flex justify-center items-center gap-4 ${styles.sessionWrapper}`}>
         {children}
      </div>
   )
}

export default SessionWrapper