import EventsNavigation from "../components/EventsNavigation";
import { Outlet } from "react-router-dom";

const EventLayout = () => {
  return (
    <>
      <Outlet />
      <EventsNavigation />
    </>
  );
};

export default EventLayout;
