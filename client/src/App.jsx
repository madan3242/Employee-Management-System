import React, { useState } from 'react'
import TopNav from './components/TopNav/TopNav'
import LeftNav from './components/LeftNav/LeftNav';
import MainSection from './components/MainSection/MainSection';

const App = () => {
  const [employeeId, setEmployeeId] = useState('');
  return (
    <>
      <TopNav />
      <LeftNav employeeId={employeeId} />
      <MainSection setEmployeeId={setEmployeeId} />
    </>
  )
}

export default App