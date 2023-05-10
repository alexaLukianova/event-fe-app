import { Fragment } from "react";
import { useRouteLoaderData } from "react-router-dom";
import EventForm from "../components/EventForm";
import { json, redirect } from "react-router-dom";

const EditEventPage = () => {
  const data = useRouteLoaderData("event-id");

  return (
    <Fragment>
      <h1>Edit event page</h1>
      <EventForm method={"PUT"} event={data.event} />
    </Fragment>
  );
};

export default EditEventPage;


