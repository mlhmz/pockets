package xyz.mlhmz.savingscategorization.services;

import xyz.mlhmz.savingscategorization.models.Pocket;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface PocketService {
    Pocket createPocket(Pocket pocket);

    Pocket updatePocket(Pocket pocket);

    Optional<Pocket> findPocketByUuid(UUID uuid);

    List<Pocket> findAllPockets();

    void deletePocket();

    Pocket determinePocketByReason(String reason);
}
