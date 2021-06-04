export default class UserModel {
    constructor(username, password,email,databth,gender) {
        this.username = username
        this.email=email
        this.password = password
        this.databth=databth
        this.gender=gender
        this.type = 'user'
        this.do='0' 
        this.difficulty='0'
        this.duration='0'
        this.resources='0'
        this.favorites = '0'
    }
}