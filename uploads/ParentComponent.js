import Sidebar from './Sidebar.js';
import AddEventForm from './AddEventForm.mjs';
import DisplayEvents from './DisplayEvents.mjs'; // Import DisplayEvents component
import React, { useEffect, useState } from 'react';

const ParentComponent = () => {
  const [events, setEvents] = useState([]);

  const handleAddEvent = (event) => {
    // Your logic to add the event to the database
    // Example: Make a POST request to the server to add the event
    fetch('/addEvent', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(event),
    })
      .then(response => response.json())
      .then(data => {
        // Update the events state with the new event from the response
        setEvents([...events, data]);
      })
      .catch(err => console.error('Error adding event:', err));
  };


  const handleDelete = (index) => {
    // Your logic to delete the event from the database
    // Example: Make a DELETE request to the server to delete the event
    const eventId = events[index]._id; // Assuming the event has an _id field
    fetch(`/deleteEvent/${eventId}`, {
      method: 'DELETE',
    })
      .then(() => {
        // Update the events state by removing the deleted event
        const updatedEvents = [...events];
        updatedEvents.splice(index, 1);
        setEvents(updatedEvents);
      })
      .catch(err => console.error('Error deleting event:', err));
  };

  useEffect(() => {
    // Fetch events from the server when the component mounts
    fetch('/events')
      .then(response => response.json())
      .then(data => setEvents(data))
      .catch(err => console.error('Error fetching events:', err));
  }, []);
  
  return (
    <div>
      <Sidebar />
      <AddEventForm onAddEvent={handleAddEvent} />
      <DisplayEvents events={events} onDelete={handleDelete} />;
    </div>
  );
};


export default ParentComponent;
