package xyz.mlhmz.savingscategorization.repositories;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import xyz.mlhmz.savingscategorization.models.Transaction;

import java.util.List;
import java.util.UUID;

public interface TransactionRepository extends JpaRepository<Transaction, String> {
    Page<Transaction> findAllByOrderByDateDesc(Pageable pageable);

    Page<Transaction> findTransactionsByPocketUuidOrderByDateDesc(Pageable pageable, UUID pocketUuid);
}
