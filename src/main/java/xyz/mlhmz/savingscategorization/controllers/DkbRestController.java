package xyz.mlhmz.savingscategorization.controllers;

import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import xyz.mlhmz.savingscategorization.models.Transaction;
import xyz.mlhmz.savingscategorization.reader.TransactionsCsvReader;
import xyz.mlhmz.savingscategorization.repositories.TransactionRepository;

import java.util.List;

/**
 * All REST-Actions that are affecting the DKB
 */
@RestController
@RequestMapping("/api/v1/dkb")
@RequiredArgsConstructor
public class DkbRestController {
    @NonNull
    private final TransactionsCsvReader csvReader;
    @NonNull
    private final TransactionRepository repository;

    @PostMapping(consumes = {"text/csv"}, produces = {"application/json"})
    @ResponseStatus(HttpStatus.CREATED)
    public List<Transaction> addTransactionsByCSV(@RequestBody String csv) {
        List<Transaction> transactions = csvReader.readTransactionsFromCsv(csv);
        return repository.saveAll(transactions);
    }
}
