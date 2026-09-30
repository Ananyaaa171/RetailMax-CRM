package retailmax_backend.service;

import retailmax_backend.entity.Campaign;
import retailmax_backend.repository.CampaignRepository;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class CampaignService {

    private final CampaignRepository campaignRepository;

    public CampaignService(CampaignRepository campaignRepository) {
        this.campaignRepository = campaignRepository;
    }

    public List<Campaign> getAllCampaigns() {
        return campaignRepository.findAll();
    }

    public Optional<Campaign> getCampaignById(Long id) {
        return campaignRepository.findById(id);
    }

    public List<Campaign> getCampaignsByStatus(String status) {
        return campaignRepository.findByStatus(
                status.toUpperCase()
        );
    }

    public List<Campaign> getCampaignsByType(String campaignType) {
        return campaignRepository.findByCampaignType(
                campaignType.toUpperCase()
        );
    }

    public List<Campaign> searchByAudience(String audience) {
        return campaignRepository
                .findByTargetAudienceContainingIgnoreCase(audience);
    }

    public Campaign createCampaign(Campaign campaign) {

        if (campaign.getStatus() == null ||
                campaign.getStatus().isBlank()) {

            campaign.setStatus("DRAFT");

        } else {
            campaign.setStatus(
                    campaign.getStatus().toUpperCase()
            );
        }

        if (campaign.getCampaignType() == null ||
                campaign.getCampaignType().isBlank()) {

            campaign.setCampaignType("EMAIL");

        } else {
            campaign.setCampaignType(
                    campaign.getCampaignType().toUpperCase()
            );
        }

        if (campaign.getBudget() == null) {
            campaign.setBudget(0.0);
        }

        if (campaign.getTargetLeads() == null) {
            campaign.setTargetLeads(0);
        }

        if (campaign.getGeneratedLeads() == null) {
            campaign.setGeneratedLeads(0);
        }

        if (campaign.getConvertedLeads() == null) {
            campaign.setConvertedLeads(0);
        }

        if (campaign.getRevenueGenerated() == null) {
            campaign.setRevenueGenerated(0.0);
        }

        return campaignRepository.save(campaign);
    }

    public Campaign updateCampaign(
            Long id,
            Campaign campaignDetails) {

        Campaign campaign = campaignRepository.findById(id)
                .orElseThrow(
                        () -> new RuntimeException(
                                "Campaign not found"
                        )
                );

        campaign.setCampaignName(
                campaignDetails.getCampaignName()
        );

        campaign.setCampaignType(
                campaignDetails.getCampaignType()
        );

        campaign.setStatus(
                campaignDetails.getStatus()
        );

        campaign.setTargetAudience(
                campaignDetails.getTargetAudience()
        );

        campaign.setStartDate(
                campaignDetails.getStartDate()
        );

        campaign.setEndDate(
                campaignDetails.getEndDate()
        );

        campaign.setBudget(
                campaignDetails.getBudget()
        );

        campaign.setTargetLeads(
                campaignDetails.getTargetLeads()
        );

        campaign.setGeneratedLeads(
                campaignDetails.getGeneratedLeads()
        );

        campaign.setConvertedLeads(
                campaignDetails.getConvertedLeads()
        );

        campaign.setRevenueGenerated(
                campaignDetails.getRevenueGenerated()
        );

        if (campaign.getStatus() != null) {
            campaign.setStatus(
                    campaign.getStatus().toUpperCase()
            );
        }

        if (campaign.getCampaignType() != null) {
            campaign.setCampaignType(
                    campaign.getCampaignType().toUpperCase()
            );
        }

        return campaignRepository.save(campaign);
    }

    public Campaign updateCampaignStatus(
            Long id,
            String status) {

        Campaign campaign = campaignRepository.findById(id)
                .orElseThrow(
                        () -> new RuntimeException(
                                "Campaign not found"
                        )
                );

        campaign.setStatus(
                status.toUpperCase()
        );

        return campaignRepository.save(campaign);
    }

    public Campaign updateCampaignPerformance(
            Long id,
            Integer generatedLeads,
            Integer convertedLeads,
            Double revenueGenerated) {

        Campaign campaign = campaignRepository.findById(id)
                .orElseThrow(
                        () -> new RuntimeException(
                                "Campaign not found"
                        )
                );

        if (generatedLeads != null) {
            campaign.setGeneratedLeads(generatedLeads);
        }

        if (convertedLeads != null) {
            campaign.setConvertedLeads(convertedLeads);
        }

        if (revenueGenerated != null) {
            campaign.setRevenueGenerated(revenueGenerated);
        }

        return campaignRepository.save(campaign);
    }

    public Map<String, Object> getCampaignPerformance(Long id) {

        Campaign campaign = campaignRepository.findById(id)
                .orElseThrow(
                        () -> new RuntimeException(
                                "Campaign not found"
                        )
                );

        int targetLeads = campaign.getTargetLeads() != null
                ? campaign.getTargetLeads()
                : 0;

        int generatedLeads = campaign.getGeneratedLeads() != null
                ? campaign.getGeneratedLeads()
                : 0;

        int convertedLeads = campaign.getConvertedLeads() != null
                ? campaign.getConvertedLeads()
                : 0;

        double revenue = campaign.getRevenueGenerated() != null
                ? campaign.getRevenueGenerated()
                : 0.0;

        double budget = campaign.getBudget() != null
                ? campaign.getBudget()
                : 0.0;

        double leadAchievement = 0;

        if (targetLeads > 0) {
            leadAchievement =
                    ((double) generatedLeads / targetLeads) * 100;
        }

        double conversionRate = 0;

        if (generatedLeads > 0) {
            conversionRate =
                    ((double) convertedLeads / generatedLeads) * 100;
        }

        double roi = 0;

        if (budget > 0) {
            roi = ((revenue - budget) / budget) * 100;
        }

        Map<String, Object> performance = new HashMap<>();

        performance.put("campaignId", campaign.getId());
        performance.put("campaignName", campaign.getCampaignName());
        performance.put("targetLeads", targetLeads);
        performance.put("generatedLeads", generatedLeads);
        performance.put("convertedLeads", convertedLeads);
        performance.put("leadAchievementPercentage",
                Math.round(leadAchievement * 100.0) / 100.0);
        performance.put("conversionRatePercentage",
                Math.round(conversionRate * 100.0) / 100.0);
        performance.put("budget", budget);
        performance.put("revenueGenerated", revenue);
        performance.put("roiPercentage",
                Math.round(roi * 100.0) / 100.0);

        return performance;
    }

    public void deleteCampaign(Long id) {
        campaignRepository.deleteById(id);
    }
}