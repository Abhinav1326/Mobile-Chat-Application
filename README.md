﻿# Chat App

This is a chat app built using React Native with Expo. It utilizes Firebase Authentication for user authentication and Firebase Firestore for storing chats. The app also incorporates the Gifted Chat library for a user-friendly chat interface.

## Features

- User authentication with Firebase Authentication
- Real-time chat functionality using Firebase Firestore
- Beautiful and intuitive chat interface with Gifted Chat

## Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/Abhinav1326/Mobile-Chat-Application.git
    ```

2. Install dependencies:

    ```bash
    cd ChatApp
    npm install
    ```

3. Configure Firebase:

    - Create a new Firebase project at [https://console.firebase.google.com](https://console.firebase.google.com)
    - Enable Firebase Authentication and Firestore in your project settings
    - Copy the Firebase configuration object from your project settings

4. Update Firebase configuration:

    - Open `src/firebase.js` and replace the existing Firebase configuration with your own

5. Start the app:

    ```bash
    npm start
    ```

## Usage

- Sign up or log in to start using the app
- Once logged in, you can start sending and receiving messages in real-time

## Contributing

Contributions are welcome! If you find any bugs or have suggestions for improvements, please open an issue or submit a pull request.

