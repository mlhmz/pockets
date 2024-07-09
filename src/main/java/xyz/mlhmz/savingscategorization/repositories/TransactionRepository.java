package xyz.mlhmz.savingscategorization.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import xyz.mlhmz.savingscategorization.models.Transaction;

public interface TransactionRepository extends JpaRepository<Transaction, String> {
}
