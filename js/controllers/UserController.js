
import UserModel from '../models/UserModel.js'

export default class UserController {
    constructor() {
        this.users = localStorage.users ? JSON.parse(localStorage.users) : [];
    }

    register(username, password) {
        if (!this.users.some(user => user.username === username)) {
            this.users.push(new UserModel(username, password));
            localStorage.setItem('users', JSON.stringify(this.users))
        } else {
            throw Error(`User with username "${username}" already exists!`);
        }
    }

    login(username, password) {
        if (this.users.some(user => user.username === username && user.password === password)) {
            sessionStorage.setItem('loggedUser', username)
        } else {
            throw Error('Invalid login!');
        }
    }

    saveActivity(activityUser) {
        let user = this.getUsername(sessionStorage.getItem('loggedUser'))

        console.log(this.users[user]);
        this.users[user].activityAnswers.push(activityUser);
        this.users[user].completedActivities++;
        this.users[user].points += activityUser.activity.pointsAwarded;
        this.users[user].coins += activityUser.activity.coinsAwarded;

        localStorage.setItem('users', JSON.stringify(this.users))
    }

    getRatio(activity){
        let user = this.getUsername(sessionStorage.getItem('loggedUser'))

        let userActivity = this.users[user].activityAnswers[activity]

        if (userActivity == undefined) return -1;
        else return userActivity.ratio
    }

    isAdmin(){
        let user = this.getUsername(sessionStorage.getItem('loggedUser'))

        if (this.users[user].role == "admin")
        {
            return true;
        }
        else return false;
    }

    getUsername(username) {
        for (let i = 0; i < this.users.length; i++) {

            if (this.users[i].username == username) 
            {   
                return i;
            }
        }
        return -1;
    }

    hasBadge(badgeTitle){

        let user = this.getUser();
        
        let badges = user.badges
        
        for (let i = 0; i < badges.length; i++)
        {
            if (badges[i].title == badgeTitle)
            {
                return true;
            }
        }
        return false;
    }

    assignBadge(badge)
    {
        let user = this.getUser();

        user.badges.push(badge);

        localStorage.setItem('users', JSON.stringify(this.users))
    }

    getUser() {
        let username = sessionStorage.getItem('loggedUser')

        for (let i = 0; i < this.users.length; i++) {

            if (this.users[i].username == username) 
            {   
                return this.users[i];
            }
        }
        return -1;
    }

    getCoins(){
        let user = this.getUser();
        return user.coins;
    }

    getPoints(){
        let user = this.getUser();
        return user.coins;
    }

    logout() {
        sessionStorage.removeItem('loggedUser')
    }

    isLogged() {
        return sessionStorage.getItem('loggedUser') ? true : false
    }
}