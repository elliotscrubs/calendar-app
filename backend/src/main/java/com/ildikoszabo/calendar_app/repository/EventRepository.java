package com.ildikoszabo.calendar_app.repository;

import com.ildikoszabo.calendar_app.entity.Event;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Repository
public interface EventRepository extends JpaRepository<Event, UUID> {
	@Query("SELECT e FROM Event e WHERE startAt BETWEEN :fromDate AND :toDate ORDER BY startAt ASC")
	List<Event> findByStartAtAndEndAtAndUserId(@Param("fromDate") LocalDateTime fromDate,
											   @Param("toDate") LocalDateTime toDate, UUID userId);
}
