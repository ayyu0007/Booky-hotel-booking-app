"use client";

import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { Calendar } from "./ui/calendar";
import { format, isPast } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import * as Popover from "@radix-ui/react-popover";
import { LoginLink } from "@kinde-oss/kinde-auth-nextjs";
import AlertMessage from "./AlertMessage";
import { useRouter } from "next/navigation";

const postData = async (url: string, data: object) => {
  const option = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };

  try {
    const res = await fetch(url, option);
    if (!res.ok) {
      throw new Error("Failed to post data");
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error posting data:", error);
    throw error;
  }
};

interface ReservationProps {
  reservations: any;
  room: any;
  isAuthenticated: boolean;
  userData: any;
}

const Reservation: React.FC<ReservationProps> = ({
  reservations,
  room,
  isAuthenticated,
  userData,
}) => {
  const [checkInDate, setCheckInDate] = useState<Date | undefined>();
  const [checkOutDate, setCheckOutDate] = useState<Date | undefined>();
  const [showAlert, setShowAlert] = useState<{
    message: string;
    type: "success" | "error" | null;
  } | null>(null);

  const router = useRouter();

  const formatDateForStrapi = (date: Date) => format(date, "yyyy-MM-dd");

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowAlert(null);
    }, 3000);
    return () => clearTimeout(timer);
  }, [showAlert]);

  const saveReservation = async () => {
    if (!checkInDate || !checkOutDate) {
      return setShowAlert({
        message: "Please select check-in and check-out dates",
        type: "error",
      });
    }
  
    if (checkInDate.getTime() === checkOutDate.getTime()) {
      return setShowAlert({
        message: "Check-in and check-out dates should be different",
        type: "error",
      });
    }
    
    console.log('reservations',reservations)
    // if (!reservations || !reservations.data) {
      const saveReservation = async () => {
        if (!checkInDate || !checkOutDate) {
          return setShowAlert({
            message: "Please select both check-in and check-out dates",
            type: "error",
          });
        }
      
        if (checkInDate >= checkOutDate) {
          return setShowAlert({
            message: "Check-out date must be after the check-in date",
            type: "error",
          });
        }
      
        if (!reservations || !reservations.data) {
          return setShowAlert({
            message: "Unable to check reservation availability",
            type: "error",
          });
        }
      
        // Check if the selected date range overlaps with any existing reservations for any room
        const isReserved = reservations.data.some((item: any) => {
          const existingCheckIn = new Date(item.attributes.checkIn);
          const existingCheckOut = new Date(item.attributes.checkOut);
      
          // Check if the selected dates overlap with any existing reservation dates
          return (
            (checkInDate < existingCheckOut && checkOutDate > existingCheckIn)
          );
        });
      
        if (isReserved) {
          return setShowAlert({
            message: "The selected dates are already reserved for another room",
            type: "error",
          });
        }
      
        // Proceed to save the reservation
        const data = {
          data: {
            firstname: userData.given_name,
            lastname: userData.family_name,
            email: userData.email,
            checkIn: formatDateForStrapi(checkInDate),
            checkOut: formatDateForStrapi(checkOutDate),
            room: room.data.id,
          },
        };
      
        try {
          await postData("http://127.0.0.1:1337/api/reservations", data);
          setShowAlert({
            message: "Reservation successfully made!",
            type: "success",
          });
          router.refresh();
        } catch (error) {
          console.error("Error making reservation:", error);
          setShowAlert({
            message: "Failed to make reservation",
            type: "error",
          });
        }
      };
      
      
  
    const isReserved = reservations?.data?.filter(
        (item: any) => item.attributes.room.data.id === room.data.id
      )
      .some((item: any) => {
        const existingCheckIn = new Date(item.attributes.checkIn).setHours(0, 0, 0, 0);
        const existingCheckOut = new Date(item.attributes.checkOut).setHours(0, 0, 0, 0);
        const checkInTime = checkInDate.setHours(0, 0, 0, 0);
        const checkOutTime = checkOutDate.setHours(0, 0, 0, 0);
  
        const isReservedBetweenDates =
          (checkInTime >= existingCheckIn && checkInTime <= existingCheckOut) ||
          (checkOutTime >= existingCheckIn && checkInTime <= existingCheckOut) ||
          (existingCheckIn > checkInTime && existingCheckIn < checkOutTime) ||
          (existingCheckOut > checkInTime && existingCheckOut <= checkOutTime);
  
        return isReservedBetweenDates;
      });
  
    if (isReserved) {
      return setShowAlert({
        message: "This room is already reserved for this date",
        type: "error",
      });
    }
  
    const data = {
      data: {
        firstname: userData.given_name,
        lastname: userData.family_name,
        email: userData.email,
        checkIn: checkInDate ? formatDateForStrapi(checkInDate) : null,
        checkOut: checkOutDate ? formatDateForStrapi(checkOutDate) : null,
        room: room.data.id,
      },
    };
  
    try {
      await postData("http://127.0.0.1:1337/api/reservations", data);
      setShowAlert({
        message: "Reservation successfully made!",
        type: "success",
      });
      router.refresh();
    } catch (error) {
      console.error("Error making reservation:", error);
      setShowAlert({
        message: "Failed to make reservation",
        type: "error",
      });
    }
  };
  

  return (
    <div>
      <div className="bg-tertiary h-[320px] mb-4">
        <div className="bg-red-500 py-4 text-center relative mb-2">
          <h4 className="text-xl text-white">Book Your Room</h4>
          <div className="absolute -bottom-[8px] left-[calc(50%_-_10px)] w-0 h-0 border-l-[10px] border-l-transparent border-t-[8px] border-t-red-500 border-r-[10px] border-r-transparent"></div>
        </div>
        <div className="flex flex-col gap-4 w-full py-6 px-8">
          <Popover.Root>
            <Popover.Trigger asChild>
              <Button
                variant="default"
                size="md"
                className={cn(
                  "w-full flex justify-start text-left font-semibold",
                  !checkInDate && "text-secondary"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {checkInDate ? (
                  format(checkInDate, "PPP")
                ) : (
                  <span>Check in</span>
                )}
              </Button>
            </Popover.Trigger>
            <Popover.Content className="w-auto bg-white text-black shadow-md p-0">
              <Calendar
                mode="single"
                selected={checkInDate}
                onSelect={setCheckInDate}
                initialFocus
                disabled={isPast}
                classNames={{
                  day_selected: "bg-red-500 text-white",
                }}
              />
            </Popover.Content>
          </Popover.Root>

          <Popover.Root>
            <Popover.Trigger asChild>
              <Button
                variant="default"
                size="md"
                className={cn(
                  "w-full flex justify-start text-left font-semibold",
                  !checkOutDate && "text-secondary"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {checkOutDate ? (
                  format(checkOutDate, "PPP")
                ) : (
                  <span>Check Out</span>
                )}
              </Button>
            </Popover.Trigger>
            <Popover.Content className="w-auto bg-white text-black shadow-md p-0">
              <Calendar
                mode="single"
                selected={checkOutDate}
                onSelect={setCheckOutDate}
                initialFocus
                disabled={isPast}
                classNames={{
                  day_selected: "bg-red-500 text-white",
                }}
              />
            </Popover.Content>
          </Popover.Root>

          {isAuthenticated ? (
            <Button onClick={saveReservation} size="md">
              Book Now
            </Button>
          ) : (
            <LoginLink>
              <Button className="w-full" size="md">
                Book Now
              </Button>
            </LoginLink>
          )}
        </div>
      </div>

      {showAlert && (
        <AlertMessage message={showAlert.message} type={showAlert.type} />
      )}
    </div>
  );
};

export default Reservation;
