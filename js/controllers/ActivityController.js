
import ActivityModel from '../models/ActivityModel.js'

export default class ActivityController {
    constructor() {
        this.activities = localStorage.activities ? JSON.parse(localStorage.activities) : [];
        this.currentActivity = sessionStorage.activity ? sessionStorage.activity : null

    }

    create(name, genre, photo, description, video) {
        if (!this.activities.some(activity => activity.name === name)) {
            this.activities.push(new ActivityModel(name, genre, photo, description, video));
            localStorage.setItem('activities', JSON.stringify(this.activities))
        } else {
            throw Error(`Activity with name "${name}" already exists!`);
        }
    }

    remove(name) {
        this.activities = this.activities.filter(activity => activity.name != name)
        localStorage.setItem('activities', JSON.stringify(this.activities))
    }

    setCurrentActivity(name) {
        this.currentActivity = name
        sessionStorage.setItem("activity", name);
    }

    getCurrentActivity() {
        return this.activities.find(activity => activity.name == this.currentActivity)
    }

    getActivities(filterName = '', filterGenre = '', isSorted = false) {
        let filteredActivities = this.activities.filter(
            activity =>
                (activity.name.toLowerCase().includes(filterName.toLowerCase()) || filterName === '')
                &&
                (activity.genre == filterGenre || filterGenre === '')
        )

        filteredActivities = isSorted ? filteredActivities.sort(this.#compare) : filteredActivities

        return filteredActivities
    }

    #compare(activityA, activityB) {
        if (activityA.name > activityB.name)
            return 1;
        if (activityA.name < activityB.name)
            return -1;
        return 0;
    }

}
