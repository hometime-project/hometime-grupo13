import helpStructurModel from '../models/helpStructurModel.js';

export default class helpStructurController {
    constructor() {
        this.helpStructurs = localStorage.helpStructurs ? JSON.parse(localStorage.helpStructurs) : [];
    }
    getStructurs(){
        return this.helpStructurs
    }
    getStructur(name){
        return this.helpStructurs.find(help=>help.name==name)
    }
    register(name, image,phone,lat,long,street,distrit,hours,days) {
        if (!this.helpStructurs.some(activity => activity.name === name)) {
            this.helpStructurs.push(new helpStructurModel(name, image,phone,lat,long,street,distrit,hours,days));
            localStorage.setItem('helpStructurs', JSON.stringify(this.helpStructurs))
        } else {
            alert(`Structur with name "${name}" already exists!`);
        }
    }
    editStructur(name,image,phone,lat,long,street,distrit,hours,days){
        const myStructur=this.helpStructurs.find(structur=>structur.name===name)
        myStructur.name=name;
        myStructur.image=image;
        myStructur.phone=phone;
        myStructur.lat=lat;
        myStructur.long=long;
        myStructur.street=street;
        myStructur.distrit=distrit;
        myStructur.hours=hours;
        myStructur.days=days;
        this.structurs=this.helpStructurs.filter(structur=>structur.name!=name)
        this.structurs.push(myStructur)
        localStorage.setItem('helpStructurs', JSON.stringify(this.structurs))
    }
    dellStructur(name){
        this.structurss = this.helpStructurs.filter(structur => structur.name != name)
        localStorage.setItem('helpStructurs', JSON.stringify(this.structurss))
    }
    aplyFilter(selectDistrit,selectTime,selectDay){
        let filteredStructurs = this.helpStructurs.filter(
            structur =>
                (structur.distrit===selectDistrit || selectDistrit === '')
                &&
                (structur.hours === selectTime|| selectTime === '')
                &&
                (structur.days===selectDay || selectDay==='')
        )
        return filteredStructurs
    }
}
