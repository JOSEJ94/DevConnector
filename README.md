# About DevConnector Project

This project is being made based on the course [MERN Stack Front To Back: Full Stack React, Redux & Node.js](https://www.udemy.com/mern-stack-front-to-back/) by **Brad Traversy**.

The project consists of a social network website for developers programmed using the MERN stack. The project is still being developed but some of the features already included are:

- Authentication using JWT tokens.
- User accounts creation.
- Profiles CRUD.
- Posts CRUD.

This repository does not intend to infringe the original author rights. If you like this project, please consider buying the course material o credit the original autor.

## Installation
There are just a few steps to get this project working. 

- Install the dependencies for the server:
`npm install`

- Install the dependencies for the client:
`npm run client-install`

Now the you have dependencies installed you will need to create the connection string for your mongoDB and secret key for your JWT Authentication Service. In order to do this, you will have to create a new folder called **config** inside your **server** folder, and next create a new file called **keys.js**. The content of this file must be similar to the following:

`module.exports  = {
mongoURI:  [Your mongoDB connection URI],
secretJWTKey:  [Your string keyword to be used as a secret key]
};`

> **Note:** You can use a cloud solution like Mlab or similar if do not want to host your db locally.
> 
## Running the project

Once you completed the steps in the Installation Section, all you need to do to run the project is execute the following command on your terminal:

`npm run dev`
