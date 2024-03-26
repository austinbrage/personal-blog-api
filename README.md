# Personal Blog Site API
![Node](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white) ![Express](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge) ![MySQL](https://img.shields.io/badge/MySQL-005C84?style=for-the-badge&logo=mysql&logoColor=white) ![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white) ![Jest](https://img.shields.io/badge/Jest-323330?style=for-the-badge&logo=Jest&logoColor=white) 

#### **The API controls resgister and log in of users, and the management of the articles stored by the users.**

## Using the API

The API will be available at `http://localhost:3000`.

## Authentication

The API relies on headers, sending the signed token within the response body and receiving the same token within the authorization header, which must be stored manually in the client application.

## API Route

| Endpoint  | Description | 
| ------ | ------ |
| **`/personal-blog`** | API Version 1 |

## Connection Route

| Endpoint | Queries | Description | 
| ------ | ------ | ------ |
| **GET ***`/ping`***** | none | Verify API and DB connection |

## User Routes

| Endpoint | Queries | Description | 
| ------ | ------ | ------ |
| **GET ***`/user/data`***** | **token** | Get all data from user |
| **POST ***`/user/key`***** | api_key | Sign in user ***(get token)*** |
| **POST ***`/user/login`***** | name, password | Sign in user ***(get token)*** |
| **POST ***`/user/oauth`***** | auth_provider, code | Open Auth User ***(get token)*** |
| **POST ***`/user/register`***** | name, password, email, author | Sign up user  ***(get token)***  |
| **PATCH ***`/user/name`***** | name, **token** | Change user name |
| **PATCH ***`/user/email`***** | email, **token** | Change user email |
| **PATCH ***`/user/author`***** | author, **token** | Change user author name |
| **PATCH ***`/user/password`***** | password, **token** | Change user password |
| **DELETE ***`/user/data`***** | **token** | Remove user |

## Article Routes

| Endpoint | Queries | Description | 
| ------ | ------ | ------ |
| **GET ***`/article`***** | **token** | Get all articles from user |
| **GET ***`/article/data/s3`***** | image | Get s3 image signed url |
| **GET ***`/article/keywords`***** | none | Get all article keywords |
| **GET ***`/article/data/all`***** | perPage, currentPage | Get all articles in pages |
| **GET ***`/article/data/keywords`***** | perPage, currentPage, keywords | Get all articles in pages filtered by keywords |
| **GET ***`/article/data/user/keywords`***** | perPage, currentPage, keywords, **token** | Get user articles in pages filtered by keywords |
| **PATCH ***`/article/publishment`***** | id, is_publish, **token** | Change article publish state |
| **PATCH ***`/article/data`***** | id, name, title, image, keywords, description, **token** | Change article data info |
| **PATCH ***`/article/data/s3`***** | id, name, title, image(file), keywords, description, **token** | Change article data with s3 image |
| **POST ***`/article/data/s3`***** | name, title, image(file), keywords, description, **token** |  Add new article with s3 image |
| **POST ***`/article`***** | name, title, image, keywords, description, **token** |  Add new article |
| **DELETE ***`/article`***** | id, **token** |  Remove article |
| **DELETE ***`/article/data/s3`***** | [ image ], **token** | Remove s3 article images |

## Section Routes

| Endpoint | Queries | Description | 
| ------ | ------ | ------ |
| **GET ***`/section`***** | article_id_query | Get all sections from article |
| **GET ***`/section/s3`***** | image | Get s3 image signed url |
| **PUT ***`/section`***** | id, content, content_type, image, width, height, font_size, font_weight, font_family, line_height, margin_top, text_align, text_color, border_radius **token** | Change section |
| **PUT ***`/section/s3`***** | id, content, image(file), width, height, font_size, font_weight, font_family, line_height, margin_top, text_align, text_color, border_radius **token** | Change section with s3 image |
| **POST ***`/section/s3`***** | article_id, content, image(file), width, height, font_size, font_weight, font_family, line_height, margin_top, text_align, text_color, border_radius **token** | Add new section with s3 image |
| **POST ***`/section`***** | article_id, content, content_type, image, width, height, font_size, font_weight, font_family, line_height, margin_top, text_align, text_color, border_radius **token** | Add new section |
| **POST ***`/section/template`***** | article_id, template_option **token** | Add new section template |
| **POST ***`/section/multiple`***** | [ article_id, content, content_type, sequence, image, width, height, font_size, font_weight, font_family, line_height, margin_top, text_align, text_color, border_radius ] **token** | Add new multiple sections |
| **PUT ***`/section/sequence`***** | [ id, sequence ] **token** | Change sequences |
| **DELETE ***`/section`***** | id, **token** | Remove section |
| **DELETE ***`/section/s3`***** | [ image ], **token** | Remove s3 section images |
