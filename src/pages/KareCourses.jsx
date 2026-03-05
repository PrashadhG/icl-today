import { useState, useEffect } from 'react';
import { getAllCourses } from '../utils/api';
import CourseCard from '../components/CourseCard';
import toast from 'react-hot-toast';
import './KareCourses.css';

const KareCourses = () => {
  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedLevel, setSelectedLevel] = useState('');
  const [selectedPrice, setSelectedPrice] = useState('');

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setIsLoading(true);
        const data = await getAllCourses();
        setCourses(data);
        setFilteredCourses(data);
        setIsLoading(false);
      } catch (error) {
        console.error('Failed to fetch courses:', error);
        toast.error('Failed to load courses. Please try again later.');
        setIsLoading(false);
      }
    };

    fetchCourses();
  }, []);

  const handleLevelChange = (e) => {
    const level = e.target.value;
    setSelectedLevel(level);
    applyFilters(level, selectedPrice);
  };

  const handlePriceChange = (e) => {
    const price = e.target.value;
    setSelectedPrice(price);
    applyFilters(selectedLevel, price);
  };

  const clearFilters = () => {
    setSelectedLevel('');
    setSelectedPrice('');
    setFilteredCourses(courses);
  };

  const applyFilters = (level, price) => {
    let result = [...courses];

    // Apply level filter
    if (level) {
      result = result.filter(course => course.level === level);
    }

    // Apply price filter
    if (price) {
      switch (price) {
        case 'below-500':
          result = result.filter(course => course.price < 500);
          break;
        case '500-1000':
          result = result.filter(course => course.price >= 500 && course.price <= 1000);
          break;
        case '1000-1500':
          result = result.filter(course => course.price > 1000 && course.price <= 1500);
          break;
        case 'above-1500':
          result = result.filter(course => course.price > 1500);
          break;
        default:
          break;
      }
    }

    setFilteredCourses(result);
  };

  return (
    <div className="courses-page section">
      <div className="container">
        <h1 className="section-title text-center">Explore Our Courses</h1>

        {/* Filters Section */}


        {/* Courses Display */}
        {isLoading ? (
          <div className="loading">
            <i className="fas fa-spinner fa-spin"></i> Loading courses...
          </div>
        ) : (
          <>
            {filteredCourses.length === 0 ? (
              <div className="no-courses">
                <p>No courses match your filter criteria.</p>
                <button className="btn btn-primary" onClick={clearFilters}>
                  Clear Filters
                </button>
              </div>
            ) : (
              <div className="courses-grid">
                {filteredCourses.map((course) => (
                  <CourseCard key={course._id} course={course} />
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default KareCourses; 