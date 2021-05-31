<<<<<<< HEAD
import UserController from '../controllers/userController.js'

export default class UserView {
    constructor() {
        this.userController = new UserController();
        this.autentButton=document.querySelector("#footDesautent")
        this.desautentButton=document.querySelector("#footAutent")
        // Atualiza botões tendo em conta se o user está autenticado ou não
        this.updateStatusUI();
    }

    /**
     * Função que atualiza a visibilidade dos botões de acordo com a autenticação
     */
    updateStatusUI() {
        if (this.userController.isLogged()) {
            this.autentButton.innerHTML="Perfil"
            this.autentButton.href="html/profilepage.html"
        } 
}
=======
export default class footerView {
    
>>>>>>> d91d914bb1b1de0f07621e56a2c245f6644647e3
}