export const experienceData = [
  {
    date: "May 2025 – Present",
    role: "Full Stack Developer",
    company: "Labrys Solutions Pvt Ltd",
    location: "Gurgaon, Haryana",
    companyUrl: "https://labryssolutions.com/",
    description: "Working as a Full Stack Developer at Labrys Solutions and internally transferred to Lapulse Innovations LLP (Dec 2025). Developing IoT-based Energy Management Systems (EMS), enterprise web applications, and payment gateway solutions using React.js, Node.js, MongoDB, MySQL, and Prisma.",
    achievements: [
      "Working as a Full Stack Developer at Labrys Solutions and internally transferred to Lapulse Innovations LLP (Dec 2025) And Developed scalable full-stack applications using React.js, Node.js, Express.js, MongoDB, MySQL, and Prisma.",
      {
        text: "EMS Dashboard",
        // link: "https://soodprints.in/ems/",
          link: "https://ems.smartlynk.net/",
        description: "Built an IoT-based Energy Management System (EMS) for real-time smart meter monitoring, energy usage tracking, recharge management, usage history, and meter administration."
      },
      {
        text: "LeaguePoolStats",
        link: "https://leaguepoolstats.com/",
        description: "Developed tournament management features and integrated APIs for participant, booking, and competition workflows."
      },
      {
        text: "HireIQ",
        link: "https://www.hireiq.in/",
        description: "Built secure backend APIs and implemented recruitment workflows for candidate and hiring lifecycle management."
      },
      "Integrated PayPal and Razorpay payment gateways and explored Westpac HPP integration and payment workflows."
    ],
    technologies: ["React.js", "Node.js", "Express.js", "MongoDB", "MySQL", "Prisma", "PayPal", "Razorpay", "Westpac", "REST APIs"],
    actions: []
  },
  {
    date: "Sep 2024 – Apr 2025",
    role: "Software Development Engineer",
    company: "DigiCraft Pvt Ltd",
    location: "Delhi (Hybrid)",
    companyUrl: "https://digicraft.ai/",
    description: "Enhanced backend scalability and contributed to e-commerce platform development using modern technologies.",
    achievements: [
      "Built shopping cart and order management system from scratch using NestJS and MongoDB based on ONDC protocol specifications, with optimized database queries for improved performance",
      "Designed and implemented Elasticsearch-based search functionality for products by name, category, and location, enhancing product discovery and user experience",
      "Set up complete ONDC protocol integration from scratch—built the buyer application with request/response signing, encryption, and payload validation as per ONDC specifications, while exploring seller-side implementation when no codebase existed"
    ],
    technologies: ["NestJS", "Docker", "MongoDB", "Elasticsearch", "ONDC", "Microservices"],
    actions: [
      { text: "Certificate", icon: "bx-certificate", href: "https://drive.google.com/file/d/1ULYkRzzmVeQ90Gx3Sy1kOVGuW-bnvE3z/view?usp=sharing", secondary: true }
    ]
  },
  {
    date: "Jan 2024 – Mar 2024",
    role: "NodeJS Backend Developer Intern",
    company: "RedCarpet",
    location: "Remote (Gurgaon, Haryana)",
    companyUrl: "http://www.redcarpetup.com/",
    description: "Integrated AI capabilities and developed interactive dashboards for intelligent feature delivery.",
    achievements: [
      "Utilized OpenAI GPT-4 APIs to implement generative AI features for enhanced user experience",
      "Developed interactive dashboards using PostgreSQL, React, Express.js, and Node.js for data visualization",
      "Worked with edgeChain and edgeCloud libraries at arakoo.ai to implement advanced AI-driven solutions",
      "Integrated PostgreSQL databases with Express.js backend for efficient data management and retrieval",
      {
        text: "EdgeChains",
        link: "https://github.com/arakoodev/EdgeChains/graphs/contributors",
        description: "Contributed to EdgeChains library development at arakoo.ai"
      }
    ],
    technologies: ["Node.js", "Express", "PostgreSQL", "React", "OpenAI GPT-4", "EdgeChain", "EdgeCloud"],
    actions: [
      { text: "Certificate", icon: "bx-certificate", href: "https://drive.google.com/file/d/1egn2V9mIuJkTjWCYFJarbfifQd8fok45/view", secondary: true }
    ]
  }
];

export const educationData = [
  {
    date: "2020 – 2024",
    role: "B.Tech in Electrical & Electronics Engineering",
    company: "Bhabha Engineering Research Institute",
    location: "Bhopal, M.P.",
    companyUrl: "https://www.bhabhauniversity.edu.in/institute/2/",
    description: "Completed a comprehensive engineering program, gaining a solid foundation in electronics, electrical systems, and programming fundamentals. This background strengthened my analytical skills and provided a strong technical base.",
    actions: []
  },
  {
    date: "Oct 2022 – Aug 2023",
    role: "Full Stack Web Development",
    company: "Masai School",
    location: "Bengaluru (Online)",
    companyUrl: "https://www.masaischool.com/",
    description: "Intensive 1200+ hours bootcamp covering modern web development technologies, algorithms, data structures, and full-stack project development. Achieved 95% completion rate with distinction.",
    actions: []
  },
  {
    date: "2017 – 2020",
    role: "Diploma in Electrical Engineering",
    company: "Jamia Millia Islamia",
    location: "Delhi",
    companyUrl: "https://jmi.ac.in/",
    description: "Foundation in electrical engineering principles, circuit design, power systems, and technical problem-solving. Graduated with honors and participated in multiple technical projects.",
    actions: []
  }
];

export const projectsData = [
  {
    title: "Vegy-Food",
    image: "/portimage/vegyFood.png",
    description: "Modern e-commerce platform with Google OAuth & OTP authentication, Nodemailer integration, and Stripe payment gateway. Includes a comprehensive admin dashboard, real-time order tracking, and an automated email notification system for a seamless shopping experience.",
    technologies: ["Node.js", "OAuth", "Express.js", "MongoDB", "React", "Tailwind CSS", "Stripe Payment", "Vercel And Render"],
    links: [
      { text: "Live Demo", icon: "bx-link-external", href: "https://vegy-food.vercel.app/" },
      { text: "Source Code", icon: "bxl-github", href: "https://github.com/MSaifKhan01/Vegy-Food" }
    ]
  },
  {
    title: "FileDrive",
    image: "/portimage/FileDrive.png",
    description: "Cloud-based file management system with AWS S3 integration, secure user authentication, and role-based access control. Users can seamlessly upload, download, and manage files, while admins have full control over user management and additional administrative actions.",
    technologies: ["Node.js", "React", "AWS S3", "MongoDB", "CSS", "Netlify And Render"],
    links: [
      { text: "Live Demo", icon: "bx-link-external", href: "https://myfile-drive3.netlify.app/" },
      { text: "Source Code", icon: "bxl-github", href: "https://github.com/MSaifKhan01/FileDrive-Management-AWS" }
    ]
  },
  {
    title: "EduTaskHub",
    image: "/portimage/Edutaskhub.png",
    description: "Educational platform connecting students and instructors with features like course enrollment, interactive learning modules, and comprehensive course management tools. Includes an admin panel for managing courses, users, and platform activities.",
    technologies: ["Angular", "Django", "Python", "PostgreSQL", "Tailwind CSS", "Netlify And Render"],
    links: [
      { text: "Live Demo", icon: "bx-link-external", href: "https://edutaskhub-gi201.netlify.app/" },
      { text: "Source Code", icon: "bxl-github", href: "https://github.com/MSaifKhan01/EduTaskHub" }
    ]
  },
  {
    title: "Weather App",
    image: "/portimage/weatherApp.png",
    description: "Comprehensive weather application with city-based search, JWT authentication, rate limiting for API calls, and detailed weather forecasting with interactive UI.",
    technologies: ["React.js", "Express", "MongoDB", "Weather API", "Tailwind CSS", "Vercel And Render"],
    links: [
      { text: "Live Demo", icon: "bx-link-external", href: "https://weather-app-5038.vercel.app/" },
      { text: "Source Code", icon: "bxl-github", href: "https://github.com/MSaifKhan01/WEATHER-APP" }
    ]
  },
  {
    title: "My URL Shortner",
    image: "/portimage/urlShortner.png",
    description: "My URL Shortner project simplifies URL shortening, making long URLs more shareable on social media, emails, and beyond.",
    technologies: ["React.js", "Tailwind CSS", "Node.js", "Express", " MongoDB Atlas", "Responsive", "Vercel And Render"],
    links: [
      { text: "Live Demo", icon: "bx-link-external", href: "https://url-shortner-ten-sigma.vercel.app/" },
      { text: "Source Code", icon: "bxl-github", href: "https://github.com/MSaifKhan01/URL-Shortner/tree/main" }
    ]
  },
  {
    title: "MirrorMate",
    image: "/images/MirrorMate.jpg",
    description: "MirrorMate is a VideoCall, screen share and messaging website where users can seamlessly connect, chat, make video calls, and share their screens in real-time. Collaborative project built by a team of 5 members in 5 days.",
    technologies: ["HTML5", "CSS3", "JavaScript", "Socket.IO", "WebRTC", "Node.js", "Express", "Responsive", "Netlify And Render"],
    links: [
      { text: "Live Demo", icon: "bx-link-external", href: "https://mirror-meet.netlify.app" },
      { text: "Source Code", icon: "bxl-github", href: "https://github.com/MSaifKhan01/MirrorMate" }
    ]
  },
  {
    title: "TAK-Store",
    image: "/portimage/Tak.png",
    description: "Feature-rich e-commerce application with OAuth authentication, advanced search functionality, shopping cart management, and integrated payment processing system.",
    technologies: ["Node.js", "Express", "HTML5", "CSS", "MongoDB", "OAuth", "Netlify And Render"],
    links: [
      { text: "Live Demo", icon: "bx-link-external", href: "https://tak-store.netlify.app" },
      { text: "Source Code", icon: "bxl-github", href: "https://github.com/MSaifKhan01/polite-teeth-64" }
    ]
  },
  {
    title: "COOL-CLOTH",
    image: "https://user-images.githubusercontent.com/63779583/221470810-0d7cb71f-f97e-44a7-afcb-6a2b87ca40e4.png",
    description: "COOL-CLOTH is an E-Commerce website that sells a variety of products like clothes, shoes, etc. Collaborative project built by a team of 5 members in 5 days.",
    technologies: ["HTML5", "CSS3", "JavaScript", "REST API", "Responsive", "Netlify And Cyclic"],
    links: [
      { text: "Live Demo", icon: "bx-link-external", href: "https://bucolic-malasada-a43ddd.netlify.app/" },
      { text: "Source Code", icon: "bxl-github", href: "https://github.com/MSaifKhan01/COOL-CLOTH" }
    ]
  },
  {
    title: "TODO App",
    image: "/portimage/TODO.png",
    description: "TODO App is a React.js TODO App featuring components for product management, user profiles, and authentication.",
    technologies: ["React.js", "CSS", "Node.js", "Express", " MongoDB Atlas", "Responsive"],
    links: [
      { text: "Live Demo", icon: "bx-link-external", href: "https://todo5038.netlify.app/" },
      { text: "Source Code", icon: "bxl-github", href: "https://github.com/MSaifKhan01/TODO-ReactApp-01" }
    ]
  },
  {
    title: "E-Store",
    image: "/images/firstProject.jpg",
    description: "This is an E-Commerce Web where you can buy electrical and electronics appliances. Individual project built in 5 days.",
    technologies: ["HTML", "CSS", "JavaScript", "Responsive"],
    links: [
      { text: "Live Demo", icon: "bx-link-external", href: "https://iridescent-moonbeam-f50f3a.netlify.app" },
      { text: "Source Code", icon: "bxl-github", href: "https://github.com/MSaifKhan01/parsimonious-clover-8073" }
    ]
  }
];

export const skillsData = [
  { name: "HTML5", icon: "https://www.vectorlogo.zone/logos/w3_html5/w3_html5-ar21.svg" },
  { name: "CSS3", icon: "https://www.vectorlogo.zone/logos/w3_css/w3_css-ar21.svg" },
  { name: "JavaScript", icon: "https://www.vectorlogo.zone/logos/javascript/javascript-ar21.svg" },
  { name: "TypeScript", icon: "https://www.vectorlogo.zone/logos/typescriptlang/typescriptlang-ar21.svg" },
  { name: "Node.js", icon: "https://www.vectorlogo.zone/logos/nodejs/nodejs-ar21.svg" },
  { name: "Express.js", icon: "https://www.vectorlogo.zone/logos/expressjs/expressjs-ar21.svg" },
  { name: "React", icon: "https://www.vectorlogo.zone/logos/reactjs/reactjs-ar21.svg" },
  { name: "Redux Toolkit", icon: "https://redux-toolkit.js.org/img/redux.svg" },
  { name: "MongoDB", icon: "https://www.vectorlogo.zone/logos/mongodb/mongodb-ar21.svg" },
  { name: "Python", icon: "https://www.vectorlogo.zone/logos/python/python-ar21.svg" },
  { name: "Postman", icon: "https://www.vectorlogo.zone/logos/getpostman/getpostman-ar21.svg" },
  { name: "Docker", icon: "https://www.vectorlogo.zone/logos/docker/docker-ar21.svg" },
  { name: "Redis", icon: "https://www.vectorlogo.zone/logos/redis/redis-ar21.svg" },
  { name: "NestJS", icon: "https://www.vectorlogo.zone/logos/nestjs/nestjs-icon.svg" },
  { name: "MySQL", icon: "https://www.vectorlogo.zone/logos/mysql/mysql-ar21.svg" },
  { name: "Elasticsearch", icon: "https://www.vectorlogo.zone/logos/elastic/elastic-ar21.svg" }
];