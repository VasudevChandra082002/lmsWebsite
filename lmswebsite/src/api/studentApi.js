import api from "../config/axiosConfig";

/**
 * Function to fetch payment status chart data.
 * @param {Object} filters - Filters for the API request.
 * @param {string} filters.year - The year to filter the data by (optional).
 * @param {string} filters.month - The month to filter the data by (optional).
 * @param {string} filters.day - The day to filter the data by (optional).
 * @returns {Promise<Object>} - The response data containing the payment status chart data.
 */
export const getPaymentStatusChartData = async (queryParams) => {
    try {
      // Construct query parameters
    //   const queryParams = new URLSearchParams();
    //   if (year) queryParams.append('year', year);
    //   if (month) queryParams.append('month', month);
    //   if (day) queryParams.append('day', day);
  
      // Make the GET request
      const response = await api.get(`/students/payment/statusChart?${queryParams}`);
      
      console.log('Payment status chart data fetched successfully:', response.data);
      return response.data; // Return the response data
    } catch (error) {
      console.error('Error fetching payment status chart data:', error.response?.data || error.message);
      throw error; // Throw the error for further handling
    }
  };


/**
 * Fetch a single student by ID.
 * @param {string} studentId - The ID of the student to fetch.
 * @returns {Promise<Object>} - The student data from the API.
 */
export const getStudentById = async (studentId) => {
  try {
    // Make GET request to fetch student data
    const response = await api.get(`/students/${studentId}`);
    
    // Return student data
    return response.data;
  } catch (error) {
    // Handle and rethrow the error for calling functions
    console.error('Error fetching student:', error);
    throw error;
  }
};

/**
 * Fetch all students from the backend.
 * @returns {Promise<Array>} - An array of student objects from the API.
 */
export const getAllStudents = async () => {
    try {
      // Make GET request to fetch all students
      const response = await api.get('/students');
      
      // Return the list of students
      return response.data;
    } catch (error) {
      // Handle and rethrow the error for calling functions
      console.error('Error fetching students:', error);
      throw error;
    }
  };