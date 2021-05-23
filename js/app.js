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
                password: 'pass1'
            },
            {
                id: 2,
                username: 'user2',
                password: 'pass2'
            }
        ];

        // Load the fixtures in case there is no data in the local storage 
        if (!localStorage.users) {
            localStorage.setItem('users', JSON.stringify(users));
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