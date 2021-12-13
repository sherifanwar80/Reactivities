
import { Grid } from "semantic-ui-react";
import { Activity } from "../../../app/models/activity";
import ActivityForm from "../../form/ActivityForm";
import ActivityDetails from "../details/ActivityDetails";
import ActivityList from "./ActivityList";

interface Props {
    activities: Activity[];
    selectedActivity: Activity | undefined;
    selectActivity: (id: string) => void; //function
    cancelSelectActivity: () => void; //function
}
//export default function ActivityDashboard(props: Props) {
export default function ActivityDashboard({activities, selectedActivity
    , selectActivity,cancelSelectActivity }: Props) {
    return(
        <Grid>
            <Grid.Column width='10'>
                <ActivityList activities={activities} selectActivity={selectActivity} />
            </Grid.Column>

            <Grid.Column width='6'>
                { selectedActivity &&
                    <ActivityDetails activity={selectedActivity} cancelSelectActivity={cancelSelectActivity} />
                }
                <ActivityForm />
            </Grid.Column>
        </Grid>
    );
}