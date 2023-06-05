# MERN-APP Starter

By [Daniel Yoo](https://kympanic.github.io/)

Check out the live site [here](https://mern-app-starter.onrender.com/)

This MERN stack application is ready for deployment to Render. It has user authentication,authorization and forms for logging in and out. The project was a great refresher course from what I've learned at App Academy and helped me learn a NoSQL database like MongoDB. This no-fuss application was created as a basic template to easily create fullstack applications.



## Technologies Used

- Javascript
- React/Redux
- Express
- mongoDB

## Dependencies

- Frontend
  - js-cookie
  - react
  - react-dom
  - react-redux
  - react-router-dom
  - react-scripts
  - redux
  - redux-thunk
- Backend
  - bcryptjs
  - cookie-parser
  - cors
  - csurf
  - dotenv
  - express
  - express-async-errors
  - express-validator
  - faker
  - helmet
  - jsonwebtoken
  - mongoose
  - morgan
  - per-env
- Backend devDependecies
  - @faker-js/faker
  - nodemon

## Login and Register

![demomernapp](https://github.com/kympanic/mernapp-starter/assets/98551224/575985c9-f93b-4dcd-9db7-b5aa9af3bf86)

## Backend Snippets

### User Auth Middlewares

There are three functions that will aid in authentication.
- setTokenCookie: Sets the JWT cookie after a user is logged in or signed up. It takes in the response and the session user and generates a JWT using the imported secret. After the JWT is created, it's set to an HTTP-only cookie on the response as a token cookie.
![Screen Shot 2023-06-05 at 2 07 59 PM](https://github.com/kympanic/mernapp-starter/assets/98551224/4c4901eb-2d3d-4f28-add6-ef7802c10a37)

- restoreUser: Certain routes will require the identity of the current session user. This function will restore the session user based on the contents of the JWT cookie. This middleware function will verify and parse the JWT's payload and search the database for a User with the id in the payload. Only the email and id will be returned in the search(not the password). If there is a User found in the search, then the user is saved to the key of user ounto the req.user. I fthere is an error verifying the JWT or a User cannot be found, then the token cookie is cleared and req.user is set to null.
![Screen Shot 2023-06-05 at 2 13 45 PM](https://github.com/kympanic/mernapp-starter/assets/98551224/fbba26e4-fc5a-400d-9cb1-351021f8e757)

## Frontend Snippets



