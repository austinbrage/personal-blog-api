# Blog Site API

This Blog Site API uses Node.js and Express to manage articles and users on a blog site.

## Prerequisites

Make sure you have the following installed before running the API:

- Node.js
- npm
- MongoDB (database)

## Using the API

1. Clone this repository to your local machine:

```
git clone https://github.com/your-username/blog-api.git
```

2. Navigate to the project directory:

```
cd blog-api
```

3. Install dependencies:

```
npm install
```

4. Configure the MongoDB database in the `.env` file:

```
MONGODB_URI=your_mongodb_url
```

5. Start the server:

```
npm start
```

The API will be available at `http://localhost:3000`.

## API Routes

- **GET /articles**: Get all articles.
- **GET /articles/:id**: Get an article by its ID.
- **POST /articles**: Create a new article.
- **PUT /articles/:id**: Update an existing article.
- **DELETE /articles/:id**: Delete an article by its ID.

- **GET /users**: Get all users.
- **GET /users/:id**: Get a user by their ID.
- **POST /users**: Create a new user.
- **PUT /users/:id**: Update an existing user.
- **DELETE /users/:id**: Delete a user by their ID.

Enjoy using the Blog Site API!