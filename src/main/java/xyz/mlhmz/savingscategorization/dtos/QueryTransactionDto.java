package xyz.mlhmz.savingscategorization.dtos;

import java.time.LocalDate;

public record QueryTransactionDto(
        String id,
        String reason,
        String issuer,
        LocalDate localDate,
        double amount,
        QueryTransactionPocketDto pocket
) {
}
