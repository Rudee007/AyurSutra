// Doctor authentication service using CSV data
export const doctorAuthService = {
  // Login doctor using CSV credentials
  async loginDoctor(username, password) {
    try {
      const response = await fetch('/panchakarma_doctor2.csv');
      const csvText = await response.text();
      const lines = csvText.split('\n');
      
      // Skip header row
      for (let i = 1; i < lines.length; i++) {
        const line = lines[i].trim();
        if (!line) continue;
        
        const values = line.split(',');
        const doctorUsername = values[4]?.replace(/"/g, '').trim();
        const doctorPassword = values[5]?.replace(/"/g, '').trim();
        
        if (doctorUsername === username && doctorPassword === password) {
          const doctorData = {
            id: values[0]?.replace(/"/g, '').trim(),
            symptoms: values[1]?.replace(/"/g, '').trim(),
            name: values[2]?.replace(/"/g, '').trim(),
            panchakarma: values[3]?.replace(/"/g, '').trim(),
            username: doctorUsername,
            description: values[6]?.replace(/"/g, '').trim()
          };
          
          // Store in sessionStorage
          sessionStorage.setItem('loggedInDoctor', JSON.stringify(doctorData));
          return { success: true, doctor: doctorData };
        }
      }
      
      return { success: false, error: 'Invalid credentials' };
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, error: 'Login failed' };
    }
  },

  // Get current logged-in doctor
  getCurrentDoctor() {
    const doctorData = sessionStorage.getItem('loggedInDoctor');
    return doctorData ? JSON.parse(doctorData) : null;
  },

  // Logout doctor
  logout() {
    sessionStorage.removeItem('loggedInDoctor');
  },

  // Check if doctor is logged in
  isLoggedIn() {
    return !!sessionStorage.getItem('loggedInDoctor');
  }
};