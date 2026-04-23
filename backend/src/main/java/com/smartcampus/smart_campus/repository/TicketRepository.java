package com.smartcampus.smart_campus.repository;

import com.smartcampus.smart_campus.model.Ticket;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface TicketRepository extends MongoRepository<Ticket, String> {
    Optional<Ticket> findByTicketId(String ticketId);
}
