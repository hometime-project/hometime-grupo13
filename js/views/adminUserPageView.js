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
        this.checkAdmin();
        this.bindRegisterForm();
        this.readData()
        this.dellButton=document.querySelectorAll("#dellAccount")
        this.editUserButton=document.querySelectorAll("#editUser")
        this.buttonChange=document.querySelectorAll("#buttonType")
        this.orderButton=document.querySelector("#newid2")
        this.buttonReset=document.querySelector("#resetTable")
        this.orderByName();
        this.dellUser();
        this.editUser();
        this.ChangeType();
        this.resetTable();
       
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
    readData(){
        this.datas=this.userController.getUsers()
        this.myTable(this.datas)
    }
    //Função que preenche a tabela com os dados do utilizador
    myTable(datas){
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
        for (const data of datas) {
            this.type=""
            if(data.type=="user"){
                this.type="Utilizador"
            }
            else{
                this.type="Administrador"
            }
            this.begin+=`<tr><td>${this.id}</td><td>${data.username}</td><td>${data.password}</td><td>${data.email}</td><td>${data.databth}</td><td>${data.gender}</td><td><button class="btn btn-warning me-md-2" id="buttonType">${this.type}</button><button class="btn btn-dark me-md-2" id="editUser">Editar</button><button class="btn btn-danger" id="dellAccount">Apagar</button></td></tr>`
            this.id++
        }
        this.table.innerHTML=this.begin
    }
    //Função que irá que registar novo utilizador
    bindRegisterForm() {
        this.frmAdminUser.addEventListener('submit', event => {
            event.preventDefault();
            this.btn=document.querySelector("#updateUser").value
            if(this.btn=="Adicionar Utilizador"){
            try { 
                if (this.rAdminPassword.value !== this.rAdminPassword2.value) {
                    throw Error('Password and Confirm Password are not equal');
                }
                this.userController.register(this.rAdminUsername.value, this.rAdminPassword.value,this.rAdminEmail.value,this.rAdminDataBth.value,this.rAdminGender.value);
                this.displayMessage('register', 'User registered with success!', 'success');
                // Espera 1 seg. antes de fazer refresh à pagina
                // Assim o utilizador pode ver a mensagem na modal antes de a mesma se fechar
                setTimeout(() => { location.reload() }, 1000);
                this.readData()
            } catch (err) {
                this.displayMessage('register', err, 'danger');
            }}
            else{
                this.confirm=confirm("Confirma as alterações?")
                if(this.confirm==true){
                this.userController.changeDataUser(this.rAdminUsername.value,this.rAdminEmail.value,this.rAdminDataBth.value,this.rAdminGender.value);
                setTimeout(()=>{location.reload()}, 500)
                }
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
            dellButton1.addEventListener("click",(event)=>{
                this.confirm=confirm('Confirma a eliminação?')
                if(this.confirm==true){
                this.userController.dellUser(event.target.parentNode.parentNode.cells[1].innerHTML)
                this.readData()}
                 event.preventDefault();  
            })
        }
    }
    //Função que irá permitir preencher o formulário para editar
    editUser(){
        for (const editButton of this.editUserButton) {
            editButton.addEventListener("click",(event)=>{
                this.rAdminUsername.value=event.target.parentNode.parentNode.cells[1].innerHTML;
                this.rAdminUsername.disabled="true";
                this.rAdminPassword.value=event.target.parentNode.parentNode.cells[2].innerHTML;
                this.rAdminPassword.disabled="true";
                this.rAdminPassword2.value=event.target.parentNode.parentNode.cells[2].innerHTML;
                this.rAdminPassword2.disabled="true";
                this.rAdminEmail.value=event.target.parentNode.parentNode.cells[3].innerHTML;
                this.rAdminDataBth.value=event.target.parentNode.parentNode.cells[4].innerHTML;
                this.rAdminGender.value=event.target.parentNode.parentNode.cells[5].innerHTML;
                this.btnn=document.querySelector("#updateUser")
                if(this.btnn.value=="Adicionar Utilizador"){
                    this.btnn.value="Atualizar Dados"
                    this.group=document.querySelector("#groupButtons")
                    this.group.innerHTML=`<a class="btn btn-secondary mt-2 mb-3" style="font-weight: bold;" href="adminUserPage.html">Cancelar</a>`+this.group.innerHTML
                }
                event.preventDefault()
            })
        }
    }
    //Função que irá permitir mudar o tipo de utilizador
    ChangeType(){
        for (const butttonChange of this.buttonChange) {
            butttonChange.addEventListener("click",(event)=>{
                this.type=""
                this.myUser=event.target.parentNode.parentNode.cells[1].innerHTML
                if(butttonChange.innerHTML=="Administrador"){
                    this.type="user";
                }
                else{
                    this.type="admin"
                }
                this.userController.changeType(this.type,this.myUser)
                setTimeout(()=>{location.reload()}, 50)
                event.preventDefault()
            })
        }
    }
    orderByName(){
        this.orderButton.addEventListener("click",(event)=>{
            this.finalOrder=this.userController.orderByName()
            this.myTable(this.finalOrder)
            event.preventDefault()
        })
    }
    resetTable(){
        this.buttonReset.addEventListener("click",()=>{
            this.readData()
        })
    } 
    checkAdmin(){
        if(this.userController.isAdminManager()==false){
            location.href="profilepage.html"
        }
    }  
        
    
}