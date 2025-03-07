"use client";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/alert-dialog";

const deleteData = async (url: string) => {
  const options = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  };

  try {
    const res = await fetch(url, options);
    const data = await res.json();
  } catch (error) {
    console.log(error);
  }
};

const CancelReservation = ({ reservation }: { reservation: any }) => {
  const router = useRouter()

  const cancelReservation = (id: number) => {
    deleteData(`http://127.0.0.1:1337/api/reservations/${id}`);
    router.refresh()
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button size="md">Cancel Reservation</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        {/* header */}
        <AlertDialogHeader>
          <AlertDialogTitle>Are You Absolutely Sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This Action Cannot Be Undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        {/* footer */}
        <AlertDialogFooter>
          <AlertDialogCancel>Dismiss</AlertDialogCancel>
          <AlertDialogAction onClick={() => cancelReservation(reservation.id)}>
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default CancelReservation;
