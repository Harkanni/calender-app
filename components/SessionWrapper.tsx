import React from 'react'

const SessionWrapper = ({ children }: Readonly<{ children: React.ReactNode }>) => {
   return (
      <div className={`session-wrapper w-[100%] flex justify-center items-center gap-4`}>
         {children}
      </div>
   )
}

export default SessionWrapper