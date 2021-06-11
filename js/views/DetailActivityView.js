import ActivityController from '../controllers/ActivityController.js'

export default class DetailActivityView {

    constructor() {
        this.activityController = new ActivityController()

        // Gestão dos detalhes da activitya
        this.activityName = document.querySelector('#activityName')
        this.activityGenre = document.querySelector('#activityGenre')
        this.activityDescription = document.querySelector('#activityDescription')
        this.activityPhoto = document.querySelector('#activityPhoto')
        this.btnBack = document.querySelector("#btnBack")

        this.fillActivityData()
        this.bindBackButton()
    }

    bindBackButton() {
        this.btnBack.addEventListener('click', () => {
            history.back();
        })
    }

    fillActivityData() {
        const currentActivity = this.activityController.getCurrentActivity()
        this.activityName.innerHTML = currentActivity.name
        this.activityGenre.innerHTML = currentActivity.genre
        this.activityDescription.innerHTML = currentActivity.description
        this.activityPhoto.src = currentActivity.photo
    }

}
