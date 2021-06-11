
import BadgeModel from '../models/BadgeModel.js'

export default class BadgeController {
    constructor() {
        this.badges = localStorage.badges ? JSON.parse(localStorage.badges) : [];
        this.currentBadge = sessionStorage.badge ? sessionStorage.badge : null

    }

    create(name, genre, photo, description, video) {
        if (!this.badges.some(badge => badge.name === name)) {
            this.badges.push(new BadgeModel(name, genre, photo, description, video));
            localStorage.setItem('badges', JSON.stringify(this.badges))
        } else {
            throw Error(`Badge with name "${name}" already exists!`);
        }
    }

    remove(name) {
        this.badges = this.badges.filter(badge => badge.name != name)
        localStorage.setItem('badges', JSON.stringify(this.badges))
    }

    setCurrentBadge(name) {
        this.currentBadge = name
        sessionStorage.setItem("badge", name);
    }

    getCurrentBadge() {
        return this.badges.find(badge => badge.name == this.currentBadge)
    }

    getBadges(filterName = '', filterGenre = '', isSorted = false) {
        let filteredBadges = this.badges.filter(
            badge =>
                (badge.name.toLowerCase().includes(filterName.toLowerCase()) || filterName === '')
                &&
                (badge.genre == filterGenre || filterGenre === '')
        )

        filteredBadges = isSorted ? filteredBadges.sort(this.#compare) : filteredBadges

        return filteredBadges
    }

    #compare(badgeA, badgeB) {
        if (badgeA.name > badgeB.name)
            return 1;
        if (badgeA.name < badgeB.name)
            return -1;
        return 0;
    }

}
