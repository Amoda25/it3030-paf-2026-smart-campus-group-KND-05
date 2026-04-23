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

    public Ticket updateTicket(String ticketId, Ticket updatedTicket) {
        Ticket ticket = ticketRepository.findByTicketId(ticketId).orElseThrow(() -> new RuntimeException("Ticket not found with ID: " + ticketId));
        
        String oldStatus = ticket.getStatus();
        boolean changed = false;

        if (updatedTicket.getStatus() != null && !updatedTicket.getStatus().equals(oldStatus)) {
            ticket.setStatus(updatedTicket.getStatus());
            
            // Auto-add a system comment
            if (ticket.getComments() == null) ticket.setComments(new java.util.ArrayList<>());
            ticket.getComments().add(new Ticket.Comment("SYSTEM", "Status updated to " + updatedTicket.getStatus(), LocalDateTime.now()));
            changed = true;
        }
        
        if (updatedTicket.getTechnician() != null) {
            ticket.setTechnician(updatedTicket.getTechnician());
            changed = true;
        }
        
        if (updatedTicket.getPriority() != null) {
            ticket.setPriority(updatedTicket.getPriority());
            changed = true;
        }
        
        if (updatedTicket.getResolutionNote() != null) {
            ticket.setResolutionNote(updatedTicket.getResolutionNote());
            changed = true;
        }

        if (updatedTicket.getRejectionReason() != null) {
            ticket.setRejectionReason(updatedTicket.getRejectionReason());
            changed = true;
        }

        if (updatedTicket.getImages() != null) {
            ticket.setImages(updatedTicket.getImages());
            changed = true;
        }
        
        return ticketRepository.save(ticket);
    }

    public Ticket addComment(String ticketId, Ticket.Comment comment) {
        Ticket ticket = ticketRepository.findByTicketId(ticketId).orElseThrow(() -> new RuntimeException("Ticket not found with ID: " + ticketId));
        
        if (ticket.getComments() == null) {
            ticket.setComments(new java.util.ArrayList<>());
        }
        
        comment.setTimestamp(LocalDateTime.now());
        ticket.getComments().add(comment);
        
        return ticketRepository.save(ticket);
    }
}
