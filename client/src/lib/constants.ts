export const PERSONAL_INFO = {
  name: "Duraisamy R",
  title: "Data Science Enthusiast",
  email: "duraisamyr0706@gmail.com",
  phone: "+91 9443487229",
  location: "Madurai, Tamil Nadu",
  age: 22,
  education: "M.Sc Data Science (Pursuing) - TCE Madurai",
  languages: ["Tamil", "English"],
  github: "https://github.com/DURAI0706",
  linkedin: "https://www.linkedin.com/in/duraisamy-r070603/",
  medium: "https://medium.com/@duraisamyr0706",
  objective: "Aspiring data science professional eager to contribute my strong analytical skills, hands-on project experience, and continuous learning attitude to a dynamic organization. Committed to overcoming academic challenges and leveraging practical knowledge to deliver meaningful solutions.",
  hobbies: [
    { name: "Photography", icon: "fas fa-camera", description: "Capturing candid moments and artistic perspectives" },
    { name: "Script Writing", icon: "fas fa-pen-fancy", description: "Crafting engaging narratives and dialogue for films" },
    { name: "Gaming", icon: "fas fa-gamepad", description: "Strategy games and problem-solving challenges" },
    { name: "Travel", icon: "fas fa-map-marked-alt", description: "Exploring new places and cultures" },
    { name: "Coding", icon: "fas fa-code", description: "Building innovative projects and learning new technologies" },
    { name: "Reading", icon: "fas fa-book", description: "Technical blogs, sci-fi novels, and research papers" },
    { name: "Music", icon: "fas fa-music", description: "Listening to various genres while coding" },
    { name: "Fitness", icon: "fas fa-dumbbell", description: "Maintaining physical and mental well-being" }
  ]
};

export const TYPING_ROLES = [
  "Data Science Enthusiast",
  "Machine Learning Developer", 
  "Web Technology Explorer",
  "Analytical Problem Solver"
];

export const SKILLS = {
  programming: [
    { name: "Python", level: 85 },
    { name: "C++", level: 70 },
    { name: "Java", level: 60 }
  ],
  frontend: [
    { name: "HTML/CSS", level: 80 },
    { name: "JavaScript", level: 75 },
    { name: "React", level: 65 }
  ],
  backend: [
    { name: "MySQL", level: 75 },
    { name: "Flask", level: 70 },
    { name: "MongoDB", level: 65 }
  ],
  ml: [
    { name: "Machine Learning", level: 80 },
    { name: "Data Analysis", level: 85 },
    { name: "Predictive Modeling", level: 75 }
  ]
};

export const PROJECTS = [
  {
    id: 1,
    title: "RL Learning Simulator",
    period: "Feb 2025 - Jun 2025",
    description: "Custom Reinforcement Learning simulator with Flask web interface for visualizing agent-environment interactions and algorithm evaluation with Monte Carlo experimentation.",
    technologies: ["Python", "Flask", "RL", "Monte Carlo"],
    icon: "fas fa-robot",
    color: "cyber-blue",
    github: "https://github.com/DURAI0706/RL-Learning-Simulator"
  },
  {
    id: 2,
    title: "Top3Buzz",
    period: "Feb 2025",
    description: "Real-time multi-device buzzer system for quiz competitions with vibrant retro gaming UI. Perfect for team-based competitions and interactive events.",
    technologies: ["Web", "Real-time", "Gaming UI"],
    icon: "fas fa-gamepad",
    color: "success-green",
    github: "https://github.com/DURAI0706/Top3Buzz"
  },
  {
    id: 3,
    title: "Sales Analytics Dashboard",
    period: "Feb 2025 - Apr 2025",
    description: "Interactive Streamlit dashboard for 'Bun Butter Jam' bakery with Plotly visualizations, dynamic filtering, and seasonal trend analysis.",
    technologies: ["Streamlit", "Plotly", "Pandas"],
    icon: "fas fa-chart-line",
    color: "cyber-purple",
    github: "https://github.com/DURAI0706/Bun-Butter-Jam-"
  },
  {
    id: 4,
    title: "Customer Churn Prediction",
    period: "Jun 2024 - Jul 2024",
    description: "Predictive model using logistic regression and ensemble techniques to identify at-risk customers and improve retention strategies with real-world data.",
    technologies: ["ML", "Python", "Scikit-learn"],
    icon: "fas fa-users",
    color: "cyber-blue",
    github: "https://github.com/DURAI0706/telecom_churn_prediction_site"
  },
  {
    id: 5,
    title: "Gamified Learning Platform",
    period: "Dec 2023 - Apr 2024",
    description: "Interactive educational website with gamified experiences and ML-powered learning level prediction for personalized content and adaptive difficulty.",
    technologies: ["Web Dev", "ML", "Gamification"],
    icon: "fas fa-graduation-cap",
    color: "cyber-purple",
    github: "https://github.com/DURAI0706/TLB-TCE"
  },
  {
    id: 6,
    title: "Car Rental Website",
    period: "Feb 2023 - Apr 2023",
    description: "Dynamic car rental platform with PHP backend, featuring user authentication, real-time booking, vehicle catalog management, and admin controls.",
    technologies: ["PHP", "MySQL", "Web"],
    icon: "fas fa-car",
    color: "success-green",
    github: "https://github.com/DURAI0706/carrental-in-php"
  },
  {
    id: 7,
    title: "Workplace Stress Prediction",
    period: "Feb 2023 - Apr 2023",
    description: "ML model analyzing HR data to predict employee stress levels using Random Forest and SVM with visual dashboards for actionable insights.",
    technologies: ["ML", "HR Analytics", "SVM"],
    icon: "fas fa-heartbeat",
    color: "error-red",
    github: "https://github.com/DURAI0706/Predicting-Workplace-Stress-Levels-Using-Machine-Learning-and-HR-Data-Analysis"
  },
  {
    id: 8,
    title: "CPU Instruction Cycle Simulator",
    period: "Sep 2022 - Nov 2022",
    description: "Simulated CPU's fetch-decode-execute cycle using low-level logic to enhance understanding of computer organization and microprocessor fundamentals.",
    technologies: ["Computer Architecture", "Logic Design"],
    icon: "fas fa-microchip",
    color: "cyber-blue",
    github: "https://github.com/DURAI0706/Fetch-decode-execute-cycle"
  }
];

export const TIMELINE_ITEMS = [
  {
    id: 1,
    type: "education",
    title: "M.Sc Data Science",
    organization: "Thiagarajar College of Engineering",
    period: "2021 - 2024 (Pursuing)",
    description: "5-Year Integrated M.Sc in Data Science with focus on Machine Learning, Statistical Analysis, and Programming",
    side: "left",
    color: "cyber-blue"
  },
  {
    id: 2,
    type: "internship",
    title: "Text-to-SQL RAG Intern",
    organization: "COATS, Madurai",
    period: "Jun 2024 - Dec 2024",
    description: "Developed natural language to SQL conversion using RAG and LLMs. Implemented context-aware retrieval pipelines and prompt engineering techniques.",
    side: "right",
    color: "cyber-purple"
  },
  {
    id: 3,
    type: "internship",
    title: "ML Research Intern",
    organization: "Corizo, Bengaluru",
    period: "Oct 2022 - Nov 2022",
    description: "Built handwritten digit recognition system using MNIST dataset. Gained experience in data preprocessing, feature extraction, and model evaluation.",
    side: "left",
    color: "success-green"
  },
  {
    id: 4,
    type: "education",
    title: "Higher Secondary Education",
    organization: "Mahatma Montessori School CBSE",
    period: "2019 - 2021",
    description: "Completed Class XII (76.4%) and Class X (69.4%) with strong foundation in Mathematics and Science",
    side: "right",
    color: "gray"
  }
];

export const STATS = [
  { label: "Projects Completed", value: 8, suffix: "+" },
  { label: "Internships", value: 2, suffix: "+" },
  { label: "GitHub Repositories", value: 15, suffix: "+" },
  { label: "Hackathons", value: 4, suffix: "+" }
];
