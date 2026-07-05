# 🫁 Pneumonia Detection App

An AI-powered mobile application that detects **Pneumonia** from **Chest X-ray images** using a **Convolutional Neural Network (CNN)**. The application is built with **React Native** for the frontend and integrates a trained deep learning model to provide fast and accurate predictions.

---

## 📌 Overview

Pneumonia is a serious lung infection that can be life-threatening if not diagnosed early. This project leverages Artificial Intelligence to assist in the early detection of pneumonia by analyzing chest X-ray images.

Users can upload or capture an X-ray image through the mobile application, and the trained CNN model predicts whether the patient is likely to have pneumonia.

---

## ✨ Features

* 🩺 Detects Pneumonia from Chest X-ray images
* 📷 Upload image from gallery or capture using camera
* 🤖 CNN-based deep learning model
* 📱 Cross-platform mobile application using React Native
* 🔐 Firebase Authentication
* ☁️ Cloud-based prediction API
* 📊 Fast and accurate prediction results
* 🎨 Simple and user-friendly interface

---

## 🛠️ Tech Stack

### Mobile Application

* React Native
* JavaScript
* React Navigation

### Artificial Intelligence

* Python
* TensorFlow / Keras
* Convolutional Neural Network (CNN)

### Backend

* Flask API

### Database & Authentication

* Firebase Authentication
* Firebase Storage (if applicable)

### Cloud

* Google Cloud Platform

---

## 📂 Project Structure

```text
Pneumonia-Detection-App/
│
├── android/
├── ios/
├── src/
│   ├── components/
│   ├── screens/
│   ├── navigation/
│   ├── services/
│   └── assets/
│
├── App.js
├── package.json
└── README.md
```

---

## 🚀 Installation

### 1. Clone the Repository

```bash
git clone https://github.com/adeel-hussain786/Pneumonia-Detection-App.git
```

### 2. Navigate to the Project Folder

```bash
cd Pneumonia-Detection-App
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Start Metro

```bash
npm start
```

### 5. Run the Application

#### Android

```bash
npm run android
```

#### iOS

```bash
npm run ios
```

---

## 🧠 Model Workflow

1. User uploads or captures a Chest X-ray image.
2. The image is preprocessed.
3. The CNN model analyzes the image.
4. The model predicts:

   * **Normal**
   * **Pneumonia**
5. The prediction is displayed to the user.

---

## 📊 Dataset

The CNN model is trained using publicly available Chest X-ray datasets containing:

* Normal Chest X-rays
* Pneumonia Chest X-rays

---

## 📸 Screenshots

<table>
<tr>
<td align="center">
<img src="https://github.com/user-attachments/assets/0351cba6-2f2b-4a95-b8ee-4494333c0a51" width="180"/>
<br><b>Home</b>
</td>

<td align="center">
<img src="https://github.com/user-attachments/assets/f29cb51a-92b4-46b0-9dd7-28b2616157a3" width="180"/>
<br><b>Prediction</b>
</td>

<td align="center">
<img src="https://github.com/user-attachments/assets/28e8423f-d77d-4fad-b363-94e3e1808c41" width="180"/>
<br><b>Result</b>
</td>

<td align="center">
<img src="https://github.com/user-attachments/assets/eec8fdbe-4461-4d50-81c0-64de42e4edf3" width="180"/>
<br><b>History</b>
</td>

<td align="center">
<img src="https://github.com/user-attachments/assets/1c5bcd68-3c4d-4532-ad3d-e2bfa0b03bd7" width="180"/>
<br><b>Profile</b>
</td>
</tr>
</table>

```

---

## 🎯 Future Improvements

* Multi-class disease detection
* Improved CNN architecture
* Explainable AI (Grad-CAM)
* Offline inference using TensorFlow Lite
* Patient history management
* Doctor dashboard
* Performance analytics

---

## 👨‍💻 Author

**Adeel Hussain**

* BS Computer Science
* AI/ML Developer
* Full Stack Developer
* React Native Developer

GitHub: https://github.com/adeel-hussain786

---

## 📄 License

This project is intended for educational and research purposes.

---

## ⭐ Support

If you found this project helpful, please consider giving it a **⭐ Star** on GitHub.
