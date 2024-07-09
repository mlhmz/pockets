package xyz.mlhmz.savingscategorization.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import xyz.mlhmz.savingscategorization.models.CategoryType;
import xyz.mlhmz.savingscategorization.models.Transaction;

import java.util.List;

public interface TransactionRepository extends JpaRepository<Transaction, String> {
    List<Transaction> getTransactionsByCategory(CategoryType categoryType);
}
