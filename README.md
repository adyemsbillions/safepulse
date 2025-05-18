# Silent Alarm App

## 📌 Overview

The **Silent Alarm App** is a security-focused mobile application that allows users to send discreet alerts in emergency situations. Built with **React Native**, **Firebase**, and **Stripe**, it ensures user safety by providing a silent distress signal to pre-selected contacts or authorities.

🚧 **This project is still under development.** 🚧  
Contributions and donations are welcome! See below for details.

## Features (Planned & Implemented)

- **Silent Alert System** – Send emergency alerts without making a sound.
- **Authentication** – Secure login with Firebase.
- **Location Sharing** – Optionally share location with emergency contacts.
- **Push Notifications** – Notify selected contacts instantly.
- **Subscription System** – Monetized using **Stripe**.
- **Smooth UI/UX** – Designed with **Figma**.
- **Built with Expo** – Fast development with live reloading.

## 🛠️ Tech Stack

- **React Native (Expo)**
- **Firebase (Authentication, Firestore)**
- **Stripe (Payments)**
- **Figma (UI/UX Design)**
- **Node.js (Backend, if needed)**
- **TypeScript (For type safety)**
- **Framer Motion (Animations, if applicable)**

## 📂 Folder Structure

```
SilentAlarmApp/
│── src/
│   ├── components/
│   ├── screens/
│   ├── services/
│   ├── utils/
│   ├── context/
│── assets/
│── App.js
│── package.json
│── firebaseConfig.js
│── .gitignore
│── README.md
```

## 🔧 Installation & Setup

### 1️⃣ Clone the Repository

```sh
 git clone https://github.com/SteeveSticks/SILENT-ALARM-APP.git
 cd silent-alarm-app
```

### 2️⃣ Install Dependencies

```sh
 npm install  # or yarn install
```

### 3️⃣ Configure Firebase

- Create a Firebase project at [Firebase Console](https://console.firebase.google.com/).
- Enable **Firestore**, **Authentication**, and **Cloud Functions**.
- Get your `firebaseConfig` and add it to `firebaseConfig.js`.

### 4️⃣ Set Up Stripe

- Create a Stripe account at [Stripe](https://stripe.com/).
- Get your **API keys** and add them to your environment variables.

### 5️⃣ Start the App

```sh
npx expo start  # Starts the Expo development server
```

## 🚀 Deployment

To deploy your app, use **EAS Build** from Expo:

```sh
 eas build -p android --profile production
```

Or for iOS:

```sh
 eas build -p ios --profile production
```

## 🏆 Future Improvements

- Add AI-based threat detection.
- Multi-device synchronization.
- Offline mode with local storage.

## 💡 Contributing

Contributions are welcome! If you'd like to add features or fix bugs:

1. **Fork** the repo

2. **Create a new branch** (feature-xyz)

3. **Make changes and commit**

4. **Open a Pull Request**

If you need guidance, feel free to ask! 🙌

## 💰 Support the Project

If you’d like to support this project, you can:

1. Sponsor development – Contact me via email or Twitter.

2. Buy me a coffee ☕

3. Share the project – Spread the word!

## 📞 Contact

[![Twitter](https://img.shields.io/badge/Twitter-%40AdebanjoSt63916-blue?style=flat&logo=twitter)](https://x.com/adyemsbillions)

📧 [adyemsgodlove@gmail.com](mailto:adyemsgodlove@gmail.com)

## 📄 License

This project is licensed under the **MIT License**.
