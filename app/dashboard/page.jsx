import { UserButton } from '@clerk/nextjs'
import React from 'react'
import AddNewInterview from './_components/AddNewInterview'
import InterviewList from './_components/InterviewList'

function Dashboard() {
  return (
    <div className='bg-white dark:bg-gray-900 text-gray-900 dark:text-white p-10 min-h-screen'>
      <div className='bg-white dark:bg-gray-900'>
        <h2 className='font-bold text-3xl text-primary dark:text-white'>Dashboard</h2>
        <h2 className='text-gray-500 dark:text-gray-400'>Create and Start your AI Mockup Interview</h2>

        <div className='grid grid-cols-1 md:grid-cols-3 my-5 gap-5'>
          <AddNewInterview />
        </div>

        {/* Previous Interview List */}
        <InterviewList />
      </div>
      
    </div>
  )
}

export default Dashboard
