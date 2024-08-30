async function getconsultas() {
  try {
      const response = await fetch('http://localhost:3001/consultas', {
          method: 'GET',
          headers: {
              'Content-Type': 'application/json'
          }
      });

      if (!response.ok) {
          throw new Error('Error fetching users');
      }

      const users = await response.json();
      return users;
  } catch (error) {
      console.error('Error fetching users:', error);
      throw error;
  }
}




export { getconsultas };