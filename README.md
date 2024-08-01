# URL Shortener 🌐

This is a project that generates a shorter format to your url.


## Technologies 🤖 

- NodeJS
- Express
- MySQL
- Docker

## Architecture 💻

On this project was prefered to use Hexagonal Architecture (Ports and Adapters) considering its scalability and easy-going in terms of platform/environment migration.

## How to run 🏃

There are two ways to run this app. Check the best option to you :)

### 1. Automatically via Docker (Recommended)

If you have docker on your machine you can simple run `docker-compose up -d --build` then your application will be initialize without any problems. So that, go ahead to the next session (How to use).

### 2. Manually via NodeJS

To run this application without docker you'll need to run (in your machine or externally) a MySQL Instance, create a database with the same name put on ".env" file (feel free to change) and then start the application. It's important to check if the migrations ran successfuly.

## How to use ⚒️

To generate shorter URLs you can call the following endpoint using CURL:

````
curl --request POST \
  --url http://localhost:3030/shorten \
  --header 'Content-Type: application/json' \
  --header 'User-Agent: insomnia/9.3.2' \
  --data '{
	"url": "https://lucasjsdev.com"
}'
````

Now if you want to check if it's working you can simply open the result URL given on response:

````
{
	"shortened": "http://localhost:3030/MjM0"
}
````

Now if this URL is open on browser, you are going to be redirected to the original URL (in this case "https://lucasjsdev.com")