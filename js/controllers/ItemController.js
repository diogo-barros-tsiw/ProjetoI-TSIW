
import ItemModel from '../models/ItemModel.js'

export default class ItemController {
    constructor() {
        this.items = localStorage.items ? JSON.parse(localStorage.items) : [];
        this.currentItem = sessionStorage.item ? sessionStorage.item : null

    }

    create(name, genre, photo, description, video) {
        if (!this.items.some(item => item.name === name)) {
            this.items.push(new ItemModel(name, genre, photo, description, video));
            localStorage.setItem('items', JSON.stringify(this.items))
        } else {
            throw Error(`Item with name "${name}" already exists!`);
        }
    }

    remove(name) {
        this.items = this.items.filter(item => item.name != name)
        localStorage.setItem('items', JSON.stringify(this.items))
    }

    setCurrentItem(name) {
        this.currentItem = name
        sessionStorage.setItem("item", name);
    }

    getCurrentItem() {
        return this.items.find(item => item.name == this.currentItem)
    }

    getItems(filterName = '', filterGenre = '', isSorted = false) {
        let filteredItems = this.items.filter(
            item =>
                (item.name.toLowerCase().includes(filterName.toLowerCase()) || filterName === '')
                &&
                (item.genre == filterGenre || filterGenre === '')
        )

        filteredItems = isSorted ? filteredItems.sort(this.#compare) : filteredItems

        return filteredItems
    }

    #compare(itemA, itemB) {
        if (itemA.name > itemB.name)
            return 1;
        if (itemA.name < itemB.name)
            return -1;
        return 0;
    }

}
