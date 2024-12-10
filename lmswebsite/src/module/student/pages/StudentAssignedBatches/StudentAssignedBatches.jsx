// src/module/teacher/pages/BecomeTeacherApplicationForm/TaskBoard/QuizPage/AssignedTeacherBatch.jsx

import React, { useState, useEffect } from "react";
import { FaSearch, FaEye } from "react-icons/fa";
import { useNavigate, Link } from "react-router-dom"; // Import useNavigate
import { StudentAssignedBatchWrap } from "./StudentAssignedBatches.styles";
import {
  getBatchesByStudentId,
  getBatchesByTeacherId,
} from "../../../../api/batchApi";
import { Table, Input, Button, Space, Row, Col } from "antd";
import BatchCard from "../../components/BatchCard/BatchCard";
import { getTeacherByAuthId } from "../../../../api/teacherApi";
import LoadingPage from "../../../../pages/LoadingPage/LoadingPage";
import { getStudentByAuthId } from "../../../../api/studentApi";

export default function StudentAssignedBatches() {
  const [searchInput, setSearchInput] = useState("");
  const [filterData, setFilterData] = useState([]);
  const [originalData, setOriginalData] = useState([]);
  const [batches, setBatches] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    const fetchBatches = async () => {
      try {
        const sessionData = JSON.parse(localStorage.getItem("sessionData"));
        if (!sessionData || !sessionData.userId) {
          throw new Error("User is not authenticated.");
        }

        const authId = sessionData.userId;
        const studentData = await getStudentByAuthId(authId);
        console.log("Student Data:", studentData);

        if (!studentData.student || !studentData.student._id) {
          throw new Error("Teacher data is incomplete.");
        }

        const fetchedBatches = await getBatchesByStudentId(
          studentData.student._id
        );
        setBatches(fetchedBatches);
        setOriginalData(fetchedBatches);
        setFilterData(fetchedBatches);
        console.log("Fetched Batches:", fetchedBatches);
        setLoading(false);
      } catch (err) {
        setBatches(null);
        console.error("Error fetching batches:", err);
        // setError(err.message || 'Failed to fetch batches');
        setLoading(false);
      }
    };

    fetchBatches();
  }, []);

  // Filter data based on searchInput for "Batch Name"
  useEffect(() => {
    if (searchInput) {
      const filtered = originalData.filter((item) =>
        item["batch_name"].toLowerCase().includes(searchInput.toLowerCase())
      );
      setFilterData(filtered);
    } else {
      setFilterData(originalData); // Reset to original data if search is empty
    }
  }, [searchInput, originalData]);

  // Handle navigation to Student List
  const handleViewStudents = (batchId, batchName) => {
    navigate(`/teacher/dashboard/assigned-batches/${batchId}`, {
      state: { batchName },
    });
  };

  const columns = [
    {
      title: "Batch Name",
      dataIndex: "batchName",
      key: "batchName",
      render: (text) => <a>{text}</a>, // Link to batch details or actions
    },
    {
      title: "Expiry Date",
      dataIndex: "expiryDate",
      key: "expiryDate",
    },
    {
      title: "Teacher Assigned",
      dataIndex: "teacherAssigned",
      key: "teacherAssigned",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Button
            type="link"
            icon={<FaEye />}
            onClick={() => navigate(`/batch-details/${record.batchId}`)} // Assuming you have a batch details page
          >
            View Details
          </Button>
        </Space>
      ),
    },
  ];

  const handleBatchClick = (batchId) => {
    // Navigate to the respective batch details page
    navigate(`/student/dashboard/assignedBatches/${batchId}`);
  };

  if (loading) {
    return <LoadingPage />; // Show loading spinner while data is being fetched
  }

  return (
    <StudentAssignedBatchWrap>
      <Row gutter={[16, 24]} style={{ marginBottom: 20 }}>
        <Col
          span={24}
          style={{ display: "flex", justifyContent: "center" }}
        ></Col>
      </Row>
      <Row gutter={[16, 24]}>
        {filterData.length > 0 ? (
          filterData.map((batch) => (
            <Col xs={24} sm={12} md={8} lg={6} key={batch._id}>
              <BatchCard
                batch={batch}
                onClick={() => handleBatchClick(batch._id)}
              />
              <button>
                <Link to={`/student/dashboard/assignedBatches/${batch._id}`}>
                  <FaEye style={{ marginRight: "5px" }} />
                  View Materials
                </Link>
              </button>
            </Col>
          ))
        ) : (
          <Col span={24}>
            <Card>
              <h3>No Batches Found</h3>
            </Card>
          </Col>
        )}
      </Row>
    </StudentAssignedBatchWrap>
  );
}
