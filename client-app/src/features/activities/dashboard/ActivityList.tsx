import { observer } from "mobx-react-lite";
import { SyntheticEvent, useState } from "react";
import { Link } from "react-router-dom";
import { Item, Segment, Button, Label } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";

export default observer(function ActivityList() {

    const {activityStore} = useStore();
    const {activitiesByDate,deleteActivity,loading}= activityStore;
    
    const [target, setTarget] = useState('');
    
    //to add loading to only selected button
    function handleActivityDelete(e: SyntheticEvent<HTMLButtonElement>, id: string) {
        setTarget(e.currentTarget.name);
        deleteActivity(id);
    }

    return (
        <Segment>
            <Item.Group divided>
                {activitiesByDate.map(activity => (
                    <Item key={activity.id}>
                        <Item.Content>
                            <Item.Header as='a'>{activity.title}</Item.Header>
                            <Item.Meta>{activity.date}</Item.Meta>
                            <Item.Description>
                                <div>{activity.description}</div>
                                <div>{activity.city}, {activity.venue}</div>
                            </Item.Description>
                            <Item.Extra>
                                {/* <Button onClick={() => activityStore.selectActivity(activity.id)} floated='right' content='View' color="blue" /> */}
                                <Button as={Link} to={`/activities/${activity.id}`} floated='right' content='View' color="blue" />
                                <Button
                                    name={'btnDeleteActivity_' + activity.id} 
                                    loading={loading && target === ('btnDeleteActivity_' + activity.id)} 
                                    onClick={(e) => handleActivityDelete(e, activity.id)} 
                                    floated='right' 
                                    content='Delete' 
                                    color="red" 
                                />
                                <Label basic content={activity.category} />
                            </Item.Extra>
                        </Item.Content>
                    </Item>                        
                ))}
            </Item.Group>
        </Segment>
    );
})