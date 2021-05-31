import UserController from '../controllers/userController.js'

export default class UserView {
    constructor() {
        this.userController = new UserController();

        // Gestão do form de login
        this.frmLogin = document.querySelector('#frmLogin');
        this.loginUsername = document.querySelector('#txtUsername');
        this.loginPassword = document.querySelector('#txtPassword');
        this.loginMessage = document.querySelector('#loginMessage')
        this.bindLoginForm()
    }
    /**
     * Função que define um listener para o botão de login
     */
    bindLoginForm() {
        this.frmLogin.addEventListener('submit', event => {
            event.preventDefault();
            try {
                this.userController.login(this.loginUsername.value, this.loginPassword.value);
                this.displayMessage('login', 'User logged in with success!', 'success');
                // Espera 1 seg. antes de fazer refresh à pagina
                // Assim o utilizador pode ver a mensagem na modal antes de a mesma se fechar
                setTimeout(() => { location.reload() }, 1000);
                location.href="../index.html"
            } catch (err) {
                this.displayMessage('login', err, 'danger');
            }
        });

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