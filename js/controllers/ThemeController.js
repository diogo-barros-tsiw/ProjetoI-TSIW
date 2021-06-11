
import ThemeModel from '../models/ThemeModel.js'

export default class ThemeController {
    constructor() {
        this.themes = localStorage.themes ? JSON.parse(localStorage.themes) : [];
        this.currentTheme = sessionStorage.theme ? sessionStorage.theme : null

    }

    create(name, genre, photo, description, video) {
        if (!this.themes.some(theme => theme.name === name)) {
            this.themes.push(new ThemeModel(name, genre, photo, description, video));
            localStorage.setItem('themes', JSON.stringify(this.themes))
        } else {
            throw Error(`Theme with name "${name}" already exists!`);
        }
    }

    remove(name) {
        this.themes = this.themes.filter(theme => theme.name != name)
        localStorage.setItem('themes', JSON.stringify(this.themes))
    }

    setCurrentTheme(name) {
        this.currentTheme = name
        sessionStorage.setItem("theme", name);
    }

    getCurrentTheme() {
        return this.themes.find(theme => theme.name == this.currentTheme)
    }

    getThemes(filterName = '', filterGenre = '', isSorted = false) {
        let filteredThemes = this.themes.filter(
            theme =>
                (theme.name.toLowerCase().includes(filterName.toLowerCase()) || filterName === '')
                &&
                (theme.genre == filterGenre || filterGenre === '')
        )

        filteredThemes = isSorted ? filteredThemes.sort(this.#compare) : filteredThemes

        return filteredThemes
    }

    #compare(themeA, themeB) {
        if (themeA.name > themeB.name)
            return 1;
        if (themeA.name < themeB.name)
            return -1;
        return 0;
    }

}
