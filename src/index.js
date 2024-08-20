document.addEventListener('DOMContentLoaded', () => {

    const input = document.getElementById('EvenInput');
    const button = document.getElementById('EvenkButton');
    const ul = document.getElementById('EvenkList');
    const dateInput = document.getElementById('DateInput'); 
  

    // Carga los eventos desde el almacenamiento local y los muestra
    const loadEvents = () => {
        const events = JSON.parse(localStorage.getItem('events')) || [];
        events.forEach(event => addEventToDOM(event));
    };


   // Guarda un nuevo evento en el almacenamiento local
    const saveEvent = (event) => {
        const events = JSON.parse(localStorage.getItem('events')) || [];
        events.push(event);
        localStorage.setItem('events', JSON.stringify(events));
    };


   // Elimina un evento del almacenamiento local
    const removeEvent = (event) => {
        let events = JSON.parse(localStorage.getItem('events')) || [];
        events = events.filter(e => e.description !== event.description || e.date !== event.date);
        localStorage.setItem('events', JSON.stringify(events));
    };
   

     // Actualiza un evento en el almacenamiento local
    const updateEventInStorage = (oldEvent, newEvent) => {
        let events = JSON.parse(localStorage.getItem('events')) || [];
        events = events.map(event => (event.description === oldEvent.description && event.date === oldEvent.date ? newEvent : event));
        localStorage.setItem('events', JSON.stringify(events));
    };


   // Añade un evento a la lista en la página
    const addEventToDOM = (event) => {
        const li = document.createElement('li');
        li.textContent = `${event.description} - ${event.date}`;
  

        //crea un nuevo elemento de lista (li)
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Eliminar';
        deleteButton.classList.add('eliminar');
  
        const editButton = document.createElement('button');
        editButton.textContent = 'Editar';
        editButton.classList.add('editar');
  

        //Se crean botones para eliminar y editar el evento.
        deleteButton.addEventListener('click', () => {
            ul.removeChild(li);
            removeEvent(event);
            showFeedbackMessage('Evento eliminado correctamente');
        });
  

        //Al hacer clic en el botón de eliminar, la tarea se elimina tanto del DOM como del almacenamiento local
        editButton.addEventListener('click', () => {
            const newDescription = prompt('Edita la descripción del evento:', event.description);
            const newDate = prompt('Edita la fecha del evento (YYYY-MM-DD):', event.date);
            if (newDescription && newDescription.trim() !== '' && newDate && newDate.trim() !== '') {
                const newEvent = { description: newDescription.trim(), date: newDate.trim() };
                li.textContent = `${newEvent.description} - ${newEvent.date}`;
                li.appendChild(editButton);
                li.appendChild(deleteButton);
                updateEventInStorage(event, newEvent);
                showFeedbackMessage('Evento actualizado correctamente');
                event = newEvent; 
            } else {
                showFeedbackMessage('La descripción y la fecha no pueden estar vacías');
            }
        });
  
        li.appendChild(editButton);
        li.appendChild(deleteButton);
        ul.appendChild(li);
    };
  

     // Muestra un mensaje de retroalimentación al usuario
    const showFeedbackMessage = (message) => {
        const feedbackMessage = document.getElementById('Evento');
        feedbackMessage.textContent = message;
        setTimeout(() => (feedbackMessage.textContent = ''), 3000);
    };
  

    // muestra un mensaje de retroalimentación al usuario durante 3 segundos.
    button.addEventListener('click', () => {
        const description = input.value.trim();
        const date = dateInput.value.trim(); 
        if (description === '' || date === '') {
            showFeedbackMessage('La descripción y la fecha no pueden estar vacías');
            return;
        }
        const event = { description, date };
        addEventToDOM(event);
        saveEvent(event);
        input.value = '';
        dateInput.value = ''; 
        showFeedbackMessage('Evento agregado con éxito');
    });
  
    loadEvents();
  });
  