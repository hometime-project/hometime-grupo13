import StoreController from '../controllers/storeController.js'
import UserController from '../controllers/userController.js'

export default class AdminStorePageView {
    constructor() {
        this.storeController = new StoreController();
        this.userController = new UserController();
        this.imageStore=document.querySelector("#imageStore")
        this.levelStore=document.querySelector("#levelStore")
        this.coinsStore=document.querySelector("#coinsLevel")
        this.frmStore=document.querySelector("#frmStore")
        this.btnSubmit=document.querySelector("#updateProduct")
        this.table=document.querySelector("table")
        this.updateStatusUI()
        this.bindRegisterForm()
        this.readData()
    }
    updateStatusUI() {
        if (this.userController.isLogged()) {
        } else {
            location.href="login.html"
        }
    }
    bindRegisterForm() {
        this.frmStore.addEventListener('submit', (event) => {
            event.preventDefault();
            if(this.btnSubmit.value=="Adicionar Produto"){
                this.storeController.register(this.imageStore.value,this.levelStore.value,this.coinsStore.value);
                setTimeout(() => { location.reload() }, 1000);
                this.readData()
            }
        })
    }

    readData(){
        this.datas=this.storeController.getProducts()
        this.myTable(this.datas)
    }
    //Função que preenche a tabela com os dados do utilizador
    myTable(datas){
        this.begin=` <tr>
        <th scope="col">#</th>
        <th scope="col">Imagem(Url):</th>
        <th scope="col">Nível(Disponibilização):</th>
        <th scope="col">Coins:</th>
        <th scope="col">Ações:</th>
      </tr>`
       this.id=0
        for (const data of datas) {
            this.begin+=`<tr><td>${this.id}</td><td>${data.imageStore}</td><td>${data.levelStore}</td><td>${data.coinsStore}</td><td><button class="btn btn-danger" id="dellAccount">Apagar</button></td></tr>`
            this.id++
        }
        this.table.innerHTML=this.begin
        this.dellProduct()
    }
    dellProduct(){
        this.dellButton=document.querySelectorAll("#dellAccount")
        for (const dellButton1 of this.dellButton) {
            dellButton1.addEventListener("click",(event)=>{
                this.confirm=confirm('Confirma a eliminação?')
                if(this.confirm==true){
                this.storeController.dellProduct(event.target.parentNode.parentNode.cells[1].innerHTML)
                this.readData()}
                 event.preventDefault();  
            })
        }
    }
    
        
    
}