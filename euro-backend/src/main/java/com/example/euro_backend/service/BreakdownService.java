package com.example.euro_backend.service;

import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.LinkedHashMap;
import java.util.Map;

@Service public class BreakdownService {

    private static final int[] DENOMINATIONS_IN_CENT = new int[] {
            20000, 10000, 5000, 2000, 1000, 500,
            200, 100, 50, 20, 10, 5, 2, 1
    };

    public Map<String, Integer> calculateBreakdown(String amountString) {
        
        String normalized = amountString.replace(",", ".");
        BigDecimal amount = new BigDecimal(normalized)
                .setScale(2, RoundingMode.HALF_UP);

        int cents = amount.multiply(BigDecimal.valueOf(100)).intValueExact();

        Map<String, Integer> result = new LinkedHashMap<>();

        for (int d : DENOMINATIONS_IN_CENT) {
            int count = cents / d;
            cents = cents % d;

            BigDecimal denominationEuro =
                    BigDecimal.valueOf(d).divide(BigDecimal.valueOf(100));
            String key = denominationEuro.setScale(2, RoundingMode.UNNECESSARY).toString();

            result.put(key, count);
        }

        return result;
    }
}
