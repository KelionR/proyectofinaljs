// getConsultas.js

async function getconsultas() {
    try {
        const response = await fetch("http://localhost:3001/consultas", {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error('Error getting consultas');
        }

        return await response.json();
    } catch (error) {
        console.error('Error getting consultas:', error);
        throw error;
    }
}

export { getconsultas };