package xyz.mlhmz.savingscategorization.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import xyz.mlhmz.savingscategorization.models.Pocket;

import java.util.UUID;

public interface PocketRepository extends JpaRepository<Pocket, UUID> {
}
