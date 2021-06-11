export default class UserModel {
    constructor(username, password, id, coins, points, roleID) {
        this.username = username,
        this.password = password,
        this.role = "user",
        this.id = id,
        this.coins = 0,
        this.points = 0,
        this.roleID = 1,
        this.selectedTheme = -1,
        this.activities = [],
        this.themes = [],
        this.items = []
    }
}
