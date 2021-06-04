import logView from './views/logView.js'
import navView from './views/navView.js'
import footerView from './views/footerView.js'
import activityView from './views/activityView.js'
import profilePageView from './views/profilePageView.js'
import helpStruturView from './views/helpStruturView.js'
import registerView from './views/registerView.js'
import adminUserPageView from './views/adminUserPageView.js'
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
                favorites: 'Viajar'
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
                favorites: 'Bricolage'
            }

        ];
 
        // Load the fixtures in case there is no data in the local storage 
        if (!localStorage.users) {
            localStorage.setItem('users', JSON.stringify(users));
        }
    }
}

new App();