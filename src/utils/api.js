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
 "description": "This program provides a comprehensive introduction to Generative AI and modern AI engineering practices. You will learn how Large Language Models (LLMs) work, how to design effective prompts, and how to build intelligent applications using AI APIs. The course covers embeddings, vector databases, and Retrieval-Augmented Generation (RAG) architectures used in modern AI systems. By the end of the program, you will build real-world AI-powered applications such as chatbots, semantic search systems, and intelligent assistants. The course also focuses on deploying AI solutions and understanding best practices for building scalable and production-ready AI systems.",
  "price": 2500,
  "image": "https://assets.aboutamazon.com/dims4/default/aad143f/2147483647/strip/true/crop/4093x2304+7+0/resize/2480x1396!/format/webp/quality/90/?url=https%3A%2F%2Famazon-blogs-brightspot.s3.amazonaws.com%2F36%2F59%2Feba4adcc4f88a972b5639ed1dde0%2Fadobestock-712831308.jpeg",
  "instructor": "AI Engineering Experts",
  "duration": "15 Days (1 Hour/Day)",
  "level": "Beginner to Advanced",

  "topics": [
    "Foundations of Artificial Intelligence",
    "Generative AI Concepts",
    "Large Language Models (LLMs)",
    "Prompt Engineering Techniques",
    "AI APIs and Model Integration",
    "Embeddings and Vector Databases",
    "Retrieval-Augmented Generation (RAG)",
    "Building AI Applications"
  ],

  "benefits": [
    "Hands-On Generative AI Development",
    "Expert-Led AI Engineering Sessions",
    "Build Production-Level AI Applications",
    "Live Mentor Support",
    "Career Opportunities: AI Engineer, GenAI Developer, LLM Engineer"
  ],

  "curriculum": [
    { "title": "Introduction to Artificial Intelligence", "lessons": [{ "title": "Overview of AI and Machine Learning", "duration": "1 hour" }] },
    { "title": "Generative AI Overview", "lessons": [{ "title": "Understanding Generative AI Systems", "duration": "1 hour" }] },
    { "title": "Applications of Generative AI", "lessons": [{ "title": "Real-world AI Applications", "duration": "1 hour" }] },
    { "title": "Large Language Models", "lessons": [{ "title": "How LLMs Work", "duration": "1 hour" }] },
    { "title": "Transformers and Tokens", "lessons": [{ "title": "Transformer Architecture Basics", "duration": "1 hour" }] },
    { "title": "Prompt Engineering", "lessons": [{ "title": "Designing Effective Prompts", "duration": "1 hour" }] },
    { "title": "Advanced Prompting", "lessons": [{ "title": "Few-shot and Chain-of-Thought Prompting", "duration": "1 hour" }] },
    { "title": "AI API Integration", "lessons": [{ "title": "Using AI APIs in Applications", "duration": "1 hour" }] },
    { "title": "AI Chat Applications", "lessons": [{ "title": "Building AI Chatbots", "duration": "1 hour" }] },
    { "title": "Embeddings", "lessons": [{ "title": "Understanding Vector Embeddings", "duration": "1 hour" }] },
    { "title": "Vector Databases", "lessons": [{ "title": "Using FAISS and Pinecone", "duration": "1 hour" }] },
    { "title": "Semantic Search", "lessons": [{ "title": "Building Semantic Search", "duration": "1 hour" }] },
    { "title": "RAG Systems", "lessons": [{ "title": "Introduction to RAG Architecture", "duration": "1 hour" }] },
    { "title": "Building RAG Applications", "lessons": [{ "title": "Combining LLMs with Knowledge Bases", "duration": "1 hour" }] },
    { "title": "AI Deployment", "lessons": [{ "title": "Deploying AI Applications", "duration": "1 hour" }] }
  ],

  "rating": 4.9,
  "enrollmentCount": 2643,
  "featured": true
},
{
  "_id": "693570fe74010598c3968470",
  "title": "Mern Stack Development",
  "subtitle": "Build Modern Web Applications",
  "description": "This course teaches you how to build modern full stack web applications using the MERN stack — MongoDB, Express.js, React.js, and Node.js. You will learn how to design responsive user interfaces, build RESTful APIs, manage databases, and connect frontend and backend systems. The program focuses on practical development where you will create real-world applications such as dashboards, authentication systems, and dynamic web platforms. By the end of the course, you will understand the complete development lifecycle from frontend development to backend services and deployment of full stack applications.",
  "price": 2500,
  "image": "https://media2.dev.to/dynamic/image/width=1000,height=420,fit=cover,gravity=auto,format=auto/https%3A%2F%2Fdev-to-uploads.s3.amazonaws.com%2Fuploads%2Farticles%2F88lvz3rpqrqp1714t914.png",
  "instructor": "Full Stack Engineering Experts",
  "duration": "15 Days (1 Hour/Day)",
  "level": "Beginner to Advanced",

  "topics": [
    "Full Stack Web Development Architecture",
    "Modern JavaScript (ES6+)",
    "React.js Component Development",
    "React Hooks and State Management",
    "Backend APIs with Node.js & Express",
    "MongoDB Database Design",
    "Frontend + Backend API Integration",
    "Deploying MERN Applications"
  ],

  "benefits": [
    "Hands-On Full Stack Development",
    "Learn Industry-Standard MERN Stack",
    "Build Real-World Applications",
    "Live Mentor Support",
    "Career Opportunities: Full Stack Developer, MERN Developer"
  ],

  "curriculum": [
    { "title": "Web Development Overview", "lessons": [{ "title": "Introduction to Web Development", "duration": "1 hour" }] },
    { "title": "HTML Fundamentals", "lessons": [{ "title": "HTML Structure and Elements", "duration": "1 hour" }] },
    { "title": "CSS Fundamentals", "lessons": [{ "title": "Flexbox and Responsive Design", "duration": "1 hour" }] },
    { "title": "JavaScript Basics", "lessons": [{ "title": "Core JavaScript Concepts", "duration": "1 hour" }] },
    { "title": "Advanced JavaScript", "lessons": [{ "title": "ES6+ Features", "duration": "1 hour" }] },
    { "title": "Git and Version Control", "lessons": [{ "title": "Git Fundamentals", "duration": "1 hour" }] },
    { "title": "React Basics", "lessons": [{ "title": "React Components and JSX", "duration": "1 hour" }] },
    { "title": "React Hooks", "lessons": [{ "title": "State and Effect Hooks", "duration": "1 hour" }] },
    { "title": "Node.js Fundamentals", "lessons": [{ "title": "Backend Development with Node.js", "duration": "1 hour" }] },
    { "title": "Express APIs", "lessons": [{ "title": "Building REST APIs", "duration": "1 hour" }] },
    { "title": "MongoDB Basics", "lessons": [{ "title": "Database Design Concepts", "duration": "1 hour" }] },
    { "title": "CRUD Operations", "lessons": [{ "title": "Working with MongoDB Data", "duration": "1 hour" }] },
    { "title": "API Integration", "lessons": [{ "title": "Connecting React with Backend APIs", "duration": "1 hour" }] },
    { "title": "Authentication", "lessons": [{ "title": "User Authentication with JWT", "duration": "1 hour" }] },
    { "title": "Deployment", "lessons": [{ "title": "Deploying MERN Applications", "duration": "1 hour" }] }
  ],

  "rating": 4.8,
  "enrollmentCount": 2180,
  "featured": true
},

{
  "_id": "693570fe74010598c3968499",
  "title": "Cybersecurity & Bug Bounty",
  "subtitle": "Learn to Identify and Report Security Vulnerabilities",
  "description": "This course introduces the core concepts of cybersecurity, ethical hacking, and vulnerability discovery. You will learn how web applications work, how attackers exploit common vulnerabilities, and how security professionals identify and report these issues responsibly. The program covers web architecture, security testing environments, OWASP Top 10 vulnerabilities, and real-world security testing techniques. You will also learn how vulnerability disclosure programs and bug bounty platforms operate, how to write professional security reports, and how ethical hackers contribute to improving the security of digital systems.",
  "price": 2500,
  "image": "https://www.archtis.com/wp-content/uploads/2021/07/NC_Protect-Dropbox_Nutanix_FileShares-Header.jpg",
  "instructor": "Cybersecurity Experts",
  "duration": "15 Days (1 Hour/Day)",
  "level": "Beginner to Advanced",

  "topics": [
    "Cybersecurity Fundamentals",
    "Internet and Web Architecture",
    "Ethical Hacking Principles",
    "Web Application Security",
    "Security Testing Environment Setup",
    "OWASP Top 10 Vulnerabilities",
    "Vulnerability Discovery Techniques",
    "Bug Bounty Programs and Platforms"
  ],

  "benefits": [
    "Hands-On Cybersecurity Training",
    "Learn Ethical Hacking Techniques",
    "Real-World Vulnerability Discovery",
    "Live Mentor Support",
    "Career Opportunities: Security Analyst, Ethical Hacker, Bug Bounty Hunter"
  ],

  "curriculum": [
    { "title": "Cybersecurity Overview", "lessons": [{ "title": "Introduction to Cybersecurity", "duration": "1 hour" }] },
    { "title": "Internet Fundamentals", "lessons": [{ "title": "DNS, HTTP, HTTPS Basics", "duration": "1 hour" }] },
    { "title": "Ethical Hacking Basics", "lessons": [{ "title": "Responsible Security Testing", "duration": "1 hour" }] },
    { "title": "Web Architecture", "lessons": [{ "title": "Frontend and Backend Systems", "duration": "1 hour" }] },
    { "title": "Security Lab Setup", "lessons": [{ "title": "Building a Security Testing Environment", "duration": "1 hour" }] },
    { "title": "Web Vulnerabilities", "lessons": [{ "title": "Understanding OWASP Top 10", "duration": "1 hour" }] },
    { "title": "Vulnerability Discovery", "lessons": [{ "title": "Finding Security Issues", "duration": "1 hour" }] },
    { "title": "Bug Bounty Programs", "lessons": [{ "title": "How Bug Bounty Platforms Work", "duration": "1 hour" }] },
    { "title": "Security Tools", "lessons": [{ "title": "Introduction to Security Testing Tools", "duration": "1 hour" }] },
    { "title": "Manual Testing", "lessons": [{ "title": "Manual Security Testing Techniques", "duration": "1 hour" }] },
    { "title": "Writing Security Reports", "lessons": [{ "title": "Professional Vulnerability Reporting", "duration": "1 hour" }] },
    { "title": "Responsible Disclosure", "lessons": [{ "title": "Disclosure Policies", "duration": "1 hour" }] },
    { "title": "Submitting Vulnerabilities", "lessons": [{ "title": "Submitting Reports to Organizations", "duration": "1 hour" }] },
    { "title": "Hall of Fame", "lessons": [{ "title": "Bug Bounty Recognition", "duration": "1 hour" }] },
    { "title": "Cybersecurity Career", "lessons": [{ "title": "Building a Career in Cybersecurity", "duration": "1 hour" }] }
  ],

  "rating": 4.8,
  "enrollmentCount": 1980,
  "featured": true
}
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
