package xyz.mlhmz.savingscategorization.controllers;

import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.data.web.PagedModel;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import xyz.mlhmz.savingscategorization.dtos.QueryTransactionDto;
import xyz.mlhmz.savingscategorization.exceptions.EntityNotFoundException;
import xyz.mlhmz.savingscategorization.mappers.TransactionMapper;
import xyz.mlhmz.savingscategorization.models.Transaction;
import xyz.mlhmz.savingscategorization.services.TransactionService;

import java.util.UUID;

@RestController
@RequestMapping("/api/v1/transactions")
@AllArgsConstructor
public class TransactionsRestController {
    TransactionService transactionService;
    TransactionMapper transactionMapper;

    @GetMapping
    public PagedModel<QueryTransactionDto> getAllTransactions(Pageable pageable) {
        Page<QueryTransactionDto> transactions = transactionService.findAllTransactions(pageable)
                .map(transactionMapper::mapTransactionToQueryTransaction);
        return new PagedModel<>(transactions);
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
    public PagedModel<QueryTransactionDto> getTransactionsByCategory(@PageableDefault Pageable pageable, @PathVariable UUID pocketUuid) {
        Page<QueryTransactionDto> transactions = transactionService.findTransactionsByPocket(pageable, pocketUuid)
                .map(transactionMapper::mapTransactionToQueryTransaction);
        return new PagedModel<>(transactions);
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
