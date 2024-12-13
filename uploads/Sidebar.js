import React from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import '../../src/App.css';

const Sidebar = ({ events }) => {
  const handleDateClick = (arg) => {
    alert(arg.dateStr);
  };

  return (
    <div className="sidebar">
      <div style={{ fontFamily: 'Montserrat', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <h2 style={{ margin: '20px 10px 20px 0' }}>Goodmorningg</h2>
        <h2 className='buduuu'>buduuuu</h2>
      </div>
 
      <div className='calBack'>
        <FullCalendar
          events={events} // Ensure events are passed to FullCalendar component as well
          plugins={[dayGridPlugin]}
          initialView="dayGridMonth"
          fixedWeekCount={false}
          showNonCurrentDates={false}
          dayHeaders={true}
          dayHeaderFormat={{ weekday: 'short' }}
          headerToolbar={{
            start: 'title',
            center: false,
            end: 'prevYear,nextYear',
          }}
          footerToolbar={{
            start: 'prev',
            center: 'dayGridWeek',
            end: 'next'
          }}
          eventContent={({ event }) => (
            <div className="event">
              <div className="event-title">{event.title}</div>
            </div>
          )}
          dayCellContent={({ dayNumberText }) => (
            <div className="day-cell">
              <span className="day-number">{dayNumberText}</span>
            </div>
          )}
          style={{ width: '100%' }} // Set width to 100% to fill container
          contentHeight="auto"
        />
      </div>
    </div>
  );
};

export default Sidebar;
