import React from 'react'

const page = () => {
   return (
      <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center relative px-4">
         <div className="absolute top-0 left-0 w-full h-full bg-cover bg-center opacity-30"
            style={{backgroundImage: "url('https://images.unsplash.com/photo-1583337130417-3346a1be7dee?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')"}}>
         </div>
         <h1 className="text-5xl md:text-7xl text-white font-bold mb-8 z-10">Coming Soon</h1>
         <p className="text-white text-xl md:text-2xl">
            We're working hard to bring you something amazing. Stay tuned!
         </p>
      </div>
   )
}

export default page