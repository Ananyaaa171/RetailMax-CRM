package retailmax_backend.service;

import retailmax_backend.entity.*;
import retailmax_backend.repository.*;

import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class DashboardService {

    private final CustomerRepository customerRepository;
    private final LeadRepository leadRepository;
    private final DealRepository dealRepository;
    private final TaskRepository taskRepository;
    private final CampaignRepository campaignRepository;
    private final NotificationRepository notificationRepository;

    public DashboardService(
            CustomerRepository customerRepository,
            LeadRepository leadRepository,
            DealRepository dealRepository,
            TaskRepository taskRepository,
            CampaignRepository campaignRepository,
            NotificationRepository notificationRepository) {

        this.customerRepository = customerRepository;
        this.leadRepository = leadRepository;
        this.dealRepository = dealRepository;
        this.taskRepository = taskRepository;
        this.campaignRepository = campaignRepository;
        this.notificationRepository = notificationRepository;
    }

    public Map<String, Object> getDashboardSummary() {

        List<Customer> customers =
                customerRepository.findAll();

        List<Lead> leads =
                leadRepository.findAll();

        List<Deal> deals =
                dealRepository.findAll();

        List<Task> tasks =
                taskRepository.findAll();

        List<Campaign> campaigns =
                campaignRepository.findAll();

        List<Notification> notifications =
                notificationRepository.findAll();

        int hotLeads = 0;
        int veryHotLeads = 0;
        int qualifiedLeads = 0;
        int convertedLeads = 0;

        for (Lead lead : leads) {

            if ("HOT".equalsIgnoreCase(lead.getStatus())) {
                hotLeads++;
            }

            if ("VERY_HOT".equalsIgnoreCase(lead.getStatus())) {
                veryHotLeads++;
            }

            if ("QUALIFIED".equalsIgnoreCase(lead.getStatus())) {
                qualifiedLeads++;
            }

            if ("CONVERTED".equalsIgnoreCase(lead.getStatus())) {
                convertedLeads++;
            }
        }

        double totalPipelineValue = 0;
        double weightedPipelineValue = 0;

        int wonDeals = 0;
        int lostDeals = 0;

        for (Deal deal : deals) {

            double amount =
                    deal.getAmount() != null
                            ? deal.getAmount()
                            : 0;

            totalPipelineValue += amount;

            double probability = parseProbability(
                    deal.getProbability()
            );

            weightedPipelineValue +=
                    amount * probability / 100;

            if ("CLOSED_WON".equalsIgnoreCase(
                    deal.getStage())) {

                wonDeals++;
            }

            if ("CLOSED_LOST".equalsIgnoreCase(
                    deal.getStage())) {

                lostDeals++;
            }
        }

        int pendingTasks = 0;
        int completedTasks = 0;

        for (Task task : tasks) {

            if ("COMPLETED".equalsIgnoreCase(
                    task.getStatus())) {

                completedTasks++;

            } else {
                pendingTasks++;
            }
        }

        int activeCampaigns = 0;

        for (Campaign campaign : campaigns) {

            if ("ACTIVE".equalsIgnoreCase(
                    campaign.getStatus())) {

                activeCampaigns++;
            }
        }

        int unreadNotifications = 0;

        for (Notification notification : notifications) {

            if (Boolean.FALSE.equals(
                    notification.getIsRead())) {

                unreadNotifications++;
            }
        }

        Map<String, Object> dashboard =
                new HashMap<>();

        dashboard.put(
                "totalCustomers",
                customers.size()
        );

        dashboard.put(
                "totalLeads",
                leads.size()
        );

        dashboard.put(
                "hotLeads",
                hotLeads
        );

        dashboard.put(
                "veryHotLeads",
                veryHotLeads
        );

        dashboard.put(
                "qualifiedLeads",
                qualifiedLeads
        );

        dashboard.put(
                "convertedLeads",
                convertedLeads
        );

        dashboard.put(
                "totalDeals",
                deals.size()
        );

        dashboard.put(
                "wonDeals",
                wonDeals
        );

        dashboard.put(
                "lostDeals",
                lostDeals
        );

        dashboard.put(
                "totalPipelineValue",
                totalPipelineValue
        );

        dashboard.put(
                "weightedPipelineValue",
                weightedPipelineValue
        );

        dashboard.put(
                "totalTasks",
                tasks.size()
        );

        dashboard.put(
                "pendingTasks",
                pendingTasks
        );

        dashboard.put(
                "completedTasks",
                completedTasks
        );

        dashboard.put(
                "totalCampaigns",
                campaigns.size()
        );

        dashboard.put(
                "activeCampaigns",
                activeCampaigns
        );

        dashboard.put(
                "totalNotifications",
                notifications.size()
        );

        dashboard.put(
                "unreadNotifications",
                unreadNotifications
        );

        return dashboard;
    }

    public Map<String, Object> getSalesReport() {

        List<Deal> deals =
                dealRepository.findAll();

        double totalValue = 0;
        double wonValue = 0;
        double lostValue = 0;

        int wonCount = 0;
        int lostCount = 0;

        for (Deal deal : deals) {

            double amount =
                    deal.getAmount() != null
                            ? deal.getAmount()
                            : 0;

            totalValue += amount;

            if ("CLOSED_WON".equalsIgnoreCase(
                    deal.getStage())) {

                wonValue += amount;
                wonCount++;

            } else if ("CLOSED_LOST".equalsIgnoreCase(
                    deal.getStage())) {

                lostValue += amount;
                lostCount++;
            }
        }

        double winRate = 0;

        if (wonCount + lostCount > 0) {

            winRate =
                    ((double) wonCount /
                            (wonCount + lostCount)) * 100;
        }

        Map<String, Object> report =
                new HashMap<>();

        report.put("totalDeals", deals.size());
        report.put("totalDealValue", totalValue);
        report.put("wonDeals", wonCount);
        report.put("wonDealValue", wonValue);
        report.put("lostDeals", lostCount);
        report.put("lostDealValue", lostValue);
        report.put(
                "winRatePercentage",
                Math.round(winRate * 100.0) / 100.0
        );

        return report;
    }

    public Map<String, Object> getLeadReport() {

        List<Lead> leads =
                leadRepository.findAll();

        Map<String, Integer> statusCounts =
                new HashMap<>();

        for (Lead lead : leads) {

            String status = lead.getStatus();

            if (status == null) {
                status = "UNKNOWN";
            }

            status = status.toUpperCase();

            statusCounts.put(
                    status,
                    statusCounts.getOrDefault(status, 0) + 1
            );
        }

        Map<String, Object> report =
                new HashMap<>();

        report.put(
                "totalLeads",
                leads.size()
        );

        report.put(
                "statusBreakdown",
                statusCounts
        );

        return report;
    }

    private double parseProbability(
            String probability) {

        if (probability == null ||
                probability.isBlank()) {

            return 0;
        }

        try {

            return Double.parseDouble(
                    probability
                            .replace("%", "")
                            .trim()
            );

        } catch (NumberFormatException e) {

            return 0;
        }
    }
}