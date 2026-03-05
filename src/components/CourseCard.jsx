import { Link, useNavigate } from 'react-router-dom';
import './CourseCard.css';
import { Trophy } from "lucide-react";


const CourseCard = ({ course }) => {
  const navigate = useNavigate();

  const formatPrice = (price) => {
    return `₹${price}`;
  };

  const handleEnterCourse = () => {
    navigate(`/courses/${course._id}`);
  };

  return (
    <div className="course-card card">

      <img src={course.image} alt={course.title} className="course-image" />

      <div className="course-content">
        <h3 className="course-title">{course.title}</h3>

        <p className="course-instructor">
          <i className="fas fa-user"></i> {course.instructor}
        </p>
        <p
          className="course-description"
          dangerouslySetInnerHTML={{
            __html:
              (course.description.length > 100)
                ? `${course.description.substring(0, 90)}...`
                : course.description,
          }}
        ></p>
        <div className="course-meta">
          <div className="course-rating">
            <i className="fas fa-star"></i>
            <span>{course.rating || 0}</span>
            {course.enrollmentCount && (
              <span className="enrollment-count">
                ({course.enrollmentCount}+ students)
              </span>
            )}
          </div>
          <div className="course-price">
            {formatPrice(course.price)} (inclusive of GST)
            {/* <span style={{ fontSize: '0.7em', color: '#95a5a6', display: 'block', marginTop: '2px' }}>*18% taxes applicable</span> */}
          </div>
        </div>
        <div className="course-footer">
          <span className="course-level">
            <i className="fas fa-signal"></i> {course.level}
          </span>

          <span className="flex items-center gap-1.5 rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-700 border border-indigo-100">
            <Trophy className="h-3.5 w-3.5 text-indigo-600" />
            InternShip Learning
          </span>

        </div>
        <button
          className="btn btn-primary enter-course-btn"
          onClick={handleEnterCourse}
        >
          <i className="fas fa-arrow-right"></i> View Course
        </button>
      </div>
    </div>
  );
};

export default CourseCard; 