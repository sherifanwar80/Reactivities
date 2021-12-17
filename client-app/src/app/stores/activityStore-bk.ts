export {};
// import { action, computed, makeAutoObservable, makeObservable, observable } from "mobx";

// export default class ActivityStore {

//     title = "Hello from MobX!";

//     constructor() {
//         // makeObservable(this,{
//         //     title: observable,
//         //     // setTitle: action.bound, //use bound id setTitle() is not declared as arrow functuion
//         //     setTitle: action,
//         // });
//         makeAutoObservable(this);
//     }

//     setTitle = () => {
//         this.title = this.title + '!';
//     }
// }