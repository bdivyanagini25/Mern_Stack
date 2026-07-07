npm init -y

npm insall express dotenv mongoose cors

npm install --save-dev nodemon

Backend
|
|--src
|   |
|   |--config           (all configuraions)
|   |   |
|   |   |--db.js
|   |
|   |--controllers      (adding logic and http,gettting the data and passing to the model)
|   |
|   |--middleware       (all authorization--check)
|   |
|   |--model
|   |
|   |--routes           (all urls/ routes)
|   |
|   |--app.js
|
|--.env
|
|--.gitignore
|
|--readme.md