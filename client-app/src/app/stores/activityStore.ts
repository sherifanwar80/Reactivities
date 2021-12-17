// import { action, computed, makeAutoObservable, makeObservable, observable, runInAction } from "mobx";
import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/Agent";
import { Activity } from "../models/activity";
import {v4 as uuid} from 'uuid';

export default class ActivityStore {

    // activities: Activity[] = [];
    activityRegistry = new Map<string, Activity>();
    selectedActivity: Activity | undefined = undefined;
    editMode: boolean = false;
    loading = false;
    loadingInitial = true;
    
    constructor() {
        makeAutoObservable(this);
    }

    get activitiesByDate() { //this is a getter
        return Array.from(this.activityRegistry.values()).sort((a, b) => 
            Date.parse(a.date) - Date.parse(b.date));
    }

    loadActivities = async () => {
        try {
            const activities = await agent.Activities.List();
            // runInAction(() => {
                activities.forEach(activity => {
                    activity.date = activity.date.split('T')[0];
                    // this.activities.push(activity);
                    this.activityRegistry.set(activity.id, activity);
                });
                this.setLoadingInitial(false); //this.loadingInitial = false;
            // });
        } 
        catch(error) {
            console.log();
            this.setLoadingInitial(false); //this.loadingInitial = false;
        }
    }

    setLoadingInitial = (state: boolean) => {
        this.loadingInitial = state;
    }

    selectActivity = (id: string) => {
        // this.selectedActivity = this.activities.find(a => a.id === id);
        this.selectedActivity = this.activityRegistry.get(id);
    }

    cancelSelectedActivity = () => {
        this.selectedActivity = undefined;
    }

    openForm = (id?: string) => {
        id ? this.selectActivity(id) : this.cancelSelectedActivity();
        this.editMode = true;
    }

    closeForm = () => {
        this.editMode = false;
    }

    createActivity = async (activity: Activity) => {
        activity.id = uuid();
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
                if (this.selectedActivity?.id == id) this.cancelSelectedActivity();
                this.loading = false;
            })
        }
        catch (error) { 
            console.log(error);
            runInAction(() => {this.loading = false;});
        }
    }
    
}