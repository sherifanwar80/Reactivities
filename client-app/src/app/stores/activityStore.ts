// import { action, computed, makeAutoObservable, makeObservable, observable, runInAction } from "mobx";
import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/Agent";
import { Activity } from "../models/activity";
import {format} from 'date-fns';
// import {v4 as uuid} from 'uuid';

export default class ActivityStore {

    // activities: Activity[] = [];
    activityRegistry = new Map<string, Activity>();
    selectedActivity: Activity | undefined = undefined;
    editMode: boolean = false;
    loading = false;
    loadingInitial = false;
    
    constructor() {
        makeAutoObservable(this);
    }

    /*****************Computed Property(Getter)******************/
    get activitiesByDate() { //this is a getter
        return Array.from(this.activityRegistry.values()).sort((a, b) => 
            a.date!.getTime() - b.date!.getTime());
    }

    //reduce((previousValue, currentValue, currentIndex, array) => { /* ... */ }, initialValue)
    //the return type is object [string, Activity[]][]
    get groupedActivities() {
        let grouped = Object.entries(
            this.activitiesByDate.reduce((activities, activity) => {
                const date = format(activity.date!, 'dd MMM yyyy');
                activities[date] = activities[date] ? [...activities[date], activity] : [activity];
                return activities;
            }, {} as {[key: string]: Activity[]})
        );
        return grouped;
    }
    /*****************Actions******************/
    //Reactions : wrap promises in runInAction arrow function
    loadActivities = async () => {
        this.loadingInitial = true;
        try {
            const activities = await agent.Activities.List();
            // runInAction(() => {
                activities.forEach(activity => {
                    this.setActivity(activity);
                });
                this.setLoadingInitial(false); //this.loadingInitial = false; //if i want to use the commented use RunInAction to remove warning
            // });
        }
        catch(error) {
            console.log();
            this.setLoadingInitial(false); //this.loadingInitial = false;
        }
    }

    loadActivity = async (id: string) => {
        let activity = this.getActivity(id);
        if (activity) { //found in memory
            this.selectedActivity = activity;
            return activity;
        }
        else { //get from api call
            this.loadingInitial = true;
            try {
                activity = await agent.Activities.details(id);
                this.setActivity(activity);
                runInAction(() => {
                    this.selectedActivity = activity;
                });
                this.setLoadingInitial(false);
                return activity;
            } catch (error){
                console.log(error);
                this.setLoadingInitial(false);
            }
        }
    }

    private getActivity = (id: string) => {
        return this.activityRegistry.get(id);
    }

    private setActivity = (activity: Activity) => {
        activity.date = new Date(activity.date!);
        this.activityRegistry.set(activity.id, activity);
    }
    
    setLoadingInitial = (state: boolean) => {
        this.loadingInitial = state;
    }

    createActivity = async (activity: Activity) => {
        // activity.id = uuid();
        this.loading = true;
        this.selectedActivity = undefined;
        try {
            await agent.Activities.create(activity);
            runInAction(() => {
                //this.activities.push(activity);
                this.activityRegistry.set(activity.id, activity);
                this.selectedActivity = activity;
                this.editMode = false;
                this.loading = false;
            });
        }
        catch(error) {
            console.log(error);
            runInAction(() => {this.loading = false;});
        }
    }

    
    updateActivity = async (activity: Activity) => {
        this.loading = true;
        try {
            await agent.Activities.update(activity);
                runInAction(() => {
                    // this.activities = [...this.activities.filter(a => a.id !== activity.id), activity];
                    // this.activities = [...this.activities.filter(a => a.id !== activity.id), activity];
                    this.activityRegistry.set(activity.id, activity);
                    this.selectedActivity = activity; //to display it on the right hand side
                    this.editMode = false;
                    this.loading = false;
            });
        }
        catch (error) {
            console.log(error);
            runInAction(() => {this.loading = false;});
        }
    }

    deleteActivity = async (id: string) => {
        this.loading = true;
        try {
            await agent.Activities.delete(id);
            runInAction(() => {
                debugger;
                //this.activities = [...this.activities.filter(a => a.id !== id)];
                this.activityRegistry.delete(id);
                this.loading = false;
            })
        }
        catch (error) { 
            console.log(error);
            runInAction(() => {this.loading = false;});
        }
    }
    
}