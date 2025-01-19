package xyz.mlhmz.savingscategorization.mappers;

import org.junit.jupiter.api.Test;
import xyz.mlhmz.savingscategorization.dtos.MutatePocketDto;
import xyz.mlhmz.savingscategorization.dtos.QueryPocketDto;
import xyz.mlhmz.savingscategorization.models.Pocket;

import java.util.List;
import java.util.UUID;

import static org.assertj.core.api.Assertions.assertThat;

class PocketMapperTest {
    PocketMapper pocketMapper = new PocketMapperImpl();

    @Test
    void mapPocketToQueryPocket() {
        UUID uuid = UUID.fromString("738de5ee-afee-4d83-a965-67c5ce0cd600");
        String name = "Car";
        String identifier = "car";
        String description = "All car related transactions";
        List<String> keywords = List.of("Car", "Vehicle");
        double transactionSum = 410.10;

        Pocket dto = new Pocket();
        dto.setUuid(uuid);
        dto.setName(name);
        dto.setIdentifier(identifier);
        dto.setDescription(description);
        dto.setKeywords(keywords);
        dto.setTransactionSum(transactionSum);

        QueryPocketDto queryPocketDto = pocketMapper.mapPocketToQueryPocket(dto);
        assertThat(queryPocketDto.uuid()).isEqualTo(uuid);
        assertThat(queryPocketDto.name()).isEqualTo(name);
        assertThat(queryPocketDto.identifier()).isEqualTo(identifier);
        assertThat(queryPocketDto.keywords()).isEqualTo(keywords);
        assertThat(queryPocketDto.transactionSum()).isEqualTo(transactionSum);
    }

    @Test
    void mapMutatePocketToPocket() {
        String name = "Car";
        String identifier = "car";
        String description = "All car related transactions";
        String iconName = "vehicle.png";
        List<String> keywords = List.of("Car", "Vehicle");

        MutatePocketDto dto = new MutatePocketDto(name, identifier, description, iconName, keywords);

        // Act
        Pocket pocket = pocketMapper.mapMutatePocketToPocket(dto);

        // Assert
        assertThat(pocket).isNotNull();
        assertThat(pocket.getName()).isEqualTo(name);
        assertThat(pocket.getIdentifier()).isEqualTo(identifier);
        assertThat(pocket.getDescription()).isEqualTo(description);
        assertThat(pocket.getIconName()).isEqualTo(iconName);
        assertThat(pocket.getKeywords()).containsExactlyInAnyOrderElementsOf(keywords);
    }
}