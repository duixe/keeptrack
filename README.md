# keeptrack

A minimal Human resource(HR) management tool used to keep organization's data, specifically department and employees' data thereby helping managers to retrieve and  map every employee to their corresponding departments and also allowing managers to keep track of employees data and even give them the ability to contact them directly from the app when the need arises.

## Major skills acquired

Some major skills acquired and used during the design and development of this project are as follows:

1. __vue.js__
    - used vue cli for creating or scaffolding a new project
    - Added and used vue-router for controlling routes (pages) in the application
    - Also leveraged vue-router to enable and redirect missing pages or routes to a 404 page
    - Added and used vuetify for style and design purposes
    - form validation with the help of vuetify
    - used SCSS for custom styles
2. __firebase__
    - Added firebase to the project
    - Connected the application to the firebase Realtime database
    - used firesbase Realtime database to store the application data in various documents organized into a collection
    - Practised and solved a complex NoSQL data modelling problem by setting up boundries between various sub documents belonging to a paticular document in a collection
    - Added firbase cloud storage for image upload purposes, thereby mapping each uploaded images to its corresponding document in a collection of the firbase realtime database
    - Added and used firbase authentication for identity verification
    - Applied constraints (security rules) to the database
    - Applied the firbase password reset option in the application
    - Configured the application, making it suitable for firebase hosting
    - Finally depolyed the application to firebase

## Guidlines on project setup

### clone the repo

```bash
git clone git@github.com:duixe/keeptrack
```

### project setup

```
npm install
```

### Compiles and hot-reloads for development

```
npm run serve
```

### Compiles and minifies for production

```
npm run build
```

### Lints and fixes files

```
npm run lint
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).

## Features I would like to add in the future

- Countdown to employee's retirement or contract expiry date
- Employee's salary due date notification to employer or manager
- Ability to rate department's performance with respect to their output
