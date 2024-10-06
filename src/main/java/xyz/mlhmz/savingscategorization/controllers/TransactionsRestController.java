package xyz.mlhmz.savingscategorization.controllers;

import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import xyz.mlhmz.savingscategorization.dtos.QueryTransactionDto;
import xyz.mlhmz.savingscategorization.exceptions.EntityNotFoundException;
import xyz.mlhmz.savingscategorization.mappers.TransactionMapper;
import xyz.mlhmz.savingscategorization.models.Transaction;
import xyz.mlhmz.savingscategorization.services.PocketService;
import xyz.mlhmz.savingscategorization.services.TransactionService;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/transactions")
@AllArgsConstructor
public class TransactionsRestController {
    PocketService pocketService;
    TransactionService transactionService;
    TransactionMapper transactionMapper;

    @GetMapping
    public List<QueryTransactionDto> getAllTransactions() {
        return transactionService.findAllTransactions().stream()
                .map(transactionMapper::mapTransactionToQueryTransaction)
                .toList();
    }

    @GetMapping("/{id}")
    public ResponseEntity<QueryTransactionDto> getTransactionById(@PathVariable String id) {
        try {
            Transaction transaction = transactionService.findTransactionById(id);
            return ResponseEntity.ok(transactionMapper.mapTransactionToQueryTransaction(transaction));
        } catch (EntityNotFoundException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/pocket/{pocketUuid}")
    public List<QueryTransactionDto> getTransactionsByCategory(@PathVariable UUID pocketUuid) {
        return transactionService.findTransactionsByPocket(pocketUuid).stream()
                .map(transactionMapper::mapTransactionToQueryTransaction)
                .toList();
    }

    @DeleteMapping
    public ResponseEntity<Object> deleteTransactions(String id) {
        try {
            transactionService.deleteTransactionById(id);
            return ResponseEntity.noContent().build();
        } catch (EntityNotFoundException ex) {
            return ResponseEntity.notFound().build();
        }
    }
}
