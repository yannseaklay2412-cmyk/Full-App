import { createContext, useContext, useState } from 'react'

const BookingContext = createContext(null)

export function BookingProvider({ children }) {
  const [bookings, setBookings] = useState([])

  return (
    <BookingContext.Provider value={{ bookings, setBookings }}>
      {children}
    </BookingContext.Provider>
  )
}

export const useBooking = () => useContext(BookingContext)
