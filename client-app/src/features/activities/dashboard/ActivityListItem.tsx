// import { SyntheticEvent, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Icon, Item, Segment } from "semantic-ui-react";
import { Activity } from "../../../app/models/activity";
import {format} from 'date-fns';

interface Props {
    activity: Activity;
}
export default function ActivityListItem({activity}: Props) {

    // const {activityStore} = useStore();
    // const {deleteActivity}= activityStore;
    
    // const [target, setTarget] = useState('');
    
    // //to add loading to only selected button
    // function handleActivityDelete(e: SyntheticEvent<HTMLButtonElement>, id: string) {
    //     setTarget(e.currentTarget.name);
    //     deleteActivity(id);
    // }

    return(
        <Segment.Group>
            <Segment>
                <Item.Group>
                    <Item.Image size="tiny" circular src='/assets/user.png' />
                    <Item.Content>
                        <Item.Header as={Link} to={`/activities/${activity.id}`}>
                            {activity.title}
                        </Item.Header>
                        <Item.Description>Hosted by Bob</Item.Description>
                    </Item.Content>
                </Item.Group>
            </Segment>
            <Segment secondary>
                Attendees go here
            </Segment>
            <Segment>
                <span>
                    <Icon name='clock' /> {format(activity.date!, 'dd MMM yyyy h:mm aa')}
                    <Icon name='marker' /> {activity.venue}
                </span>
            </Segment>
            <Segment clearing>
                <span>{activity.description}</span>
                <Button 
                    as={Link} 
                    to={`/activities/${activity.id}`}
                    color="teal"
                    floated="right"
                    content="view" 
                />
            </Segment>
        </Segment.Group>
        
        // <Item key={activity.id}>
        //     <Item.Content>
        //         <Item.Header as='a'>{activity.title}</Item.Header>
        //         <Item.Meta>{activity.date}</Item.Meta>
        //         <Item.Description>
        //             <div>{activity.description}</div>
        //             <div>{activity.city}, {activity.venue}</div>
        //         </Item.Description>
        //         <Item.Extra>
        //             {/* <Button onClick={() => activityStore.selectActivity(activity.id)} floated='right' content='View' color="blue" /> */}
        //             <Button as={Link} to={`/activities/${activity.id}`} floated='right' content='View' color="blue" />
        //             <Button
        //                 name={'btnDeleteActivity_' + activity.id} 
        //                 loading={loading && target === ('btnDeleteActivity_' + activity.id)} 
        //                 onClick={(e) => handleActivityDelete(e, activity.id)} 
        //                 floated='right' 
        //                 content='Delete' 
        //                 color="red" 
        //             />
        //             <Label basic content={activity.category} />
        //         </Item.Extra>
        //     </Item.Content>
        // </Item>
    );
}