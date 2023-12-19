import React from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'moment/locale/pt-br';
import 'react-big-calendar/lib/css/react-big-calendar.css';

import './CalendarComp.css'

moment.locale('pt-br');
const localizer = momentLocalizer(moment);

const CalendarioComp = ({events}) => {
  
  return (
    <div style={{ height: '700px' }}>
      <Calendar
        localizer={localizer}
        events={events}
        views={['month']}
        startAccessor="start"
        endAccessor="end"
        style={{ margin: '50px' }}
      />
    </div>
  );
};

export default CalendarioComp;