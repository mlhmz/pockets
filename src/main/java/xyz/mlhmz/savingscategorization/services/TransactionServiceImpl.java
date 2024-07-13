package xyz.mlhmz.savingscategorization.services;

import io.micrometer.common.util.StringUtils;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import xyz.mlhmz.savingscategorization.models.Pocket;
import xyz.mlhmz.savingscategorization.models.Transaction;
import xyz.mlhmz.savingscategorization.repositories.TransactionRepository;

import java.util.List;
import java.util.Objects;

@Service
@AllArgsConstructor
public class TransactionServiceImpl implements TransactionService {
    private final TransactionRepository transactionRepository;
    private final PocketService pocketService;

    @Override
    public List<Transaction> createTransactions(List<Transaction> transactions) {
        return transactions.stream()
                .map(this::createTransaction)
                .filter(Objects::nonNull)
                .toList();
    }

    /**
     * Transactions, that ids are already persisted are ignored and returned as null
     */
    @Override
    public Transaction createTransaction(Transaction transaction) {
        if (!transactionRepository.existsById(transaction.getId())) {
            setPocketIntoTransaction(transaction);
            return transactionRepository.save(transaction);
        } else {
            return null;
        }
    }

    private void setPocketIntoTransaction(Transaction transaction) {
        if (StringUtils.isNotEmpty(transaction.getReason())) {
            Pocket pocket = pocketService.determinePocketByReason(transaction.getReason());
            transaction.setPocket(pocket);
        }
    }
}
