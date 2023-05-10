import { Fragment } from "react";
import { json, redirect } from "react-router-dom";
import EventForm from "../components/EventForm";

const NewEventPage = () => {
  return (
    <Fragment>
      <h1>My new event page</h1>
      <EventForm method={"POST"} />
    </Fragment>
  );
};

export default NewEventPage;


