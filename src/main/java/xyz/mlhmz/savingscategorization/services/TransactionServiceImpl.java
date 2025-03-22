package xyz.mlhmz.savingscategorization.services;

import jakarta.annotation.Nullable;
import jakarta.persistence.EntityManager;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import xyz.mlhmz.savingscategorization.exceptions.EntityNotFoundException;
import xyz.mlhmz.savingscategorization.models.Pocket;
import xyz.mlhmz.savingscategorization.models.Transaction;
import xyz.mlhmz.savingscategorization.repositories.TransactionRepository;

import java.util.*;

@Service
@AllArgsConstructor
public class TransactionServiceImpl implements TransactionService {
    private final TransactionRepository transactionRepository;
    private final PocketService pocketService;
    private final EntityManager entityManager;

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

    @Override
    public Page<Transaction> findAllTransactions(Pageable pageable) {
        return transactionRepository.findAllByOrderByDateDescIdDesc(pageable);
    }

    @Override
    public Transaction findTransactionById(String id) throws EntityNotFoundException {
        Optional<Transaction> transaction = transactionRepository.findById(id);
        return transaction.orElseThrow(EntityNotFoundException::new);
    }

    @Override
    public Page<Transaction> findTransactionsByPocket(Pageable pageable, UUID pocketUuid) {
        return transactionRepository.findTransactionsByPocketUuidOrderByDateDescIdDesc(pageable, pocketUuid);
    }

    @Override
    @Transactional
    public Transaction updateTransaction(String transactionId, Transaction payload, @Nullable UUID pocketUuid) throws EntityNotFoundException {
        Transaction transaction = findTransactionById(transactionId);
        Pocket oldPocket = transaction.getPocket();
        transaction.setPocketForced(payload.isPocketForced());
        transaction.setHideForced(payload.isHideForced());
        transaction.setForceReason(payload.getForceReason());
        if (pocketUuid != null && transaction.isPocketForced()) {
            Pocket newPocket = pocketService.findPocketByUuid(pocketUuid);
            transaction.setPocket(newPocket);
            saveTransaction(transaction);
            // In order to get the new pocket sums we need to refresh
            entityManager.refresh(oldPocket);
            entityManager.refresh(newPocket);
            pocketService.recalculatePocketSum(oldPocket);
            pocketService.recalculatePocketSum(newPocket);
        }
        return transaction;
    }

    @Override
    public void deleteTransactionById(String id) throws EntityNotFoundException {
        transactionRepository.delete(findTransactionById(id));
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

    /**
     * When pockets are created, modified or deleted, this can cause transactions to match to criteria of other pockets.
     * This is why this method is existing, redetermine all Pockets of Transactions.
     * <p/>
     * <b>WARNING: This operation can be very expensive because all pockets and all transactions of the application
     * are being processed.</b>
     */
    @Override
    @Transactional
    public List<Transaction> redetermineAllPocketsOfTransactions() {
        List<Transaction> transactions = transactionRepository.findAll();
        List<Transaction> modifiedTransactions = new ArrayList<>();
        Set<Pocket> oldPockets = new HashSet<>();
        for (Transaction transaction : transactions) {
            Pocket oldPocket = transaction.getPocket();
            Pocket newPocket = pocketService.determinePocketByReason(transaction.getReason());

            if (!transaction.isPocketForced() && isOldPocketNullOrUnequalToNewPocket(oldPocket, newPocket)) {
                transaction.setPocket(newPocket);
                Transaction savedTransaction = transactionRepository.save(transaction);
                modifiedTransactions.add(savedTransaction);
                if (oldPocket != null) {
                    entityManager.refresh(oldPocket);
                    oldPockets.add(oldPocket);
                }
            }
        }

        oldPockets.forEach(pocketService::recalculatePocketSum);
        recalculateAllAffectedPockets(modifiedTransactions);
        return modifiedTransactions;
    }

    private boolean isOldPocketNullOrUnequalToNewPocket(Pocket oldPocket, Pocket newPocket) {
        return oldPocket == null || (oldPocket.getUuid() != newPocket.getUuid());
    }

    private void recalculateAllAffectedPockets(List<Transaction> result) {
        Map<UUID, Pocket> pocketMap = new HashMap<>();
        result.stream().map(Transaction::getPocket).filter(Objects::nonNull).forEach(pocket -> pocketMap.put(pocket.getUuid(), pocket));
        pocketMap.values().forEach(pocketService::recalculatePocketSum);
    }

    private void setPocketIntoTransaction(Transaction transaction) {
        Pocket pocket = pocketService.determinePocketByReason(transaction.getReason());
        transaction.setPocket(pocket);
    }

    private void recalculatePocketSumOnPocketInTransactionNotNull(Transaction result) {
        Pocket pocket = result.getPocket();
        if (pocket != null) {
            pocketService.recalculatePocketSum(pocket);
        }
    }
}
