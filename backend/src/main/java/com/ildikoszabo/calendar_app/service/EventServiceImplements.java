package com.ildikoszabo.calendar_app.service;

import com.ildikoszabo.calendar_app.entity.Event;
import com.ildikoszabo.calendar_app.repository.EventRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class EventServiceImplements implements EventService {
	private EventRepository eventRepository;

	@Autowired
	public EventServiceImplements(EventRepository theEventRepository) {
		eventRepository = theEventRepository;
	}


	@Override
	public Event save(Event theEvent) {
		if (theEvent.getUserId() == null) {
			theEvent.setUserId(UUID.randomUUID());
		}
		return eventRepository.save(theEvent);
	}

	@Override
	public Map<LocalDate, List<Event>> getListByDate(LocalDate fromDate, LocalDate toDate, UUID userId) {
		return eventRepository.findByStartAtAndEndAtAndUserId(fromDate.atStartOfDay(), toDate.atTime(LocalTime.MAX), userId)
				.stream().collect(Collectors.groupingBy((event) -> event.getStartAt().toLocalDate()));
	}

	@Override
	public void deleteById(UUID id) {
		this.eventRepository.deleteById(id);
	}

	@Override
	public Optional<Event> findById(UUID id) {
		return eventRepository.findById(id);
	}
}
