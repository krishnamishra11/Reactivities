import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Item, Button, Label, Segment, Icon } from "semantic-ui-react";
import { IActivity } from "../../model/IActivity";
import StoreActivity from "../../app/store/activityStore";
import { observer } from "mobx-react-lite";

const ActivityListItem: React.FC<{ val: IActivity }> = ({ val }) => {
  const { deleteActivity, submmiting, target } = useContext(StoreActivity);
  return (
    <Segment.Group>
      <Segment>
        <Item.Group>
        <Item>
          <Item.Image size="tiny" circular scr="/public/assetes/user.png"></Item.Image>
          <Item.Content>
            <Item.Header as="a">{val.title}</Item.Header>
            <Item.Meta>{val.date}</Item.Meta>
            <Item.Description>Hosted by Krishna</Item.Description>
          </Item.Content>
        </Item>
        </Item.Group>
      </Segment>
      <Segment>
        <Icon name="clock" />
        {val.date}
        <Icon name="marker" />
        {val.venue},{val.city}
      </Segment>
      <Segment>Attedees will go here</Segment>
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
