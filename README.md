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
- ![Screen Shot 2023-06-05 at 2 07 59 PM](https://github.com/kympanic/mernapp-starter/assets/98551224/4c4901eb-2d3d-4f28-add6-ef7802c10a37)

- restoreUser: Certain routes will require the identity of the current session user. This function will restore the session user based on the contents of the JWT cookie. This middleware function will verify and parse the JWT's payload and search the database for a User with the id in the payload. Only the email and id will be returned in the search(not the password). If there is a User found in the search, then the user is saved to the key of user ounto the req.user. I fthere is an error verifying the JWT or a User cannot be found, then the token cookie is cleared and req.user is set to null.
= ![Screen Shot 2023-06-05 at 2 13 45 PM](https://github.com/kympanic/mernapp-starter/assets/98551224/fbba26e4-fc5a-400d-9cb1-351021f8e757)

- requireAuth: Requires a session user to be authenticated before accessing a route.
- ![Screen Shot 2023-06-05 at 5 04 32 PM](https://github.com/kympanic/mernapp-starter/assets/98551224/db8c1f4d-f364-4990-80de-6afc5482038c)

### MongoDB

- faker-js: To seed initial data in MongoDB to test out routes. 
- ![Screen Shot 2023-06-05 at 5 11 06 PM](https://github.com/kympanic/mernapp-starter/assets/98551224/e934aa60-9fd4-44a7-a45d-dfc23e272606)

- UserModel: Simple Schema for Users
- ![Screen Shot 2023-06-05 at 5 13 27 PM](https://github.com/kympanic/mernapp-starter/assets/98551224/d51821e4-e744-4e8a-a9db-fa7838a363eb)

### API

- Login: If user password is correct, setTokenCookie is called and returns a JSON response with the user's non-sensitive information. 
- ![Screen Shot 2023-06-05 at 5 28 40 PM](https://github.com/kympanic/mernapp-starter/assets/98551224/1cdbd77b-259b-4b0b-b05f-342224b4ff4d)

### Error Handling Middleware

- First error handler will catch any requests that don't match any of the routes defined and create a server error with a status code of 404.
- ![Screen Shot 2023-06-05 at 5 18 01 PM](https://github.com/kympanic/mernapp-starter/assets/98551224/7832ae98-56b3-4ad2-a2d5-47ae33ab4b78)

- Second error handler formats all the errors before returning a JSON response. It will include the error message, the error messages as a JSON object with key-value pairs, and the error stack trace (if the environment is in development) with the status code of the error message.
- ![Screen Shot 2023-06-05 at 5 20 55 PM](https://github.com/kympanic/mernapp-starter/assets/98551224/8d9286b5-bf41-4d70-a255-2e13301330af)

## Frontend Snippets

csrfFetch: The Express backend server is configured to be CSRF protected and will only accept requests that have the right CSRF secret token in a header and the right CSRF token value in a cookie. To make fetch requests with any HTTP verb other than GET, the the header on the request is set the value of the XSRF-TOKEN cookie. 

![Screen Shot 2023-06-05 at 5 34 22 PM](https://github.com/kympanic/mernapp-starter/assets/98551224/f00024da-5df7-42f1-bb38-e9def8172f38)

## Deployment to Render

Step 1:
- From the Dashboard, click on the "New +" button in the navigation bar, and click on "Web Service" to create the application that will be deployed. 
- Look for the name of the application you want to deploy, and click the "Connect" button to the right of the name.
- Fill out the form to configure the build and start commands, as well as add the environment variables to properly deploy the application.
- In the build script add "npm install && npm run render-postbuild && npm run build"
- Enter npm start in the Start command input

Step 3:
- Click on the "Advanced" button at the bottom of the form to configure the environment variables your application needs to access to run properly. In the development environment, you have been securing these variables in the .env file, which has been removed from source control. In this step, you will need to input the keys and values for the environment variables you need for production into the Render GUI.
- Add the following keys and values in the Render GUI form:
  - JWT_SECRET (click "Generate" to generate a secure secret for production)
  - JWT_EXPIRES_IN (copy value from local .env file)
  - NODE_ENV production
  - MONGODB_URL (value of your url from MongoDb from mongodb/atlas)
 
 # You are now ready to deploy. Have Fun!
