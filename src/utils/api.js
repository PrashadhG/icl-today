import axios from 'axios';

const API_URL = "https://api.icl.today/api";
//sample daw 

// Create an axios instance with common configuration
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Infoziant Mock Course APIs
const MockCourses = [
  {
    "_id": "693570fe74010598c3968435",
    "title": "Generative AI Engineering",
    "subtitle": "Build Intelligent AI Applications",
    "description": "Learn how to design and build real-world Generative AI applications using Large Language Models, prompt engineering, vector databases, and RAG architectures. This course covers the entire pipeline from AI fundamentals to deploying AI-powered products.",
    "price": 2500,
    "image": "https://assets.aboutamazon.com/dims4/default/aad143f/2147483647/strip/true/crop/4093x2304+7+0/resize/2480x1396!/format/webp/quality/90/?url=https%3A%2F%2Famazon-blogs-brightspot.s3.amazonaws.com%2F36%2F59%2Feba4adcc4f88a972b5639ed1dde0%2Fadobestock-712831308.jpeg",
    "instructor": "AI Engineering Experts",
    "duration": "45 Days (1.5 Hours/Day)",
    "level": "Advanced",

    "topics": [
      "Introduction to Artificial Intelligence",
      "Understanding Generative AI Concepts",
      "Large Language Models (LLMs)",
      "Prompt Engineering Techniques",
      "AI APIs and Model Integration",
      "Embeddings and Vector Databases",
      "Retrieval-Augmented Generation (RAG)",
      "Building AI-Powered Applications",
      "AI Application Deployment",
      "Best Practices for AI Systems"
    ],

    "benefits": [
      "Hands-On Generative AI Development",
      "Expert-Led AI Engineering Sessions",
      "Build Production-Level AI Applications",
      "Live Mentor Support",
      "Career Opportunities: AI Engineer, GenAI Developer, LLM Engineer",
      "Career Opportunities: Machine Learning Engineer, AI Product Developer"
    ],

    "curriculum": [
      {
        "title": "Introduction to Artificial Intelligence",
        "lessons": [
          { "title": "Overview of AI and Machine Learning", "duration": "1 hour" }
        ]
      },
      {
        "title": "Introduction to Generative AI",
        "lessons": [
          { "title": "What is Generative AI and How it Works", "duration": "1 hour" }
        ]
      },
      {
        "title": "Applications of Generative AI",
        "lessons": [
          { "title": "Real-world Use Cases of Generative AI", "duration": "1 hour" }
        ]
      },
      {
        "title": "Understanding Large Language Models",
        "lessons": [
          { "title": "How LLMs Work", "duration": "1 hour" }
        ]
      },
      {
        "title": "Tokens and Transformers",
        "lessons": [
          { "title": "Tokenization and Transformer Architecture", "duration": "1 hour" }
        ]
      },
      {
        "title": "Prompt Engineering Basics",
        "lessons": [
          { "title": "Introduction to Prompt Engineering", "duration": "1 hour" }
        ]
      },
      {
        "title": "Advanced Prompting",
        "lessons": [
          { "title": "Zero-shot and Few-shot Prompt Techniques", "duration": "1 hour" }
        ]
      },
      {
        "title": "AI API Integration",
        "lessons": [
          { "title": "Using AI APIs in Applications", "duration": "1 hour" }
        ]
      },
      {
        "title": "Building AI Chat Applications",
        "lessons": [
          { "title": "Creating a Basic AI Chatbot", "duration": "1 hour" }
        ]
      },
      {
        "title": "Embeddings Explained",
        "lessons": [
          { "title": "Understanding Text Embeddings", "duration": "1 hour" }
        ]
      },
      {
        "title": "Vector Databases",
        "lessons": [
          { "title": "Working with FAISS and Pinecone", "duration": "1 hour" }
        ]
      },
      {
        "title": "Semantic Search",
        "lessons": [
          { "title": "Building Semantic Search with Embeddings", "duration": "1 hour" }
        ]
      },
      {
        "title": "Retrieval-Augmented Generation",
        "lessons": [
          { "title": "Introduction to RAG Systems", "duration": "1 hour" }
        ]
      },
      {
        "title": "Building a RAG Application",
        "lessons": [
          { "title": "Combining LLMs with Knowledge Bases", "duration": "1 hour" }
        ]
      },
      {
        "title": "AI Project and Deployment",
        "lessons": [
          { "title": "Building and Deploying an AI Application", "duration": "1 hour" }
        ]
      }
    ],

    "rating": 4.9,
    "enrollmentCount": 2643,
    "featured": true
  },

  {
    "_id": "693570fe74010598c3968470",
    "title": "Mern Stack Development",
    "subtitle": "Build Modern Web Applications",
    "description": "Learn to build complete web applications using the MERN stack. This course covers frontend development, backend APIs, database design, and deployment, enabling you to build and launch real-world full stack applications.",
    "price": 2500,
    "image": "https://media2.dev.to/dynamic/image/width=1000,height=420,fit=cover,gravity=auto,format=auto/https%3A%2F%2Fdev-to-uploads.s3.amazonaws.com%2Fuploads%2Farticles%2F88lvz3rpqrqp1714t914.png",
    "instructor": "Full Stack Engineering Experts",
    "duration": "15 Hours (1 Hour/Day)",
    "level": "Beginner",

    "topics": [
      "Introduction to Web Development",
      "HTML Fundamentals",
      "CSS and Responsive Design",
      "Modern JavaScript (ES6+)",
      "Version Control with Git",
      "GitHub Collaboration",
      "React.js Fundamentals",
      "React Hooks and Component Architecture",
      "Backend Development with Node.js",
      "Building APIs with Express.js",
      "MongoDB Database Design",
      "CRUD Operations with MongoDB",
      "REST API Development",
      "Frontend and Backend Integration",
      "Application Deployment"
    ],

    "benefits": [
      "Hands-On Full Stack Development",
      "Learn Industry-Standard MERN Stack",
      "Build Real-World Web Applications",
      "Live Mentor Support",
      "Career Opportunities: Full Stack Developer, MERN Stack Developer",
      "Career Opportunities: Frontend Developer, Backend Developer, Web Engineer"
    ],

    "curriculum": [
      {
        "title": "Introduction to Web Development",
        "lessons": [
          { "title": "Overview of Web Development and Internet Fundamentals", "duration": "1 hour" },
          { "title": "Frontend vs Backend vs Full Stack Development", "duration": "1 hour" }
        ]
      },
      {
        "title": "HTML Fundamentals",
        "lessons": [
          { "title": "HTML Structure, Elements, and Semantic Tags", "duration": "1 hour" },
          { "title": "Forms, Inputs, and Best Practices in HTML", "duration": "1 hour" }
        ]
      },
      {
        "title": "CSS & Responsive Design",
        "lessons": [
          { "title": "CSS Basics, Layout Systems, and Flexbox", "duration": "1 hour" },
          { "title": "Responsive Design with Media Queries", "duration": "1 hour" }
        ]
      },
      {
        "title": "Modern JavaScript",
        "lessons": [
          { "title": "JavaScript Fundamentals and ES6 Features", "duration": "1 hour" },
          { "title": "DOM Manipulation and Event Handling", "duration": "1 hour" }
        ]
      },
      {
        "title": "Version Control with Git",
        "lessons": [
          { "title": "Git Basics, Repositories, and Version Tracking", "duration": "1 hour" }
        ]
      },
      {
        "title": "GitHub Collaboration",
        "lessons": [
          { "title": "Working with GitHub, Branching, and Pull Requests", "duration": "1 hour" }
        ]
      },
      {
        "title": "React.js Fundamentals",
        "lessons": [
          { "title": "Introduction to React and Component-Based Architecture", "duration": "1 hour" },
          { "title": "JSX, Props, and State Management", "duration": "1 hour" }
        ]
      },
      {
        "title": "Advanced React Development",
        "lessons": [
          { "title": "React Hooks and Component Lifecycle", "duration": "1 hour" },
          { "title": "Building Interactive UI with React", "duration": "1 hour" }
        ]
      },
      {
        "title": "Backend Development with Node.js",
        "lessons": [
          { "title": "Introduction to Node.js and Server Fundamentals", "duration": "1 hour" }
        ]
      },
      {
        "title": "Express.js Framework",
        "lessons": [
          { "title": "Building APIs using Express.js", "duration": "1 hour" }
        ]
      },
      {
        "title": "Database Design with MongoDB",
        "lessons": [
          { "title": "Introduction to MongoDB and NoSQL Databases", "duration": "1 hour" },
          { "title": "CRUD Operations with MongoDB", "duration": "1 hour" }
        ]
      },
      {
        "title": "REST API Development",
        "lessons": [
          { "title": "Designing RESTful APIs with Node.js and Express", "duration": "1 hour" }
        ]
      },
      {
        "title": "API Integration",
        "lessons": [
          { "title": "Connecting React Frontend with Backend APIs", "duration": "1 hour" }
        ]
      },
      {
        "title": "Application Deployment",
        "lessons": [
          { "title": "Deploying Full Stack Applications to Production", "duration": "1 hour" }
        ]
      }
    ],

    "rating": 4.8,
    "enrollmentCount": 2180,
    "featured": true
  },

  {
    "_id": "693570fe74010598c3968499",
    "title": "Cybersecurity & Ethical Hacking Fundamentals",
    "subtitle": "Learn to Identify and Report Security Vulnerabilities",
    "description": "Learn the fundamentals of cybersecurity and ethical hacking with a focus on web application security. This course covers internet architecture, common vulnerabilities, security testing environments, and responsible vulnerability disclosure practices used by professional security researchers.",
    "price": 2500,
    "image": "https://www.archtis.com/wp-content/uploads/2021/07/NC_Protect-Dropbox_Nutanix_FileShares-Header.jpg",
    "instructor": "Cybersecurity Experts",
    "duration": "15 Hours (1 Hour/Day)",
    "level": "Beginner to Intermediate",

    "topics": [
      "Introduction to Cybersecurity",
      "Internet and Web Fundamentals",
      "Introduction to Ethical Hacking",
      "Web Application Architecture",
      "Security Testing Environment Setup",
      "Web Application Vulnerabilities",
      "Common Security Threats",
      "Vulnerability Discovery Process",
      "Vulnerability Disclosure Programs (VDP)",
      "Bug Bounty Platforms",
      "Security Testing Methodologies",
      "Writing Professional Security Reports",
      "Responsible Disclosure",
      "Submitting Vulnerabilities",
      "Building a Career in Cybersecurity"
    ],

    "benefits": [
      "Hands-On Cybersecurity Training",
      "Understand Ethical Hacking Methodologies",
      "Learn Real-World Vulnerability Discovery",
      "Live Mentor Support",
      "Career Opportunities: Security Analyst, Ethical Hacker, Bug Bounty Hunter",
      "Career Opportunities: Cybersecurity Researcher, Security Tester"
    ],

    "curriculum": [
      {
        "title": "Introduction to Cybersecurity",
        "lessons": [
          { "title": "Overview of Cybersecurity and Digital Threat Landscape", "duration": "1 hour" },
          { "title": "Importance of Cybersecurity in Modern Systems", "duration": "1 hour" }
        ]
      },
      {
        "title": "Internet and Web Fundamentals",
        "lessons": [
          { "title": "How the Internet Works: DNS, HTTP, and HTTPS", "duration": "1 hour" },
          { "title": "Client-Server Architecture and Web Communication", "duration": "1 hour" }
        ]
      },
      {
        "title": "Introduction to Ethical Hacking",
        "lessons": [
          { "title": "What is Ethical Hacking and Responsible Security Testing", "duration": "1 hour" }
        ]
      },
      {
        "title": "Web Application Architecture",
        "lessons": [
          { "title": "Understanding Frontend, Backend, and Databases in Web Applications", "duration": "1 hour" },
          { "title": "How Web Applications Handle Authentication and Sessions", "duration": "1 hour" }
        ]
      },
      {
        "title": "Security Testing Environment",
        "lessons": [
          { "title": "Setting up a Security Testing Lab", "duration": "1 hour" },
          { "title": "Introduction to Security Testing Tools", "duration": "1 hour" }
        ]
      },
      {
        "title": "Web Application Vulnerabilities",
        "lessons": [
          { "title": "Introduction to Common Web Vulnerabilities", "duration": "1 hour" },
          { "title": "Understanding OWASP Top 10 Security Risks", "duration": "1 hour" }
        ]
      },
      {
        "title": "Vulnerability Discovery",
        "lessons": [
          { "title": "Techniques for Identifying Security Vulnerabilities", "duration": "1 hour" }
        ]
      },
      {
        "title": "Vulnerability Disclosure Programs",
        "lessons": [
          { "title": "Understanding Vulnerability Disclosure Programs (VDP)", "duration": "1 hour" }
        ]
      },
      {
        "title": "Professional Security Reporting",
        "lessons": [
          { "title": "Writing Professional Vulnerability Reports", "duration": "1 hour" }
        ]
      },
      {
        "title": "Vulnerability Submission",
        "lessons": [
          { "title": "Submitting Vulnerabilities to Organizations", "duration": "1 hour" }
        ]
      },
      {
        "title": "Bug Bounty Recognition",
        "lessons": [
          { "title": "Hall of Fame Recognition and Bug Bounty Platforms", "duration": "1 hour" }
        ]
      }
    ],

    "rating": 4.8,
    "enrollmentCount": 1980,
    "featured": true
  },
];

export const getAllMockCourses = async () => {
  try {
    const response = MockCourses;
    console.log(response);

    return response; // return the array directly
  } catch (error) {
    console.error("Error fetching courses:", error);
    throw error;
  }
};

export const getMockCourseById = async (courseId) => {
  try {
    const course = MockCourses.find((c) => c._id === courseId);

    if (!course) {
      throw new Error("Course not found");
    }

    return course;
  } catch (error) {
    console.error(`Error fetching course ${courseId}:`, error);
    throw error;
  }
};


// Kare Course APIs
export const getAllCourses = async () => {
  try {
    const response = await api.get('/courses');
    console.log(response);

    return response.data;
  } catch (error) {
    console.error('Error fetching courses:', error);
    throw error;
  }
};

export const getCourseById = async (courseId) => {
  try {
    const response = await api.get(`/courses/${courseId}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching course ${courseId}:`, error);
    throw error;
  }
};

export const getEnrolledCourses = async () => {
  try {
    const response = await api.get('/courses/user/enrolled');
    return response.data;
  } catch (error) {
    console.error('Error fetching enrolled courses:', error);
    throw error;
  }
};

// Payment APIs
export const createPaymentOrder = async (courseId, email = null, name = null) => {
  try {
    const response = await api.post('/payments/create-order', {
      courseId,
      userEmail: email,
      userName: name
    });
    return response.data;
  } catch (error) {
    console.error('Error creating payment order:', error);
    throw error;
  }
};

export const verifyPayment = async (paymentData) => {
  try {
    const response = await api.post('/payments/verify', paymentData);
    return response.data;
  } catch (error) {
    console.error('Error verifying payment:', error);
    throw error;
  }
};

export const getPaymentHistory = async () => {
  try {
    const response = await api.get('/payments/history');
    return response.data;
  } catch (error) {
    console.error('Error fetching payment history:', error);
    throw error;
  }
};

// User APIs
export const registerUser = async (userData) => {
  try {
    const response = await api.post('/users/register', userData);
    return response.data;
  } catch (error) {
    console.error('Error registering user:', error);
    throw error;
  }
};

export const loginUser = async (credentials) => {
  try {
    const response = await api.post('/users/login', credentials);
    // Save token to localStorage
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
    }
    return response.data;
  } catch (error) {
    console.error('Error logging in:', error);
    throw error;
  }
};

export const getUserProfile = async () => {
  try {
    const response = await api.get('/users/profile');
    return response.data;
  } catch (error) {
    console.error('Error fetching user profile:', error);
    throw error;
  }
};

export const updateUserProfile = async (userData) => {
  try {
    const response = await api.put('/users/profile', userData);
    return response.data;
  } catch (error) {
    console.error('Error updating user profile:', error);
    throw error;
  }
};

// Add updateProfile as an alias for updateUserProfile
export const updateProfile = updateUserProfile;

export const changePassword = async (passwordData) => {
  try {
    const response = await api.put('/users/change-password', passwordData);
    return response.data;
  } catch (error) {
    console.error('Error changing password:', error);
    throw error;
  }
};

// Password reset APIs
export const requestPasswordReset = async (data) => {
  try {
    const response = await api.post('/users/forgot-password', data);
    return response.data;
  } catch (error) {
    console.error('Error requesting password reset:', error);
    throw error;
  }
};

export const verifyResetToken = async (token) => {
  try {
    const response = await api.get(`/users/reset-password/${token}/verify`);
    return response.data;
  } catch (error) {
    console.error('Error verifying reset token:', error);
    throw error;
  }
};

export const resetPassword = async (token, data) => {
  try {
    const response = await api.post(`/users/reset-password/${token}`, data);
    return response.data;
  } catch (error) {
    console.error('Error resetting password:', error);
    throw error;
  }
};

// Email verification APIs
export const verifyEmail = async (token) => {
  try {
    const response = await api.get(`/users/verify-email/${token}`);
    return response.data;
  } catch (error) {
    console.error('Error verifying email:', error);
    throw error;
  }
};

export const resendVerificationEmail = async (data) => {
  try {
    const response = await api.post('/users/resend-verification', data);
    return response.data;
  } catch (error) {
    console.error('Error resending verification email:', error);
    throw error;
  }
};

export const getInquiry = async () => {
  try {
    const response = await api.get('/course-inquiries');
    return response.data;
  } catch (error) {
    console.error('Error fetching inquiries:', error);
    throw error;
  }
};

// Update inquiry status
export const updateInquiryStatus = async (inquiryId, status) => {
  try {
    const response = await api.patch(`/course-inquiries/${inquiryId}/status`, { status });
    return response.data;
  } catch (error) {
    console.error('Error updating inquiry status:', error);
    throw error;
  }
};

// Update payment status
export const updatePaymentStatus = async (inquiryId, paymentStatus, razorpayPaymentId = null) => {
  try {
    const body = { paymentStatus };
    if (razorpayPaymentId) {
      body.razorpayPaymentId = razorpayPaymentId;
    }
    const response = await api.patch(`/course-inquiries/${inquiryId}/payment-status`, body);
    return response.data;
  } catch (error) {
    console.error('Error updating payment status:', error);
    throw error;
  }
};

// Manually verify payment and enroll student
export const manuallyVerifyPayment = async (inquiryId, paymentId = null, notes = null) => {
  try {
    const body = {};
    if (paymentId) body.paymentId = paymentId;
    if (notes) body.notes = notes;

    const response = await api.patch(`/course-inquiries/${inquiryId}/manual-verify`, body);
    return response.data;
  } catch (error) {
    console.error('Error manually verifying payment:', error);
    throw error;
  }
};

// Batch Email System APIs
export const getEmailStats = async () => {
  try {
    const response = await api.get('/course-inquiries/emails/stats');
    return response.data;
  } catch (error) {
    console.error('Error fetching email stats:', error);
    throw error;
  }
};

export const getPendingEmails = async (limit = 100, skip = 0) => {
  try {
    const response = await api.get(`/course-inquiries/emails/pending?limit=${limit}&skip=${skip}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching pending emails:', error);
    throw error;
  }
};

export const sendBatchEmails = async (inquiryIds) => {
  try {
    const response = await api.post('/course-inquiries/emails/send-batch', { inquiryIds });
    return response.data;
  } catch (error) {
    console.error('Error sending batch emails:', error);
    throw error;
  }
};

export const sendAllEmails = async (dryRun = false) => {
  try {
    const response = await api.post('/course-inquiries/emails/send-all', { dryRun });
    return response.data;
  } catch (error) {
    console.error('Error sending all emails:', error);
    throw error;
  }
};

export default api;
