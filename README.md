# 🌐 Personal Portfolio Website

A **fully responsive, visually appealing, and interactive multi-page portfolio website** built with **pure HTML5, CSS3, and vanilla JavaScript** — with **no frameworks, libraries, or build tools** used. Every feature is hand-coded and well-commented for clarity and maintainability.

---

## 📁 Folder Structure

```
portfolio/
├── index.html
├── about.html
├── project1.html
├── project2.html
├── certification1.html
├── certification2.html
├── css/
│   └── style.css
├── js/
│   └── script.js
├── images/
│   ├── profile.jpg
│   ├── projects/
│   │   └── project1.png
│   └── certificates/
│       └── cert1.jpg
├── assets/
│   └── resume.pdf
├── icons/
│   └── github.svg, linkedin.svg, email.svg, twitter.svg
```

---

## 🚀 Features

### 🏠 Landing Page (`index.html`)
- Animated tagline with JS typing effect
- Day/Night mode toggle using `localStorage`
- Responsive sticky navbar with smooth scroll & hamburger menu
- CTA buttons for resume, projects, and contact
- Social media icons (LinkedIn, GitHub, Email, Twitter)

### 👤 About Page (`about.html`)
- Personal intro with profile image
- Career objective
- Achievement cards or timeline using CSS Grid/Flexbox

### 🧠 Skills Section
- Categorized: Frontend, Backend, Programming, Tools, Soft Skills
- Skill progress bars & icons with tooltips
- Optional filters: Beginner, Intermediate, Advanced

### 💼 Projects Section
- Filterable project cards (All, C++, Python, Development, Cybersecurity)
- Each card includes image, title, tech stack, and a "View Details" button
- Project detail pages (`projectX.html`) with image slider, GitHub & Live Demo buttons

### 📜 Certifications Section
- Filterable categories: Recognized Certifications & Participation Certificates
- Certification detail pages with:
  - Full image, description, topics learned (or event summary)
  - Verification link / image gallery modal for event photos

### 📩 Contact Section
- Name, Email, Message form
- JS form validation
- `mailto:` integration or success acknowledgment popup
- Repeated social icons

### 🔧 Bonus Features
- Smooth scroll & active section highlights
- Scroll reveal animations using IntersectionObserver
- Back-to-top floating button
- Accessible & semantic markup

---

## 🌗 Dark Mode Support

- Toggle switch with sun/moon icons
- Preferences saved in `localStorage`
- Applies `.dark` class to `<body>` for dark theme
- Smooth transitions using CSS

---

## 🛠️ Built With

- **HTML5** — semantic, accessible structure
- **CSS3** — Flexbox, Grid, animations, transitions
- **JavaScript (ES6)** — DOM manipulation, event handling, filtering, modals, localStorage

---

## ⚙️ How to Use

1. Clone the repo:
   ```bash
   git clone https://github.com/your-username/portfolio.git
   ```

2. Navigate to the folder:
   ```bash
   cd portfolio
   ```

3. Open `index.html` in any browser.

---

## 📸 Screenshots

> _Add screenshots/gifs of your website in different views (desktop, tablet, mobile)._

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

---

## 🙋‍♂️ Author

**Mohd Meraaz**  
Feel free to connect with me:

- 💼 [LinkedIn](https://www.linkedin.com/in/mohdmeraaz08)
- 💻 [GitHub](https://github.com/MdMeraaz08/)
- 📬 Email: meraaz0809@gmail.com

---

> 🚫 **Note:** This project does not use any external libraries or frameworks like Bootstrap, jQuery, Tailwind, React, etc.