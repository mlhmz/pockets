package xyz.mlhmz.savingscategorization.repositories;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import xyz.mlhmz.savingscategorization.models.Transaction;

import java.util.UUID;

public interface TransactionRepository extends JpaRepository<Transaction, String> {
    Page<Transaction> findAllByOrderByDateDescIdDesc(Pageable pageable);

    Page<Transaction> findTransactionsByPocketUuidOrderByDateDescIdDesc(Pageable pageable, UUID pocketUuid);


}
