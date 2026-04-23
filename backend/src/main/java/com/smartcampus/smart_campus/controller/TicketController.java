package com.smartcampus.smart_campus.controller;

import com.smartcampus.smart_campus.model.Ticket;
import com.smartcampus.smart_campus.service.TicketService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tickets")
@CrossOrigin(origins = "http://localhost:5173") // Adjust based on frontend URL
public class TicketController {

    @Autowired
    private TicketService ticketService;

    @GetMapping
    public List<Ticket> getAllTickets() {
        return ticketService.getAllTickets();
    }

    @PostMapping
    public ResponseEntity<Ticket> createTicket(@RequestBody Ticket ticket) {
        Ticket savedTicket = ticketService.createTicket(ticket);
        return ResponseEntity.ok(savedTicket);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Ticket> updateTicket(@PathVariable String id, @RequestBody Ticket ticket) {
        Ticket updatedTicket = ticketService.updateTicket(id, ticket);
        return ResponseEntity.ok(updatedTicket);
    }

    @PostMapping("/{id}/comments")
    public ResponseEntity<Ticket> addComment(@PathVariable String id, @RequestBody Ticket.Comment comment) {
        Ticket updatedTicket = ticketService.addComment(id, comment);
        return ResponseEntity.ok(updatedTicket);
    }
}
