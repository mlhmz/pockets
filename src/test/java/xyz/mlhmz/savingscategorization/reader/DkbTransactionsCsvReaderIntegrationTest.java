package xyz.mlhmz.savingscategorization.reader;

import org.apache.commons.io.IOUtils;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import xyz.mlhmz.savingscategorization.PostgresContextContainerTest;
import xyz.mlhmz.savingscategorization.models.Pocket;
import xyz.mlhmz.savingscategorization.models.Transaction;
import xyz.mlhmz.savingscategorization.services.PocketService;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.time.LocalDate;
import java.time.Month;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

class DkbTransactionsCsvReaderIntegrationTest extends PostgresContextContainerTest {

    public static final String READ_TRANSACTIONS_FROM_CSV_PATH = "DkbTransactionsCsvReaderTest_readTransactionsFromCsv.csv";

    @Autowired
    DkbTransactionsCsvReader reader;
    @Autowired
    PocketService pocketService;

    @Test
    void readTransactionsFromCsv() throws IOException {
        // First five lines of the dkb csv are irrelevant
        String input = IOUtils.toString(
                this.getClass().getResourceAsStream(READ_TRANSACTIONS_FROM_CSV_PATH),
                StandardCharsets.UTF_8
        );

        Pocket vacationPocket = new Pocket();
        vacationPocket.setName("Journey");
        vacationPocket.setKeywords(List.of("Journey",  "Vacation"));

        Pocket shoppingPocket = new Pocket();
        shoppingPocket.setName("Journey");
        shoppingPocket.setKeywords(List.of("Shopping"));

        vacationPocket = pocketService.createPocket(vacationPocket);
        shoppingPocket = pocketService.createPocket(shoppingPocket);

        List<Transaction> transactions = reader.readTransactionsFromCsv(input);

        assertThat(transactions).hasSize(2);

        Transaction journeyTransaction = transactions.get(0);
        Transaction shoppingTransaction = transactions.get(1);

        assertThat(journeyTransaction.getId()).isNotNull();
        assertThat(journeyTransaction.getAmount()).isEqualTo(300);
        assertThat(journeyTransaction.getIssuer()).isEqualTo("TESTUSER");
        assertThat(journeyTransaction.getDate()).hasDayOfMonth(8).hasMonth(Month.JULY).hasYear(2024);
        assertThat(journeyTransaction.getReason()).isEqualTo("Blablabla Journey bla");

        assertThat(shoppingTransaction.getId()).isNotNull();
        assertThat(shoppingTransaction.getAmount()).isEqualTo(-100);
        assertThat(shoppingTransaction.getIssuer()).isEqualTo("TESTUSER2");
        assertThat(shoppingTransaction.getDate()).hasDayOfMonth(9).hasMonth(Month.JULY).hasYear(2024);
        assertThat(shoppingTransaction.getReason()).isEqualTo("Blablabla Journey bla");

        assertThat(vacationPocket).isNotNull();
        assertThat(shoppingPocket).isNotNull();
        assertThat(journeyTransaction.getPocket()).isEqualTo(vacationPocket);
        assertThat(shoppingTransaction.getPocket()).isEqualTo(shoppingPocket);
    }
}