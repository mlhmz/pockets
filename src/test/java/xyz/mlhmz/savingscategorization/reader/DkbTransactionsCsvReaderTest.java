package xyz.mlhmz.savingscategorization.reader;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class DkbTransactionsCsvReaderTest {

    @Test
    void readTransactionsFromCsv() {
        StringBuilder stringBuilder = new StringBuilder();

        // First five lines of the dkb csv are irrelevant
        stringBuilder.append("\n".repeat(5));

        stringBuilder.append("\"08.07.24\";\"08.07.24\";\"Gebucht\";\"TESTUSER\";\"TESTUSER\";\"Journey\";\"Ausgang\";\"ANON\";\"-300\";\"\";\"\";\"\"");


    }
}