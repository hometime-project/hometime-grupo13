import UserController from '../controllers/userController.js'
import activityController from '../controllers/activitiesController.js'

export default class ActivityPageView {
    constructor() {
        this.userController = new UserController();
        this.activityController= new activityController();
        this.imageActivity=document.querySelector("#imageActivity")
        this.titleActivity=document.querySelector("#titleActivity")
        this.categoryActivity=document.querySelector("#categoryActivity")
        this.nLikes=document.querySelector("#nLikes")
        this.descriptionActivity=document.querySelector("#descriptionActivity")
        this.resourcesActivity=document.querySelector("#resourcesActivity")
        this.durationActivity=document.querySelector("#durationActivity")
        this.toDo=document.querySelector("#todo")
        this.yearLaunch=document.querySelector("#yearLaunch")
        //Botão Reproduzir 
        this.buttonPlay=document.querySelector("#buttonPlay")
        this.placeVideo=document.querySelector("#placeVideo")
        //Botão Like
        this.buttonLike=document.querySelector("#buttonLike")
        //Comentários
        this.catalogComment=document.querySelector("#catalogComment")
        this.frmComment=document.querySelector("#formNewComment")
        this.commentTitle=document.querySelector("#commentTitle")
        this.commentBody=document.querySelector("#commentBody")
        this.updateStatusUI();
        this.getInfo();
        this.check();
        this.playActivity();
        this.Likes();
        this.createComment();
        this.renderComments();
       
        
    }
    //Função que atualiza a visibilidade dos botões de acordo com a autenticação
    updateStatusUI() {
        if (this.userController.isLogged()) {
        } else {
            location.href="login.html"
        }
    }
    //Preencher a página de detalhes da atividade
    getInfo(){
        this.activity1=this.activityController.getInfo()
        this.imageActivity.src=this.activity1.image 
        this.titleActivity.innerHTML=this.activity1.name 
        this.categoryActivity.innerHTML=this.activity1.categoryActivity
        this.nLikes.innerHTML=`<i class="fas fa-thumbs-up"></i> ${this.activity1.likes.length}`
        this.descriptionActivity.innerHTML=this.activity1.description 
        this.resourcesActivity.innerHTML=this.activity1.resourcesActivity
        this.durationActivity.innerHTML=this.activity1.durationActivity
        this.toDo.innerHTML=this.activity1.doActivity 
        this.yearLaunch.innerHTML=this.activity1.year

    }
    //Reproduzir Atividade
    playActivity(){
        this.buttonPlay.addEventListener("click",(event)=>{
            if(this.buttonPlay.innerHTML==`<i class="fas fa-play"></i> Reproduzir`){
            this.userController.addSeeList(this.activity1.name,this.activity1.coinsActivity,this.activity1.xpActivity)
            this.buttonPlay.innerHTML=`<i class="fas fa-sync-alt"></i> Recomeçar`
            this.placeVideo.innerHTML=`
            <iframe
                width="100%"
                height="650px"
                style="border-radius:5px"
                src="${this.activity1.video}">
            </iframe>`
            }
            else{
                this.placeVideo.innerHTML=`
                <iframe
                    width="100%"
                    height="650px"
                    style="border-radius:5px"
                    src="${this.activity1.video}">
                </iframe>` 
            }
        })
    }
    check(){
        this.myUser=this.userController.getUser()
        if(this.myUser.alreadySee.some(element=>element==this.activity1.name)==true){
            this.buttonPlay.innerHTML=`<i class="fas fa-sync-alt"></i> Recomeçar`
        }
        if(this.activity1.likes.some(element=>element==this.myUser.username)==true){
            this.buttonLike.innerHTML=`<i class="fas fa-thumbs-down"></i>`
        }
    }
    Likes(){
        this.buttonLike.addEventListener("click",(event)=>{
            if(this.buttonLike.innerHTML=='<i class="fas fa-thumbs-up"></i>'){
            this.myUser=this.userController.getUser()
            this.activityController.giveLike(this.myUser.username,this.activity1.name)
            this.buttonLike.innerHTML=`<i class="fas fa-thumbs-down"></i>`
            this.getInfo()
            }
            else{
                this.myUser=this.userController.getUser()
                this.activityController.dellLike(this.myUser.username,this.activity1.name)
                this.buttonLike.innerHTML=`<i class="fas fa-thumbs-up"></i>`
                this.getInfo()
            }
        })
    }
    //Renderizar os comentários 
    renderComments(){
        this.resulta=""
        this.activity1=this.activityController.getInfo()
        for (const comment of this.activity1.comments) {
            this.resulta+=`
            <div class="col-sm-3">
            <div class="card mb-3" style="max-width: 25rem;color: aliceblue;border:none;border-radius: 5px;">
              <div class="card-header" style="background-color: #1498D6;"><img src="${comment.image}" style="width: 40px;"></img><span style="font-weight: bold;" class="me-md-1"> ${comment.name}</span></div>
              <div class="card-body" style="background-color: #1498D6;">
                <h5 class="card-title text-center">${comment.title}</h5>
                <p class="card-text">${comment.body}</p>
              </div>
            </div>
          </div> 
            `
        }
        this.catalogComment.innerHTML=this.resulta
    }
    //Criar comentário 
    createComment(){
        this.frmComment.addEventListener("submit",(event)=>{
            this.activityController.createComment(this.activity1.name,this.myUser.username,this.commentTitle.value,this.commentBody.value)
            this.frmComment.reset()
            this.renderComments()
            event.preventDefault()

        })
    }

}

