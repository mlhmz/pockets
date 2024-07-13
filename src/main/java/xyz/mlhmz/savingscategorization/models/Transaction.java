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

    @Column(columnDefinition = "TEXT")
    String reason;

    String issuer;

    LocalDate date;

    double amount;

    @ManyToOne
    @JoinTable(name = "pocket_transactions", joinColumns = {@JoinColumn(name = "transactions_id", referencedColumnName = "id")},
        inverseJoinColumns = {@JoinColumn(name = "pocket_uuid", referencedColumnName = "uuid")})
    private Pocket pocket;
}
