package retailmax_backend.controller;

import retailmax_backend.entity.Customer;
import retailmax_backend.entity.Lead;
import retailmax_backend.service.LeadService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/leads")
@CrossOrigin(origins = {
        "http://localhost:3000",
        "http://localhost:5174",
        "http://localhost:5173"
})
public class LeadController {

    private final LeadService leadService;

    public LeadController(LeadService leadService) {
        this.leadService = leadService;
    }

    @GetMapping
    public List<Lead> getAllLeads() {
        return leadService.getAllLeads();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Lead> getLeadById(@PathVariable Long id) {
        return leadService.getLeadById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Lead> createLead(@RequestBody Lead lead) {
        Lead createdLead = leadService.createLead(lead);
        return ResponseEntity.ok(createdLead);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Lead> updateLead(
            @PathVariable Long id,
            @RequestBody Lead lead) {

        Lead updatedLead = leadService.updateLead(id, lead);

        if (updatedLead == null) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(updatedLead);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteLead(@PathVariable Long id) {
        leadService.deleteLead(id);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/{id}/calculate-score")
    public ResponseEntity<Lead> calculateLeadScore(@PathVariable Long id) {

        Lead lead = leadService.calculateLeadScore(id);

        if (lead == null) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(lead);
    }

    @PostMapping("/{id}/convert")
    public ResponseEntity<Customer> convertLeadToCustomer(
            @PathVariable Long id) {

        Customer customer = leadService.convertLeadToCustomer(id);

        if (customer == null) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(customer);
    }
}