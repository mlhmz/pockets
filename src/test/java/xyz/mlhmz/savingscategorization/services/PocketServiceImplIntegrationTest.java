package xyz.mlhmz.savingscategorization.services;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import xyz.mlhmz.savingscategorization.PostgresContextContainerTest;
import xyz.mlhmz.savingscategorization.exceptions.EntityAlreadyExistsException;
import xyz.mlhmz.savingscategorization.exceptions.EntityNotFoundException;
import xyz.mlhmz.savingscategorization.models.Pocket;
import xyz.mlhmz.savingscategorization.repositories.PocketRepository;

import java.util.Collections;
import java.util.List;
import java.util.UUID;

import static org.assertj.core.api.Assertions.assertThat;

class PocketServiceImplIntegrationTest extends PostgresContextContainerTest {
    @Autowired
    PocketService pocketService;
    @Autowired
    PocketRepository pocketRepository;

    @Test
    void createPocket() throws EntityAlreadyExistsException {
        String name = "Test";
        String desc = "Test desc";
        String iconName = "test-icon";
        List<String> keywords = List.of("first", "second", "third");

        Pocket pocket = new Pocket(name, desc, iconName, keywords);

        Pocket result = pocketService.createPocket(pocket);

        assertPocketFields(name, desc, iconName, keywords, result);
    }

    @Test
    void updatePocket() throws EntityAlreadyExistsException {
        String updateName = "Test";
        String updateDesc = "Test desc";
        String updateIconName = "test-icon";
        List<String> updateKeywords = List.of("first", "second", "third");

        Pocket obj = new Pocket(
                "Test",
                "Test desc",
                "test-icon",
                List.of("first", "second", "third")
        );
        Pocket pocket = pocketService.createPocket(obj);

        Pocket updatePayload = new Pocket(updateName, updateDesc, updateIconName, updateKeywords);

        Pocket updateResult = pocketService.updatePocket(pocket, updatePayload);

        assertPocketFields(updateName, updateDesc, updateIconName, updateKeywords, updateResult);
        assertThat(updateResult.getUuid()).isEqualTo(pocket.getUuid());
    }

    @Test
    void findPocketById() throws EntityAlreadyExistsException, EntityNotFoundException {
        String name = "Test";
        String desc = "Test desc";
        String iconName = "test-icon";
        List<String> keywords = List.of("first", "second", "third");
        Pocket pocket = new Pocket(name, desc, iconName, keywords);
        Pocket result = pocketService.createPocket(pocket);

        Pocket findResult = pocketService.findPocketByUuid(result.getUuid());

        assertPocketFields(name, desc, iconName, keywords, findResult);
        assertThat(findResult.getUuid()).isEqualTo(result.getUuid());
    }

    @Test
    void findAllPockets() throws EntityAlreadyExistsException {
        String name1 = "name1";
        String description1 = "testDesc1";
        String iconName1 = "icon-name1";
        List<String> keywords1 = Collections.singletonList("1");
        Pocket first = new Pocket(name1, description1, iconName1, keywords1);

        String name2 = "name2";
        String description2 = "testDesc2";
        String iconName2 = "icon-name2";
        List<String> keywords2 = Collections.singletonList("2");
        Pocket second = new Pocket(name2, description2, iconName2, keywords2);

        String name3 = "name3";
        String description3 = "testDesc3";
        String iconName3 = "icon-name3";
        List<String> keywords3 = Collections.singletonList("3");
        Pocket third = new Pocket(name3, description3, iconName3, keywords3);

        pocketService.createPocket(first);
        pocketService.createPocket(second);
        pocketService.createPocket(third);

        List<Pocket> pockets = pocketService.findAllPockets();
        assertPocketFields(name1, description1, iconName1, keywords1, pockets.get(0));
        assertPocketFields(name2, description2, iconName2, keywords2, pockets.get(1));
        assertPocketFields(name3, description3, iconName3, keywords3, pockets.get(2));
    }

    @Test
    void deletePocket() throws EntityAlreadyExistsException {
        Pocket pocket = new Pocket(
                "Test",
                "Test desc",
                "test-icon",
                List.of("first", "second", "third")
        );
        Pocket result = pocketService.createPocket(pocket);
        UUID pocketUuid = result.getUuid();

        pocketService.deletePocket(result);

        assertThat(pocketRepository.existsById(pocketUuid)).isFalse();
    }

    private void assertPocketFields(String expectedName, String expectedDesc, String expectedIconName,
                                    List<String> expectedKeywords, Pocket actual) {
        assertThat(actual).isNotNull();
        assertThat(actual.getUuid()).isNotNull();
        assertThat(actual.getName()).isEqualTo(expectedName);
        assertThat(actual.getDescription()).isEqualTo(expectedDesc);
        assertThat(actual.getIconName()).isEqualTo(expectedIconName);
        assertThat(actual.getKeywords()).hasSameElementsAs(expectedKeywords);
    }
}