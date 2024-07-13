package xyz.mlhmz.savingscategorization.dtos;

import xyz.mlhmz.savingscategorization.models.Transaction;

import java.util.List;

public record PocketTransactionsDto(
        String pocketName,
        Double sum,
        List<Transaction> transactions
) {
}
