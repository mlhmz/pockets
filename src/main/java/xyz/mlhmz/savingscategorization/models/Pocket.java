package xyz.mlhmz.savingscategorization.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;
import java.util.UUID;

@Entity
@Table(name = "pocket")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Pocket {
    @Id
    private UUID uuid;
    private String name;
    private String description;
    private String iconName;
    @ElementCollection(targetClass = String.class, fetch = FetchType.EAGER)
    @CollectionTable(name = "keywords", joinColumns = @JoinColumn(name = "pocket_uuid"))
    @Column(name = "keyword", nullable = false)
    private List<String> keywords;
    @OneToMany(fetch = FetchType.LAZY)
    private List<Transaction> transaction;
}
