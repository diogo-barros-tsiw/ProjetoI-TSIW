
import BadgeModel from '../models/BadgeModel.js'

export default class BadgeController {
    constructor() {
        this.badges = localStorage.badges ? JSON.parse(localStorage.badges) : [];
        this.currentBadge = sessionStorage.badge ? sessionStorage.badge : null

    }

    create(title, requirement, moreThan, pictureURI) {

        console.log(moreThan)

        this.badges.push(new BadgeModel(title, requirement, moreThan, pictureURI));
        localStorage.setItem('badges', JSON.stringify(this.badges))

    }

    getBadges() {
        return this.badges;
    }

    remove(id) {
        this.badges.splice(id, 1);
        localStorage.setItem('badges', JSON.stringify(this.badges))
    }
}
