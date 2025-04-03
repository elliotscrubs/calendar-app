package com.ildikoszabo.calendar_app.service;

import com.ildikoszabo.calendar_app.entity.Event;
import java.time.LocalDate;
import java.util.List;
import java.util.Map;
import java.util.UUID;

public interface EventService {
   Event save(Event theEvent);
   Map<LocalDate, List<Event>> getListByDate(LocalDate fromDate, LocalDate toDate, UUID userId);
}
