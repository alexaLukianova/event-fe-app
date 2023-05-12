// Challenge / Exercise

// 1. Add five new (dummy) page components (content can be simple <h1> elements)
//    - HomePage
//    - EventsPage
//    - EventDetailPage
//    - NewEventPage
//    - EditEventPage
// 2. Add routing & route definitions for these five pages
//    - / => HomePage
//    - /events => EventsPage
//    - /events/<some-id> => EventDetailPage
//    - /events/new => NewEventPage
//    - /events/<some-id>/edit => EditEventPage
// 3. Add a root layout that adds the <MainNavigation> component above all page components
// 4. Add properly working links to the MainNavigation
// 5. Ensure that the links in MainNavigation receive an "active" class when active
// 6. Output a list of dummy events to the EventsPage
//    Every list item should include a link to the respective EventDetailPage
// 7. Output the ID of the selected event on the EventDetailPage
// BONUS: Add another (nested) layout route that adds the <EventNavigation> component above all /events... page components

import EditEventPage from "./pages/EditEvent";
import EventDetailPage, {
  loader as eventDetailsLoader,
  action as eventRemoveAction,
} from "./pages/EventDetail";
import EventsPage, { loader as eventsLoader } from "./pages/Events";
import HomePage from "./pages/Home";
import NewEventPage from "./pages/NewEvent";

import { createBrowserRouter, Router, RouterProvider } from "react-router-dom";
import RootLayout from "./pages/RootLayout";
import EventLayout from "./pages/EventLayout";
import ErrorPage from "./pages/Error";
import {action as manipulateEventAction} from "./components/EventForm"
import NewsletterPage, { action as newsletterAction} from "./pages/Newsletter";

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "events",
        element: <EventLayout />,
        children: [
          {
            index: true,
            element: <EventsPage />,
            loader: eventsLoader,
          },
          {
            path: ":eventId",
            id: "event-id",
            loader: eventDetailsLoader,
            children: [
              {
                index: true,
                action: eventRemoveAction,
                element: <EventDetailPage />,
              },
              {
                path: "edit",
                action: manipulateEventAction,
                element: <EditEventPage />,
              },
            ],
          },
          {
            path: "new",
            element: <NewEventPage />,
            action: manipulateEventAction,
          },
        ],
      },
      {
        path: 'newsletter',
        element: <NewsletterPage />,
        action: newsletterAction,
      },
    ],
  },
]);

function App() {
  console.log("App")
  return <RouterProvider router={appRouter}></RouterProvider>;
}

export default App;
