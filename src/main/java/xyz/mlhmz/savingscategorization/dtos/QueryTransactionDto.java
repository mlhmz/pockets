package xyz.mlhmz.savingscategorization.dtos;

import java.time.LocalDate;

public record QueryTransactionDto(
        String id,
        String reason,
        String issuer,
        LocalDate date,
        double amount,
        boolean hideForced,
        boolean pocketForced,
        String forceReason,
        QueryTransactionPocketDto pocket
) {
}
