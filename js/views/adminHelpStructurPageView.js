import helpStructurController from '../controllers/helpStructurController.js'
import UserController from '../controllers/userController.js'

export default class AdminHelpStructurView {
    constructor(){
        this.helpStructurController = new helpStructurController();
        this.userController= new UserController();
        this.frmHelp=document.querySelector("#frmHelp");
        this.nameHelp=document.querySelector("#nameHelp");
        this.imageHelp=document.querySelector("#imageHelp");
        this.phoneHelp=document.querySelector("#phoneHelp");
        this.latHelp=document.querySelector("#latHelp");
        this.longHelp=document.querySelector("#longHelp");
        this.streetHelp=document.querySelector("#streetHelp");
        this.distritHelp=document.querySelector("#distritHelp");
        this.openhHelp=document.querySelector("#openhHelp");
        this.dayHelp=document.querySelector("#dayHelp")
        this.btnSubmit=document.querySelector("#addHelp")
        this.table=document.querySelector("table")
        this.group=document.querySelector("#groupBtn")
        this.updateStatusUI();
        this.checkAdmin();
        this.readData();
        this.registerStructur();
} 
updateStatusUI() {
    if (this.userController.isLogged()) {
    } else {
        location.href="login.html"
    }
}
checkAdmin(){
    if(this.userController.isAdminManager()==false){
        location.href="profilepage.html"
    }
}
readData(){
    this.datas=this.helpStructurController.getStructurs()
    this.myTable(this.datas)
}
myTable(datas){
        this.begin=` <tr>
        <th scope="col">#</th>
        <th scope="col">Nome:</th>
        <th scope="col">Contacto:</th>
        <th scope="col">Latitude:</th>
        <th scope="col">Longitude:</th>
        <th scope="col">Rua:</th>
        <th scope="col">Distrito:</th>
        <th scope="col">Horário:</th>
        <th scope="col">Dias:</th>
        <th scope="col">Ações:</th>
      </tr>`
       this.id=0
        for (const data of datas) {
            this.begin+=`<tr><td>${this.id}</td><td>${data.name}</td><td>${data.phone}</td><td>${data.lat}</td><td>${data.long}</td><td>${data.street}</td><td>${data.distrit}</td><td>${data.hours}</td><td>${data.days}</td><td><button class="btn btn-dark me-md-2 mb-2" id="editStructur">Editar</button><button class="btn btn-danger mb-2" id="dellStructur">Apagar</button></td></tr>`
            this.id++
        }
        this.table.innerHTML=this.begin
        this.editStructur()
        this.dellStructur()
}
editStructur(){
    this.btnEdit=document.querySelectorAll("#editStructur")
    for (const editButton of this.btnEdit) {
        editButton.addEventListener("click",(event)=>{
            this.nameOfStructur=event.target.parentNode.parentNode.cells[1].innerHTML
            this.getDetailStructur=this.helpStructurController.getStructur(this.nameOfStructur);
            this.nameHelp.value=this.getDetailStructur.name
            this.imageHelp.value=this.getDetailStructur.image 
            this.phoneHelp.value=this.getDetailStructur.phone 
            this.latHelp.value=this.getDetailStructur.lat 
            this.longHelp.value=this.getDetailStructur.long 
            this.openhHelp.value=this.getDetailStructur.hours
            this.streetHelp.value=this.getDetailStructur.street
            this.distritHelp.value=this.getDetailStructur.distrit
            this.dayHelp.value=this.getDetailStructur.days
            if(this.btnSubmit.value=="Adicionar Estrutura"){
                this.btnSubmit.value="Atualizar Estrutura"
                this.group.innerHTML=`<a class="btn btn-secondary mt-2 mb-3" style="font-weight: bold;" href="adminHelpStrucuturPage.html">Cancelar</a>`+this.group.innerHTML
            }
            event.preventDefault()
        })
    }
}
dellStructur(){
    this.dellButtons=document.querySelectorAll("#dellStructur")
    for (const dellButton of this.dellButtons) {
        dellButton.addEventListener("click",(event)=>{
            this.confirm=confirm('Confirma a eliminação?')
            if(this.confirm==true){
            this.helpStructurController.dellStructur(event.target.parentNode.parentNode.cells[1].innerHTML)
            setTimeout(()=>{location.reload()}, 500)
        }
             event.preventDefault();  
        })
    }
}
registerStructur() {
    this.frmHelp.addEventListener('submit', event => {
        event.preventDefault();
        if(this.btnSubmit.value=="Adicionar Estrutura"){
            this.helpStructurController.register(this.nameHelp.value, this.imageHelp.value,this.phoneHelp.value,this.latHelp.value,this.longHelp.value,this.streetHelp.value,this.distritHelp.value,this.openhHelp.value,this.dayHelp.value);
            this.readData()
        }
        else{
            this.confirm=confirm("Confirma as alterações?")
            if(this.confirm==true){
                this.helpStructurController.editStructur(this.nameHelp.value, this.imageHelp.value,this.phoneHelp.value,this.latHelp.value,this.longHelp.value,this.streetHelp.value,this.distritHelp.value,this.openhHelp.value,this.dayHelp.value);
                setTimeout(()=>{location.reload()}, 500)
               }
        }
    })
}
checkAdmin(){
    if(this.userController.isAdminManager()==false){
        location.href="profilepage.html"
    }
}
}