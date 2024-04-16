const TokenValidation = async (token) => {
    try {
    const response = await fetch(import.meta.env.VITE_API_PATH+'/validate-token', {
      mode: 'no-cors',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      
    });
  
    
  } catch (error) {
  }
};
