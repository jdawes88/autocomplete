# autocomplete

The project has been setup using `vue create`.

This application is a search input where once the user has input 3 or more characters, the search will autocomplete against a given set of books and cities. 

For data storage the project uses Pinia which is the recommended state management tool for Vuejs

## Cloning the repo
Run the following comand to clone the repo
```
git clone git@github.com:jdawes88/autocomplete.git
```

## Project setup
```
npm install
```

## Running tests
For testing, the application uses @testing-library/vue along with Jest.

Functional tests have been written to test user interaction with @testing-library/vue.
Unit tests have been written to test the implementation of the Pinia store with Jest

In order to run all tests run the following command.
```
npm run test:unit
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
