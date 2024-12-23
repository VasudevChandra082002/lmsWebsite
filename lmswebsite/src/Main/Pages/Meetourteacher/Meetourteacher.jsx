import React from "react";
import "./MeetourTeacher.css";

function MeetOurTeacher() {
  const mentors = [
    {
      name: "Munmi Boruah",
      title: "English Teacher",
      image:
        "https://thumbs.dreamstime.com/b/young-man-teacher-teaching-lesson-front-classroom-books-college-class-university-teacher-teach-man-teacher-teaching-320751793.jpg", // Replace with the correct image path
      rating: 4.9,
      reviews: "45k",
    },
    {
      name: "Anil Kumar",
      title: "Mathemathics Teacher",
      image:
        "https://thumbs.dreamstime.com/b/young-man-teacher-teaching-lesson-front-classroom-books-college-class-university-teacher-teach-man-teacher-teaching-320751793.jpg", // Replace with the correct image path
      rating: 4.8,
      reviews: "44k",
    },
    {
      name: "Geetam Singh",
      title: "Mathemathics Teacher",
      image:
        "https://thumbs.dreamstime.com/b/young-man-teacher-teaching-lesson-front-classroom-books-college-class-university-teacher-teach-man-teacher-teaching-320751793.jpg", // Replace with the correct image path
      rating: 4.6,
      reviews: "42k",
    },
  ];

  return (
    <div className="meet-our-teacher-section">
      <h2>
        Meet few of our professional <span>mentors</span>
      </h2>
      <div className="mentors-container">
        {mentors.map((mentor, index) => (
          <div key={index} className="mentor-card">
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <img
                src={mentor.image}
                alt={mentor.name}
                className="mentor-image"
              />
            </div>
            <h3>{mentor.name}</h3>
            <p className="mentor-title">{mentor.title}</p>
            <p className="mentor-rating">
              <span className="star">⭐</span> {mentor.rating} ({mentor.reviews}{" "}
              reviews)
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MeetOurTeacher;
