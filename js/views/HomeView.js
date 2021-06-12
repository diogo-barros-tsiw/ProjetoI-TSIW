import UserController from '../controllers/UserController.js'

export default class UserView {
    constructor() {
        this.userController = new UserController();

        // Gestão da Landing Page
        /*
        this.frmLogin = document.querySelector('#frmLogin');
        this.loginUsername = document.querySelector('#txtUsername');
        this.loginPassword = document.querySelector('#txtPassword');
        this.loginMessage = document.querySelector('#loginMessage')
        this.bindLoginForm()
        */


        // Gestão do Dashboard
        /*
        this.frmRegister = document.querySelector('#frmRegister');
        this.registerUsername = document.querySelector('#txtUsernameRegister');
        this.registerPassword = document.querySelector('#txtPasswordRegister');
        this.registerPassword2 = document.querySelector('#txtPasswordRegister2');
        this.registerMessage = document.querySelector('#registerMessage')
        this.bindRegisterForm();
        */

        // Gestão do Conteúdo Home
        this.landingPage = document.querySelector('#landing-page');

        /*
        this.registerButton = document.querySelector('#btnRegister');
        this.logoutButton = document.querySelector('#btnLogout');
        this.bindLogout();
        */


        // Atualiza botões tendo em conta se o user está autenticado ou não
        this.updateStatusUI();
    }

    hideLandingPage(){
        console.alert("beep bop")
    }

    /**
     * Função que define um listener para o botão de registo
     */
    bindLandingPage() {
        this.frmRegister.addEventListener('submit', event => {
            event.preventDefault();
            try {
                if (this.registerPassword.value !== this.registerPassword2.value) {
                    throw Error('Password and Confirm Password are not equal');
                }
                this.userController.register(this.registerUsername.value, this.registerPassword.value);
                this.displayMessage('register', 'User registered with success!', 'success');
                // Espera 1 seg. antes de fazer refresh à pagina
                // Assim o utilizador pode ver a mensagem na modal antes de a mesma se fechar
                setTimeout(() => { location.reload() }, 1000);
            } catch (err) {
                this.displayMessage('register', err, 'danger');
            }
        })
    }

  

    /**
     * Função que define e exibe uma mensagem de sucesso ou de erro
     * @param {string} event tipo de evento (login ou register)
     * @param {string} text mensagem a ser exibida 
     * @param {string} type danger - caso seja uma mensagem de erro; success - caso seja uma mensagem de sucesso
     */
    displayMessage(event, text, type) {
        const message = `<div class="alert alert-${type}" role="alert">${text}</div>`;
        event == 'login' ? this.loginMessage.innerHTML = message : this.registerMessage.innerHTML = message
    }
}
