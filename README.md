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

## Authentication Flow

- Backend Login
  - The API login route will be hit with a request body holding a valid email and password combination.
  - The API login handler will look for a user in the UserModel (MongoDB) with the input credential in the email column
  - Then the hashedPassword for that found User will be compared with the input password for a match
  - If there is a match, the API login route should send back a JWT in an HTTP-only cookie and a response body. The JWT and the body will hold the user's id, name, and email.
- Backend Signup
  - The API signup route will be hit with a request body holding a name, email, and password.
  - The API signup handler will create a user in MongoDB with the name, an email, and a hashedPassword created from the input password.
  - If the creation is successful, the API signup route should send back a JWT in an HTTP-only cookie and a response body. The JWT and the body will hold the user's id, name, and email.
- Backend Logout
  - The API logout route will be hit with a request.
  - The API logout handler will remove the JWT cookie set by the login or signup API routes and return a JSON success message.

## Backend Snippets

### User Auth Middlewares

- setTokenCookie: Sets the JWT cookie after a user is logged in or signed up. It takes in the response and the session user and generates a JWT using the imported secret. After the JWT is created, it's set to an HTTP-only cookie on the response as a token cookie.
![Screen Shot 2023-06-05 at 2 07 59 PM](https://github.com/kympanic/mernapp-starter/assets/98551224/4c4901eb-2d3d-4f28-add6-ef7802c10a37)

- restoreUser: Certain routes will require the identity of the current session user. This function will restore the session user based on the contents of the JWT cookie. This middleware function will verify and parse the JWT's payload and search the database for a User with the id in the payload. Only the email and id will be returned in the search(not the password). If there is a User found in the search, then the user is saved to the key of user ounto the req.user. I fthere is an error verifying the JWT or a User cannot be found, then the token cookie is cleared and req.user is set to null.
![Screen Shot 2023-06-05 at 2 13 45 PM](https://github.com/kympanic/mernapp-starter/assets/98551224/fbba26e4-fc5a-400d-9cb1-351021f8e757)

- requireAuth: Requires a session user to be authenticated before accessing a route.
![Screen Shot 2023-06-05 at 5 04 32 PM](https://github.com/kympanic/mernapp-starter/assets/98551224/db8c1f4d-f364-4990-80de-6afc5482038c)

### MongoDB

- faker-js: To seed initial data in MongoDB to test out routes. 
![Screen Shot 2023-06-05 at 5 11 06 PM](https://github.com/kympanic/mernapp-starter/assets/98551224/e934aa60-9fd4-44a7-a45d-dfc23e272606)



## Frontend Snippets



