package xyz.mlhmz.savingscategorization.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import xyz.mlhmz.savingscategorization.models.CategoryType;
import xyz.mlhmz.savingscategorization.models.Transaction;

import java.util.List;
import java.util.UUID;

public interface TransactionRepository extends JpaRepository<Transaction, String> {
    List<Transaction> findTransactionsByPocketUuid(UUID pocketUuid);
}
