package com.ildikoszabo.calendar_app.service;

import com.ildikoszabo.calendar_app.dto.EventRequestDto;
import com.ildikoszabo.calendar_app.entity.Event;
import java.time.LocalDate;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;

public interface EventService {
	Event save(EventRequestDto theEvent, UUID userId);

	Event save(Event event);

	Map<LocalDate, List<Event>> getListByDate(LocalDate fromDate, LocalDate toDate, UUID userId);

	void deleteById(UUID id);

	Optional<Event> findById(UUID id);
}
