export default class ItemModel {
    constructor(title, description, price, pictureURI) {
        this.title = title,
        this.description = description || "",
        this.price = price || 0,
        this.pictureURI = pictureURI,
        this.requirements = requirements || ""
    }
}
