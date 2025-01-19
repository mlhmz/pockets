package xyz.mlhmz.savingscategorization.mappers;

import org.junit.jupiter.api.Test;
import xyz.mlhmz.savingscategorization.dtos.QueryTransactionDto;
import xyz.mlhmz.savingscategorization.dtos.QueryTransactionPocketDto;
import xyz.mlhmz.savingscategorization.models.Pocket;
import xyz.mlhmz.savingscategorization.models.Transaction;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

import static org.assertj.core.api.Assertions.assertThat;

class TransactionMapperTest {
    TransactionMapper transactionMapper = new TransactionMapperImpl();

    @Test
    public void testMapTransactionToQueryTransaction() {
        UUID pocketUuid = UUID.randomUUID();
        Pocket pocket = new Pocket(pocketUuid, "test-identifier", "Test Pocket", "Test Description", "test-icon.png", List.of("keyword1", "keyword2"), 0.0, List.of());
        Transaction transaction = new Transaction("1", "Test Reason", "Test Issuer", LocalDate.now(), 100.0);
        transaction.setPocket(pocket);
        transaction.setPocketForced(true);
        transaction.setHideForced(false);
        transaction.setForceReason("Test Force Reason");

        QueryTransactionDto result = transactionMapper.mapTransactionToQueryTransaction(transaction);

        assertThat(result).isNotNull();
        assertThat(result.id()).isEqualTo(transaction.getId());
        assertThat(result.reason()).isEqualTo(transaction.getReason());
        assertThat(result.issuer()).isEqualTo(transaction.getIssuer());
        assertThat(result.date()).isEqualTo(transaction.getDate());
        assertThat(result.amount()).isEqualTo(transaction.getAmount());
        assertThat(result.pocketForced()).isEqualTo(transaction.isPocketForced());
        assertThat(result.hideForced()).isEqualTo(transaction.isHideForced());
        assertThat(result.forceReason()).isEqualTo(transaction.getForceReason());
        assertThat(result.pocket()).isNotNull();
        assertThat(result.pocket().uuid()).isEqualTo(pocket.getUuid());
        assertThat(result.pocket().name()).isEqualTo(pocket.getName());
    }

    @Test
    public void testMapPocketToQueryTransactionPocket() {
        UUID uuid = UUID.randomUUID();
        Pocket pocket = new Pocket(uuid, "test-identifier", "Test Pocket", "Test Description", "test-icon.png", List.of("keyword1", "keyword2"), 0.0, List.of());

        QueryTransactionPocketDto result = transactionMapper.mapPocketToQueryTransactionPocket(pocket);

        assertThat(result).isNotNull();
        assertThat(result.uuid()).isEqualTo(pocket.getUuid());
        assertThat(result.name()).isEqualTo(pocket.getName());
    }
}