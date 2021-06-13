import UserController from '../controllers/userController.js'
import helpStructurController from '../controllers/helpStructurController.js'
export default class HelpStruturView {
    constructor() {
        this.userController = new UserController();
        this.helpStructurController = new helpStructurController();
        this.resetBtnFilter=document.querySelector("#resetFilter")
        this.selectTime=document.querySelector("#selectTime")
        this.selectDistrit=document.querySelector("#selectDistrit")
        this.selectDay=document.querySelector("#selectDay")
        this.aplyBtnFilter=document.querySelector("#aplyFilter")
        // Atualiza botões tendo em conta se o user está autenticado ou não
        this.updateStatusUI();
        this.mapping()
        this.resetFilter();
        this.giveTime();
        this.aplyFilter();
    }

    /**
     * Função que atualiza a visibilidade dos botões de acordo com a autenticação
     */
    updateStatusUI() {
        if (this.userController.isLogged()) {
        } else {
            location.href="login.html"
        }
    }
    mapping(){
        const myLocations=this.helpStructurController.getStructurs()
        this.map(myLocations)
    }
    map(myLocations){
        const uluru = { lat: 39.660112, lng: -9.5355574 };
        const map = new google.maps.Map(
        document.getElementById("map"),{zoom: 6.5,center: uluru, mapTypeControlOptions: {
            mapTypeIds: ["roadmap", "satellite", "hybrid", "terrain", "styled_map"],},}
        )
        for (const item of myLocations) {
            const marker=new google.maps.Marker({
                position: { lat: (+item.lat), lng: (+item.long) },
                map,
                animation: google.maps.Animation.DROP,
                title: item.name,
              });
              const contentString =
              '<div id="content" style="color:#00357a;font-family:QuickSand">' +
              '<div id="siteNotice">' +
              "</div>" +
              `<h1 id="firstHeading" class="firstHeading">${item.name}</h1>` +
              '<div id="bodyContent">' +
              `<img src="${item.image}" height="100px"></img>` +
              `<p><i class="fas fa-phone-alt"></i> <span style="font-weight: bold;">Contacto:</span> ${item.phone}</p>` +
              `<p><i class="fas fa-location-arrow"></i> <span style="font-weight: bold;">Morada:</span> ${item.street}</p>` +
              `<p><i class="fas fa-clock"></i> <span style="font-weight: bold;">Horário:</span> ${item.hours}(${item.days})</p>` +
              "</div>" +
              "</div>";
            const infowindow = new google.maps.InfoWindow({
                content: contentString,
              });
            marker.addListener("click", () => {
                infowindow.open(map, marker);
              });
        }
    }
    resetFilter(){
        this.resetBtnFilter.addEventListener("click",event=>{
            event.preventDefault()
            this.mapping()
        })
    }
    giveTime(){
        this.list=this.helpStructurController.getStructurs()
        this.myList=[]
        this.result=""
        for (const list of this.list) {
            if(!this.myList.some(element=>element==list.hours)){
                this.myList.push(list.hours)
            }
        }
        for (const myList of this.myList) {
          this.result+=`<option value="${myList}">${myList}</option>`  
        }
        this.selectTime.innerHTML=`<option selected value="">Horário</option>`+this.result
    }
    aplyFilter(){
        this.aplyBtnFilter.addEventListener("click",event=>{
            this.myResult=this.helpStructurController.aplyFilter(this.selectDistrit.value,this.selectTime.value,this.selectDay.value)
            this.map(this.myResult)
        })
    }
}