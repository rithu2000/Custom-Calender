import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import './CustomCalendar.css';
import moment from 'moment';

const CustomCalendar = () => {
  const [selectedDateRange, setSelectedDateRange] = useState([]);
  const [totalCost, setTotalCost] = useState(0)
  const bookedDates = [new Date('2023-09-10'), new Date('2023-09-15')]; // Example booked dates
  const Price = 150;

  useEffect(() => {
    if (selectedDateRange.length > 0) {
      calculateTotalCost(selectedDateRange[0], selectedDateRange[1], Price)
    }
  }, [selectedDateRange]);

  function calculateTotalCost(checkinDate, checkoutDate, roomPrice) {

    const checkin = new Date(checkinDate);
    const checkout = new Date(checkoutDate);

    const diffInTime = Math.round(checkout - checkin);
    const diffInDays = diffInTime / (1000 * 3600 * 24);

    const totalCost = diffInDays * roomPrice;

    setTotalCost(totalCost.toFixed(2));
  }

  const isDateBooked = (date) => {
    return bookedDates.some((bookedDate) => {
      return bookedDate.toDateString() === new Date(date).toDateString();
    }
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
    <div className='my-element'>
      <h2>Select a date range:</h2>
      <Calendar
        onChange={handleDateChange}
        selectRange={true}
        tileClassName={tileClassName}
      />
      <div className='flex'>
        <div>
          <div className='flex gap-1'>
            <h4>CheckIn:</h4>
            <h2>{selectedDateRange[0] ? `${moment(selectedDateRange[0]).format('DD MM YYYY')}` : 'Please select a date'}</h2>
          </div>
          <div className='flex gap-1'>
            <h4>CheckOut:</h4>
            <h2>{selectedDateRange[1] ? `${moment(selectedDateRange[1]).format('DD MM YYYY')}` : 'Please select a date'}</h2>
          </div>
          <div className='flex gap-1'>
            <h4>Total price:</h4>
            {totalCost ? <h2>{totalCost}</h2> : <h2 className='text-red'>Dates not selected</h2>}
          </div>
        </div>
        <div>
          <button className='bg-gray-600 text-white p-2'>Book Now</button>
        </div>
      </div>
    </div>
  );
};

export default CustomCalendar;