import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Item, Button, Segment, Icon, Label } from "semantic-ui-react";
import { IActivity } from "../../model/IActivity";
import { observer } from "mobx-react-lite";
import { format } from "date-fns";
import { RootStoreContext } from "../../app/store/rootStore";
import { ActivityListItemAttendees } from "./ActivityListItemAttendees";

const ActivityListItem: React.FC<{ val: IActivity }> = ({ val }) => {
  const { deleteActivity, submmiting, target } = useContext(RootStoreContext).activityStore;
  const host=val.attendees.filter(v=>v.isHost)[0];
  return (
    <Segment.Group>
      <Segment>
        <Item.Group>
        <Item>
          <Item.Image size="tiny" circular scr="/public/assetes/user.png"></Item.Image>
          <Item.Content>
            <Item.Header as={Link} to={`/activities/${val.id}`}>{val.title}</Item.Header>
            <Item.Meta>{format(val.date,'eeee do MMMM')}</Item.Meta>
            <Item.Description>Hosted by {host.displayName}</Item.Description>
            <Item.Description>
             {val.isHost && <Label basic color='orange'>You are hosting this activity</Label>}
             {!val.isHost && val.isGoing && <Label basic color='green'>You are going this activity</Label>}
            </Item.Description>
          </Item.Content>
        </Item>
        </Item.Group>
      </Segment>
      <Segment>
        <Icon name="clock" />
        {format(val.date,'h:mm a')}
        <Icon name="marker" />
        {val.venue},{val.city}
      </Segment>
      <Segment><ActivityListItemAttendees attendees={val.attendees}/></Segment>
      <Segment clearing>
        <span>{val.description}</span>
        <Button
          as={Link}
          to={`/activities/${val.id}`}
          floated="right"
          content="View"
          color="blue"
        ></Button>
        <Button
          name={val.id}
          loading={target === val.id && submmiting}
          onClick={(e) => deleteActivity(e, val.id)}
          floated="right"
          content="Delete"
          color="red"
        ></Button>
      </Segment>
    </Segment.Group>
  );
};

export default observer(ActivityListItem);
