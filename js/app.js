import NavBarView from './views/NavBarView.js'
import NewActivityView from './views/NewActivityView.js'
import HomeView from './views/HomeView.js'
import ProfileView from './views/ProfileView.js'
import ShopView from './views/ShopView.js'
import ManageBadgesView from './views/ManageBadgesView.js'
import LeaderboardView from './views/LeaderboardView.js'
import LevelMenuView from './views/LevelMenuView.js'
import LevelView from './views/LevelView.js'

class App {
    constructor() {


        this.routes = {
            '': [
                NavBarView,
                HomeView
            ],
            'index': [
                NavBarView,
                HomeView
            ],
            'level': [
                LevelView
            ],
            'profile': [
                NavBarView,
                ProfileView
            ],
            'leaderboard': [
                NavBarView,
                LeaderboardView
            ],
            'shop': [
                NavBarView,
                ShopView
            ],
            'levelMenu': [
                LevelMenuView
            ],
            'newActivity': [
                NewActivityView
            ],
            'manageBadges': [
                ManageBadgesView
            ]
        };

        this.#importDataFixtures();
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
        const activities = [
            {
                id: 1,
                activityType: 'Quiz',
                coinsAwarded: 10,
                pointsAwarded: 100,
                questions: [{
                    answer1: "Sneezing",
                    answer2: "Coughing",
                    answer3: "Tiredness",
                    correctAnswer: 1,
                    description: "Which of these symptoms is not from covid?"
                },
                {
                    answer1: "True",
                    answer2: "False",
                    correctAnswer: 1,
                    description: "Covid can spread through masks?"
                },
                {
                    answer1: "No",
                    answer2: "Yes",
                    correctAnswer: 1,
                    description: "Does Covid spread better in humid environments?"
                }],
                requirement: "completedActivities:10"

            },
            {
                id: 2,
                activityType: 'Quiz',
                coinsAwarded: 20,
                pointsAwarded: 1500,
                questions: [{
                    answer1: "Sneezing",
                    answer2: "Coughing",
                    answer3: "Tiredness",
                    correctAnswer: 1,
                    description: "Which of these symptoms is not from covid?"
                },
                {
                    answer1: "True",
                    answer2: "False",
                    correctAnswer: 1,
                    description: "Covid can spread through masks?"
                },
                {
                    answer1: "Yes",
                    answer2: "No",
                    correctAnswer: 1,
                    description: "Does Covid spread better in humid environments?"
                }],
                requirement: "completedActivities:10"

            },
            {
                id: 3,
                activityType: 'Quiz',
                coinsAwarded: 30,
                pointsAwarded: 2000,
                questions: [{
                    answer1: "Sneezing",
                    answer2: "Coughing",
                    answer3: "Tiredness",
                    correctAnswer: 1,
                    description: "Which of these symptoms is not from covid?"
                },
                {
                    answer1: "True",
                    answer2: "False",
                    correctAnswer: 1,
                    description: "Covid can spread through masks?"
                },
                {
                    answer1: "No",
                    answer2: "Yes",
                    correctAnswer: 1,
                    description: "Does Covid spread better in humid environments?"
                }],
                requirement: "completedActivities:10"

            }
        ];

        const users = [
            {
                username : 'user1',
                password : 'pass1',
                role : "user",
                coins : 0,
                points : 0,
                titleOrnament: 0,
                completedActivities: 0,
                activityAnswers: [],
                items: [],
                badges: []
            },
            {
                username : 'user2',
                password : 'pass2',
                role : "user",
                coins : 0,
                points : 0,
                titleOrnament: 0,
                completedActivities: 0,
                activityAnswers: [],
                items: [],
                badges: []
            },
            {
                username : 'useradmin',
                password : 'passadmin',
                role : "admin",
                coins : 0,
                points : 0,
                titleOrnament: 0,
                completedActivities: 0,
                activityAnswers: [],
                items: [],
                badges: []
            }

        ];

        const badges = [
            {
                title : 'Starter!',
                requirement : 'activities',
                moreThan : 0,
                pictureURI : ""
            },
            {
                title : 'Some Coins!',
                requirement : 'coins',
                moreThan : 100,
                pictureURI : ""
            },
            {
                title : 'Pointy King',
                requirement : 'points',
                moreThan : 1000,
                pictureURI : ""
            },
        ];

        if (!localStorage.activities) {
            localStorage.setItem('activities', JSON.stringify(activities));
        }
        if (!localStorage.users) {
            localStorage.setItem('users', JSON.stringify(users));
        }
        if (!localStorage.badges) {
            localStorage.setItem('badges', JSON.stringify(badges));
        }
    }
}

new App();
