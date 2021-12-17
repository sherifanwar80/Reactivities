import { Button, ButtonGroup, Card, Image } from "semantic-ui-react";
import LoadingCompmonent from "../../../app/layout/LoadingComponent";
import { useStore } from "../../../app/stores/store";

export default function ActivityDetails() {

    const {activityStore} = useStore();
    const {selectedActivity: activity, openForm, cancelSelectedActivity: cancelSelectActivity} = activityStore;

    if (!activity) return <LoadingCompmonent />;

    return(
        <Card fluid>
            <Image src={`assets/categoryImages/${activity.category}.jpg`} />
            <Card.Content>
            <Card.Header>{activity.title}</Card.Header>
            <Card.Meta>
                <span>{activity.date}</span>
            </Card.Meta>
            <Card.Description>
                {activity.description}
            </Card.Description>
            </Card.Content>
            <Card.Content extra>
            <ButtonGroup widths='2'>
                <Button onClick={() => openForm(activity.id)} basic color="blue" content='Edit' />
                <Button onClick={()=>cancelSelectActivity()} basic color="grey" content='Cancel' />
            </ButtonGroup>
            </Card.Content>
        </Card>
    );
}