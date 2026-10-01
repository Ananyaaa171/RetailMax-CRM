package retailmax_backend.service;

import retailmax_backend.entity.Customer;
import retailmax_backend.entity.Lead;
import retailmax_backend.repository.CustomerRepository;
import retailmax_backend.repository.LeadRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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
        if (lead.getScore() == null) {
            lead.setScore(0);
        }

        if (lead.getStatus() == null || lead.getStatus().isBlank()) {
            lead.setStatus("NEW");
        }

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

    // =========================================================
    // CALCULATE LEAD SCORE
    // =========================================================

    @Transactional
    public Lead calculateLeadScore(Long id) {

        Lead lead = leadRepository.findById(id)
                .orElseThrow(() -> new RuntimeException(
                        "Lead not found with ID: " + id
                ));

        int score = 0;

        // -----------------------------------------------------
        // CONTACT INFORMATION
        // -----------------------------------------------------

        if (lead.getEmail() != null && !lead.getEmail().isBlank()) {
            score += 20;
        }

        if (lead.getPhone() != null && !lead.getPhone().isBlank()) {
            score += 20;
        }

        // -----------------------------------------------------
        // LEAD SOURCE
        // -----------------------------------------------------

        if (lead.getSource() != null && !lead.getSource().isBlank()) {

            String source = lead.getSource()
                    .trim()
                    .toLowerCase();

            switch (source) {

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

        // -----------------------------------------------------
        // BONUS FOR COMPLETE LEAD PROFILE
        // -----------------------------------------------------

        if (lead.getFirstName() != null &&
                !lead.getFirstName().isBlank() &&
                lead.getLastName() != null &&
                !lead.getLastName().isBlank()) {

            score += 10;
        }

        // Maximum possible score = 80
        // Email 20
        // Phone 20
        // Referral 30
        // Name 10

        // -----------------------------------------------------
        // LIMIT SCORE TO 100
        // -----------------------------------------------------

        score = Math.min(score, 100);

        lead.setScore(score);

        // -----------------------------------------------------
        // DETERMINE LEAD STATUS
        // -----------------------------------------------------

        if (score >= 70) {

            lead.setStatus("VERY_HOT");

        } else if (score >= 55) {

            lead.setStatus("HOT");

        } else if (score >= 30) {

            lead.setStatus("QUALIFIED");

        } else {

            lead.setStatus("NEW");
        }

        return leadRepository.save(lead);
    }

    // =========================================================
    // CONVERT LEAD TO CUSTOMER
    // =========================================================

    @Transactional
    public Customer convertLeadToCustomer(Long id) {

        Lead lead = leadRepository.findById(id)
                .orElseThrow(() -> new RuntimeException(
                        "Lead not found with ID: " + id
                ));

        Customer customer = new Customer();

        customer.setFirstName(lead.getFirstName());
        customer.setLastName(lead.getLastName());
        customer.setEmail(lead.getEmail());
        customer.setPhone(lead.getPhone());

        Customer savedCustomer = customerRepository.save(customer);

        // Mark lead as converted
        lead.setStatus("CONVERTED");
        leadRepository.save(lead);

        return savedCustomer;
    }
}