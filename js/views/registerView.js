import UserController from '../controllers/userController.js'

export default class UserView {
    constructor() {
        this.userController = new UserController();
        // Gestão do form de registo
        this.frmRegister = document.querySelector('#frmRegister');
        this.registerUsername = document.querySelector('#txtUsernameRegister');
        this.registerPassword = document.querySelector('#txtPasswordRegister');
        this.registerPassword2 = document.querySelector('#txtPasswordRegister2');
        this.registerEmail=document.querySelector("#txtEmailRegister");
        this.dataBth=document.querySelector("#databth")
        this.gender=document.querySelector('select')
        this.registerMessage = document.querySelector('#registerMessage')
        this.bindRegisterForm();
    }

    bindRegisterForm() {
        this.frmRegister.addEventListener('submit', event => {
            event.preventDefault();
            try {
                if (this.registerPassword.value !== this.registerPassword2.value) {
                    throw Error('Password and Confirm Password are not equal');
                }
                this.userController.register(this.registerUsername.value, this.registerPassword.value,this.registerEmail.value,this.dataBth.value,this.gender.value);
                this.displayMessage('register', 'User registered with success!', 'success');
                // Espera 1 seg. antes de fazer refresh à pagina
                // Assim o utilizador pode ver a mensagem na modal antes de a mesma se fechar
                setTimeout(() => { location.reload() }, 1000);
                location.href="login.html"
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