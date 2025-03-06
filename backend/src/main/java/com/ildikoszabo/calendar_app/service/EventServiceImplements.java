package com.ildikoszabo.calendar_app.service;

import com.ildikoszabo.calendar_app.entity.Event;
import com.ildikoszabo.calendar_app.repository.EventRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class EventServiceImplements implements EventService {
    private EventRepository eventRepository;

    @Autowired
    public EventServiceImplements(EventRepository theEventRepository) {
        eventRepository = theEventRepository;
    }

    @Override
    public void save(Event theEvent) {

        eventRepository.save(theEvent);
    }
}
