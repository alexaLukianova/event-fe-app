import { Fragment, Suspense } from "react";
import {
  json,
  redirect,
  useParams,
  useRouteLoaderData,
  defer,
  Await,
} from "react-router-dom";
import EventItem from "../components/EventItem";
import EventsList from "../components/EventsList";
import { base_server_url } from "../configs/params";

const EventDetailPage = () => {
  const params = useParams(); 

  const { event, events } = useRouteLoaderData("event-id");

  return (
    <Fragment>
      <Suspense fallback={<p>Loading event...</p>}>
        <Await resolve={event}>
          {(loadedEvent) => <EventItem event={loadedEvent}></EventItem>}
        </Await>
      </Suspense>
      <Suspense fallback={<p>Loading events...</p>}>
        <Await resolve={events}>
          {(loadedEvents) => <EventsList events={loadedEvents} />}
        </Await>
      </Suspense>
    </Fragment>
  );
};

export default EventDetailPage;

const loadEvents = async () => {
  const response = await fetch(base_server_url);
  if (!response.ok) {
    throw json({ message: "Could not fetch data" }, { status: 500 });
  } else {
    const resData = await response.json();
    return resData;
  }
};

const loadEvent = async (eventId) => {
  const response = await fetch(base_server_url + eventId);
  if (!response.ok) {
    throw json({ message: "Could not fetch event data" }, { status: 500 });
  } else {
    const resData = await response.json();
    return resData;
  }
};

export const loader = async ({ request, params }) => {
  const eventId = params.eventId;

  return defer({
    event: loadEvent(eventId),
    events: loadEvents(),
  });
};

export const action = async ({ params, request }) => {
  const eventId = params.eventId;

  const response = await fetch(base_server_url + eventId, {
    method: request.method,
  });

  if (!response.ok) {
    throw json({ message: "Could not remove event data" }, { status: 500 });
  } else {
    return redirect("/events");
  }
};
