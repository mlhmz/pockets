package xyz.mlhmz.savingscategorization.services;

import xyz.mlhmz.savingscategorization.exceptions.EntityAlreadyExistsException;
import xyz.mlhmz.savingscategorization.exceptions.EntityNotFoundException;
import xyz.mlhmz.savingscategorization.models.Pocket;

import java.util.List;
import java.util.UUID;

public interface PocketService {
    Pocket createPocket(Pocket pocket) throws EntityAlreadyExistsException;

    Pocket updatePocket(Pocket target, Pocket payload);

    Pocket findPocketByUuid(UUID uuid) throws EntityNotFoundException;

    List<Pocket> findAllPockets();

    void recalculatePocketSum(Pocket pocket);

    void deletePocket(Pocket pocket);

    Pocket determinePocketByReason(String reason);
}
