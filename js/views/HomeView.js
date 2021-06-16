import UserController from '../controllers/UserController.js'

export default class UserView {
    constructor() {
        this.userController = new UserController();

        this.profile = document.querySelector('#profile');
        this.shop = document.querySelector('#shop');
        this.leaderboard = document.querySelector('#leaderboard');


        this.adminPage = document.querySelector('#dashboard-admin');
        this.landingPage = document.querySelector('#landing-page');
        this.dashboard = document.querySelector('#dashboard');
        this.playButton = document.querySelector('#dashboard-play-button');

        this.createActivityButton = document.querySelector('#admin-create-activity-button');

        this.manageUsersButton = document.querySelector('#admin-manage-users-button');
        this.manageBadgesButton = document.querySelector('#admin-manage-badges-button');
        this.manageItemsButton = document.querySelector('#admin-manage-items-button');

        this.bindGoToLevelMenu();

        this.bindProfile();
        this.bindLeaderboard();

        this.bindCreateActivity();
        this.bindManageUsers();
        this.bindManageBadges();
        this.bindManageItems();

        document.getElementById('coins').innerHTML = this.userController.getCoins();
        document.getElementById('points').innerHTML = this.userController.getPoints();

        // Atualiza botões tendo em conta se o user está autenticado ou não
        this.updateStatusUI();
    }

    hideLandingPage(){
        console.alert("beep bop")
    }

    bindCreateActivity(){
        this.createActivityButton.addEventListener('click', () => {
            location.href = 'html/newActivity.html';
        })
    }

    bindManageUsers(){
        this.manageUsersButton.addEventListener('click', () => {
            location.href = 'html/manageUsers.html';
        })
    }

    bindManageBadges(){
        this.manageBadgesButton.addEventListener('click', () => {
            location.href = 'html/manageBadges.html';
        })
    }

    bindManageItems(){
        this.manageItemsButton.addEventListener('click', () => {
            location.href = 'html/manageItems.html';
        })
    }

    bindGoToLevelMenu() {
        this.playButton.addEventListener('click', () => {
            location.href = 'html/levelMenu.html';
        })
    }

    bindProfile(){
        this.profile.addEventListener('click', event => {
            location.href = 'html/profile.html';
        })
    }

    bindShop(){
        this.shop.addEventListener('click', event => {
            location.href = 'html/shop.html';
        })
    }

    bindLeaderboard(){
        this.leaderboard.addEventListener('click', event => {
            location.href = 'html/leaderboard.html';
        })
    }

    updateStatusUI() {
        if (this.userController.isLogged()) {
            this.landingPage.style.display = 'none'
            this.dashboard.style.display = 'block'
            this.adminPage.style.display = 'none'

            if (this.userController.isAdmin())
            {
                this.adminPage.style.display = 'block'
                this.landingPage.style.display = 'none'
                this.dashboard.style.display = 'none'
            }

        } else {
            this.adminPage.style.display = 'none'
            this.landingPage.style.display = 'block'
            this.dashboard.style.display = 'none'
        }
    }


}
