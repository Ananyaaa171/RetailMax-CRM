package retailmax_backend.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "campaigns")
public class Campaign {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String campaignName;

    private String campaignType;

    private String status;

    private String targetAudience;

    private String startDate;

    private String endDate;

    private Double budget;

    private Integer targetLeads;

    private Integer generatedLeads;

    private Integer convertedLeads;

    private Double revenueGenerated;

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;

    public Campaign() {
    }

    @PrePersist
    public void onCreate() {

        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();

        if (status == null || status.isBlank()) {
            status = "DRAFT";
        }

        if (campaignType == null || campaignType.isBlank()) {
            campaignType = "EMAIL";
        }

        if (targetLeads == null) {
            targetLeads = 0;
        }

        if (generatedLeads == null) {
            generatedLeads = 0;
        }

        if (convertedLeads == null) {
            convertedLeads = 0;
        }

        if (revenueGenerated == null) {
            revenueGenerated = 0.0;
        }

        if (budget == null) {
            budget = 0.0;
        }
    }

    @PreUpdate
    public void onUpdate() {
        updatedAt = LocalDateTime.now();
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCampaignName() {
        return campaignName;
    }

    public void setCampaignName(String campaignName) {
        this.campaignName = campaignName;
    }

    public String getCampaignType() {
        return campaignType;
    }

    public void setCampaignType(String campaignType) {
        this.campaignType = campaignType;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getTargetAudience() {
        return targetAudience;
    }

    public void setTargetAudience(String targetAudience) {
        this.targetAudience = targetAudience;
    }

    public String getStartDate() {
        return startDate;
    }

    public void setStartDate(String startDate) {
        this.startDate = startDate;
    }

    public String getEndDate() {
        return endDate;
    }

    public void setEndDate(String endDate) {
        this.endDate = endDate;
    }

    public Double getBudget() {
        return budget;
    }

    public void setBudget(Double budget) {
        this.budget = budget;
    }

    public Integer getTargetLeads() {
        return targetLeads;
    }

    public void setTargetLeads(Integer targetLeads) {
        this.targetLeads = targetLeads;
    }

    public Integer getGeneratedLeads() {
        return generatedLeads;
    }

    public void setGeneratedLeads(Integer generatedLeads) {
        this.generatedLeads = generatedLeads;
    }

    public Integer getConvertedLeads() {
        return convertedLeads;
    }

    public void setConvertedLeads(Integer convertedLeads) {
        this.convertedLeads = convertedLeads;
    }

    public Double getRevenueGenerated() {
        return revenueGenerated;
    }

    public void setRevenueGenerated(Double revenueGenerated) {
        this.revenueGenerated = revenueGenerated;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }
}