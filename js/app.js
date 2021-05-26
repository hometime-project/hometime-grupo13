import ActivitiesView from './views/activitiesView.js'
import ActivityPageView from './views/activityPageView.js'
import AdminPageView from './views/adminPageView.js'
import FooterView from './views/footerView.js'
import HelpStructurView from'./views/helpStructurView.js'
import LogView from './views/logView.js'
import NavbarView from './views/navbarView.js'
import ProfilPageView from './views/profilPageView.js'

class App {
    constructor() {
        // Mapeamento entre os ficheiros HTML e as views que estes vão carregar
        this.routes = {
            '': [
                ActivityPageView,
                ActivityView,
                AdminPageView,
                FooterView,
                HelpStruturView,
                LogView,
                NavbarView,
                ProfilPageView
            ],
            'index': [
                NavbarView,
                FooterView
            ],
            'login': [
                LogView
            ],
            'activitiespage': [
                NavbarView,
                FooterView,
                ActivitiesView
            ],
            'activityPage': [
                NavView,
                FooterView,
                ActivityPageView
            ],
            'helpStructur': [
                NavView,
                FooterView,
                HelpStructurView
            ],
            'profilPage': [
                NavView,
                FooterView,
                ProfilPageView
            ],
            'adminPage': [
                NavView,
                FooterView,
                AdminPageView
            ],
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
                databth: '01-01-2000',
                gender: 'm',
                type: 'user',

                difficulty: 'easy',
                duration: '20min',
                resources: 'none',
                favorites: ['linguas']
            },
            {
                username: 'admin',
                password: 'admin',
                email: 'email1@gmail.com',
                databth: '02-02-2000',
                gender: 'f',
                type: 'admin',

                difficulty: 'hard',
                duration: '1h',
                resources: 'some',
                favorites: ['linguas', 'bricolage']
            }

        ];
 
        // Load the fixtures in case there is no data in the local storage 
        if (!localStorage.users) {
            localStorage.setItem('users', JSON.stringify(users));
        }
    }
}

new App();