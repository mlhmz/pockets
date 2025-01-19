package xyz.mlhmz.savingscategorization.dtos;

import lombok.NoArgsConstructor;

import java.util.List;
import java.util.UUID;

public record QueryPocketDto(
        UUID uuid,
        String identifier,
        String name,
        String description,
        List<String> keywords,
        Double transactionSum
) {
}
