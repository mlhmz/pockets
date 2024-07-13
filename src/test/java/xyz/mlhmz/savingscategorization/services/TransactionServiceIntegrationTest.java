package xyz.mlhmz.savingscategorization.services;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import xyz.mlhmz.savingscategorization.PostgresContextContainerTest;
import xyz.mlhmz.savingscategorization.models.Pocket;
import xyz.mlhmz.savingscategorization.models.Transaction;
import xyz.mlhmz.savingscategorization.repositories.PocketRepository;

import java.time.LocalDate;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

class TransactionServiceIntegrationTest extends PostgresContextContainerTest {
    @Autowired
    TransactionService transactionService;

    @Autowired
    PocketRepository pocketRepository;

    @Test
    void createTransaction_ReturnsTransaction_WithRightPocket() {
        Pocket pocket = pocketRepository.save(new Pocket(
                "TestPocket",
                "TestDescription",
                "Icon",
                List.of("test")
        ));

        String id = "TEST";
        String reason = "A test reason";
        LocalDate date = LocalDate.of(2024, 7, 20);
        double amount = 100.0;
        Transaction transaction = createTransaction(id, reason, date, amount);
        Transaction result = transactionService.createTransaction(transaction);

        assertThat(result).isNotNull();
        assertThat(result.getId()).isEqualTo(id);
        assertThat(result.getReason()).isEqualTo(reason);
        assertThat(result.getDate()).isEqualTo(date);
        assertThat(result.getAmount()).isEqualTo(amount);
        assertThat(result.getPocket().getUuid()).isEqualTo(pocket.getUuid());
    }

    @Test
    void createTransaction_OnAmbigiousTransaction_ReturnsNull() {
        String id = "TEST";
        LocalDate date = LocalDate.of(2024, 7, 20);
        double amount = 100.0;
        Transaction transaction = createTransaction(id, null, date, amount);
        Transaction result = transactionService.createTransaction(transaction);

        assertThat(result).isNotNull();
        assertThat(transactionService.createTransaction(transaction)).isNull();
    }


    private Transaction createTransaction(String id, String reason, LocalDate date, double amount) {
        return new Transaction(
                id,
                reason,
                "TESTUSER",
                date,
                amount
        );
    }
}