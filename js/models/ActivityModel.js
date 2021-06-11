export default class ActivityModel {
    constructor(title, description, coinsAwarded, pointsAwarded, options, activityType, requirements) {
        this.title = title,
        this.description = description || "",
        this.coinsAwarded = coinsAwarded || 0,
        this.pointsAwarded = pointsAwarded || 0,
        this.options = options,
        this.activityType = activityType,
        this.requirements = requirements || ""
    }
}
