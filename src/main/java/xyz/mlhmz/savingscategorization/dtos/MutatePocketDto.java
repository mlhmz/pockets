package xyz.mlhmz.savingscategorization.dtos;

import java.util.List;

public record MutatePocketDto(
        String name,
        String identifier,
        String description,
        String iconName,
        List<String> keywords
) {
}
