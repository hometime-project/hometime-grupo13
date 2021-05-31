import UserController from '../controllers/userController.js'

export default class UserView {
    constructor() {
        this.userController = new UserController();

        // Gestão dos botões da navbar
        this.logoutButton = document.querySelector('#btnLogout');
        this.bindLogout();

    }

    /**
     * Função que define um listener para o botão de logout
     */
    bindLogout() {
        this.logoutButton.addEventListener('click', () => {
            this.userController.logout();
            location.href="../index.html"
        })
    }

}