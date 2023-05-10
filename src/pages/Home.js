import { Fragment } from "react";
import PageContent from "../components/PageContent";

const HomePage = () => {
  console.log("HomePage");
  return (
    <PageContent title="Welcome!">
      <p>Browse all events</p>
    </PageContent>
  );
};

export default HomePage;
