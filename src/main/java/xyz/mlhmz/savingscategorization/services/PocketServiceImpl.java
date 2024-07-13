package xyz.mlhmz.savingscategorization.services;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import xyz.mlhmz.savingscategorization.exceptions.EntityAlreadyExistsException;
import xyz.mlhmz.savingscategorization.exceptions.EntityNotFoundException;
import xyz.mlhmz.savingscategorization.models.Pocket;
import xyz.mlhmz.savingscategorization.repositories.PocketRepository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.function.Predicate;

@Service
@AllArgsConstructor
public class PocketServiceImpl implements PocketService {
    PocketRepository pocketRepository;

    @Override
    public Pocket createPocket(Pocket pocket) throws EntityAlreadyExistsException {
        if (pocket.getUuid() == null) {
            return pocketRepository.save(pocket);
        } else {
            throw new EntityAlreadyExistsException();
        }
    }

    @Override
    public Pocket updatePocket(Pocket target, Pocket payload) {
        target.setName(payload.getName());
        target.setDescription(payload.getDescription());
        target.setIconName(payload.getIconName());
        target.setKeywords(payload.getKeywords());
        return pocketRepository.save(target);
    }

    @Override
    public Pocket findPocketByUuid(UUID uuid) throws EntityNotFoundException {
        Optional<Pocket> pocket = pocketRepository.findById(uuid);
        return pocket.orElseThrow(EntityNotFoundException::new);
    }

    @Override
    public List<Pocket> findAllPockets() {
        return pocketRepository.findAll();
    }

    @Override
    public double sumPocketTransactions(Pocket pocket) {
        return pocketRepository.sumPocketsTransactionsByUuid(pocket.getUuid());
    }

    @Override
    public void deletePocket(Pocket pocket) {
        pocketRepository.delete(pocket);
    }

    @Override
    public Pocket determinePocketByReason(String reason) {
        List<Pocket> pockets = findAllPockets();
        return pockets.stream()
                .filter(isReasonContainingAnyKeywordsPocketPredicate(reason))
                .findFirst().orElse(null);
    }

    private Predicate<Pocket> isReasonContainingAnyKeywordsPocketPredicate(String reason) {
        return pocket -> pocket.getKeywords().stream()
                .anyMatch(keyword -> reason.toLowerCase().contains(keyword.toLowerCase()));
    }
}
