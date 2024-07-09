package xyz.mlhmz.savingscategorization.reader;

import xyz.mlhmz.savingscategorization.models.Transaction;

import java.util.List;

public interface TransactionsCsvReader {
    List<Transaction> readTransactionsFromCsv(String input);
}
