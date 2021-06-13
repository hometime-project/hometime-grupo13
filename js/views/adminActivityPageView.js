import activityController from '../controllers/activitiesController.js'
import UserController from '../controllers/userController.js'

export default class adminActivityView {
    constructor(){
    this.userController = new UserController();
    this.activityController= new activityController();
    this.updateStatusUI();
    this.checkAdmin();
    this.table=document.querySelector("table")
    this.readData()
    //Elementos do Formulário
    this.frmActivity=document.querySelector("#frmRegisterActivity")
    this.nameActivity=document.querySelector("#nameActivity")
    this.pictureActivity=document.querySelector("#pictureActivity")
    this.videoActivity=document.querySelector("#videoActivity")
    this.descriptionActivity=document.querySelector("#descriptionActivity")
    this.yearActivity=document.querySelector("#yearActivity")
    this.doActivity=document.querySelector("#doActivity")
    this.difficultyLevel=document.querySelector("#difficultyLevel")
    this.durationActivity=document.querySelector("#durationActivity")
    this.resourcesActivity=document.querySelector("#resourcesActivity")
    this.categoryActivity=document.querySelector("#categoryActivity")
    this.coinsActivity=document.querySelector("#coinsActivity")
    this.xpActivity=document.querySelector("#xpActivity")
    this.registerMessage = document.querySelector('#registerMessage')
    this.registerActivity()
    //Botões da Tabela
    this.dellButtons=document.querySelectorAll("#dellActivity")
    this.dellActivity();
    this.editButtons=document.querySelectorAll("#editActivity")
    this.editActivity();
    }
    //Função que verifica a autenticação
    updateStatusUI() {
        if (this.userController.isLogged()) {
        } else {
            location.href="login.html"
        }
    }
    //Função que irá preencher a tabela com dados
    readData(){
        this.datas=this.activityController.getUsers()
        this.myTable(this.datas)
    }
    //Função que preenche a tabela com os dados do utilizador
    myTable(datas){
        this.begin=` <tr>
        <th scope="col">#</th>
        <th scope="col">Título:</th>
        <th scope="col">Vídeo(URL):</th>
        <th scope="col">Desempenhar:</th>
        <th scope="col">Dificuldade:</th>
        <th scope="col">Duração:</th>
        <th scope="col">Recursos:</th>
        <th scope="col">Categoria:</th>
        <th scope="col">Ações:</th>
      </tr>`
       this.id=0
        for (const data of datas) {
            this.begin+=`<tr><td>${this.id}</td><td>${data.name}</td><td>${data.video}</td><td>${data.doActivity}</td><td>${data.difficultyLevel}</td><td>${data.durationActivity}</td><td>${data.resourcesActivity}</td><td>${data.categoryActivity}</td><td><button class="btn btn-dark me-md-2 mb-2" id="editActivity">Editar</button><button class="btn btn-danger mb-2" id="dellActivity">Apagar</button></td></tr>`
            this.id++
        }
        this.table.innerHTML=this.begin
    }
    //Função que permite registar nova atividade
    registerActivity() {
        this.frmActivity.addEventListener('submit', event => {
            event.preventDefault();
            this.btnSubmit=document.querySelector("#addActivity").value
            if(this.btnSubmit=="Adicionar Atividade"){
            try { 
                this.activityController.register(this.nameActivity.value, this.pictureActivity.value,this.videoActivity.value,this.descriptionActivity.value,this.yearActivity.value,this.doActivity.value,this.difficultyLevel.value,this.durationActivity.value,this.resourcesActivity.value,this.categoryActivity.value,this.coinsActivity.value,this.xpActivity.value);
                this.displayMessage('register', 'Activity registered with success!', 'success');
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
                this.activityController.editActivity(this.nameActivity.value,this.pictureActivity.value,this.videoActivity.value,this.descriptionActivity.value,this.yearActivity.value,this.doActivity.value,this.difficultyLevel.value,this.durationActivity.value,this.resourcesActivity.value,this.categoryActivity.value,this.coinsActivity.value,this.xpActivity.value);
                setTimeout(()=>{location.reload()}, 500)
               }
            }
        })
    }
    //Emite mensagem de sucesso ou insucesso
    displayMessage(event, text, type) {
        const message = `<div class="alert alert-${type}" role="alert">${text}</div>`;
        event == 'login' ? this.loginMessage.innerHTML = message : this.registerMessage.innerHTML = message
    }
    //Função que irá permitir apagar uma atividade especifica
    dellActivity(){
        for (const dellButton of this.dellButtons) {
            dellButton.addEventListener("click",(event)=>{
                this.confirm=confirm('Confirma a eliminação?')
                if(this.confirm==true){
                this.activityController.dellActivity(event.target.parentNode.parentNode.cells[1].innerHTML)
                this.readData()
            }
                 event.preventDefault();  
            })
        }
    }
    //Função que irá permitir reeditar uma atividade
    editActivity(){
        for (const editButton of this.editButtons) {
            editButton.addEventListener("click",(event)=>{
                this.nameOfActivity=event.target.parentNode.parentNode.cells[1].innerHTML
                this.getDetailActivity=this.activityController.getDetailActivity(this.nameOfActivity);
                this.nameActivity.value=this.getDetailActivity[0].name 
                this.pictureActivity.value=this.getDetailActivity[0].image
                this.videoActivity.value=this.getDetailActivity[0].video
                this.descriptionActivity.value=this.getDetailActivity[0].description
                this.yearActivity.value=this.getDetailActivity[0].year
                this.doActivity.value=this.getDetailActivity[0].doActivity
                this.difficultyLevel.value=this.getDetailActivity[0].difficultyLevel
                this.durationActivity.value=this.getDetailActivity[0].durationActivity
                this.resourcesActivity.value=this.getDetailActivity[0].resourcesActivity
                this.categoryActivity.value=this.getDetailActivity[0].categoryActivity
                this.coinsActivity.value=this.getDetailActivity[0].coinsActivity
                this.xpActivity.value=this.getDetailActivity[0].xpActivity
                this.nameActivity.disabled='true';
                this.btnSubmitt=document.querySelector("#addActivity")
                if(this.btnSubmitt.value=="Adicionar Atividade"){
                    this.btnSubmitt.value="Atualizar Dados"
                    this.group=document.querySelector("#groupButtons")
                    this.group.innerHTML=`<a class="btn btn-secondary mt-2 mb-3" style="font-weight: bold;" href="adminActivityPage.html">Cancelar</a>`+this.group.innerHTML
                }
                event.preventDefault()
            })
        }
    }
    checkAdmin(){
        if(this.userController.isAdminManager()==false){
            location.href="profilepage.html"
        }
    }

} 