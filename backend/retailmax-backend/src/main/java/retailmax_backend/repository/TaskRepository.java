package retailmax_backend.repository;

import retailmax_backend.entity.Task;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TaskRepository extends JpaRepository<Task, Long> {

    List<Task> findByCustomerId(Long customerId);

    List<Task> findByDealId(Long dealId);

    List<Task> findByStatus(String status);

    List<Task> findByPriority(String priority);
}