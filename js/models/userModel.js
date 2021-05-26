export default class UserModel {

    constructor(username, email, password, databth, gender, difficulty, duration, resources, type) {
        this.username = username
        this.email=email
        this.password = password
        this.databth=databth
        this.gender=gender 

        this.difficulty=difficulty
        this.duration=duration
        this.resources=resources 
        this.type=type 
    }
}