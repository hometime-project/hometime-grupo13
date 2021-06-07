import UserController from '../controllers/userController.js'

export default class UserView {
    constructor() {
        this.userController = new UserController();
        //Administrador
        this.buttonManager=document.querySelector("#managerWebsite")
        // Terminar Sessão
        this.logoutButton = document.querySelector('#btnLogout');
        //Dados do Utilizador
        this.cardUsername=document.querySelector("#cardUsername")
        this.profileUsername=document.querySelector("#profileUsername")
        this.profilePassword=document.querySelector("#profilePassword")
        this.profileEmail=document.querySelector("#profileEmail")
        this.profileBth=document.querySelector("#profileBth")
        this.profileGender=document.querySelector("#profileGender")
        this.frmChangePassword=document.querySelector("#frmChangePassword")
        //Selects das Preferências
        this.selectDo=document.querySelector("#selectDo")
        this.selectDifficulty=document.querySelector("#selectDifficulty")
        this.selectDuration=document.querySelector("#selectDuration")
        this.selectResources=document.querySelector("#selectResources")
        this.selectFavorites=document.querySelector("#selectFavorites")
        this.frmPreferences=document.querySelector("#frmPreferences")
        //Funções
        this.updateStatusUI();
        this.checkType();
        this.fillInData();
        this.changePassword();
        this.changePreferences();
        this.bindLogout();

    }
       /**
     * Função que verifica a autenticação
     */
        updateStatusUI() {
            if (this.userController.isLogged()) {
            } else {
                location.href="login.html"
            }
        }
        /**Função que irá verificar o tipo de utilizador */
        checkType(){
            if(!this.userController.isAdmin()){
                this.buttonManager.style.visibility = 'hidden'
            }
        }
        /**Submeter nova password */
        changePassword() {
            this.frmChangePassword.addEventListener('submit', event => {
                event.preventDefault();
                this.result=confirm("Confirma a alteração?")
                if(this.result==true){
                    try {
                        this.userController.changePassword(this.profilePassword.value);
                    } catch{}
                }
            })
        }

        /**Função que irá permitir preencher os campos de dados */
        fillInData(){
            const dates=(this.userController.myData())
            this.cardUsername.innerHTML=dates[0];
            this.profileUsername.value=dates[0];
            this.profilePassword.value=dates[1];
            this.profileEmail.value=dates[2];
            this.profileBth.value=dates[3];
            this.profileGender.value=dates[4];
            this.selectDo.value=dates[5];
            this.selectDifficulty.value=dates[6];
            this.selectDuration.value=dates[7];
            this.selectResources.value=dates[8];
            this.selectFavorites.value=dates[9];
        }
        //Função que irá permitir alterar os dados das preferencias
        changePreferences(){
            this.frmPreferences.addEventListener("submit",(event)=>{
                event.preventDefault()
                this.result=confirm("Confirma a alteração?")
                if(this.result==true){
                     this.userController.changePreferences(this.selectDo.value,this.selectDifficulty.value,this.selectDuration.value,this.selectResources.value,this.selectFavorites.value)
                    } 
            })
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