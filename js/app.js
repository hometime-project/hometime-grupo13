import ActivityPageView from './views/activityPageView.js'
import ActivityView from './views/activityView.js'
import AdminPageView from './views/adminPageView.js'
import FooterView from './views/footerView.js'
import HelpStruturView from'./views/helpStruturView.js'
import LogView from './views/logView.js'
import NavView from './views/navView.js'
import ProfilePageView from './views/profilePageView.js'

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
                NavView,
                ProfilePageView
            ],
            'index': [
                NavView,
                FooterView
            ],
            'login': [
                LogView
            ],
            'register': [
                LogView
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
}

new App();