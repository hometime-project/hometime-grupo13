import StoreModel from '../models/storeModel.js'

export default class StoreController {
    constructor() {
        this.store = localStorage.store ? JSON.parse(localStorage.store) : [];
    }
   
}