import { Button } from "@/components/ui/button";
import Link from "next/link";
import { format } from "date-fns";

const getUserReservations = async (userEmail: string) => {
  const res = await fetch(
    `http://127.0.0.1:1337/api/reservations?[filters][email][$eq]=${userEmail}&populate=*`,
    {
      next: {
        revalidate: 0,
      },
    }
  );
  return await res.json();
};

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import CancelReservation from "@/components/CancelReservation";

const Dashboard = async () => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  const reservations = await getUserReservations(user?.email);
  console.log(reservations);

  return (
    <section className="min-h-[80vh]">
      <div className="container mx-auto py-8 h-full">
        <h3 className="h3 font-bold mb-12 border-b pb-4 text-center lg:text-left">
          My Bookings
        </h3>
        <div className="flex flex-col gap-8 h-full">
          {reservations.data.length < 1 ? (
            <div className="flex flex-col items-center justify-center h-[50vh]">
              <p className="text-xl text-center text-secondary/70 mb-4">You don't have any reservations</p>
              {/* Back to Home */}
              <Link href='/'>
              <Button size='md' >Go To HomePage</Button>
              </Link>
            </div>
          ) : (
            reservations.data.map((reservation: any) => {
              return (
                <div key={reservation.id} className="bg-tertiary py-8 px-12 ">
                  <div className="flex flex-col lg:flex-row gap-4  items-center justify-between">
                    <h3 className="text-2xl font-medium w-[200px] text-center lg:text-left">
                      {reservation.attributes.room.data.attributes.title}
                    </h3>
                    {/* check in and check out text */}
                    <div className="flex flex-col lg:flex-row gap-2  lg:w-[380px]">
                      {/* check in */}
                      <div className="flex items-center gap-1">
                        <span className="text-red-500 font-bold uppercase tracking-[2px]">From :</span>
                        <span className="text-secondary font-semibold">
                          {format(reservation.attributes.checkIn, "PPP")}
                        </span>
                      </div>
                      {/* check out */}
                      <div className="flex items-center  gap-1 ">
                        <span className="text-red-500 font-bold uppercase tracking-[2px]">to : </span>
                        <span className="text-secondary font-semibold">
                          {format(reservation.attributes.checkOut, "PPP")}
                        </span>
                      </div>
                    </div>
                    <CancelReservation reservation={reservation} />
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
