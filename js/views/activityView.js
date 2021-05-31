import UserController from '../controllers/userController.js'

export default class UserView {
    constructor() {
        this.userController = new UserController();
        // Atualiza botões tendo em conta se o user está autenticado ou não
        this.updateStatusUI();
    }

    /**
     * Função que atualiza a visibilidade dos botões de acordo com a autenticação
     */
    updateStatusUI() {
        if (this.userController.isLogged()) {
        } else {
            location.href="login.html"
        }
    }
}