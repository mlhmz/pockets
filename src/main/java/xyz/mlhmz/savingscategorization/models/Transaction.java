package xyz.mlhmz.savingscategorization.models;

import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.Id;
import lombok.*;

import java.time.LocalDate;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Transaction {
    @Id
    String id;
    String reason;
    String issuer;
    LocalDate localDate;
    double amount;
    @Enumerated(value = EnumType.STRING)
    private CategoryType category;
}
