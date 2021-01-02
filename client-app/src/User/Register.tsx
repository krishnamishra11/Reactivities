import { FORM_ERROR } from "final-form";
import React, { useContext } from "react";
import { Field, Form as FinalForm } from "react-final-form";
import { combineValidators, isRequired } from "revalidate";
import { Button, Form, Header, Label } from "semantic-ui-react";
import ErrorMessage from "../app/Common/form/ErrorMessage";
import TextInput from "../app/Common/form/TextInput";
import { RootStore, RootStoreContext } from "../app/store/rootStore";
import { IUserFormValues } from "../model/User";

const validate = combineValidators({
    username: isRequired("username"),
    displayName: isRequired("displayName"),
    email: isRequired("email"),
    password: isRequired("password"),
});

export const RegisterForm = () => {
  const rootStore = useContext(RootStoreContext).userStore;
  const {register}=rootStore;
  return (
    <FinalForm
      onSubmit={(values: IUserFormValues) =>
        register(values).catch((error) => ({
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
          <Header as='h2' content='Register to Reactivities' color='teal' textAlign='center'></Header>
          <Field name="username" component={TextInput} placeholder="User Name"></Field>
          <Field name="displayName" component={TextInput} placeholder="Display Name"></Field>
          <Field name="email" component={TextInput} placeholder="Email"></Field>
          <Field
            name="password"
            component={TextInput}
            placeholder="password"
            type='password'
          ></Field>
          {submitError && !dirtySinceLastSubmit && (
            <ErrorMessage error={submitError} 
              />
          )}
          <Button
            disabled={(invalid && !dirtySinceLastSubmit) || pristine}
            color='teal'
            loading={submitting}
            content="Register"
            fluid
          />
       
        </Form>
      )}
    />
  );
};
