# Purrr.chat Backend

This repository contains the backend code for **Purrr.chat**, a random chat application that pairs users for real-time text and image-based communication.

## Features
- **Express.js**: Backend server using Express.
- **WebSockets with Socket.io**: Real-time communication using WebSockets and the `socket.io` library.
- **Random User Pairing**: Automatically pair users with other active users.
- **TypeScript**: Ensures type safety throughout the backend code.

## Technologies Used
- **Express.js**: v4.21.0
- **Socket.io**: v4.7.5 for WebSocket connections
- **TypeScript**: v5.6.2 for type safety
- **CORS**: v2.8.5 to handle Cross-Origin Resource Sharing

## Related Repositories
- [Purrr.chat Frontend](https://github.com/yourusername/purrr-frontend)

## Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/yourusername/purrr-backend.git
    cd purrr-backend
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Run the development server:
    ```bash
    npm run dev
    ```

4. Build and run the server in production:
    ```bash
    npm run build
    npm start
    ```

## WebSocket Events
The backend listens for the following WebSocket events:
- `connection`: Establishes a WebSocket connection with the client.
- `disconnect`: Handles when a user disconnects from the server.
- `chat message`: Receives and broadcasts messages between paired users.
- `image upload`: Handles image sharing during a chat.

## Scripts

- `npm run dev`: Run the application in development mode.
- `npm run build`: Compile TypeScript into JavaScript.
- `npm start`: Start the application in production mode.


## Contributing
Thank you for contributing to this open-source project! We strive to create a safe and collaborative environment at Purrr.chat. Please follow these contribution guidelines:

### Contribution Rules
1. **Fork the Repository**: Start by forking the repository before making any changes. 
2. **Create a New Branch**: Use your name to create a new branch and start implementing your changes.
3. **Push Your Changes**: Once your changes are ready, push them to your fork and wait for a review.
4. **Review Process**: We will review your changes, and if accepted, they will be merged into the master branch.
5. **Stay Updated**: Before starting new work, pull the latest changes from the master branch and merge them into your local branch to avoid conflicts.

### Working on a Task (Important)
1. **Open Issues**: Please open issues for new features in the issues section.
2. **Request Assignment**: If you wish to work on an existing issue, request to be assigned to it.
3. **No Unassigned Work**: If you start working on an issue without being assigned, we may not prioritize reviewing your changes, and they may be rejected in most cases.
4. **Assigned Work**: Once assigned, you can start working and must follow the contribution guidelines to avoid merge conflicts.

## License
This project is licensed under the ISC License.