<!-- hello -->


---

# 🧮 Air-Compute Calculator

## 📝 Overview

**Air-Compute** is an innovative AI-powered calculator that allows users to solve mathematical problems of any complexity by simply **drawing** them on the screen or **uploading** soft copies. Leveraging **OpenCV** and **Google’s Gemini AI**, the app interprets visual input and returns a **detailed step-by-step solution**.

Inspired by the Apple iPad calculator but with **enhanced functionality and precision**, Air-Compute provides a seamless and interactive way to solve math visually.

---

## ✨ Features

- ✍️ **Draw/Upload Math Problems**:  
  Use your finger to draw any mathematical problem on the screen or upload an image of the problem.

- 🖱️ **Move Around**:  
  Navigate the canvas by lifting **two fingers**.

- 🗑️ **Reset Canvas**:  
  Clear the current drawing by lifting your **thumb**.

- 📤 **Send to AI Model**:  
  Send your visual input to the model for interpretation by lifting your **little finger**.

- 📊 **Detailed Solutions**:  
  The model interprets the input and generates **step-by-step explanations**.

---

## 📋 Requirements

- 🐍 Python 3.x  
- 👁️ OpenCV `4.8.0.74`  
- ➗ Numpy `1.23.5`  
- 🖼️ Pillow `9.3.0`  
- 🤖 Google Generative AI `0.1.0`  
- 🛠️ CVZone `1.5.6`  
- 🌐 Django `4.2`

---

## 🚀 Installation

### 1. Obtain the Gemini API Key
- Visit [Google AI Studio](https://makersuite.google.com/app) to get your **Gemini API key**.

### 2. Install Dependencies
```bash
pip install -r requirements.txt
```

### 3. Configure the API Key
- Open `videoapp/view.py`
- Add your API key where specified.

### 4. Run the Web Application
```bash
python manage.py runserver
```

### 5. Access the App
- Open your browser and go to:  
  [http://127.0.0.1:8000](http://127.0.0.1:8000)

---

## 🎨 Drawing Rules

To interact with the calculator:

- ✍️ **Draw** math problems with the **pointer finger up**.
- 🖱️ **Move** around the canvas by **lifting two fingers**.
- 🗑️ **Erase/Reset** the canvas by **lifting your thumb**.
- 📤 **Send** the drawing to the AI model by **lifting your little finger**.

Once sent, the AI model will interpret the input and display a **detailed mathematical solution**.

---

