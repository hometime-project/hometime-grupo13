export default class userModel {

    constructor(id, username, email, password, birthday, gender, favorites = []){
        this.id = id
        this.username = username
        this.email = email
        this.password = password
        this.birthday = birthday
        this.gender = gender

        this.favorites = favorites
    }
} 