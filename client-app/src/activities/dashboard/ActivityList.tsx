import React, { Fragment, useContext } from "react";
import { Item, Label } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import ActivityListItem from "./ActivityListItem";
import { RootStoreContext } from "../../app/store/rootStore";
import { format } from "date-fns";


const ActivityList: React.FC = () => {
  const { activitiesByDate } = useContext(RootStoreContext).activityStore;

  return (
       <Fragment> 
        {activitiesByDate.map(([group, activities]) => (
          <Fragment key={group}>
            <Label size="large" color="blue" key={group}>
              {format(group,'eeee do MMMM')}
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
