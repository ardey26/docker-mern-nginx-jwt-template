# DOCKER-MERN-NGINX-JWT-TEMPLATE

- A template for MERN stack use cases
- Equipped with Nginx for load balancing and reverse proxy
- Containerized using docker
- JWT for authorization/authentication
- Comes with bootstrap 5 via CDN

## Setup

REQUIREMENTS:

- Completion of environment variables
- Docker
- Git

```bash
  make build
  make start
```

## API Reference

#### Register account

```http
  POST /api/user/register
  @ACCESS: Public
```

| Parameter   | Type     | Description                         |
| :---------- | :------- | :---------------------------------- |
| `name`      | `string` | **Required**. Your full name        |
| `username`  | `string` | **Required**. Your username         |
| `email`     | `string` | **Required**. Your email            |
| `password`  | `string` | **Required**. Your password         |
| `password2` | `string` | **Required**. Confirm your password |

#### Login

```http
  POST /api/user/login
  @ACCESS: Public
```

| Parameter  | Type     | Description                                   |
| :--------- | :------- | :-------------------------------------------- |
| `email`    | `string` | **Required**. Use this in place of a username |
| `username` | `string` | You can use this in place of an email         |
| `password` | `string` | **Required**. Your password                   |

#### Delete account

```http
  DELETE /api/user/
  @ACCESS: Private
```

| Parameter  | Type     | Description                 |
| :--------- | :------- | :-------------------------- |
| `email`    | `string` | **Required**. Your email    |
| `password` | `string` | **Required**. Your password |

#### Change password

```http
  PATCH /api/user/change
  @ACCESS: Private
```

| Parameter     | Type     | Description                     |
| :------------ | :------- | :------------------------------ |
| `email`       | `string` | **Required**. Your email        |
| `password`    | `string` | **Required**. Your password     |
| `newPassword` | `string` | **Required**. Your new password |

## License

[MIT](https://choosealicense.com/licenses/mit/)

## Authors

- [@ardey26](https://www.github.com/ardey26)
