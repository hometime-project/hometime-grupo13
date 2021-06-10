export default class ActivitiesModel {

    constructor(name, image, video, description, year, doActivity, difficultyLevel, durationActivity, resourcesActivity, categoryActivity,coinsActivity,xpActivity){
        this.name = name
        this.image = image
        this.video = video
        this.description = description
        this.year = year
        this.doActivity = doActivity
        this.difficultyLevel = difficultyLevel
        this.durationActivity = durationActivity
        this.resourcesActivity = resourcesActivity
        this.categoryActivity = categoryActivity
        this.coinsActivity=coinsActivity 
        this.xpActivity=xpActivity
        this.likes=[]
        this.comments=[]
        
    }
} 