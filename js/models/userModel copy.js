export default class userModel {

    constructor(username, email, password, birthday, gender, favorites = []){
        this.username = username
        this.email = email
        this.password = password
        this.birthday = birthday
        this.gender = gender

        this.favorites = favorites
    }
} 