package retailmax_backend.service;

import retailmax_backend.entity.Customer;
import retailmax_backend.entity.Lead;
import retailmax_backend.repository.CustomerRepository;
import retailmax_backend.repository.LeadRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class LeadService {

    private final LeadRepository leadRepository;
    private final CustomerRepository customerRepository;

    public LeadService(
            LeadRepository leadRepository,
            CustomerRepository customerRepository) {

        this.leadRepository = leadRepository;
        this.customerRepository = customerRepository;
    }

    // Get all leads
    public List<Lead> getAllLeads() {
        return leadRepository.findAll();
    }

    // Get lead by ID
    public Optional<Lead> getLeadById(Long id) {
        return leadRepository.findById(id);
    }

    // Create lead
    public Lead createLead(Lead lead) {
        return leadRepository.save(lead);
    }

    // Update lead
    public Lead updateLead(Long id, Lead leadDetails) {

        Lead lead = leadRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Lead not found"));

        lead.setFirstName(leadDetails.getFirstName());
        lead.setLastName(leadDetails.getLastName());
        lead.setEmail(leadDetails.getEmail());
        lead.setPhone(leadDetails.getPhone());
        lead.setSource(leadDetails.getSource());
        lead.setStatus(leadDetails.getStatus());
        lead.setScore(leadDetails.getScore());

        return leadRepository.save(lead);
    }

    // Delete lead
    public void deleteLead(Long id) {
        leadRepository.deleteById(id);
    }

    // Calculate lead score and automatically determine status
    public Lead calculateLeadScore(Long id) {

        Lead lead = leadRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Lead not found"));

        int score = 0;

        if (lead.getEmail() != null && !lead.getEmail().isBlank()) {
            score += 20;
        }

        if (lead.getPhone() != null && !lead.getPhone().isBlank()) {
            score += 20;
        }

        if (lead.getSource() != null) {

            switch (lead.getSource().toLowerCase()) {

                case "referral":
                    score += 30;
                    break;

                case "linkedin":
                    score += 25;
                    break;

                case "website":
                    score += 20;
                    break;

                case "social media":
                    score += 15;
                    break;

                default:
                    score += 10;
                    break;
            }
        }

        lead.setScore(score);

        if (score >= 80) {
            lead.setStatus("VERY_HOT");
        } else if (score >= 60) {
            lead.setStatus("HOT");
        } else if (score >= 30) {
            lead.setStatus("QUALIFIED");
        } else {
            lead.setStatus("NEW");
        }

        return leadRepository.save(lead);
    }

    // Convert lead into customer
    public Customer convertLeadToCustomer(Long id) {

        Lead lead = leadRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Lead not found"));

        Customer customer = new Customer();

        customer.setFirstName(lead.getFirstName());
        customer.setLastName(lead.getLastName());
        customer.setEmail(lead.getEmail());
        customer.setPhone(lead.getPhone());

        Customer savedCustomer = customerRepository.save(customer);

        // Mark the lead as converted
        lead.setStatus("CONVERTED");
        leadRepository.save(lead);

        return savedCustomer;
    }
}