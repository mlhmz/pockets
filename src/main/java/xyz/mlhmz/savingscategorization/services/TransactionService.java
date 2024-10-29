package xyz.mlhmz.savingscategorization.services;

import jakarta.annotation.Nullable;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PagedModel;
import xyz.mlhmz.savingscategorization.exceptions.EntityNotFoundException;
import xyz.mlhmz.savingscategorization.models.Transaction;

import java.util.List;
import java.util.UUID;

public interface TransactionService {
    List<Transaction> createTransactions(List<Transaction> transactions);

    Transaction createTransaction(Transaction transaction);

    Page<Transaction> findAllTransactions(Pageable pageable);

    Transaction findTransactionById(String id) throws EntityNotFoundException;

    Page<Transaction> findTransactionsByPocket(Pageable pageable, UUID pocketUuid);

    Transaction updateTransaction(String transactionId, Transaction payload, @Nullable UUID pocketUUID) throws EntityNotFoundException;

    void deleteTransactionById(String id) throws EntityNotFoundException;
}
