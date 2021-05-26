export default class UserModel {

    constructor(username, email, password, databth, gender, difficulty, duration, resources, type, favorites = []) {
        this.username = username
        this.email=email
        this.password = password
        this.databth=databth
        this.gender=gender
        this.type = type 

        this.difficulty=difficulty
        this.duration=duration
        this.resources=resources 
        this.favorites = favorites 
    }
}