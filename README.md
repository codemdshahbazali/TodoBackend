
# Todo Backend

This project implements all the APIs needed to implement a Todo App


## API Reference

#### To login an existing user

```http
  POST /login
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `email` | `string` | **Required**. Regsitered valid Email |
| `password` | `string` | **Required**. Current Password |

#### To sign up a new user

```http
  POST /signup
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `fullName`      | `string` | **Required**. Full Name of the User |
| `email`      | `string` | **Required**. Valid Email |
| `password`      | `string` | **Required**. Valid Password |
| `confirmPassword`      | `string` | **Required**. Re-enter same passowrd |

#### List all todos of the current user

```http
  GET /todos
```

| Header | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `Authorization`      | `string` | **Required**. Bearer token |

#### Create a new todo item

```http
  POST /todos
```

| Header | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `Authorization`      | `string` | **Required**. Bearer token |

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `item`      | `string` | **Required**. Detail of the todo item |

#### Update an existing todo

```http
  PUT /todos/:id

```

| Header | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `Authorization`      | `string` | **Required**. Bearer token |

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `number` | **Required**. Id of the item to be updated |
| `item`      | `string` | **Required**. Detail of the todo item |
| `isCompleted` | `boolean` | **Required**. Detail of the todo item |

#### Delete an existing todo

```http
  DELETE /todos/:id

```

| Header | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `Authorization`      | `string` | **Required**. Bearer token |

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `number` | **Required**. Id of the item to be deleted |

#### Get a single todo

```http
  GET /todos/:id
```

| Header | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `Authorization`      | `string` | **Required**. Bearer token |

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `number` | **Required**. Id of the item to be fetched |


## Authors

- [Md Shahbaz Ali](https://github.com/codemdshahbazali)

  
## Badges

[![MIT License](https://img.shields.io/apm/l/atomic-design-ui.svg?)](https://github.com/tterb/atomic-design-ui/blob/master/LICENSEs)

  
## Deployment

To deploy this project run

```bash
  npm run deploy
```

  
## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`API_KEY`

`ANOTHER_API_KEY`

  
## Features

- Light/dark mode toggle
- Live previews
- Fullscreen mode
- Cross platform

  
## Feedback

If you have any feedback, please reach out to us at codemdshahbazali@gmail.com

  
## 🚀 About Me
I'm a full stack developer who knows React, Redux and Node.js... Contact me to build an amazing website

  
# Hi, I'm Shahbaz! 👋

  
## 🔗 Links
[![linkedin](https://img.shields.io/badge/linkedin-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/md-shahbaz-ali-03238645/)
[![twitter](https://img.shields.io/badge/twitter-1DA1F2?style=for-the-badge&logo=twitter&logoColor=white)](https://twitter.com/alishahbaz4u)

  
## 🛠 Skills
Javascript, React, Redux, Node.js, HTML, CSS...

  
## Installation

Install todo backend App with npm

```bash
  cd todobackend
  npm install
  npm start
```
    
## Run Locally

Clone the project

```bash
  git clone https://link-to-project
```

Go to the project directory

```bash
  cd my-project
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run start
```

  
## Support

For support, email codemdshahbazali.com
  
## Tech Stack

**Client:** POSTMAN

**Server:** Node, Express

  