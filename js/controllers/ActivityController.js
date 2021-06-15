
import ActivityModel from '../models/ActivityModel.js'

export default class ActivityController {
    constructor() {
        this.activities = localStorage.activities ? JSON.parse(localStorage.activities) : [];
        this.currentActivity = sessionStorage.activity ? sessionStorage.activity : null

    }

    create(id, activityType, coinsAwarded, pointsAwarded, questions, requirement) {
        if (!this.activities.some(activity => activity.id === id)) {
            this.activities.push(new ActivityModel(id, activityType, coinsAwarded, pointsAwarded, questions, requirement));
            localStorage.setItem('activities', JSON.stringify(this.activities))
        } else {
            throw Error(`Activity with id "${id}" already exists!`);
        }
    }

    remove(id) {
        this.activities = this.activities.filter(activity => activity.id != id)
        localStorage.setItem('activities', JSON.stringify(this.activities))
    }

    setCurrentActivity(id) {
        this.currentActivity = id
        sessionStorage.setItem("activity", id);
    }

    getCurrentActivity() {
        return this.activities.find(activity => activity.id == this.currentActivity)
    }

    activityExists(id) {

        let i;
        for (i = 0; i < this.activities.length; i++) {
            if (this.activities[i].id == id) {
                return true
            }
        }

        return false
    }


    /*
    getActivities(filterId = '', filterType = '', isSorted = false) {
        let filteredActivities = this.activities.filter(
            activity =>
                (activity.id.includes(filterId()) || filterId === '')
                &&
                (activity.genre == filterType || filterType === '')
        )

        filteredActivities = isSorted ? filteredActivities.sort(this.#compare) : filteredActivities

        return filteredActivities
    }
    */

    /*

    #compare(activityA, activityB) {
        if (activityA.name > activityB.name)
            return 1;
        if (activityA.name < activityB.name)
            return -1;
        return 0;
    }
    */

}
