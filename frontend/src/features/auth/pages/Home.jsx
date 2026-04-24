import React from 'react'
import Navbar from '../../shared/components/Navbar'
import ArenaPage from '../../ai/pages/ArenaPage'
import SideBar from '../../ai/components/SideBar'

const Home = () => {
  return (
    <div className='w-full min-h-screen flex flex-col'>
      <Navbar />
      <div className='flex w-full h-full flex-1 '>
       <SideBar />
      <ArenaPage />

      </div>
    </div>
  )
}

export default Home