# 🍺 TemChurras
TemChurras is a web application that helps churras goers and organizers.

When you are organizing a churrasco with your friends things can get messy: they forget to pay, where its gonna be, when, how much they should give you and if they have paid.

But things don't need to be this complicated, with TemChurras all churrascos are going to be well organized and painless.

With TemChurras you can participate in your friend's churrascos, have all them organized in a ordened manner and create your owns.

Welcome to TemChurras! 🍻
## 📦 Pre-requisites
- [Node.js](https://nodejs.org/en/)
- [Docker](https://www.docker.com/)
- [Docker compose](https://docs.docker.com/compose/)
## 🌳 Environment Variables
To run this project, you will need to add the following environment variables to your .env file

| Name                          | Description                         | Default Value                                  |
| ----------------------------- | ------------------------------------| -----------------------------------------------|
|APP_SECRET           | App Secret            | A0D7F8Gha8eung9A8EBV8ubnefq      |
|APP_WEB_URL           | Front-end URL            | http://localhost:300      |
|SMS_DRIVER           | SMS Driver            | sendpulse      |
|SENDPULSE_API_USER_ID           | SendPulse API User ID            |       |
|SENDPULSE_API_SECRET           | API Secret from SendPulse            |       |
|SENDPULSE_TOKEN_STORAGE           | SendPulse Token Storage Directory            |       |

##### More on SendPulse API [here](https://sendpulse.com/integrations/api)

## 💻 Getting started
- Clone the repository
```sh
git clone git@github.com:antoniobfm/temchurras-back.git
```

- Install dependencies

```sh
cd temchurras-back
```

- Create and populate ```.env``` (you can use ```.env.example``` as base)

- Create and populate ```ormconfig.json``` (you can use ```ormconfig.example.json``` as base)

- Run the project
```sh
docker-compose up
```
## ⚙️ Features

- Sign in with your cell phone.
- Add new churras and share it with your friends.
- Confirm your presence at your friends churras.
- Easily access all the information you need to know about the event, such as how many people are going and how much money it has raised.
- Suggest how much people should contribute if they are going to drink or not.


## 📚 Tech Stack

**Client:** [Repository here](https://github.com/antoniobfm/temchurras-front)

**Server:** Node.js, Express and TypeORM

**Database:** PostgreSQL

**Screens:** [Figma here](https://www.figma.com/file/62nJXWuYWf39BspiXwz9zn/TemChurras?node-id=0%3A1)


## 📄 License
Licensed under the MIT License, Copyright © 2022-present Antônio Moraes.

See LICENSE for more information
