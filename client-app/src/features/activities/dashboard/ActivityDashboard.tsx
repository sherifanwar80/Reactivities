
import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { Grid } from "semantic-ui-react";
import LoadingCompmonent from "../../../app/layout/LoadingComponent";
import { useStore } from "../../../app/stores/store";
import ActivityFilters from "./ActivityFilters";
import ActivityList from "./ActivityList";

//export default function ActivityDashboard(props: Props) {
export default observer(function ActivityDashboard() {

    const {activityStore} = useStore();
    const {activityRegistry, loadActivities, loadingInitial} = activityStore;
    
    useEffect(() => {
        if (activityRegistry.size <= 1) //so we don't load flicker spinner unless we need from api
            loadActivities();
    }, [activityRegistry.size, loadActivities]);

    if (loadingInitial)
        return <LoadingCompmonent content='Loading activities...' />

    return(
        <Grid>
            <Grid.Column width='10'>
                <ActivityList />
            </Grid.Column>

            <Grid.Column width='6'>
                <ActivityFilters />
            </Grid.Column>
        </Grid>
    );
})