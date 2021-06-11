import StoreModel from '../models/storeModel.js'

export default class StoreController {
    constructor() {
        this.store = localStorage.store ? JSON.parse(localStorage.store) : [];
    }
    register(imageStore,levelStore,coinsStore){
        if (!this.store.some(product => product.imageStore === imageStore)) {
            this.store.push(new StoreModel(imageStore, levelStore,coinsStore));
            localStorage.setItem('store', JSON.stringify(this.store))
        } else {
            alert(`Product with image "${imageStore}" already exists!`);
        }
    }
    getProducts(){
        this.list=this.store
        return this.list
    }
    dellProduct(name){
        this.store = this.store.filter(product => product.imageStore != name)
        localStorage.setItem('store', JSON.stringify(this.store))
    }
    getProduct(name){
        this.product=this.store.find(product=>product.imageStore==name)
        return this.product
    }
   
}