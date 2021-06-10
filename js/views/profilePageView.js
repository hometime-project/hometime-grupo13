import UserController from '../controllers/userController.js'
import activityController from '../controllers/activitiesController.js'

export default class UserView {
    constructor() {
        this.userController = new UserController();
        this.activityController= new activityController();
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
        //Estatisticas
        this.sectionStactics=document.querySelector("#sectionStatics")
        //Ranking
        this.sectionRanking=document.querySelector("#tableRanking")
        //Nível e Coins
        this.coinsProfile=document.querySelector("#coinsProfile")
        this.levelProfile=document.querySelector("#levelProfile")
        //Funções
        this.updateStatusUI();
        this.checkType();
        this.fillInData();
        this.changePassword();
        this.changePreferences();
        this.bindLogout();
        this.seeStatistics();
        this.tableRanking();
        this.gamifyElements();
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
    //Preencher as estatisticas
    seeStatistics(){
        this.list=this.userController.getUser()
        this.resultList=this.activityController.getTotal(this.list.alreadySee)
        this.category=["Total","Bricolage","Culinária","Desporto","Línguas","Viajar"]
        this.first=0
        this.second=1
        this.content=""
        for (const category of this.category) {
            if(this.resultList[this.first]==0){
                this.numb=0
                this.first+=2
                this.second+=2
                this.content+=` <div class="form-group row mb-3">
                <label for="" class="col-sm-2 col-form-label">${category} </label>
                <div class="col-sm-10 align-self-center">
                  <div class="progress">
                    <div class="progress-bar bg-success" role="progressbar" style="width: ${this.numb}%" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">${this.numb}%</div>
                  </div>
                </div>
              </div>`
            }
            else if(this.resultList[this.first]>this.resultList[this.second]){
                this.numb=100
                this.first+=2
                this.second+=2
                this.content+=` <div class="form-group row mb-3">
                <label for="" class="col-sm-2 col-form-label">${category} </label>
                <div class="col-sm-10 align-self-center">
                  <div class="progress">
                    <div class="progress-bar bg-success" role="progressbar" style="width: ${this.numb}%" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">${this.numb}%</div>
                  </div>
                </div>
              </div>`
            }
            else{
            this.numb=(+this.resultList[this.first]*100)/(+this.resultList[this.second])
            this.first+=2
            this.second+=2
            this.content+=` <div class="form-group row mb-3">
                <label for="" class="col-sm-2 col-form-label">${category} </label>
                <div class="col-sm-10 align-self-center">
                  <div class="progress">
                    <div class="progress-bar bg-success" role="progressbar" style="width: ${this.numb}%" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">${this.numb}%</div>
                  </div>
                </div>
              </div>`
            }
        }
        this.sectionStactics.innerHTML=` <h3>Estatisticas</h3>`+this.content
    }
    tableRanking(){
        this.myUser=this.userController.getUser()
        this.orderUser=this.userController.listRanking()
        this.sectionRanking.innerHTML=`<h3>Ranking</h3>`
        this.myTable=`<table class="table table-striped">
        <thead>
          <tr>
            <th scope="col">Posição</th>
            <th scope="col">Utilizador</th>
            <th scope="col">Pontuação(XP)</th>
          </tr>
        </thead>
        <tbody>`
        this.position=1
        for (const item of this.orderUser) {
            if(item.username==this.myUser.username){
                this.myTable+=` <tr class="bg-danger">
                <th scope="row">${this.position}</th>
                <td><img src="../img/Imagem 15.png" width=35px></img> ${item.username}</td>
                <td>${item.xp}</td>
              </tr>`
              this.position++
            }
            else{
                this.myTable+=` <tr>
                <th scope="row">${this.position}</th>
                <td><img src="../img/Imagem 15.png" width=35px></img> ${item.username}</td>
                <td>${item.xp}</td>
              </tr>`
              this.position++
            }
        }
        this.myTable+=`</tbody>
        </table>`
        this.sectionRanking.innerHTML+=this.myTable
    }
    
    gamifyElements(){
        this.myUser=this.userController.getUser()
        this.coinsProfile.innerHTML=`<i class="fas fa-coins"></i> ${this.myUser.coins}`
        this.mathh=+this.myUser.xp/1000
        this.mathh2=Math.trunc(this.mathh)
        this.mathh3=(this.mathh2+1)*1000
        this.levelProfile.innerHTML=this.mathh2+1
        this.mathh4=+this.mathh3-1000
        this.graphic(this.mathh3,this.myUser.xp,this.mathh4)
    }
    graphic(max,xp,min){
    this.myGauge = Gauge(document.getElementById("gauge-demo"),{
        dialRadius: 40,
        dialStartAngle: 135,
        dialEndAngle: 45,
        value: xp,
        max: max,
        min: min,
        valueDialClass: "value",
        valueClass: "value-text",
        dialClass: "dial",
        gaugeClass: "gauge",
        showValue: true,
        gaugeColor: null,
    })
    }
  
}