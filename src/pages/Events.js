import { Suspense, useEffect, useState } from "react";
import { useLoaderData, json, defer, Await } from "react-router-dom";

import EventsList from "../components/EventsList";


function EventsPage() {
  const { events } = useLoaderData();

  return (
    <Suspense fallback={<p>Loading...</p>}>
      <Await resolve={events}>
        {(loadedEvents) => <EventsList events={loadedEvents} />}
      </Await>
    </Suspense>
  );
}

const loadEvents = async () => {
  const response = await fetch(process.env.REACT_APP_SERVER_URL);
  if (!response.ok) {
    console.log("response is not ok")
    throw json({ message: "Could not fetch data" }, { status: 500 });
  } else {
    console.log("response is  ok")
    const resData = await response.json();
    console.log(resData)
    return resData;
  }
};

export const loader = () => {
  return defer({
    events: loadEvents(),
  });
};

export default EventsPage;
