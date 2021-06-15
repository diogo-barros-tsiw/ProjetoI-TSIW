export default class ActivityModel {
    constructor(id, activityType, coinsAwarded, pointsAwarded, questions, requirement) {
        this.id = id,
        this.activityType = activityType,
        this.coinsAwarded = coinsAwarded || 0,
        this.pointsAwarded = pointsAwarded || 0,
        this.questions = questions,
        this.requirement = requirement || ""
    }
}
