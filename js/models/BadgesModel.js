export default class BadgeModel {
    constructor(title, description, coinsAwarded, pointsAwarded, pictureURI, requirements) {
        this.title = title,
        this.description = description || "",
        this.coinsAwarded = coinsAwarded || 0,
        this.pointsAwarded = pointsAwarded || 0,
        this.pictureURI = pictureURI,
        this.requirements = requirements || ""
    }
}
