package xyz.mlhmz.savingscategorization.services;

import io.micrometer.common.util.StringUtils;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import xyz.mlhmz.savingscategorization.models.Pocket;
import xyz.mlhmz.savingscategorization.models.Transaction;
import xyz.mlhmz.savingscategorization.repositories.TransactionRepository;

import java.util.*;

@Service
@AllArgsConstructor
public class TransactionServiceImpl implements TransactionService {
    private final TransactionRepository transactionRepository;
    private final PocketService pocketService;

    @Override
    public List<Transaction> createTransactions(List<Transaction> transactions) {
        List<Transaction> result = transactions.stream()
                .map(this::saveTransaction)
                .filter(Objects::nonNull)
                .toList();
        recalculateAllAffectedPockets(result);
        return result;
    }

    @Override
    public Transaction createTransaction(Transaction transaction) {
        Transaction result = saveTransaction(transaction);
        if (result != null) {
            recalculatePocketSumOnPocketInTransactionNotNull(result);
        }
        return result;
    }

    /**
     * Transactions, that ids are already persisted are ignored and returned as null
     */
    private Transaction saveTransaction(Transaction transaction) {
        if (!transactionRepository.existsById(transaction.getId())) {
            setPocketIntoTransaction(transaction);
            return transactionRepository.save(transaction);
        } else {
            return null;
        }
    }

    private void recalculateAllAffectedPockets(List<Transaction> result) {
        Map<UUID, Pocket> pocketMap = new HashMap<>();
        result.stream().map(Transaction::getPocket).filter(Objects::nonNull).forEach(pocket -> pocketMap.put(pocket.getUuid(), pocket));
        pocketMap.values().forEach(pocketService::recalculatePocketSum);
    }

    private void setPocketIntoTransaction(Transaction transaction) {
        if (StringUtils.isNotEmpty(transaction.getReason())) {
            Pocket pocket = pocketService.determinePocketByReason(transaction.getReason());
            transaction.setPocket(pocket);
        }
    }

    private void recalculatePocketSumOnPocketInTransactionNotNull(Transaction result) {
        Pocket pocket = result.getPocket();
        if (pocket != null) {
            pocketService.recalculatePocketSum(pocket);
        }
    }
}
