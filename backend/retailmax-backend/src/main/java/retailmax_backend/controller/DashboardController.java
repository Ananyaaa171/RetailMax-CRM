package retailmax_backend.controller;

import retailmax_backend.service.DashboardService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/dashboard")
@CrossOrigin(origins = {
        "http://localhost:3000",
        "http://localhost:5174",
        "http://localhost:5173"
})
public class DashboardController {

    private final DashboardService dashboardService;

    public DashboardController(
            DashboardService dashboardService) {

        this.dashboardService = dashboardService;
    }

    @GetMapping("/summary")
    public ResponseEntity<Map<String, Object>>
    getDashboardSummary() {

        return ResponseEntity.ok(
                dashboardService.getDashboardSummary()
        );
    }

    @GetMapping("/sales")
    public ResponseEntity<Map<String, Object>>
    getSalesReport() {

        return ResponseEntity.ok(
                dashboardService.getSalesReport()
        );
    }

    @GetMapping("/leads")
    public ResponseEntity<Map<String, Object>>
    getLeadReport() {

        return ResponseEntity.ok(
                dashboardService.getLeadReport()
        );
    }
}