import UserController from '../controllers/userController.js'

export default class UserView {
    constructor() {
        this.userController = new UserController();
        this.table=document.querySelector("table");
        this.frmAdminUser=document.querySelector("#frmAdminUser")
        this.rAdminUsername=document.querySelector("#adminUsername")
        this.rAdminPassword=document.querySelector("#adminPassword")
        this.rAdminPassword2=document.querySelector("#adminPassword2")
        this.rAdminEmail=document.querySelector("#adminEmail")
        this.rAdminDataBth=document.querySelector("#adminDataBth")
        this.rAdminGender=document.querySelector("#adminGender")
        this.registerMessage = document.querySelector('#registerMessage')
        this.updateStatusUI();
        this.bindRegisterForm();
        this.myTable();
        this.dellButton=document.querySelectorAll("#dellAccount")
        this.dellUser();
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
    //Função que preenche a tabela com os dados do utilizador
    myTable(){
        this.datas=this.userController.getUsers()
        this.begin=` <tr>
        <th scope="col">#</th>
        <th scope="col">Username:</th>
        <th scope="col">Password:</th>
        <th scope="col">Email:</th>
        <th scope="col">Data de Aniversário:</th>
        <th scope="col">Género:</th>
        <th scope="col">Ações:</th>
      </tr>`
       this.id=0
        for (const data of this.datas) {
            this.begin+=`<tr><td>${this.id}</td><td>${data.username}</td><td>${data.password}</td><td>${data.email}</td><td>${data.databth}</td><td>${data.gender}</td><td><button class="btn btn-dark me-md-2">Editar</button><button class="btn btn-danger" id="dellAccount">Apagar</button></td></tr>`
            this.id++
        }
        this.table.innerHTML=this.begin
    }
    //Função que irá que registar novo utilizador
    bindRegisterForm() {
        this.frmAdminUser.addEventListener('submit', event => {
            event.preventDefault();
            try {
                if (this.rAdminPassword.value !== this.rAdminPassword2.value) {
                    throw Error('Password and Confirm Password are not equal');
                }
                this.userController.register(this.rAdminUsername.value, this.rAdminPassword.value,this.rAdminEmail.value,this.rAdminDataBth.value,this.rAdminGender.value);
                this.displayMessage('register', 'User registered with success!', 'success');
                // Espera 1 seg. antes de fazer refresh à pagina
                // Assim o utilizador pode ver a mensagem na modal antes de a mesma se fechar
                setTimeout(() => { location.reload() }, 1000);
                this.myTable()
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
    //Função que irá permitir apagar a conta
    dellUser(){
        for (const dellButton1 of this.dellButton) {
            dellButton1.addEventListener("click",function(event){
                this.myUser=this.parentNode.parentNode.cells[1].innerHTML
                this.userController.dellUser(this.myUser)
                 event.preventDefault();  
            })
        }
    }
}