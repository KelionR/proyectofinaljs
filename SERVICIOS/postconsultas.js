async function postconsulta (nombre, consulta, detalle, tipo, fecha) {
  try {
   
      const consultasData = { 
        nombre, consulta, detalle, tipo, fecha
      };

      const response = await fetch("http://localhost:3001/consultas", {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(consultasData)
      });

   
      return await response.json();

      
  } catch (error) {
      console.error('Error posting user:', error);
      throw error;
  }
}
 



export{postconsulta}