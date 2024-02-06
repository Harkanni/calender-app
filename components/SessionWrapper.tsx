import React from 'react'

const SessionWrapper = ({ children }: Readonly<{ children: React.ReactNode }>) => {
   return (
      <div>
         {children}
      </div>
   )
}

export default SessionWrapper