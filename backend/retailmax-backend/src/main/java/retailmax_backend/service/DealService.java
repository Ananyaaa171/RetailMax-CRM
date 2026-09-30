package retailmax_backend.service;

import retailmax_backend.entity.Deal;
import retailmax_backend.repository.DealRepository;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class DealService {

    private final DealRepository dealRepository;

    public DealService(DealRepository dealRepository) {
        this.dealRepository = dealRepository;
    }

    // Get all deals
    public List<Deal> getAllDeals() {
        return dealRepository.findAll();
    }

    // Get deal by ID
    public Optional<Deal> getDealById(Long id) {
        return dealRepository.findById(id);
    }

    // Get all deals for a customer
    public List<Deal> getDealsByCustomerId(Long customerId) {
        return dealRepository.findByCustomerId(customerId);
    }

    // Create deal
    public Deal createDeal(Deal deal) {

        validateAndSetStage(deal);

        return dealRepository.save(deal);
    }

    // Update deal
    public Deal updateDeal(Long id, Deal dealDetails) {

        Deal deal = dealRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Deal not found"));

        deal.setDealName(dealDetails.getDealName());
        deal.setAmount(dealDetails.getAmount());
        deal.setExpectedCloseDate(dealDetails.getExpectedCloseDate());
        deal.setCustomerId(dealDetails.getCustomerId());

        validateAndSetStage(dealDetails);

        deal.setStage(dealDetails.getStage());
        deal.setProbability(dealDetails.getProbability());

        return dealRepository.save(deal);
    }

    // Delete deal
    public void deleteDeal(Long id) {
        dealRepository.deleteById(id);
    }

    // Validate stage and automatically set probability
    private void validateAndSetStage(Deal deal) {

        if (deal.getStage() == null || deal.getStage().isBlank()) {
            deal.setStage("PROSPECTING");
        }

        String stage = deal.getStage().trim().toUpperCase();

        switch (stage) {

            case "PROSPECTING":
                deal.setStage("PROSPECTING");
                deal.setProbability("10%");
                break;

            case "QUALIFICATION":
                deal.setStage("QUALIFICATION");
                deal.setProbability("25%");
                break;

            case "PROPOSAL":
                deal.setStage("PROPOSAL");
                deal.setProbability("50%");
                break;

            case "NEGOTIATION":
                deal.setStage("NEGOTIATION");
                deal.setProbability("70%");
                break;

            case "CLOSED_WON":
                deal.setStage("CLOSED_WON");
                deal.setProbability("100%");
                break;

            case "CLOSED_LOST":
                deal.setStage("CLOSED_LOST");
                deal.setProbability("0%");
                break;

            default:
                throw new RuntimeException(
                        "Invalid deal stage. Allowed stages: " +
                                "PROSPECTING, QUALIFICATION, PROPOSAL, " +
                                "NEGOTIATION, CLOSED_WON, CLOSED_LOST"
                );
        }
    }

    // Get pipeline summary
    public Map<String, Object> getPipelineSummary() {

        Map<String, Object> summary = new HashMap<>();

        List<Deal> deals = dealRepository.findAll();

        double totalPipelineValue = 0;
        double weightedPipelineValue = 0;

        for (Deal deal : deals) {

            double amount = deal.getAmount() != null
                    ? deal.getAmount()
                    : 0;

            double probability = parseProbability(
                    deal.getProbability()
            );

            totalPipelineValue += amount;

            weightedPipelineValue +=
                    amount * (probability / 100);
        }

        summary.put("totalDeals", deals.size());
        summary.put("totalPipelineValue", totalPipelineValue);
        summary.put("weightedPipelineValue", weightedPipelineValue);

        summary.put(
                "prospectingValue",
                dealRepository.getProspectingValue()
        );

        summary.put(
                "qualificationValue",
                dealRepository.getQualificationValue()
        );

        summary.put(
                "proposalValue",
                dealRepository.getProposalValue()
        );

        summary.put(
                "negotiationValue",
                dealRepository.getNegotiationValue()
        );

        summary.put(
                "closedWonValue",
                dealRepository.getClosedWonValue()
        );

        summary.put(
                "closedLostValue",
                dealRepository.getClosedLostValue()
        );

        return summary;
    }

    // Convert probability such as "70%" into 70
    private double parseProbability(String probability) {

        if (probability == null || probability.isBlank()) {
            return 0;
        }

        try {
            return Double.parseDouble(
                    probability.replace("%", "").trim()
            );
        } catch (NumberFormatException e) {
            return 0;
        }
    }
}