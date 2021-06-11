export default class ThemeModel {
    constructor(title, description, price, shader) {
        this.title = title,
        this.description = description || "",
        this.price = price || 0,
        this.shader = shader
    }
}
