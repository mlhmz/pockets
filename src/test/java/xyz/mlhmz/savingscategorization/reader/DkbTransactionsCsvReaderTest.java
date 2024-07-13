package xyz.mlhmz.savingscategorization.reader;

import org.apache.commons.io.IOUtils;
import org.junit.jupiter.api.Test;
import xyz.mlhmz.savingscategorization.exceptions.EntityAlreadyExistsException;
import xyz.mlhmz.savingscategorization.models.Transaction;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.time.Month;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

class DkbTransactionsCsvReaderTest {

    public static final String READ_TRANSACTIONS_FROM_CSV_PATH = "DkbTransactionsCsvReaderTest_readTransactionsFromCsv.csv";

    DkbTransactionsCsvReader reader = new DkbTransactionsCsvReader();

    @Test
    void readTransactionsFromCsv() throws IOException, EntityAlreadyExistsException {
        // First five lines of the dkb csv are irrelevant
        String input = IOUtils.toString(
                this.getClass().getResourceAsStream(READ_TRANSACTIONS_FROM_CSV_PATH),
                StandardCharsets.UTF_8
        );

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
        assertThat(shoppingTransaction.getReason()).isEqualTo("Shopping blablabla July");
    }
}