import React, { useState } from 'react';
import Calendar from 'react-calendar';
import './CustomCalendar.css';
import moment from 'moment';

const Calender = () => {
  const [selectedDateRange, setSelectedDateRange] = useState([]);
  const bookedDates = [new Date('2023-09-10'), new Date('2023-09-15')]; // Example booked dates

  const isDateBooked = (date) => {
    return bookedDates.some((bookedDate) =>
      moment(date).isSame(bookedDate, 'day')
    );
  };

  const tileClassName = ({ date }) => {
    if (isDateBooked(date)) {
      return 'booked-date';
    } else {
      return 'available-date';
    }
  };

  const handleDateChange = (date) => {
  
    setSelectedDateRange(date);
  };

  return (
    <div className='mx-auto w-full'>
      <h2>Select a date range:</h2>
      <Calendar
        onChange={handleDateChange}
        selectRange={true}
        tileClassName={tileClassName}
      />
      <div>
        CheckIn:{selectedDateRange[0] ? `${moment(selectedDateRange[0]).format('DD MM YYYY')}` : 'Please select a date'}<br />
        CheckOut:{selectedDateRange[1] ? `${moment(selectedDateRange[1]).format('DD MM YYYY')}` : 'Please select a date'}<br />
        Total price:<br />
      </div>
    </div>
  );
};

export default Calender;