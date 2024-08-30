async function updateconsulta(nombre, apellido,id) {
    try {
     
        const userData = { 
            nombre, 
            apellido 
        
        };
        const response = await fetch("http://localhost:3001/consultas"+id, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        });

     
        return await response.json();
    } catch (error) {
        console.error('Error update user:', error);
        throw error;
    }
}
  


export{updateconsulta};