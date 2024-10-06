package xyz.mlhmz.savingscategorization.services;

import xyz.mlhmz.savingscategorization.exceptions.EntityNotFoundException;
import xyz.mlhmz.savingscategorization.models.Transaction;

import java.util.List;
import java.util.UUID;

public interface TransactionService {
    List<Transaction> createTransactions(List<Transaction> transactions);

    Transaction createTransaction(Transaction transaction);

    List<Transaction> findAllTransactions();

    Transaction findTransactionById(String id) throws EntityNotFoundException;

    List<Transaction> findTransactionsByPocket(UUID pocketUuid);

    void deleteTransactionById(String id) throws EntityNotFoundException;
}
