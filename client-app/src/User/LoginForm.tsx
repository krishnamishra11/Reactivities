import { FORM_ERROR } from "final-form";
import React, { useContext } from "react";
import { Field, Form as FinalForm } from "react-final-form";
import { combineValidators, isRequired } from "revalidate";
import { Button, Form, Header, Label } from "semantic-ui-react";
import ErrorMessage from "../app/Common/form/ErrorMessage";
import TextInput from "../app/Common/form/TextInput";
import { RootStoreContext } from "../app/store/rootStore";
import { IUserFormValues } from "../model/User";

const validate = combineValidators({
  email: isRequired("email"),
  password: isRequired("password"),
});

export const LoginForm = () => {
  const rootStore = useContext(RootStoreContext).userStore;
  return (
    <FinalForm
      onSubmit={(values: IUserFormValues) =>
        rootStore.login(values).catch((error) => ({
          [FORM_ERROR]: error,
        }))
      }
      validate={validate}
      render={({
        handleSubmit,
        submitting,
        submitError,
        invalid,
        pristine,
        dirtySinceLastSubmit,
      }) => (
        <Form onSubmit={handleSubmit} error>
          <Header as='h2' content='Login to Reactivities' color='teal' textAlign='center'></Header>
          <Field name="email" component={TextInput} placeholder="Email"></Field>
          <Field
            name="password"
            component={TextInput}
            placeholder="password"
          ></Field>
          {submitError && !dirtySinceLastSubmit && (
            <ErrorMessage error={submitError} text='Invalid email address or password' />
          )}
          <Button
            disabled={(invalid && !dirtySinceLastSubmit) || pristine}
            color='teal'
            loading={submitting}
            content="Login"
            fluid
          />
       
        </Form>
      )}
    />
  );
};
