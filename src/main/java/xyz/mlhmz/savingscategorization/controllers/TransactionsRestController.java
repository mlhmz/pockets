package xyz.mlhmz.savingscategorization.controllers;

import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import xyz.mlhmz.savingscategorization.dtos.PocketTransactionsDto;
import xyz.mlhmz.savingscategorization.models.Transaction;
import xyz.mlhmz.savingscategorization.repositories.TransactionRepository;
import xyz.mlhmz.savingscategorization.services.PocketService;

import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/v1/transactions")
@AllArgsConstructor
public class TransactionsRestController {
    TransactionRepository repository;
    PocketService pocketService;

    @GetMapping
    public List<Transaction> getAllTransactions() {
        return repository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Transaction> getTransactionById(@PathVariable String id) {
        Optional<Transaction> transaction = repository.findById(id);
        return transaction.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping("/pocket/{pocketUuid}")
    public List<Transaction> getTransactionsByCategory(@PathVariable UUID pocketUuid) {
        return repository.findTransactionsByPocketUuid(pocketUuid);
    }

    @GetMapping("/category")
    public List<PocketTransactionsDto> getTransactionsGroupedByCategory() {
        return pocketService.findAllPockets().stream().map(pocket -> {
            List<Transaction> transactions = repository.findTransactionsByPocketUuid(pocket.getUuid());
            double sum = transactions.stream().reduce(
                    0D, (previousValue, transaction) -> previousValue + transaction.getAmount(), Double::sum
            );
            return new PocketTransactionsDto(pocket.getName(), sum, transactions);
        }).collect(Collectors.toList());
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Transaction addTransaction(@RequestBody Transaction transaction) {
        return repository.save(transaction);
    }

    @DeleteMapping
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public ResponseEntity<Object> deleteTransactions(String id) {
        try {
            repository.deleteById(id);
            return ResponseEntity.noContent().build();
        } catch (IllegalArgumentException ex) {
            return ResponseEntity.notFound().build();
        }
    }
}
