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
- [Purrr.chat Backend](https://github.com/yourusername/purrr-backend)

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
Contributions are welcome! Feel free to open issues, fork the repository, and submit pull requests.

## License
This project is licensed under the ISC License.