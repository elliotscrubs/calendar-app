package com.ildikoszabo.calendar_app.repository;

import com.ildikoszabo.calendar_app.entity.Event;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.math.BigInteger;

@Repository
public interface EventRepository extends JpaRepository<Event, BigInteger> {



}
