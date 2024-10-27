package xyz.mlhmz.savingscategorization.services;

import io.micrometer.common.util.StringUtils;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.util.CollectionUtils;
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
    public static final String NO_CATEGORY_IDENTIFIER = "NO_CATEGORY";
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
        target.setIdentifier(payload.getIdentifier());
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
    public Page<Pocket> findAllPockets(Pageable pageable) {
        return pocketRepository.findAll(pageable);
    }

    @Override
    public void recalculatePocketSum(Pocket pocket) {
        Double sum = pocketRepository.sumPocketsTransactionsByUuid(pocket.getUuid());
        pocket.setTransactionSum(sum);
        pocketRepository.save(pocket);
    }

    @Override
    public void deletePocket(Pocket pocket) {
        pocketRepository.delete(pocket);
    }

    @Override
    public Pocket determinePocketByReason(String reason) {
        List<Pocket> pockets = findAllPockets();
        if (StringUtils.isEmpty(reason)) {
            return getNoCategoryPocket();
        }
        return pockets.stream()
                .filter(isReasonContainingAnyKeywordsPocketPredicate(reason))
                .findFirst()
                .orElse(getNoCategoryPocket());
    }

    private Pocket getNoCategoryPocket() {
        Optional<Pocket> pocket = pocketRepository.findPocketByIdentifier(NO_CATEGORY_IDENTIFIER);
        Pocket result;
        if (pocket.isEmpty()) {
            Pocket noCategory = new Pocket("No Category", null, null, null);
            noCategory.setIdentifier(NO_CATEGORY_IDENTIFIER);
            result = pocketRepository.save(noCategory);
        } else {
            result = pocket.get();
        }
        return result;
    }

    private Predicate<Pocket> isReasonContainingAnyKeywordsPocketPredicate(String reason) {
        return pocket -> {
            List<String> keywords = pocket.getKeywords();
            return !CollectionUtils.isEmpty(keywords) && keywords.stream()
                    .anyMatch(keyword -> reason.toLowerCase().contains(keyword.toLowerCase()));
        };
    }
}
