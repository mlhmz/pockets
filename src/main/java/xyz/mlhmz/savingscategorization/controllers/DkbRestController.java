package xyz.mlhmz.savingscategorization.controllers;

import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import xyz.mlhmz.savingscategorization.models.Transaction;
import xyz.mlhmz.savingscategorization.reader.TransactionsCsvReader;
import xyz.mlhmz.savingscategorization.services.TransactionServiceImpl;

import java.util.List;

/**
 * All REST-Actions that are affecting the DKB
 */
@RestController
@RequestMapping("/api/v1/dkb")
@AllArgsConstructor
public class DkbRestController {
    private final TransactionsCsvReader csvReader;
    private final TransactionServiceImpl transactionService;

    @PostMapping(consumes = {"text/csv"}, produces = {"application/json"})
    @ResponseStatus(HttpStatus.CREATED)
    public List<Transaction> addTransactionsByCSV(@RequestBody String csv) {
        List<Transaction> transactions = csvReader.readTransactionsFromCsv(csv);
        return transactionService.createTransactions(transactions);
    }
}
