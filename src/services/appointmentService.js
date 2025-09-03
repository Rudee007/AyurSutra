// API service for appointment booking
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

export const appointmentService = {
  // Search doctors based on symptoms (ML model evaluation)
  async bookAppointment(appointmentData) {
    try {
      const response = await fetch(`${API_BASE_URL}/api/doctors/search`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Add auth headers when authentication is implemented
          // 'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(appointmentData)
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      // Handle network errors
      if (error.name === 'TypeError' && error.message.includes('fetch')) {
        throw new Error('Unable to connect to server. Please check your internet connection.');
      }
      throw error;
    }
  },

  // Get recommended doctors (for future use)
  async getRecommendedDoctors(symptoms) {
    try {
      const response = await fetch(`${API_BASE_URL}/api/doctors/recommend`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ symptoms })
      });

      if (!response.ok) {
        throw new Error('Failed to get doctor recommendations');
      }

      return await response.json();
    } catch (error) {
      console.warn('Doctor recommendation service unavailable:', error.message);
      return { doctors: [] }; // Return empty array as fallback
    }
  }
};