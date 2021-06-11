import BandController from '../controllers/BandController.js'
import UserController from '../controllers/UserController.js'

export default class BandView {

    constructor() {
        this.bandController = new BandController()
        this.userController = new UserController()

        // Catálogo: filtro
        this.txtBand = document.querySelector("#txtBand")
        this.sltGenre = document.querySelector("#sltGenre")
        this.btnFilter = document.querySelector("#btnFilter")
        this.bindFilter()

        // Catálogo: ordenação
        this.btnSort = document.querySelector("#btnSort")
        this.bindSort()

        // Catálogo: adição de banda
        this.btnAdd = document.querySelector("#btnAdd")
        this.bindAdd()

        // Catálogo: listagem de bandas
        this.catalog = document.querySelector("#myCatalog")
        this.renderCatalog(this.bandController.getBands())
    }

    bindFilter() {
        this.btnFilter.addEventListener('click', () => {
            this.renderCatalog(this.bandController.getBands(this.txtBand.value, this.sltGenre.value))
        })
    }

    bindSort() {
        this.btnSort.addEventListener('click', () => {
            this.renderCatalog(this.bandController.getBands(this.txtBand.value, this.sltGenre.value, true))
        })
    }

    bindAdd() {
        this.btnAdd.addEventListener('click', () => {
            location.href = 'html/newBand.html';
        })
    }

    renderCatalog(bands = []) {
        // Gerir a visualização do botão Add
        this.userController.isLogged() ?
            this.btnAdd.style.visibility = 'visible' :
            this.btnAdd.style.visibility = 'hidden';

        // Gerir o catálogo
        let result = '<div class="row row-cols-3">'
        for (const band of bands) {
            result += this.generateBandCard(band)
        }
        result += '</div>'
        this.catalog.innerHTML = result

        // Gerir botões Add e See more
        this.bindAddRemoveEvent()
        this.bindAddSeeMoreEvent()
    }

    generateBandCard(band) {
        let html = `
        <div class="col">
            <div class="card">
                <img class="card-img-top" src="${band.photo}" alt="">
                <div class="card-body">
                    <h4 class="card-title">${band.name}</h4>
                    <p class="card-text">${band.genre}</p>
                    <button id="${band.name}" class="btn btn-primary see">See more</button>
            `
        if (this.userController.isLogged()) {
            html += `<button id="${band.name}" class="btn btn-danger remove">Remove</button>`
        }

        html += `
                </div>
            </div>
        </div>        
        `
        return html
    }

    bindAddRemoveEvent() {
        for (const btnRemove of document.getElementsByClassName("remove")) {
            btnRemove.addEventListener('click', event => {
                this.bandController.remove(event.target.id)
                this.renderCatalog(this.bandController.getBands(this.txtBand.value, this.sltGenre.value))
            })
        }
    }

    bindAddSeeMoreEvent() {
        for (const btnSee of document.getElementsByClassName("see")) {
            btnSee.addEventListener('click', event => {
                this.bandController.setCurrentBand(event.target.id)
                location.href = 'html/detailBand.html';
            })
        }
    }

}
