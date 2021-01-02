import React, { Fragment, useContext } from "react";
import { Button, Container, Header, Segment, Image } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { RootStoreContext } from "../../store/rootStore";
import { LoginForm } from "../../../User/LoginForm";
import { RegisterForm } from "../../../User/Register";

export const HomePage = () => {
  const rootStore = useContext(RootStoreContext).userStore;
  const {openModal} = useContext(RootStoreContext).modalStore;

  const { isLoggedIn, user } = rootStore;
  return (
    <Segment inverted textAlign="center" vertical className="masthead">
      <Container text>
        <Header as="h1" inverted>
          <Image
            size="massive"
            src="/assetes/logo.png"
            alt="logo"
            style={{ marginBottom: 12 }}
          />
          Reactivities
        </Header>
        {isLoggedIn && user ? (
          <Fragment>
            <Header
              as="h2"
              inverted
              content={`Welcome back ${user.displayName}`}
            />
            <Button as={Link} to="/activities" size="huge" inverted>
              Go to activities!
            </Button>
          </Fragment>
        ) : (
          <Fragment>
            <Header as="h2" inverted content="Welcome to Reactivities" />
            <Button onClick={()=>openModal(<LoginForm/>)} size="huge" inverted>
              Login
            </Button>
            <Button onClick={()=>openModal(<RegisterForm/>) } size="huge" inverted>
              Register
            </Button>
          </Fragment>
        )}
      </Container>
    </Segment>
  );
};
