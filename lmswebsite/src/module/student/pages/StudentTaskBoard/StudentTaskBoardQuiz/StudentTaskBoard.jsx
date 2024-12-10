// src/module/teacher/pages/BecomeTeacherApplicationForm/TaskBoard/QuizPage/AssignedTeacherBatch.jsx

import React, { useEffect, useState } from "react";
import { getQuizBySubjectId } from "../../../../../api/quizApi";
import { getBatchesByStudentId } from "../../../../../api/batchApi";
import { Card, Button, Row, Col, Tag, Progress, Spin, Alert } from "antd";
import { getStudentByAuthId } from "../../../../../api/studentApi";
import { getscoreforstudent } from "../../../../../api/responseApi";
import { useNavigate } from "react-router-dom";
import {
  BodyText,
  Heading,
  PageContainer,
  PrimaryButton,
  Subheading,
} from "../../../../../style/PrimaryStyles/PrimaryStyles";
import { FaEye } from "react-icons/fa";
import styled from "styled-components";

const { Meta } = Card;

// Styled Components
const Container = styled.div`
  padding: 20px;
`;

const QuizGrid = styled(Row)`
  margin-top: 20px;
`;

const StyledCard = styled(Card)`
  margin-bottom: 20px;
`;

const StatusTag = styled(Tag)`
  margin-top: 10px;
`;

const StudentTaskBoard = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [responses, setResponses] = useState({}); // Maps quiz IDs to scores
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [studentId, setStudentId] = useState(null);
  const navigate = useNavigate();

  // Fetch quizzes and responses
  useEffect(() => {
    const fetchTaskBoardData = async () => {
      try {
        // Fetching student data from localStorage
        const sessionData = JSON.parse(localStorage.getItem("sessionData"));
        if (!sessionData || !sessionData.userId) {
          console.error("User is not authenticated.");
          throw new Error("User is not authenticated.");
        }
        const authId = sessionData.userId;

        const studentData = await getStudentByAuthId(authId);

        if (!studentData.student || !studentData.student._id) {
          console.error("Student data is incomplete.");
          throw new Error("Student data is incomplete.");
        }

        const studentId = studentData.student._id;
        setStudentId(studentId);

        // Fetch batches based on student ID
        const fetchedBatches = await getBatchesByStudentId(studentId);

        if (!fetchedBatches || fetchedBatches.length === 0) {
          setQuizzes([]);
          setLoading(false);
          return;
        }

        // Extract unique subject IDs from the batches
        const subjectIds = fetchedBatches.map((batch) => batch.subject_id._id);
        const uniqueSubjectIds = [...new Set(subjectIds)];

        // Fetch quizzes for each unique subject ID
        const quizzesData = await Promise.all(
          uniqueSubjectIds.map((subjectId) => getQuizBySubjectId(subjectId))
        );

        // Flatten the quizzes array
        const allQuizzes = quizzesData.flatMap((data) => data.quizzes);
        setQuizzes(allQuizzes);

        // Fetch scores for each quiz for the student
        const responseMap = {};
        await Promise.all(
          allQuizzes.map(async (quiz) => {
            const scoreResponse = await getscoreforstudent(studentId, quiz._id);
            console.log(
              "Score Response for Quiz ID",
              quiz._id,
              ":",
              scoreResponse
            );
            if (
              scoreResponse &&
              scoreResponse.data &&
              scoreResponse.data.length > 0
            ) {
              responseMap[quiz._id] = scoreResponse.data[0].score;
              console.log(
                "Response Map Updated for Quiz ID:",
                quiz._id,
                "Score:",
                scoreResponse.data[0].score
              );
            }
          })
        );

        setResponses(responseMap);
        console.log("Final Response Map:", responseMap);
      } catch (error) {
        setError("Failed to load quizzes");
        console.error("Error in fetchTaskBoardData:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTaskBoardData();
  }, []);

  // Handle navigation to the quiz answering page
  const handleNavigateToQuiz = (quiz) => {
    navigate(`/student/dashboard/taskBoard/quiz/${quiz._id}`, {
      state: { quiz, studentId },
    });
  };

  // Determine quiz status
  const getQuizStatus = (quiz) => {
    const score = responses[quiz._id];
    const studentHasAnswered = quiz.answered_by.some(
      (entry) => entry.student_id === studentId
    );

    if (studentHasAnswered) {
      return <StatusTag color="green">Completed</StatusTag>;
    } else {
      return <StatusTag color="volcano">Pending</StatusTag>;
    }
  };

  // Loading and error states
  if (loading) {
    return (
      <PageContainer>
        <Spin tip="Loading..." size="large" />
      </PageContainer>
    );
  }

  if (error) {
    return (
      <PageContainer>
        <Alert message="Error" description={error} type="error" showIcon />
      </PageContainer>
    );
  }

  return (
    <Container>
      <Heading>Task Board</Heading>

      {quizzes.length > 0 ? (
        <QuizGrid gutter={[16, 16]}>
          {quizzes.map((quiz) => {
            const score = responses[quiz._id];
            const studentHasAnswered = quiz.answered_by.some(
              (entry) => entry.student_id === studentId
            );

            return (
              <Col xs={24} sm={12} md={8} lg={6} key={quiz._id}>
                <StyledCard
                  hoverable
                  title={quiz.quiz_title}
                  extra={getQuizStatus(quiz)}
                >
                  <Meta
                    description={<Subheading>{quiz.description}</Subheading>}
                  />
                  {studentHasAnswered ? (
                    <div style={{ marginTop: "10px" }}>
                      <Progress
                        percent={(
                          (score / quiz.questions.length) *
                          100
                        ).toFixed(2)}
                        status="active"
                        showInfo={false}
                      />
                      <BodyText style={{ marginTop: "5px" }}>
                        Your score: {score}/{quiz.questions.length}
                      </BodyText>
                    </div>
                  ) : (
                    <PrimaryButton
                      type="primary"
                      onClick={() => handleNavigateToQuiz(quiz)}
                      style={{
                        marginTop: "15px",
                        backgroundColor: "#e91e63",
                        borderColor: "#e91e63",
                      }}
                      block
                    >
                      <FaEye style={{ marginRight: "5px" }} />
                      Answer
                    </PrimaryButton>
                  )}
                </StyledCard>
              </Col>
            );
          })}
        </QuizGrid>
      ) : (
        <div style={{ textAlign: "center", marginTop: "50px" }}>
          <Alert
            message="No Quizzes Available"
            description="You have no quizzes assigned at the moment."
            type="info"
            showIcon
          />
        </div>
      )}
    </Container>
  );
};

export default StudentTaskBoard;
