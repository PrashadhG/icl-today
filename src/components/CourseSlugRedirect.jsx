import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import CourseDetails from '../pages/KareCourseDetails';

// Mapping of friendly slugs to course IDs
const COURSE_SLUG_MAP = {
  //'cyber': '69356cecf683f9a7de80e78d',
  'cybersecurity': '693570fe74010598c3968435',
  'aiml': '693570fe74010598c3968453',
  // 'ai-ml': '680a024024dff2cef862633e',
  //   'webdev': '680a024024dff2cef8626340',
  //   'web-development': '680a024024dff2cef8626340',
  //   'data-science': '69355cb901edc7e5c1e49a57',
  //   'datascience': '69355cb901edc7e5c1e49a57',
  'fullstack': '693570fe74010598c3968470',
  'dsa': '693570fe74010598c3968491'
  // Add more mappings as needed
};

const CourseSlugRedirect = ({ user }) => {
  const { slug } = useParams();
  const navigate = useNavigate();

  // Check if it's a slug or already an ID (MongoDB IDs are 24 characters hex)
  const isMongoId = /^[a-f0-9]{24}$/i.test(slug);

  if (isMongoId) {
    // It's already an ID, render CourseDetails directly
    return <CourseDetails user={user} />;
  }

  // It's a slug, redirect to the full ID
  useEffect(() => {
    const courseId = COURSE_SLUG_MAP[slug.toLowerCase()];

    if (courseId) {
      // Redirect to the full course ID URL
      navigate(`/courses/${courseId}`, { replace: true });
    } else {
      // If slug not found, redirect to courses page
      navigate('/courses', { replace: true });
    }
  }, [slug, navigate]);

  return null; // This component just redirects, no UI needed
};

export default CourseSlugRedirect;
