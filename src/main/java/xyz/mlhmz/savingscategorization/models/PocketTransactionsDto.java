package xyz.mlhmz.savingscategorization.models;

import java.util.List;

public record PocketTransactionsDto(
        String pocketName,
        Double sum,
        List<Transaction> transactions
) {
}
