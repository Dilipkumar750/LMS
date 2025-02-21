import React, { useState } from "react";
import { Card, Button, Modal, Row, Col, Image } from "antd";
import pdfImage from "../../../Assets/pdf.jpg";

const CoursesView: React.FC = () => {
  const [selectedCourse, setSelectedCourse] = useState<any>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const courses = [
    {
      key: "1",
      courseName: "React Development",
      instructor: "John Doe",
      duration: "6 Weeks",
      price: "$199",
      description: "Learn React from scratch and build dynamic web applications. Gain experience with hooks, state management, and component lifecycle. Work on real-world projects to solidify your knowledge and best practices in modern web development. Understand JSX and component-based architecture. Explore React Router for navigation. Master debugging techniques in React development.",
    },
    {
      key: "2",
      courseName: "Backend Engineering",
      instructor: "Sarah Lee",
      duration: "8 Weeks",
      price: "$249",
      description: "Master backend development with Node.js, Express, and databases. Learn authentication, middleware, and REST API best practices. Gain hands-on experience with database management, caching, and performance optimization. Understand security concerns and implement best practices. Develop scalable and maintainable server-side applications. Explore real-time data processing using WebSockets and message queues.",
    },
    {
      key: "3",
      courseName: "UI/UX Design",
      instructor: "Michael Brown",
      duration: "5 Weeks",
      price: "$179",
      description: "Understand user experience principles and design visually appealing interfaces. Work with Figma, wireframing, and prototyping techniques. Learn about typography, color psychology, and usability testing. Explore interactive design elements for a seamless user experience. Develop high-fidelity mockups and design systems. Gain knowledge in accessibility standards and best practices.",
    },
    {
      key: "4",
      courseName: "Data Science",
      instructor: "Olivia Smith",
      duration: "10 Weeks",
      price: "$299",
      description: "Analyze data and build predictive models using Python and Machine Learning techniques. Learn data visualization, feature engineering, and statistics. Work with real-world datasets to understand data manipulation. Implement various ML algorithms for predictive analytics. Explore deep learning and neural networks in AI-driven applications. Understand model evaluation and optimization techniques.",
    },
    {
      key: "5",
      courseName: "Machine Learning",
      instructor: "William Johnson",
      duration: "12 Weeks",
      price: "$349",
      description: "Develop AI models and understand machine learning algorithms. Work with supervised and unsupervised learning techniques and real-world datasets. Explore deep learning frameworks like TensorFlow and PyTorch. Build neural networks for image and text recognition. Understand reinforcement learning and its applications. Gain insights into AI ethics and responsible AI development.",
    },
    {
      key: "6",
      courseName: "Cybersecurity Fundamentals",
      instructor: "Emma Watson",
      duration: "6 Weeks",
      price: "$199",
      description: "Learn the fundamentals of cybersecurity and protect systems from threats. Understand encryption, ethical hacking, and security protocols. Explore network security principles and cryptographic techniques. Develop skills in vulnerability assessment and penetration testing. Learn about security compliance and risk management. Study real-world cyber threats and their mitigation strategies.",
    },
  ];

  const showModal = (course: any) => {
    setSelectedCourse(course);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setSelectedCourse(null);
  };

  return (
    <div style={{ padding: "20px" }}>
      <Row gutter={[16, 16]}>
        {courses.map((course) => (
          <Col span={8} key={course.key}>
            <Card
              title={course.courseName}
              bordered={false}
              style={{ textAlign: "center" }}
              cover={
                <Image 
                  src={pdfImage} 
                  alt="PDF Preview" 
                  style={{ height: "150px", objectFit: "cover", cursor: "pointer" }}
                  onClick={() => showModal(course)}
                />
              }
            >
              <p><strong>Instructor:</strong> {course.instructor}</p>
              <p><strong>Duration:</strong> {course.duration}</p>
              <p><strong>Price:</strong> {course.price}</p>
              <div style={{ display: "flex", justifyContent: "center", gap: "10px" }}>
                <Button type="primary" onClick={() => showModal(course)}>View Details</Button>
                <Button type="default" danger>Buy Now</Button>
              </div>
            </Card>
          </Col>
        ))}
      </Row>
      <Modal title="Course Details" visible={isModalVisible} onCancel={handleCancel} footer={null}>
        {selectedCourse && (
          <div>
            <h3>{selectedCourse.courseName}</h3>
            <p><strong>Tutor:</strong> {selectedCourse.instructor}</p>
            <p><strong>Duration:</strong> {selectedCourse.duration}</p>
            <p><strong>Price:</strong> {selectedCourse.price}</p>
            <p><strong>Description:</strong> {selectedCourse.description}</p>
            <div style={{ display: "flex", justifyContent: "center", gap: "10px" }}>
              <Button type="primary">Buy Now</Button>
              <Button onClick={handleCancel}>Cancel</Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default CoursesView;