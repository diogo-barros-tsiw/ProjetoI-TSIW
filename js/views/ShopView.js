import UserController from '../controllers/UserController.js'
import ActivityController from '../controllers/ActivityController.js'


export default class LevelMenuView {
    constructor() {
        this.userController = new UserController();
        this.activityController = new ActivityController();

        this.returnArrow = document.querySelector('#return-arrow');

        this.bindReturn();
    }

    bindReturn() {
        this.returnArrow.addEventListener('click', event => {
            location.href = '/';
        })
    }
}
