import React, { Fragment, useContext } from "react";
import { Item, Label } from "semantic-ui-react";
import StoreActivity from "../../app/store/activityStore";
import { observer } from "mobx-react-lite";
import ActivityListItem from "./ActivityListItem";

const ActivityList: React.FC = () => {
  const { activitiesByDate } = useContext(StoreActivity);

  return (
       <Fragment> 
        {activitiesByDate.map(([group, activities]) => (
          <Fragment key={group}>
            <Label size="large" color="blue" key={group}>
              {group}
            </Label>
     
              <Item.Group divided>            
            {activities.map(val => (
                <ActivityListItem key={val.id} val={val}/>
            ))}
             </Item.Group>
  
          </Fragment>
        ))}
     </Fragment>
  );
};

export default observer(ActivityList);
