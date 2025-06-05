import React from 'react'
import EmployeeCard from './components/EmployeeCard'
import { Button } from '@/components/ui/button'
import PayRollTopCards from './components/PayRollTopCards'

const AdminPayroll = () => {
  return (
    <div>
      <div className="flex items-center justify-between my-4 max-sm:flex-col gap-4">
        <h1 className="text-3xl font-medium text-charcoal">Overview</h1>
        <div className="flex gap-2">
          <Button
            onClick={() => {}}
            className="px-4 py-2 bg-gray-dark rounded-4xl text-base font-normal hover:bg-gray-soft transition-colors cursor-pointer"
            variant={"ghost"}
          >
            View History
          </Button>
        </div>
      </div>
      <PayRollTopCards />
      <EmployeeCard />
    </div>
  )
}

export default AdminPayroll
