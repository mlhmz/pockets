package xyz.mlhmz.savingscategorization.reader;


import org.apache.commons.csv.CSVFormat;
import org.apache.commons.csv.CSVParser;
import org.apache.commons.csv.CSVRecord;
import xyz.mlhmz.savingscategorization.models.CategoryType;
import xyz.mlhmz.savingscategorization.models.Transaction;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.Base64;
import java.util.List;
import java.util.function.Function;
import java.util.stream.Collectors;

public class DkbTransactionsCsvReader implements TransactionsCsvReader {

    public static final DateTimeFormatter DKB_FORMATTER = DateTimeFormatter.ofPattern("dd.MM.yy");

    public List<Transaction> readTransactionsFromCsv(String input) {
        CSVFormat csvFormat = getDefaultCsvFormat();

        List<Transaction> transactions;
        try (CSVParser csvParser = CSVParser.parse(input, csvFormat)) {
            transactions = csvParser.getRecords().stream()
                    .map(mapDkbCsvEntryToTransaction())
                    .collect(Collectors.toList());
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
        return transactions;
    }

    private Function<CSVRecord, Transaction> mapDkbCsvEntryToTransaction() {
        return entry -> {
            String reason = entry.get(5);
            String issuer = entry.get(3);
            String dateString = entry.get(1);
            LocalDate date = LocalDate.from(DKB_FORMATTER.parse(dateString));
            double value = Double.parseDouble(entry.get(8).replace(",", "."));
            String id = generateIdByValues(reason, issuer, dateString, value);
            CategoryType categoryType = CategoryType.detectByString(reason);
            return new Transaction(id, reason, issuer, date, value, categoryType);
        };
    }

    private String generateIdByValues(String reason, String issuer, String date, double amount) {
        MessageDigest md = null;
        try {
            md = MessageDigest.getInstance("MD5");
        } catch (NoSuchAlgorithmException e) {
            throw new RuntimeException(e);
        }
        byte[] hash = md.digest(String.join(";", reason, issuer, date, Double.toString(amount)).getBytes(StandardCharsets.UTF_8));
        return Base64.getEncoder().encodeToString(hash);
    }

    private CSVFormat getDefaultCsvFormat() {
        return CSVFormat.Builder.create()
                .setDelimiter(';')
                .setQuote('"')
                .setCommentMarker('#')
                .setIgnoreEmptyLines(true)
                .setIgnoreSurroundingSpaces(true)
                .build();
    }
}