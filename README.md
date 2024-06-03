# Budget Pal

Budget Pal is an application designed to help users manage their personal finances by tracking expenses. It allows users to add, delete, and view expenses categorized by type and date. This README provides instructions on how to set up and run the application locally.

## Prerequisites

Before you begin, ensure you have the following installed on your system:

- Node.js (Download and install from [Node.js official website](https://nodejs.org/))
- npm (Usually installed with Node.js)

## Project Structure

The project is divided into two main directories:

- `client`: This directory contains the front-end code of the application, built with React.
- `server`: This directory contains the back-end code of the application, which is a simple REST API server using Node.js and Express.

## Setting Up the Application

Follow these steps to set up and run the application:

### Clone the Repository

First, clone this repository to your local machine using the following command:

git clone <repository-url>
cd <repository-directory>

Replace `<repository-url>` and `<repository-directory>` with the actual URL and directory name of the project.

### Setting Up the Server

1. Navigate to the `server` directory:

   cd server

2. Install dependencies:

   npm install

3. Start the server:

   npm run dev

   This command will start the server on `localhost:3000` by default.

### Setting Up the Client

1. Open a new terminal window and navigate to the `client` directory from the root of the project:

   cd client

2. Install dependencies:

   npm install

3. Start the client:

   npm run dev

   This command will start the React development server

## Using the Application

Once both the server and client are running, open your web browser and visit `http://localhost:5173/` to start using the application. You will be able to add new expenses, view them categorized by type and date, and delete them as needed.

## Contributing

Contributions to this project are welcome. Please feel free to fork the repository, make improvements, and submit pull requests.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
