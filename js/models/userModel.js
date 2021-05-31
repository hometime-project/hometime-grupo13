export default class UserModel {
<<<<<<< HEAD
    constructor(username, password,email,databth,gender) {
=======

    constructor(username, email, password, databth, gender, difficulty, duration, resources, type, favorites = []) {
>>>>>>> d91d914bb1b1de0f07621e56a2c245f6644647e3
        this.username = username
        this.email=email
        this.password = password
        this.databth=databth
        this.gender=gender
<<<<<<< HEAD
        this.type = 'user' 

        this.difficulty='0'
        this.duration='0'
        this.resources='0'
        this.favorites = '0'
=======
        this.type = type 

        this.difficulty=difficulty
        this.duration=duration
        this.resources=resources 
        this.favorites = favorites 
>>>>>>> d91d914bb1b1de0f07621e56a2c245f6644647e3
    }
}