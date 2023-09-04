import React from "react";
import { differenceInCalendarDays, format } from "date-fns";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarDays,
  faMoon,
  faArrowRightLong,
} from "@fortawesome/free-solid-svg-icons";

function BookingDates({ booking, className }) {
  return (
    <div>
      <div className={"" + className} style={{ textDecoration: "none" }}>
        <FontAwesomeIcon icon={faMoon} />
        &nbsp;&nbsp;
        {differenceInCalendarDays(
          new Date(booking.checkOut),
          new Date(booking.checkIn)
        )}{" "}
        Nights :
        <div className="">
          <FontAwesomeIcon icon={faCalendarDays} />
          &nbsp;&nbsp;
          {format(new Date(booking.checkIn), "yyyy-MM-dd")}
        </div>
        <FontAwesomeIcon icon={faArrowRightLong} />
        <div className="">
          <FontAwesomeIcon icon={faCalendarDays} />
          &nbsp;&nbsp;
          {format(new Date(booking.checkOut), "yyyy-MM-dd")}
        </div>
      </div>
    </div>
  );
}

export default BookingDates;
