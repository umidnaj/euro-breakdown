package com.example.euro_backend.controller;

import java.util.Map;

public class BreakdownResponse {

    private Map<String, Integer> breakdown;

    public BreakdownResponse(Map<String, Integer> breakdown) {
        this.breakdown = breakdown;
    }

    public Map<String, Integer> getBreakdown() {
        return breakdown;
    }

    public void setBreakdown(Map<String, Integer> breakdown) {
        this.breakdown = breakdown;
    }
}
