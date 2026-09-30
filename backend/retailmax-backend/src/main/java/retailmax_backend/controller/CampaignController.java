package retailmax_backend.controller;

import retailmax_backend.entity.Campaign;
import retailmax_backend.service.CampaignService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/campaigns")
@CrossOrigin(origins = {
        "http://localhost:3000",
        "http://localhost:5174",
        "http://localhost:5173"
})
public class CampaignController {

    private final CampaignService campaignService;

    public CampaignController(CampaignService campaignService) {
        this.campaignService = campaignService;
    }

    @GetMapping
    public List<Campaign> getAllCampaigns() {
        return campaignService.getAllCampaigns();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Campaign> getCampaignById(
            @PathVariable Long id) {

        return campaignService.getCampaignById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/status/{status}")
    public List<Campaign> getCampaignsByStatus(
            @PathVariable String status) {

        return campaignService.getCampaignsByStatus(status);
    }

    @GetMapping("/type/{campaignType}")
    public List<Campaign> getCampaignsByType(
            @PathVariable String campaignType) {

        return campaignService.getCampaignsByType(campaignType);
    }

    @GetMapping("/audience/{audience}")
    public List<Campaign> searchByAudience(
            @PathVariable String audience) {

        return campaignService.searchByAudience(audience);
    }

    @PostMapping
    public Campaign createCampaign(
            @RequestBody Campaign campaign) {

        return campaignService.createCampaign(campaign);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Campaign> updateCampaign(
            @PathVariable Long id,
            @RequestBody Campaign campaign) {

        try {

            return ResponseEntity.ok(
                    campaignService.updateCampaign(
                            id,
                            campaign
                    )
            );

        } catch (RuntimeException e) {

            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<Campaign> updateCampaignStatus(
            @PathVariable Long id,
            @RequestParam String status) {

        try {

            return ResponseEntity.ok(
                    campaignService.updateCampaignStatus(
                            id,
                            status
                    )
            );

        } catch (RuntimeException e) {

            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping("/{id}/performance")
    public ResponseEntity<Campaign> updateCampaignPerformance(
            @PathVariable Long id,
            @RequestParam(required = false) Integer generatedLeads,
            @RequestParam(required = false) Integer convertedLeads,
            @RequestParam(required = false) Double revenueGenerated) {

        try {

            return ResponseEntity.ok(
                    campaignService.updateCampaignPerformance(
                            id,
                            generatedLeads,
                            convertedLeads,
                            revenueGenerated
                    )
            );

        } catch (RuntimeException e) {

            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/{id}/performance")
    public ResponseEntity<Map<String, Object>> getCampaignPerformance(
            @PathVariable Long id) {

        try {

            return ResponseEntity.ok(
                    campaignService.getCampaignPerformance(id)
            );

        } catch (RuntimeException e) {

            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCampaign(
            @PathVariable Long id) {

        campaignService.deleteCampaign(id);

        return ResponseEntity.noContent().build();
    }
}