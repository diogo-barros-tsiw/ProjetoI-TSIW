export default class UserModel {
    constructor(username, password, role, coins, points) {
        this.username = username,
        this.password = password,
        this.role = role || "user",
        this.coins = coins || 0,
        this.points = points || 0,
        this.selectedTheme = -1,
        this.titleOrnament = 0,
        this.completedActivities = 0,
        this.activityAnswers = [],
        this.themes = [],
        this.items = []
    }
}
