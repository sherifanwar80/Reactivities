import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Grid } from "semantic-ui-react";
import LoadingCompmonent from "../../../app/layout/LoadingComponent";
import { useStore } from "../../../app/stores/store";
import ActivityDetailedChat from "./ActivityDetailedChat";
import ActivityDetailedHeader from "./ActivityDetailedHeader";
import ActivityDetailedInfo from "./ActivityDetailedInfo";
import ActivityDetailedSidebar from "./ActivityDetailedSidebar";

export default observer(function ActivityDetails() {

    const {activityStore} = useStore();
    const {selectedActivity: activity, loadActivity, loadingInitial} = activityStore;
    const {id} = useParams<{id: string}>(); //to read the parameters from the url

    useEffect(() => {
        if (id) loadActivity(id);
    }, [id, loadActivity]);

    if (loadingInitial || !activity) return <LoadingCompmonent />;

    return(
        <Grid>
            <Grid.Column width={10}>
                <ActivityDetailedHeader activity={activity} />
                <ActivityDetailedInfo activity={activity} />
                <ActivityDetailedChat />
            </Grid.Column>
            <Grid.Column width={6}>
                <ActivityDetailedSidebar />
            </Grid.Column>
        </Grid>
        // <Card fluid>
        //     <Image src={`/assets/categoryImages/${activity.category}.jpg`} />
        //     <Card.Content>
        //     <Card.Header>{activity.title}</Card.Header>
        //     <Card.Meta>
        //         <span>{activity.date}</span>
        //     </Card.Meta>
        //     <Card.Description>
        //         {activity.description}
        //     </Card.Description>
        //     </Card.Content>
        //     <Card.Content extra>
        //     <ButtonGroup widths='2'>
        //         <Button as={Link} to={`/manage/${activity.id}`} basic color="blue" content='Edit' />
        //         <Button as={Link} to='/activities' basic color="grey" content='Cancel' />
        //     </ButtonGroup>
        //     </Card.Content>
        // </Card>
    );
})