# HayoFi - Virtual Card Wallet App

![HayoFi Banner](https://via.placeholder.com/1200x400.png?text=HayoFi+Virtual+Wallet)

**HayoFi** is a premium, modern fintech mobile application developed with **React Native (Expo)**. It is designed to simulate a seamless virtual card wallet experience, offering users a sleek interface to manage their digital finances, viewing transactions, and interacting with virtual cards.

The app features a **Glassmorphism-inspired design system** with a sophisticated dark/light mode toggle, dynamic currency support (₦), and secure biometric authentication.

---

## 📱 Key Features

- **🔐 Biometric Authentication**: Secure / Sign In with **Face ID** and Touch ID support using `expo-local-authentication`.
- **💳 Virtual Cards Hub**: Interactive carousel of virtual Visa/Mastercards. Includes controls to **Freeze Card**, View PIN, and Manage Limits.
- **🌗 Global Theme Support**: Seamless toggle between **Premium Dark Mode** (default) and **Light Mode**. All components (Status Bar, Tab Bar, Backgrounds) adapt dynamically.
- **📊 Interactive Dashboard**:
  - Real-time balance display in **Naira (₦)**.
  - Quick action buttons (Top Up, Send, More).
  - "Recent Activity" preview.
- **🔔 Notifications Center**: A dedicated screen for alerts (Money Received, Security Alerts, etc.) with read/unread states.
- **📜 Activity & Transaction History**: Detailed list of transactions with category icons, date filtering, and search functionality.
- **🎨 Modern UI/UX**:
  - **Glassmorphism**: Blur effects using `expo-blur`.
  - **Animations**: Smooth entry animations using `react-native-reanimated`.
  - **Neumorphic Touches**: Subtle gradients and shadows.

---

## 🛠 Tech Stack

- **Framework**: [React Native](https://reactnative.dev/) (via [Expo SDK 52](https://expo.dev/))
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Routing**: [Expo Router](https://docs.expo.dev/router/introduction/) (File-based routing)
- **Styling**: `StyleSheet` + `expo-linear-gradient` for specific UI effects.
- **Icons**: [Lucide React Native](https://lucide.dev/docs/lucide-react-native)
- **Storage/Auth**: Context API for state management.

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (LTS recommended)
- [Expo Go](https://expo.dev/client) app on your physical device OR an iOS Simulator / Android Emulator.

### Installation

1.  **Clone the repository**:
    ```bash
    git clone https://github.com/demonichacker/HayoFi.git
    cd HayoFi/HayoFiApp
    ```

2.  **Install dependencies**:
    ```bash
    npm install
    # or
    yarn install
    ```

3.  **Start the development server**:
    ```bash
    npx expo start
    ```

4.  **Run the app**:
    - **Physical Device**: Scan the QR code with your camera (iOS) or Expo Go app (Android).
    - **Simulator**: Press `i` for iOS Simulator or `a` for Android Emulator.

---

## 📂 Project Structure

```
/app
  ├── (tabs)           # Main tab navigation (Dashboard, Cards, Activity, Settings)
  ├── auth             # Authentication screens (Sign In, Sign Up)
  ├── _layout.tsx      # Root layout & providers (Theme, Auth)
  ├── notifications.tsx # Independent notification screen
  └── index.tsx        # Landing/Splash screen
/components
  ├── ui               # Reusable UI atoms (Button, ThemedText, GlassView)
  └── CreditCard.tsx   # Complex Credit Card component
/context
  ├── AuthContext.tsx  # Handles login session
  └── ThemeContext.tsx # Handles Light/Dark mode state
/constants
  └── Colors.ts        # Design system color tokens
```

---

## 🖼 Screenshots

| Dashboard (Dark) | Cards (Light) | Activity |
|:---:|:---:|:---:|
| *(Add Screenshot)* | *(Add Screenshot)* | *(Add Screenshot)* |

---

## 🤝 Contributing

Contributions are welcome! Please fork the repository and submit a Pull Request.

1.  Fork the Project
2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the Branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

---

**Built with 💚 by the HayoFi Team**
