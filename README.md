# RenterLenderApp

RenterLenderApp is a React Native application designed to facilitate renting and lending items between users. The app provides a seamless experience for renters and lenders to interact, manage items, and communicate effectively.

## Features

### Authentication
- **Login**: Users can log in using their email and password.
- **Signup**: New users can create an account and save their details to Firebase.

### User Modes
- **Renter Mode**: Users can search for items, add them to their cart, and rent them.
- **Lender Mode**: Users can list items for rent, manage their lent items, and delete posts.

### Navigation
- **Tab Navigation**: Post-login navigation includes Home, Search, Cart, Add, Dashboard, Chat, and Profile screens.
- **Stack Navigation**: Handles authentication screens (Login and Signup).

### Screens
- **Home Screen**: Displays a list of items available for rent.
- **Search Screen**: Allows users to search for items using a search bar with debounce functionality.
- **Cart Screen**: Displays items added to the cart and calculates the total price.
- **Add Screen**: Enables lenders to add new items with images and descriptions.
- **Dashboard Screen**: Shows rented or lent items based on the user mode.
- **Chat Screen**: Facilitates communication between renters and lenders.
- **Profile Screen**: Displays user details and allows switching between Renter and Lender modes.

### Firebase Integration
- **Authentication**: Firebase Authentication is used for login and signup.
- **Firestore**: User data is saved to Firestore during signup.

### Theming
- **Dark Theme**: The app uses a consistent dark theme with accent colors for buttons and text.

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/RenterLenderApp.git
   ```

2. Navigate to the project directory:
   ```bash
   cd RenterLenderApp
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Start the development server:
   ```bash
   npm start
   ```

## Dependencies

The app uses the following major dependencies:
- **React Native**: Framework for building mobile applications.
- **Firebase**: Backend services for authentication and database.
- **React Navigation**: Navigation library for managing screens.
- **Expo**: Development environment for React Native apps.
- **React Native Vector Icons**: Icon library for UI elements.

Refer to the `package.json` file for the complete list of dependencies.

## Folder Structure

- **App.js**: Entry point of the application.
- **Navigation.js**: Handles navigation between screens.
- **Screens**: Contains individual screen components (e.g., HomeScreen, ProfileScreen).
- **Context**: Includes `UserContext` and `AuthContext` for managing global state.
- **FirebaseConfig.js**: Firebase configuration and initialization.
- **Components**: Reusable components like `ThemedText`.

## Firebase Configuration

Ensure you have a Firebase project set up. Replace the Firebase configuration in `firebaseConfig.js` with your own credentials.

## Development

### Run on Android
```bash
npm run android
```

### Run on iOS
```bash
npm run ios
```

### Run on Web
```bash
npm run web
```

## Contributing

Contributions are welcome! Please follow these steps:
1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Submit a pull request with a detailed description of your changes.