package com.example.euro_backend.controller;

import com.example.euro_backend.service.BreakdownService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/breakdown")
@CrossOrigin
public class BreakdownController {

    private final BreakdownService breakdownService;

    public BreakdownController(BreakdownService breakdownService) {
        this.breakdownService = breakdownService;
    }

    @PostMapping
    public BreakdownResponse calculate(@RequestBody BreakdownRequest request) {
        return new BreakdownResponse(
                breakdownService.calculateBreakdown(request.getAmount())
        );
    }
}
