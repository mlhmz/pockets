package xyz.mlhmz.savingscategorization.models;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@Entity
@Table(name = "transactions")
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
