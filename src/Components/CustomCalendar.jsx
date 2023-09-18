import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import './CustomCalendar.css';
import moment from 'moment';
import toast from 'react-hot-toast';

const CustomCalendar = () => {
  // State variables
  const [selectedDateRange, setSelectedDateRange] = useState([]);
  const [totalCost, setTotalCost] = useState(0);
  const [bookedDates, setBookedDates] = useState([
    new Date('2023-09-18'),
    new Date('2023-09-19'),
    new Date('2023-09-17')
  ])
  const [availableDates, setAvailableDates] = useState([
    new Date('2023-09-20'),
    new Date('2023-09-21'),
    new Date('2023-09-22'),
    new Date('2023-09-23'),
    new Date('2023-09-24'),
    new Date('2023-09-25')
  ]);
  const currentDate = new Date();
  const Price = 150;

  useEffect(() => {
    if (selectedDateRange.length > 0) {
      checkAvailability()
      calculateTotalCost(selectedDateRange[0], selectedDateRange[1], Price)
    }
  }, [selectedDateRange]);

  // Calculate total cost based on selected dates and price
  function calculateTotalCost(checkinDate, checkoutDate, roomPrice) {
    const checkin = new Date(checkinDate);
    const checkout = new Date(checkoutDate);
    const diffInTime = Math.round(checkout - checkin);
    const diffInDays = diffInTime / (1000 * 3600 * 24);
    const totalCost = diffInDays * roomPrice;
    setTotalCost(totalCost.toFixed(2));
  };

  // Check if a date is booked
  const isDateBooked = (date) =>
    bookedDates.some(
      (bookedDate) => new Date(bookedDate).toLocaleDateString() === new Date(date).toLocaleDateString()
    );

  // Check if a date is available
  const isDateAvailable = (date) =>
    availableDates.some(
      (availableDates) => availableDates.toLocaleDateString() === new Date(date).toLocaleDateString()
    );

  // tileClassName in react-calendar
  const tileClassName = ({ date }) => {
    if (isDateBooked(date)) {
      return 'booked-date';
    } else if (isDateAvailable(date)) {
      return 'available-date';
    }
  };

  // Handle date change in the calendar
  const handleDateChange = (date) => {
    setSelectedDateRange(date);
  };

  // Populate dates within the selected range
  const populateDates = () => {
    function getDatesInRange() {
      const startDate = selectedDateRange[0]
      const endDate = selectedDateRange[1]
      const dates = [];
      let currentDate = new Date(startDate);

      while (currentDate <= endDate) {
        dates.push(new Date(currentDate));
        currentDate.setDate(currentDate.getDate() + 1);
      }
      return dates;
    }
    const datesInRange = getDatesInRange();
    return datesInRange
  }

  // Handle booking button click
  const handleButton = () => {
    const datesInRange = populateDates();

    if (!checkAvailability()) {
      return;
    }

    setBookedDates([...bookedDates, ...datesInRange]);

    const availableAfterBooking = availableDates.filter(
      (availableDate) =>
        !datesInRange.some((date) => date.toLocaleDateString() === availableDate.toLocaleDateString())
    );

    setAvailableDates(availableAfterBooking);
    toast.success('Successfully booked your slots, enjoy your holiday');
  };

  // Check availability of selected dates
  const checkAvailability = () => {
    const dates = populateDates();

    if (!dates || !dates.length) {
      toast.error('Please select a valid date range.');
      return false;
    }

    for (const date of dates) {
      const isBooked = bookedDates.some(
        (bookedDate) => bookedDate.toLocaleDateString() === date.toLocaleDateString()
      );
      if (isBooked) {
        toast.error('The selected date range contains booked dates.');
        return false;
      }
    }
    return true;
  };
  return (
    <div className='my-element'>
      <h2 className='text-gray-600'>Select a date range:</h2>
      <Calendar
        onChange={handleDateChange}
        selectRange={true}
        tileClassName={tileClassName}
        minDate={currentDate}
      />
      <div className='flex justify-between mt-5'>
        <div className='text-gray-600'>
          <div className='flex gap-1'>
            <h4 className='font-bold text-md'>CheckIn:</h4>
            <h2>{selectedDateRange[0]
              ? `${moment(selectedDateRange[0]).format('DD MM YYYY')}`
              : 'Please select a date'}</h2>
          </div>
          <div className='flex gap-1'>
            <h4 className='font-bold text-md'>CheckOut:</h4>
            <h2>{selectedDateRange[1]
              ? `${moment(selectedDateRange[1]).format('DD MM YYYY')}`
              : 'Please select a date'}</h2>
          </div>
          <div className='flex gap-1'>
            <h4 className='font-bold text-md6'>Total price:</h4>
            {totalCost
              ? <h2>{totalCost} €</h2>
              : <h2 className='text-red'>Dates not selected</h2>}
          </div>
        </div>
        <div className='my-auto'>
          <button onClick={handleButton} className='bg-gray-600 text-white p-2 rounded-md'>
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomCalendar;