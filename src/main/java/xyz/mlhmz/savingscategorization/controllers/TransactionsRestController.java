package xyz.mlhmz.savingscategorization.controllers;

import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import xyz.mlhmz.savingscategorization.models.CategoryTransactionsDto;
import xyz.mlhmz.savingscategorization.models.CategoryType;
import xyz.mlhmz.savingscategorization.models.Transaction;
import xyz.mlhmz.savingscategorization.repositories.TransactionRepository;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/v1/transactions")
@RequiredArgsConstructor
public class TransactionsRestController {
    @NonNull
    TransactionRepository repository;

    @GetMapping
    public List<Transaction> getAllTransactions() {
        return repository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Transaction> getTransactionById(@PathVariable String id) {
        Optional<Transaction> transaction = repository.findById(id);
        return transaction.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping("/category/{category}")
    public List<Transaction> getTransactionsByCategory(@PathVariable CategoryType category) {
        return repository.getTransactionsByCategory(category);
    }

    @GetMapping("/category")
    public List<CategoryTransactionsDto> getTransactionsGroupedByCategory() {
        return Arrays.stream(CategoryType.values()).map(categoryType -> {
            List<Transaction> transactions = repository.getTransactionsByCategory(categoryType);
            double sum = transactions.stream().reduce(
                    0D, (previousValue, transaction) -> previousValue + transaction.getAmount(), Double::sum
            );
            return new CategoryTransactionsDto(categoryType, sum, transactions);
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
