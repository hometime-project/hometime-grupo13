import UserController from '../controllers/userController.js'

export default class NavView {
    constructor() {
        this.userController = new UserController();
        this.autentButton=document.querySelector("#btnautent")
        this.buttonLink=document.querySelectorAll("#linklog")
        // Atualiza botões tendo em conta se o user está autenticado ou não
        this.updateStatusUI();
        this.checkLog()
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
    /**Função que impede o acesso páginas de acesso restrito */
    checkLog(){
        for (const btnlinklog of this.buttonLink) {
            btnlinklog.addEventListener("click",function(){
               if(!this.userController.isLogged()){
                   location.href="html/login.html"
               }
            })
        }
        
    }
}
