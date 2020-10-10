import React, { Fragment } from "react";
import "./styles.css";
import { Container } from "semantic-ui-react";
import { NavBar } from "../../nav/navbar";

import { observer } from "mobx-react-lite";
import { Route, withRouter, RouteComponentProps, Switch } from "react-router-dom";
import { HomePage } from "../features/home/HomePage";
import ActivityForm from "../../activities/form/ActivityForm";
import ActivityDetails from "../../activities/details/ActivityDetails";
import ActivityDashboard from "../../activities/dashboard/activitydashboard";
import CompNotFound from "./NotFound";
import { ToastContainer } from "react-toastify";

const App: React.FC<RouteComponentProps> = ({ location }) => {
  return (
    <Fragment>
      <ToastContainer position='bottom-right'/>
      <Route exact path="/" component={HomePage} />
      <Route
        path={"/(.+)"}
        render={() => (
          <Fragment>
            <NavBar />
            <Container style={{ marginTop: "7em" }}>
              <Switch>
               <Route exact path="/activities" component={ActivityDashboard} />
               <Route path="/activities/:id" component={ActivityDetails} />
               <Route
                key={location.pathname}
                path={["/createActivity", "/manage/:id"]}
                component={ActivityForm}
               />
               <Route component={CompNotFound} />
              </Switch>
            </Container>
          </Fragment>
        )}
      ></Route>
    </Fragment>
  );
};

export default withRouter(observer(App));
