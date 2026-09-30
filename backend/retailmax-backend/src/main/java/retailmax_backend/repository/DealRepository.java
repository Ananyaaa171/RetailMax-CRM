package retailmax_backend.repository;

import retailmax_backend.entity.Deal;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface DealRepository extends JpaRepository<Deal, Long> {

    // Get all deals for a specific customer
    List<Deal> findByCustomerId(Long customerId);

    @Query("SELECT COALESCE(SUM(d.amount), 0) FROM Deal d")
    Double getTotalPipelineValue();

    @Query("SELECT COALESCE(SUM(d.amount), 0) FROM Deal d WHERE UPPER(d.stage) = 'PROSPECTING'")
    Double getProspectingValue();

    @Query("SELECT COALESCE(SUM(d.amount), 0) FROM Deal d WHERE UPPER(d.stage) = 'QUALIFICATION'")
    Double getQualificationValue();

    @Query("SELECT COALESCE(SUM(d.amount), 0) FROM Deal d WHERE UPPER(d.stage) = 'PROPOSAL'")
    Double getProposalValue();

    @Query("SELECT COALESCE(SUM(d.amount), 0) FROM Deal d WHERE UPPER(d.stage) = 'NEGOTIATION'")
    Double getNegotiationValue();

    @Query("SELECT COALESCE(SUM(d.amount), 0) FROM Deal d WHERE UPPER(d.stage) = 'CLOSED_WON'")
    Double getClosedWonValue();

    @Query("SELECT COALESCE(SUM(d.amount), 0) FROM Deal d WHERE UPPER(d.stage) = 'CLOSED_LOST'")
    Double getClosedLostValue();
}
