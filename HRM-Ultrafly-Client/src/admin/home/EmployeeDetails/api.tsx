import axios from 'axios';
import { message } from 'antd';

const BASE_URL = '/api'; // Replace with your actual API base URL

// Function to submit bank details
export const submitBankDetails = async (data:any) => {
  try {
    const response = await axios.post(`${BASE_URL}/bank-details`, data);

    if (response.status === 200) {
      message.success('Bank Details submitted successfully!');
      return response.data;
    } else {
      throw new Error(response.data?.message || 'Unexpected server response');
    }
  } catch (error:any) {
    const errorMessage = error.response?.data?.message || 'Failed to submit Bank Details.';
    message.error(errorMessage);
    throw error; // Rethrow for further handling if needed
  }
};



export const uploadDocuments = async (url:any, data:any) => {
    try {
      const response = await axios.post(url, data, {
        headers: {
          'Content-Type': 'multipart/form-data', // For file uploads
        },
      });
  
      if (response.status === 200) {
        message.success('Documents uploaded successfully!');
        return response.data;
      } else {
        throw new Error(response.data?.message || 'Unexpected server response');
      }
    } catch (error:any) {
      const errorMessage = error.response?.data?.message || 'Failed to upload documents.';
      message.error(errorMessage);
      throw error;
    }
  };

/**
 * API call to submit educational details.
 * @param {string} url - The endpoint URL.
 * @param {object} data - The educational details data.
 * @returns {Promise<object>} - The server response.
 */
export const submitEducationalDetails = async (url:any, data:any) => {
    try {
      // Data validation before sending the request
      if (!data.tenthMarks || data.tenthMarks < 0 || data.tenthMarks > 100) {
        throw new Error('Invalid 10th Marks! Marks should be between 0 and 100.');
      }
      if (data.UGYear && !/^(19|20)\d{2}$/.test(data.UGYear)) {
        throw new Error('Invalid UG Year! Enter a valid year (e.g., 2020).');
      }
  
      // Axios POST request
      const response = await axios.post(url, data);
  
      if (response.status === 200) {
        message.success('Educational details submitted successfully!');
        return response.data;
      } else {
        throw new Error(response.data?.message || 'Unexpected server response.');
      }
    } catch (error:any) {
      const errorMessage = error.response?.data?.message || error.message || 'Failed to submit educational details.';
      message.error(errorMessage);
      throw error;
    }
  };




/**
 * Validate experience data before submission.
 * @param {Array} experiences - Array of experience objects.
 */
const validateExperiences = (experiences:any) => {
  experiences.forEach((experience:any, index:any) => {
    if (!experience.companyName) {
      throw new Error(`Experience ${index + 1}: Company Name is required.`);
    }
    if (!experience.jobDestinations) {
      throw new Error(`Experience ${index + 1}: Job Destination is required.`);
    }
    if (!experience.startDate) {
      throw new Error(`Experience ${index + 1}: Start Date is required.`);
    }
    if (!experience.endDate) {
      throw new Error(`Experience ${index + 1}: End Date is required.`);
    }
    if (new Date(experience.startDate) >= new Date(experience.endDate)) {
      throw new Error(
        `Experience ${index + 1}: Start Date should be earlier than End Date.`
      );
    }
  });
};

/**
 * API call to submit experience details.
 * @param {string} url - The API endpoint URL.
 * @param {object} data - The experience details to be submitted.
 * @returns {Promise<object>} - The server response.
 */
export const submitExperienceDetails = async (url:any, data:any) => {
  try {
    // Validate data
    if (!data.experiences || data.experiences.length === 0) {
      throw new Error('At least one experience must be added.');
    }
    validateExperiences(data.experiences);

    // Send API request
    const response = await axios.post(url, data);

    if (response.status === 200) {
      message.success('Experience details submitted successfully!');
      return response.data;
    } else {
      throw new Error(response.data?.message || 'Unexpected server response.');
    }
  } catch (error:any) {
    const errorMessage = error.response?.data?.message || error.message || 'Failed to submit experience details.';
    message.error(errorMessage);
    throw error;
  }
};
