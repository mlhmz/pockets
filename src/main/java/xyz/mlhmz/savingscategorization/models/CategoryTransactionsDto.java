package xyz.mlhmz.savingscategorization.models;

import java.util.List;

public record CategoryTransactionsDto(
        CategoryType type,
        Double sum,
        List<Transaction> transactions
) {
}
