import { makeAutoObservable, reaction } from "mobx";
import { ServerError } from "../models/serverErrors";

export default class CommonStore {
    error: ServerError | null = null;
    token: string | null = window.localStorage.getItem('jwt');
    appLoaded = false;

    constructor() {
        makeAutoObservable(this);

        //reaction will run after we have a token
        reaction(
            () => this.token,
            token => {
                if (token) {
                    window.localStorage.setItem('jwt', token);
                }
                else {
                    window.localStorage.removeItem('jwt');
                }
            } 
        )
    }

    setServerError = (error: ServerError) => {
        this.error = error;
    }

    //reaction will run after we have a token
    setToken = (token: string | null) => {
        this.token = token;
    }

    setAppLoaded = () => {
        this.appLoaded = true;
    }
}