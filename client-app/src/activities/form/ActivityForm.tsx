import React, { useState, useEffect, FormEvent, useContext } from "react";
import { Segment, Form, Button, Grid } from "semantic-ui-react";
import { ActivityFormValues } from "../../model/IActivity";
import ActivityStore from "../../app/store/activityStore";
import { observer } from "mobx-react-lite";
import { RouteComponentProps } from "react-router-dom";
import { Form as FinalForm, Field } from "react-final-form";
import { TextInput } from "../../app/Common/form/TextInput";
import TextAreaInput from "../../app/Common/form/TextAreaInput";
import SelectInput from "../../app/Common/form/SelectInput";
import { category } from "../../app/Common/options/CategoryOptions";
import DateInput from "../../app/Common/form/DateInput";
import { CombineDateAndTime } from "../../app/Common/utilities/utililits";
import { v4 as uuid } from 'uuid';
import { combineValidators, composeValidators, hasLengthGreaterThan, isRequired} from 'revalidate';



const validateform= combineValidators({
  title:isRequired({message:'The event title is required'}),
  category:isRequired('Category'),
  description:composeValidators(isRequired('Description'),
  hasLengthGreaterThan(4)({message:'Description needs to be at least 5 characters'}))(),
  city:isRequired('City'),
  venue:isRequired('Venue'),
  date:isRequired('Date'),
  time:isRequired('Time')
});

interface ParmDetails {
  id: string;
}


const ActivityForm: React.FC<RouteComponentProps<ParmDetails>> = ({
  match,
  history,
}) => {
  const {
    createActivity,
    editActivity,
    submmiting,
    loadActivity
  } = useContext(ActivityStore);

  const [loading,setLoading]=useState(false);
  const [activity, setActivity] = useState(new ActivityFormValues);


  useEffect(() => {
    if (match.params.id  ) {
      setLoading(true);
      loadActivity(match.params.id).then(
        (activity) =>  setActivity(new ActivityFormValues(activity))
      ).finally(()=>{setLoading(false)});
    }
   
  }, [
    loadActivity,
    match.params.id
  ]);


/*   const onsubmit = () => {
    if (activity.id.length === 0) {
      let newActivity = { ...activity, id: uuid() };
      createActivity(newActivity).then(() =>
        history.push(`/activities/${newActivity.id}`)
      );
    } else {
      editActivity(activity).then(() =>
        history.push(`/activities/${activity.id}`)
      );
    }
  }; */

  const handleFinalFormSubmit=(values:any)=>{

    const datetime =CombineDateAndTime(values.date,values.time );
    const {date,time,...activity}=values;
    activity.date=datetime;
    if (!activity.id) {
      let newActivity = { ...activity, id: uuid() };
      createActivity(newActivity);
    } else {
      editActivity(activity);
    }
  }
  const onChanageEvent = (
    event: FormEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.currentTarget;
    setActivity({ ...activity, [name]: value });
  };

  return (
    <Grid>
      <Grid.Column width={10}>
        <Segment clearing>
          <FinalForm 
          validate={validateform}
          initialValues={activity}
           onSubmit={handleFinalFormSubmit}
           render={({handleSubmit,invalid,pristine})=>(
            <Form onSubmit={handleSubmit} loading ={loading}>
            <Field
              placeholder="Title"
              name="title"
              value={activity.title}
              component={TextInput}
            ></Field>
            <Field
              rows={2}
              name="description"
              component={TextAreaInput}
              value={activity.description}
              placeholder="Description"
            ></Field>
            <Field
              placeholder="Category"
              name="category"
              options={category}
              component={SelectInput}
              value={activity.category}
            ></Field>
            <Form.Group widths='equal'>
            <Field
              type="datetime-local"
              placeholder="Date"
              name="date"
              date={true}
              component={DateInput}
              value={activity.date}
            ></Field>
             <Field
              type="datetime-local"
              placeholder="Time"
              name="time"
              time={true}
              component={DateInput}
              value={activity.time}
            ></Field>
            </Form.Group>
            <Field
              placeholder="City"
              name="city"
              component={TextInput}
              value={activity.city}
            ></Field>
            <Field
              placeholder="Venue"
              name="venue"
              component={TextInput}
              value={activity.venue}
            ></Field>
            <Button
              loading={submmiting}
              disabled={loading || invalid || pristine}
              content="Submit"
              type="submit"
              name="submit"
              positive
              floated="right"
            ></Button>
            <Button
              onClick={() => activity.id?history.push(`/activities/${activity.id}`):history.push('/activities')}
              disabled={loading}
              name="Cancel"
              content="Cancel"
              type="button"
              floated="right"
            ></Button>
          </Form>
           )}
          />


         
        </Segment>
      </Grid.Column>
    </Grid>
  );
};

export default observer(ActivityForm);
