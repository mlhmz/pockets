package xyz.mlhmz.savingscategorization.services;

import xyz.mlhmz.savingscategorization.models.Transaction;

import java.util.List;

public interface TransactionService {
    List<Transaction> createTransactions();

    Transaction createTransaction(Transaction transaction);
}
