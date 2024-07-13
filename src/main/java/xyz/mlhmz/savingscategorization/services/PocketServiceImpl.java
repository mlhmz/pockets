package xyz.mlhmz.savingscategorization.services;

import org.springframework.stereotype.Service;
import xyz.mlhmz.savingscategorization.models.Pocket;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class PocketServiceImpl implements PocketService {
    @Override
    public Pocket createPocket(Pocket pocket) {
        return null;
    }

    @Override
    public Pocket updatePocket(Pocket pocket) {
        return null;
    }

    @Override
    public Optional<Pocket> findPocketByUuid(UUID uuid) {
        return Optional.empty();
    }

    @Override
    public List<Pocket> findAllPockets() {
        return List.of();
    }

    @Override
    public void deletePocket(Pocket pocket) {

    }

    @Override
    public Pocket determinePocketByReason(String reason) {
        return null;
    }
}
