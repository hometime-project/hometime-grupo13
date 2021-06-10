import StoreController from '../controllers/storeController.js'
import UserController from '../controllers/userController.js'

export default class AdminStorePageView {
    constructor() {
        this.storeController = new StoreController();
        this.userController = new UserController();
        this.imageStore=document.querySelector("#imageStore")
        this.levelStore=document.querySelector("#levelStore")
        this.coinsStore=document.querySelecetor("#coinsLevel")
        this.frmStore=document.querySelector("#frmStore")
        this.btnSubmit=document.querySelector("#updateProduct")
        this.table=document.querySelector("table")
        this.updateStatusUI()
    }
    updateStatusUI() {
        if (this.userController.isLogged()) {
        } else {
            location.href="login.html"
        }
    }
   
        
        
    
}