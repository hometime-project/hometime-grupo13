import UserModel from '../models/userModel.js'

export default class UserController {
    constructor() {
        this.users = localStorage.users ? JSON.parse(localStorage.users) : [];
    }
    register(username, password,email,databth,gender) {
        if (!this.users.some(user => user.username === username)) {
            this.users.push(new UserModel(username, password,email,databth,gender));
            localStorage.setItem('users', JSON.stringify(this.users))
        } else {
            throw Error(`User with username "${username}" already exists!`);
        }
    }
    login(username, password) {
        if (this.users.some(user => user.username === username && user.password === password)) {
            sessionStorage.setItem('loggedUser', username)
        } else {
            throw Error('Invalid login!');
        }
    }
    isLogged() {
        return sessionStorage.getItem('loggedUser') ? true : false
    }
    logout() {
        sessionStorage.removeItem('loggedUser')
    }
    isAdmin(){
        const name=sessionStorage.getItem('loggedUser')
        return this.users.some(user=>user.username==name && user.type=='admin')
    }
    myData(){
        const dates=[];
        const name1=sessionStorage.getItem('loggedUser')
        const myClass=this.users.find(user=>user.username==name1)
        dates.push(myClass.username,myClass.password,myClass.email,myClass.databth,myClass.gender,myClass.do,myClass.difficulty,myClass.duration,myClass.resources,myClass.favorites)
        return dates
    }
    changePassword(newPassword){
        const myUser=sessionStorage.getItem('loggedUser')
        const myClass1=this.users.find(user=>user.username==myUser)
        myClass1.password=newPassword
        this.users=this.users.filter(user=>user.username!=myUser)
        this.users.push(myClass1)
        localStorage.setItem('users', JSON.stringify(this.users))
    }
    changePreferences(todo,difficulty,duration,resources,favorites){
        const myUser=sessionStorage.getItem('loggedUser')
        const myClass1=this.users.find(user=>user.username==myUser)
        myClass1.do=todo;
        myClass1.difficulty=difficulty;
        myClass1.duration=duration;
        myClass1.resources=resources;
        myClass1.favorites=favorites;
        this.users=this.users.filter(user=>user.username!=myUser)
        this.users.push(myClass1)
        localStorage.setItem('users', JSON.stringify(this.users))
    }
    getUsers(){
        this.data=[]
        for (const user of this.users) {
            this.data.push(user)
        }
        return this.data
    }
    //Função que irá permitir apagar o utilizador
    dellUser(name){
        this.users = this.users.filter(user => user.username != name)
        localStorage.setItem('users', JSON.stringify(this.users))
    }
    changeDataUser(username1,email,databth,gender){
        const myClass1=this.users.find(user=>user.username==username1)
        myClass1.email=email;
        myClass1.databth=databth;
        myClass1.gender=gender;
        this.users=this.users.filter(user=>user.username!=username1)
        this.users.push(myClass1)
        localStorage.setItem('users', JSON.stringify(this.users))
    }
    //Alterar tipo de utilizador
    changeType(type,username1){
        const myClass1=this.users.find(user=>user.username==username1)
        myClass1.type=type;
        this.users=this.users.filter(user=>user.username!=username1)
        this.users.push(myClass1)
        localStorage.setItem('users', JSON.stringify(this.users))
    }
    //Ordernar por Nome
    orderByName(){
        this.data=[]
        for (const user of this.users) {
            this.data.push(user)
        }
        this.data.sort((a, b) => (a.username > b.username) ? 1 : -1)
        return this.data
    }
}