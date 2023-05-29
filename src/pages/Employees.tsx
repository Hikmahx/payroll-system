import React from 'react'
import EmployeesTable from '../components/Employees/EmployeesTable'

const Employees = () => {
  return (
    <section className="min-h-[80vh]">
      <h1 className="font-bold my-12 px-8">All Employees</h1>
      <EmployeesTable />
    </section>
  )
}

export default Employees