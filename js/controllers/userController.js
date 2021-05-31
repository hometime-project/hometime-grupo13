import UserModel from '../models/userModel.js'

export default class UserController {
<<<<<<< HEAD
    constructor() {
        this.users = localStorage.users ? JSON.parse(localStorage.users) : [];
    }
    register(username, password) {
        if (!this.users.some(user => user.username === username)) {
            this.users.push(new UserModel(username, password));
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
=======
    constructor() {}
>>>>>>> d91d914bb1b1de0f07621e56a2c245f6644647e3
}