import ActivityController from '../controllers/ActivityController.js'
import UserController from '../controllers/UserController.js'

export default class NewActivityView {
    constructor() {
        this.activityController = new ActivityController();
        this.userController = new UserController();

        // Gestão do formulário de adição de activitya
        this.userLoggedOutContent = document.getElementById('userLoggedOutContent');
        this.userLoggedInContent = document.getElementById('userLoggedInContent');
        this.newActivityForm = document.getElementById('frmNewActivity');
        this.activityName = document.getElementById('txtName');
        this.activityGenre = document.getElementById('sltGenre');
        this.activityPhoto = document.getElementById('txtPhoto');
        this.activityDescription = document.getElementById('txtDescription');
        this.activityVideo = document.getElementById('txtVideo');
        this.newActivityMessage = document.getElementById('newActivityMessage');

        // Gere a visulização do conteúdo da página tendo em conta se o user está ou não autenticado 
        this.renderAddActivityForm();

    }

    renderAddActivityForm() {
        if (this.userController.isLogged()) {
            this.userLoggedOutContent.style.visibility = 'hidden';
            this.userLoggedInContent.style.visibility = 'visible';
            this.bindNewActivityForm()
        } else {
            this.userLoggedOutContent.style.visibility = 'visible';
            this.userLoggedInContent.style.visibility = 'hidden';
        }
    }

    bindNewActivityForm() {
        this.newActivityForm.addEventListener('submit', event => {
            event.preventDefault();

            try {
                this.activityController.create(
                    this.activityName.value,
                    this.activityGenre.value,
                    this.activityPhoto.value,
                    this.activityDescription.value,
                    this.activityVideo.value
                );
                this.displayMessage('Activity added with success!', 'success');

                // Espera 1 seg. antes de fazer refresh à pagina
                // Assim o utilizador pode ver a mensagem na modal antes de a mesma se fechar
                setTimeout(() => { location.href = "../index.html" }, 1000);
            } catch (err) {
                this.displayMessage(err, 'danger');
            }
        });
    }

    displayMessage(message, type) {
        this.newActivityMessage.innerHTML =
            `<div class="alert alert-${type}" role="alert">${message}</div>`;
    }
}
