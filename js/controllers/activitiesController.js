import activitiesModel from '../models/activitiesModel.js';

export default class ActivityController {
    constructor() {
        this.activities = localStorage.activities ? JSON.parse(localStorage.activities) : [];
    }
    //Função que irá devolver 
    getUsers(){
        this.data=[]
        for (const activity of this.activities) {
            this.data.push(activity)
        }
        return this.data
    }
    //Função que irá registar uma atividade
    register(name, image,video,description,year,doActivity,difficultyLevel,durationActivity,resourcesActivity,categoryActivity,coinsActivity,xpActivity) {
        if (!this.activities.some(activity => activity.name === name)) {
            this.activities.push(new activitiesModel(name, image,video,description,year,doActivity,difficultyLevel,durationActivity,resourcesActivity,categoryActivity,coinsActivity,xpActivity));
            localStorage.setItem('activities', JSON.stringify(this.activities))
        } else {
            throw Error(`Activity with name "${name}" already exists!`);
        }
    }
    //Função irá permitir eliminar uma atividade
    dellActivity(name){
        this.activities = this.activities.filter(activity => activity.name != name)
        localStorage.setItem('activities', JSON.stringify(this.activities))
    }
    //Função q irá preencher o formulário, para que consequentemente se possa edita-los
    getDetailActivity(name){
        this.activities1=this.activities.filter(activity=>activity.name===name)
        return this.activities1
    }
    //Função q irá guardar as novas edições
    editActivity(uname, image,video,description,year,doActivity,difficultyLevel,durationActivity,resourcesActivity,categoryActivity){
            const myactivity=this.activities.find(activity=>activity.name===uname)
            myactivity.image=image;
            myactivity.video=video;
            myactivity.description=description;
            myactivity.year=year;
            myactivity.doActivity=doActivity;
            myactivity.difficultyLevel=difficultyLevel;
            myactivity.durationActivity=durationActivity;
            myactivity.resourcesActivity=resourcesActivity;
            myactivity.categoryActivity=categoryActivity;
            this.activities11=this.activities.filter(activity=>activity.name!=uname)
            this.activities11.push(myactivity)
            localStorage.setItem('activities', JSON.stringify(this.activities11))
    }
    //Função que irá mostrar o catálogo por categoria
    seeCategory(name){
        this.myActivities=this.activities.filter(activity=>activity.categoryActivity===name)
        return this.myActivities
    }
    findPreferences(todo,difficulty,duration,resources,favorites){
        this.result=this.activities.filter(activity=>activity.doActivity===todo && activity.difficultyLevel===difficulty && activity.durationActivity===duration && activity.resourcesActivity===resources && activity.categoryActivity===favorites)
        return this.result
    }
    saveName(name){
        sessionStorage.setItem('activityName', name)
    }
    aplyFilter(filterDo='',filterDifficulty='',filterDuration='',filterResources='',filterFavourites=''){
        let filteredActivities = this.activities.filter(
            activity =>
                (activity.doActivity===filterDo || filterDo === '')
                &&
                (activity.difficultyLevel === filterDifficulty|| filterDifficulty === '')
                &&
                (activity.durationActivity===filterDuration || filterDuration==='')
                &&
                (activity.resourcesActivity===filterResources || filterResources==='')
                &&
                (activity.categoryActivity===filterFavourites || filterFavourites==='')
        )
        return filteredActivities
    }
    //Página Detalhes
    getInfo(){
        this.nameActivity=sessionStorage.getItem("activityName")
        this.activity=this.activities.find(activity=>activity.name==this.nameActivity)
        return this.activity
        
    }
    giveLike(username,activityname){
        console.log(activityname);
        const myactivity=this.activities.find(activity=>activity.name===activityname)
        myactivity.likes.push(username)
        this.activities11=this.activities.filter(activity=>activity.name!=activityname)
        this.activities11.push(myactivity)
        localStorage.setItem('activities', JSON.stringify(this.activities11))       
    }
    dellLike(username,activityname){
        this.activity=this.activities.find(activity=>activity.name==activityname)
        this.list=this.activity.likes 
        this.position=this.list.indexOf(username)
        this.list.splice(this.position,1)
        this.activity.likes=this.list 
        this.activities11=this.activities.filter(activity=>activity.name!=activityname)
        this.activities11.push(this.activity)
        localStorage.setItem('activities', JSON.stringify(this.activities11))
        
    }
    createComment(aName,name,title,body){
        this.activity=this.activities.find(activity=>activity.name==aName)
        this.obj={image:"/img/Imagem 15.png",name:`${name}`,title:`${title}`,body:`${body}`}
        this.activity.comments.push(this.obj)
        this.activities11=this.activities.filter(activity=>activity.name!=aName)
        this.activities11.push(this.activity)
        localStorage.setItem('activities', JSON.stringify(this.activities11))
    }
    getTotal(list){
        this.totalActivities=this.activities.length
        this.totalBricolage=this.activities.filter(activity=>activity.categoryActivity=="Bricolage").length
        this.totalCulinaria=this.activities.filter(activity=>activity.categoryActivity=="Culinária").length
        this.totalDesporto=this.activities.filter(activity=>activity.categoryActivity=="Desporto").length
        this.totalLinguas=this.activities.filter(activity=>activity.categoryActivity=="Línguas").length
        this.totalViajar=this.activities.filter(activity=>activity.categoryActivity=="Viajar").length
        this.bricolage=0
        this.culinaria=0
        this.desporto=0
        this.linguas=0
        this.viajar=0
        for (const element of list) {
            this.category=this.activities.find(activity=>activity.name==element)
            if(this.category.categoryActivity=="Bricolage"){
                this.bricolage ++
            }
            else if(this.category.categoryActivity=="Culinária"){
                this.culinaria ++
            }
            else if(this.category.categoryActivity=="Desporto"){
                this.desporto ++
            }
            else if(this.category.categoryActivity=="Línguas"){
                this.linguas++
            }
            else if(this.category.categoryActivity=="Viajar"){
                this.viajar ++
            }
        }
        this.total=this.bricolage+this.culinaria+this.desporto+this.linguas+this.viajar
        this.nCategory=[]
        this.nCategory.push(this.total,this.totalActivities,this.bricolage,this.totalBricolage,this.culinaria,this.totalCulinaria,this.desporto,this.totalDesporto,this.linguas,this.totalLinguas,this.viajar,this.totalViajar)
        return this.nCategory
    }
    
    

}