package xyz.mlhmz.savingscategorization.controllers;

import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import xyz.mlhmz.savingscategorization.dtos.QueryTransactionDto;
import xyz.mlhmz.savingscategorization.mappers.TransactionMapper;
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
    private final TransactionMapper transactionMapper;

    @PostMapping(consumes = {"text/csv"}, produces = {"application/json"})
    @ResponseStatus(HttpStatus.CREATED)
    public List<QueryTransactionDto> addTransactionsByCSV(@RequestBody String csv) {
        return transactionService.createTransactions(csvReader.readTransactionsFromCsv(csv)).stream()
                .map(transactionMapper::mapTransactionToQueryTransaction)
                .toList();
    }
}
