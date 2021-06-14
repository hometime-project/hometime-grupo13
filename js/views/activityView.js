import UserController from '../controllers/userController.js'
import activityController from '../controllers/activitiesController.js'

export default class ActivityView {
    constructor() {
        this.userController = new UserController();
        this.activityController= new activityController();
        // Atualiza botões tendo em conta se o user está autenticado ou não
        this.catalog=document.querySelector("#myCatalog")
        this.buttonSeeAll=document.querySelector("#buttonAll")
        this.buttonsCategory=document.querySelectorAll("#buttonCategory")
        this.buttonPreferences=document.querySelector("#foryou")
        this.selectDo=document.querySelector("#selectDo")
        this.selectDifficulty=document.querySelector("#selectDifficulty")
        this.selectDuration=document.querySelector("#selectDuration")
        this.selectResources=document.querySelector("#selectResources")
        this.selectFavorites=document.querySelector("#selectFavorites")
        this.selectOrder=document.querySelector("#selectOrder")
        this.list=[]
        this.updateStatusUI();
        //Preencher catalogo
        this.getData();
        //Procurar por categoria "ver todas"
        this.seeAll();
        //Procurar pelas restantes categorias
        this.seeCategory();
        //Apresentar as atividadades de acordo com as suas preferencias
        this.seePreferences()
        //Filtrar Atividades
        this.buttonFilter=document.querySelector("#setfilter")
        this.aplyFilter();
        //Ordernar Atividades
        this.orderActivity();
        
    }
    
    //Função que atualiza a visibilidade dos botões de acordo com a autenticação
    updateStatusUI() {
        if (this.userController.isLogged()) {
        } else {
            location.href="login.html"
        }
    }
    getData(){
        this.datas=this.activityController.getActivities()
        this.renderCatalog(this.datas)
    }
    renderCatalog(datas){
        this.list=datas
        this.catalogContent=""
        for (const data of datas) {
            this.catalogContent+=`<div class="mt-4">
            <div class="card text-center " style="width: 15rem;background-color: white;border-color:#00357a">
              <img src="${data.image}" class="card-img-top align-self-center mt-1" style="width: 175px;">
              <button style="font-weight: bold;font-family: QuickSand; color:#00357a;font-size: 19px;" class="btn stretched-link" name="${data.name}" id="buttonSeeDetails">${data.name}</button>
              <hr>
              <div class="d-flex justify-content-around" style="color:#00357a;font-family:QuickSand"><p>Categoria: ${data.categoryActivity}</p><p><i class="fas fa-thumbs-up"></i> ${data.likes.length}</p></div>   
              </div>
          </div>`
        }
        this.catalog.innerHTML=this.catalogContent
        this.seeDetails()
    }
    seeAll(){
        this.buttonSeeAll=document.querySelector("#buttonAll")
        this.buttonSeeAll.addEventListener("click",(event)=>{
            event.preventDefault()
            this.getData()
        })
    }
    seeCategory(){
        this.buttonsCategory=document.querySelectorAll("#buttonCategory")
        for (const buttonC of this.buttonsCategory) {
            buttonC.addEventListener("click",(event)=>{
               event.preventDefault()
               this.data=this.activityController.seeCategory(buttonC.name)
               this.renderCatalog(this.data)

            })
        }
    }
    seePreferences(){
        this.buttonPreferences.addEventListener("click",(event)=>{
            this.detail=this.userController.getUser()
            this.catalogPreferences=this.activityController.findPreferences(this.detail.do,this.detail.difficulty,this.detail.duration,this.detail.resources,this.detail.favorites)
            this.renderCatalog(this.catalogPreferences);
        })
    }
    seeDetails(){
        for (const button of document.querySelectorAll("#buttonSeeDetails")) {
            button.addEventListener("click",(event)=>{
                this.activityController.saveName(button.name)
                location.href="ativitypage.html"
            })
        }
    }
    aplyFilter(){
        this.buttonFilter.addEventListener("click",(event)=>{
            this.myResult=this.activityController.aplyFilter(this.selectDo.value,this.selectDifficulty.value,this.selectDuration.value,this.selectResources.value,this.selectFavorites.value)
            this.renderCatalog(this.myResult)
        })
    }
    orderActivity(){
        this.selectOrder.addEventListener("change",(event)=>{
            if(this.selectOrder.value=="A-Z"){
                this.list.sort((a, b) => (a.name > b.name) ? 1 : -1)
                this.renderCatalog(this.list)
            }
            else if(this.selectOrder.value=="Z-A"){
                this.list.sort((a, b) => (a.name < b.name) ? 1 : -1)
                this.renderCatalog(this.list)
            }
            else if(this.selectOrder.value=="UpLike"){
                this.list.sort((a, b) => (a.likes.length > b.likes.length) ? 1 : -1)
                this.renderCatalog(this.list)

            }
            else if(this.selectOrder.value=="DownLike"){
                this.list.sort((a, b) => (a.likes.length < b.likes.length) ? 1 : -1)
                this.renderCatalog(this.list)
            }
            else if(this.selectOrder.value=="UpLevel"){
                this.hard=this.list.filter(listt=>listt.difficultyLevel=="Díficil")
                this.medium=this.list.filter(listt=>listt.difficultyLevel=="Médio")
                this.easy=this.list.filter(listt=>listt.difficultyLevel=="Fácil")
                if(this.medium.length!=0){
                    for (const medium of this.medium) {
                        this.easy.push(medium)
                    }
                }
                if(this.hard.length!=0){
                    for (const hard of this.hard) {
                        this.easy.push(hard)
                    }
                }
                this.renderCatalog(this.easy)
            }
            else if(this.selectOrder.value=="DownLevel"){
                this.hard=this.list.filter(listt=>listt.difficultyLevel=="Díficil")
                this.medium=this.list.filter(listt=>listt.difficultyLevel=="Médio")
                this.easy=this.list.filter(listt=>listt.difficultyLevel=="Fácil")
                if(this.medium.length!=0){
                    for (const medium of this.medium) {
                        this.hard.push(medium)
                    }
                }
                if(this.easy.length!=0){
                    for (const easy of this.easy) {
                        this.hard.push(easy)
                    }
                }
                this.renderCatalog(this.hard)
            }
        })
    }

}