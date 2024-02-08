import React from 'react'

const SessionWrapper = ({ children, id }: Readonly<{ children: React.ReactNode, id?:number }>) => {
   return (
      <div className={`session-wrapper w-[100%] flex justify-center items-center gap-4`}>
         {children}
      </div>
   )
}

export default SessionWrapper