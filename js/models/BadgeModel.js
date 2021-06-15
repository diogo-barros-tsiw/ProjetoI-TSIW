export default class BadgeModel {
    constructor(title, requirement, moreThan, pictureURI) {
        this.title = title,
        this.requirement = requirement,
        this.moreThan = moreThan,
        this.pictureURI = pictureURI || ""
    }
}
