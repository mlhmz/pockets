package xyz.mlhmz.savingscategorization.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;
import java.util.UUID;

@Entity
@Table(name = "pocket", indexes = @Index(columnList = "identifier"))
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Pocket {
    @Id
    @GeneratedValue(generator = "UuidGenerator2")
    private UUID uuid;
    private String identifier;
    private String name;
    private String description;
    private String iconName;
    @ElementCollection(targetClass = String.class, fetch = FetchType.EAGER)
    @CollectionTable(name = "pocket_keywords", joinColumns = @JoinColumn(name = "pocket_uuid"))
    @Column(name = "keyword", nullable = false)
    private List<String> keywords;
    private double transactionSum;
    @OneToMany(fetch = FetchType.LAZY)
    private List<Transaction> transactions;

    public Pocket(String name, String description, String iconName, List<String> keywords) {
        this.name = name;
        this.description = description;
        this.iconName = iconName;
        this.keywords = keywords;
    }
}
