import React from 'react'
import CustomCalendar from './Components/CustomCalendar';
import { Toaster } from 'react-hot-toast';

const App = () => {
  return (
    <div className='h-screen flex items-center justify-center'>
      <Toaster position='top-center'/>
      <CustomCalendar />
    </div>)
}

export default App;