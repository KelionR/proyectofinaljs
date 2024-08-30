async function postconsultas(nombre, consulta, detalle, tipo, fecha) {
    try {
        const consultData = { 
            nombre,
            consulta,
            detalle,
            tipo,
            fecha
        };

        const response = await fetch("http://localhost:3001/consultas", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(consultData)
        });

        if (!response.ok) {
            throw new Error('Error posting consulta');
        }

        return await response.json();
    } catch (error) {
        console.error('Error posting consulta:', error);
        throw error;
    }
}

export { postconsultas };