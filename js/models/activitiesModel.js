export default class activitiesModel {

    constructor(type, name, image, details, necessities, time, members, createdTime, videos, comments){
        this.type = type
        this.name = name
        this.image = image
        this.details = details
        this.necessities = necessities
        this.time = time
        this.members = members
        this.createdTime = createdTime

        this.videos = videos
        this.comments = comments
        
    }
} 