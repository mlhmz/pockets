package xyz.mlhmz.savingscategorization.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import xyz.mlhmz.savingscategorization.models.Pocket;

import java.util.UUID;

public interface PocketRepository extends JpaRepository<Pocket, UUID> {
    @Query("select sum(t.amount) from Pocket p right join Transaction t on p.uuid = t.pocket.uuid where p.uuid = ?1")
    Double sumPocketsTransactionsByUuid(UUID uuid);
}
