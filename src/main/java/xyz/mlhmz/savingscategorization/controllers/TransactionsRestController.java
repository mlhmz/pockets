package xyz.mlhmz.savingscategorization.controllers;

import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import xyz.mlhmz.savingscategorization.dtos.QueryTransactionDto;
import xyz.mlhmz.savingscategorization.mappers.TransactionMapper;
import xyz.mlhmz.savingscategorization.models.Transaction;
import xyz.mlhmz.savingscategorization.repositories.TransactionRepository;
import xyz.mlhmz.savingscategorization.services.PocketService;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/transactions")
@AllArgsConstructor
public class TransactionsRestController {
    TransactionRepository repository;
    PocketService pocketService;
    TransactionMapper transactionMapper;

    @GetMapping
    public List<QueryTransactionDto> getAllTransactions() {
        return repository.findAllByOrderByDateDesc().stream()
                .map(transactionMapper::mapTransactionToQueryTransaction)
                .toList();
    }

    @GetMapping("/{id}")
    public ResponseEntity<QueryTransactionDto> getTransactionById(@PathVariable String id) {
        Optional<Transaction> transaction = repository.findById(id);
        return transaction.map(transactionMapper::mapTransactionToQueryTransaction)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping("/pocket/{pocketUuid}")
    public List<QueryTransactionDto> getTransactionsByCategory(@PathVariable UUID pocketUuid) {
        return repository.findTransactionsByPocketUuidOrderByDateDesc(pocketUuid).stream()
                .map(transactionMapper::mapTransactionToQueryTransaction)
                .toList();
    }

    @DeleteMapping
    public ResponseEntity<Object> deleteTransactions(String id) {
        try {
            repository.deleteById(id);
            return ResponseEntity.noContent().build();
        } catch (IllegalArgumentException ex) {
            return ResponseEntity.notFound().build();
        }
    }
}
