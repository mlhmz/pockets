package xyz.mlhmz.savingscategorization.dtos;

import xyz.mlhmz.savingscategorization.models.Transaction;

import java.util.UUID;

public record MutateTransactionDto(
        String forceReason,
        UUID pocketUuid,
        boolean pocketForced,
        boolean hideForced
) {
    public Transaction toTransaction() {
        Transaction transaction = new Transaction();
        transaction.setHideForced(hideForced);
        transaction.setPocketForced(pocketForced);
        transaction.setForceReason(forceReason);
        return transaction;
    }
}
