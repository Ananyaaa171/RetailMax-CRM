package retailmax_backend.repository;

import retailmax_backend.entity.Campaign;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CampaignRepository extends JpaRepository<Campaign, Long> {

    List<Campaign> findByStatus(String status);

    List<Campaign> findByCampaignType(String campaignType);

    List<Campaign> findByTargetAudienceContainingIgnoreCase(String targetAudience);
}