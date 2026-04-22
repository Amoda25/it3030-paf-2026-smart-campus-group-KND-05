package com.smartcampus.smart_campus.service;

import com.smartcampus.smart_campus.model.Ticket;
import com.smartcampus.smart_campus.repository.TicketRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Random;

@Service
public class TicketService {

    @Autowired
    private TicketRepository ticketRepository;

    public List<Ticket> getAllTickets() {
        return ticketRepository.findAll();
    }

    public Ticket createTicket(Ticket ticket) {
        // Generate a ticket ID if not present
        if (ticket.getTicketId() == null || ticket.getTicketId().isEmpty()) {
            ticket.setTicketId("INC-" + (1000 + new Random().nextInt(9000)));
        }
        
        ticket.setStatus("OPEN");
        ticket.setSubmittedAt(LocalDateTime.now());
        ticket.setTechnician("Not Assigned");
        
        return ticketRepository.save(ticket);
    }
}
