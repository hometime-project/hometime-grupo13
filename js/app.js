import logView from './views/logView.js'
import navView from './views/navView.js'
import footerView from './views/footerView.js'
import activityView from './views/activityView.js'
import profilePageView from './views/profilePageView.js'
import helpStruturView from './views/helpStruturView.js'
import registerView from './views/registerView.js'
import adminUserPageView from './views/adminUserPageView.js'
import adminActivityView from './views/adminActivityPageView.js'
import activityPageView from './views/activityPageView.js'
import adminStorePage from './views/adminStorePageView.js'

class App {
    constructor() {
        // Mapeamento entre os ficheiros HTML e as views que estes vão carregar
        this.routes = {
            '': [
                logView,
            ],
            'index':[
                navView,
                footerView
            ],
            'login': [
                logView
            ],
            'ativitiespage':[
                activityView
            ],
            'profilepage':[
                profilePageView
            ],
            'helpstrutr':[
                helpStruturView
            ],
            'register':[
                registerView
            ],
            'adminUserPage':[
                adminUserPageView
            ],
            'adminActivityPage':[
                adminActivityView
            ],
            'ativitypage':[
                activityPageView
            ],
            'adminStorePage':[
                adminStorePage
            ]
            
        };

        // importa dados dummy para testes
        this.#importDataFixtures();

        // instancia as views mapeadas no objeto routes
        this.#instantiateViews();
    }

    #instantiateViews() {
        const path = window.location.pathname
        const file = path.substr(path.lastIndexOf('/') + 1);
        const route = file.split('.')[0];

        const views = this.#getViews(route);

        for (const view of views) {
            new view();
        }
    }

    #getViews(route) {
        return typeof this.routes[route] === 'undefined' ? [] : this.routes[route];
    }

    #importDataFixtures() {
        const users = [
            {   
                username: 'user1',
                password: 'pass1',
                email: 'email1@gmail.com',
                databth: '2000-01-01',
                gender: 'Masculino',
                type: 'user',
                do:'Individualmente',
                difficulty: 'Fácil',
                duration: 'Inferior a 2 horas',
                resources: 'Poucos',
                favorites: 'Viajar',
                alreadySee:[],
                coins:'0',
                xp:'0',
                avatars:[],
                picture:'../img/Imagem 15.png'
            },
            {
                username: 'admin',
                password: 'admin',
                email: 'email1@gmail.com',
                databth: '2000-02-02',
                gender: 'Feminino',
                type: 'admin',
                do: 'Individualmente',
                difficulty: 'Fácil',
                duration: 'Inferior a 2 horas',
                resources: 'Poucos',
                favorites: 'Bricolage',
                alreadySee:[],
                coins:'0',
                xp:'0',
                avatars:[],
                picture:'../img/Imagem 15.png'
            }

        ];

        const activities=[
            {
                name:'Inglês (Nível I)',
                image:'https://cleandye.com/wp-content/uploads/2020/01/English-icon.png',
                video:'https://www.youtube.com/embed/cC2vxmBDAG8',
                description:'Esta atividade tem como objetivo dar a possibilidade ao utilizador de aprender a falar inglês. Esta primeira aula consiste na pronuncia de frases aleatórias.',
                year:'2021',
                doActivity:'Individualmente',
                difficultyLevel:'Fácil',
                durationActivity:'Inferior a 2 horas',
                resourcesActivity:'Poucos',
                categoryActivity:'Línguas',
                coinsActivity:'10',
                xpActivity:'100',
                likes:[],
                comments:[]
            },
            {
                name:'Inglês (Nível II)',
                image:'https://cleandye.com/wp-content/uploads/2020/01/English-icon.png',
                video:'https://www.youtube.com/embed/cC2vxmBDAG8',
                description:'Esta atividade tem como objetivo dar a possibilidade ao utilizador de aprender a falar inglês. Esta primeira aula consiste na pronuncia de frases aleatórias.',
                year:'2021',
                doActivity:'Individualmente',
                difficultyLevel:'Fácil',
                durationActivity:'Inferior a 2 horas',
                resourcesActivity:'Poucos',
                categoryActivity:'Línguas',
                coinsActivity:'20',
                xpActivity:'200',
                likes:[],
                comments:[]
            }
        ];
        const store=[
            {
                imageStore:"/img/Imagem 15.png",
                levelStore:"3",
                coinsStore:"500"
            }
        ]
 
        // Load the fixtures in case there is no data in the local storage 
        if (!localStorage.users) {
            localStorage.setItem('users', JSON.stringify(users));
        }
        if (!localStorage.activities) {
            localStorage.setItem('activities', JSON.stringify(activities));
        }
        if(!localStorage.store){
            localStorage.setItem("store",JSON.stringify(store))
        }
    }
}

new App();