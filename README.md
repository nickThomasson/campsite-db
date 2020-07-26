# campsite-db

This repository contains the frontend code for the campsite db project of the DPSG DV Osnabrück. 
It uses vue.js and vuetify as frontend framework. The Backend is provided by [directus](https://directus.io) headless cms.

## Project setup
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

### DOTENV

You will need credentials, that have proper access to [directus](https://directus.io). After that you just have to create a *.env.local* file in the project root and copy the folling lines into it.

```
VUE_APP_USERNAME = "yourUsername"
VUE_APP_PASSWORD = "yourPAssword"
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
