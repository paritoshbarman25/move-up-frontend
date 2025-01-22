# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh



## Instructions for Authecntication
### For login
call the function `login(credentials)`
- `credentials` paramiter is an object where user credentials like email and password will be pass front end to backend

### For register
call the function `register(details)`
- `details` paramiter is an object where user details will be pass front end to backend

#### Note: Key name must be same
- `username`
- `password`
- `fullname`
- `phone`
- `email`


## Available functions and use states under context api
#### Use states
- `user`, `token`, `loginStatus`
#### Functions
- `login`, `register`, `fetchProfile`, `logout`