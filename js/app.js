import activityPageView from './views/activityPageView'
import activitiesView from './views/activitiesView'
import adminPageView from './views/adminPageView'
import footerView from './views/footerView'
import helpStructurView from './views/helpStructurView'
import logView from './views/logView'
import navbarView from './views/navbarView'
import profilPageView from './views/profilPageView'

class App {
    constructor() {
        this.routes = {
            '': [
                navbarView,
                footerView
            ],
            'index': [
                navbarView,
                footerView
            ],
            'log': [
                logView
            ],
            'activities': [
                navbarView,
                footerView,
                activitiesView
            ],
            'activityPage': [
                navbarView,
                footerView,
                activityPageView
            ],
            'helpStructur': [
                navbarView,
                footerView,
                helpStructurView
            ],
            'profil': [
                navbarView,
                footerView,
                profilPageView
            ],
            'admin': [
                navbarView,
                footerView,
                adminPageView
            ],
        }
        ;

        // import dummy data for testing purposes
        this.#importDataFixtures();

        // instantiate the views mapped in the routes object
        this.#instantiateViews();
    }

    #importDataFixtures() {
        const users = [
            {
                id: 1,
                username: 'user1',
                email: 'user1@gmail.com',
                password: 'pass1',
                birthday: '01-01-2000',
                gender: 'male',

                favorites: ''
            },
            {
                id: 2,
                username: 'user2',
                email: 'user2@gmail.com',
                password: 'pass2',
                birthday: '02-02-2000',
                gender: 'female',
                
                favorites: ''
            }
        ];
        const activities = [
            {
                type: 'linguas',
                name: 'ingles',
                image: '/img/English.png',
                details: 'details',
                necessities: 'none',
                time: '20min',
                members: 'solo',
                createdTime: '26-05-2021',

                videos: '',
                comments: ''

            },
            {
                type: 'linguas',
                name: 'frances',
                image: '/img/French.png',
                details: 'details2',
                necessities: 'none',
                time: '20min',
                members: 'solo',
                createdTime: '26-05-2021',

                videos: '',
                comments: ''

            }
        ];
        const helpStructures = [
            {
                name: 'ajuda1',
                image: '/img/helpS.png',
                address: 'address1',
                phoneNumber: '09237518',

                openHours: ''
            } 
        ]


        // Load the fixtures in case there is no data in the local storage 
        if (!localStorage.users) {
            localStorage.setItem('users', JSON.stringify(users));
        }

        if (!localStorage.activities) {
            localStorage.setItem('activities', JSON.stringify(activities));
        }

        if (!localStorage.helpStructures) {
            localStorage.setItem('helpStructures', JSON.stringify(helpStructures));
        }
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


}

new App();