import React from 'react';

import WhyChoose from '../components/c2cservices/WhyChoose/WhyChoose';
import TestimonialSection from '../components/c2cservices/Testimonials/Testimonials';
import WhyChooseImage from "../assets/Images/Banner/whycodechef5.png";
import WhatImage from "../assets/Images/Banner/whatiscodechef5.png"
import { FaBook, FaPen, FaFlask, FaRocket } from 'react-icons/fa';
import HowItWorks from '../components/c2cservices/HowItworks/HowItWorks';
import KeyHighlights from '../components/c2cservices/KeyHighlights/KeyHighlights';
import WhatIsCodeChef from '../components/c2cservices/WhatIs/WhatIs';
import CodechefConsultationFormForCo from '../components/ContactPage/codechefConsultationFormForCo';
import noprofile from "../assets/noprofile.png";
import BannerCarousel from '../components/Banner/BannerCarousel';

const CodeChef = () => {

    const highlights = "Key Highlights";
    const points = [
        "Weekly Global Hackathons Every Wednesday 8 PM IST",
        "7000+ Practice Problems across 3 Difficulty Levels",
        "100+ Lesson Modules",
        "Department-wise & Year-wise Curriculum Mapping",
        "Verifiable Certificates for Every Completed Track",
        "Company-Specific Coding Challenges",
        "End-to-End Mentorship and AI Guidance",
    ];

    const steps = [
      {
        title: "Step 1: Learn from Courses",
        description: "Start your journey by learning from a wide variety of courses designed to help you master the skills you need.",
        icon: <FaBook />, 
      },
      {
        title: "Step 2: Practice Daily",
        description: "Engage with daily exercises and get real-time feedback to improve your skills as you practice.",
        icon: <FaPen />, 
      },
      {
        title: "Step 3: Take Assessments",
        description: "Test your knowledge with assessments and quizzes to track your progress and identify areas to improve.",
        icon: <FaFlask />, 
      },
      {
        title: "Step 4: Share Your Achievements",
        description: "Share your achievements and milestones with the world to showcase your new skills.",
        icon: <FaRocket />, 
      },
    ];

    const codechefData = {
      heading: "What is CodeChef?",
      subheading: "Your Gateway to Competitive Programming Excellence",
      description: `CodeChef is India’s premier competitive programming platform, used by over 1 million coders worldwide. With structured, curriculum-aligned courses and a vibrant coding community, students gain valuable exposure and build confidence through hands-on coding and problem-solving.`,
      ctaText: "Start Coding Today",
      ctaLink: "#cta",
    };


  return (
    <div>
      <BannerCarousel />
      <div id="get-started">
      <WhatIsCodeChef 
        heading={codechefData.heading}
        subheading={codechefData.subheading}
        description={codechefData.description}
        image={WhatImage}
        ctaText={codechefData.ctaText}
        ctaLink={codechefData.ctaLink}
      />
      </div>
      

       <WhyChoose
          heading="Why CodeChef?"
          description="We are committed to building a self-sustained CodeChef that not only meets the immediate needs of students but also prepares them for future challenges. Our approach is designed to ensure that your institution remains at the forefront of technological advancements."
          points={[
            "Structured Curriculum —handpicked courses from basics to advanced levels ",
            "Interactive Learning — Learn with lessons, practice with problems, test with assessments",
            "AI Support & Tutor Videos — Instant help and guided walkthroughs",
            "In-Browser IDE — No installation hassles. Practice on the go!",
            "Real-Time Rankings — Compete, learn, and improve with global peers",
            "Internship & Job Access — Get noticed by top recruiters via CodeChef contests",
            "Faculty Development — Upskill your educators alongside students",
          ]}
          image = {WhyChooseImage} 
        />

            <KeyHighlights heading={highlights} points={points} />

            <HowItWorks steps={steps} />

        <TestimonialSection
          heading="What Our Clients Say About Us"
          description="Discover why businesses trust us to deliver exceptional results. Our clients' experiences speak for themselves."
          testimonials={[
            {
              name: "Balaji",
              role: "Kalaisalingam Academy of Research and Education",
              quote: "During my B.Tech, I was passionate about coding but lacked a clear path until CodeChef changed everything! With beginner-friendly resources, weekly contests to track progress, and free DSA & SQL materials, my placement prep became seamless. CodeChef boosted my confidence in interviews, helping me land offers from TCS and Capgemini.",
              image:noprofile,
              color: "from-rose-500 to-pink-400"
            },
            {
              name: "Deepika",
              role: "Ethiraj College for Women",
              quote: "Coming from an MCA background with stepping into the tech world felt overwhelming. CodeChef provided a clear learning path with structured practice and real-time coding challenges. The competitive environment pushed me to improve, and the interview preparation resources were invaluable. Thanks to this, I successfully secured placements at EY Global.",
              image: noprofile,
              color: "from-blue-500 to-blue-400"
            },
            {
              name: "Poojith Reddy",
              role: "Kalaisalingam Academy of Research and Education",
              quote: "CodeChef's well-structured curriculum, challenging problems, and supportive community boosted my confidence in competitive programming and technical interviews. The platform's detailed explanations and practical approach made learning effective and enjoyable. The courses helped strengthen my foundation in coding and prepared me well for real-world challenges.",
              image: noprofile,
              color: "from-violet-500 to-fuchsia-400"
            },
            {
              name: "Sundar Karthick",
              role: "Panimalar Engineering College",
              quote: "CodeChef played a crucial role in my placement journey! The structured learning, coding challenges, and mock contests helped me sharpen my problem-solving skills. The platform's practice sessions and real-time assessments prepared me well for technical interviews. Thanks to CodeChef, I secured placements at Tech Mahindra and CTS.",
              image: noprofile,
              color: "from-teal-500 to-teal-400"
            },
            
            ]}
          />

          <CodechefConsultationFormForCo />
    </div>
  );
};

export default CodeChef;
