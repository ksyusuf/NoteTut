// client/src/api.js
export const checkHealth = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/health`);
      if (!response.ok) throw new Error('Network error');
      return await response.json();
    } catch (error) {
      console.error('API Hatası:', error);
      return { error: true };
    }
  };