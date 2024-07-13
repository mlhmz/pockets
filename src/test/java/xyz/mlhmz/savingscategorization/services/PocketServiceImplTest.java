package xyz.mlhmz.savingscategorization.services;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.extension.ExtendWith;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.CsvSource;
import org.junit.jupiter.params.provider.ValueSource;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import xyz.mlhmz.savingscategorization.exceptions.EntityNotFoundException;
import xyz.mlhmz.savingscategorization.models.Pocket;
import xyz.mlhmz.savingscategorization.repositories.PocketRepository;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.doReturn;

@ExtendWith(MockitoExtension.class)
class PocketServiceImplTest {
    @Mock
    PocketRepository pocketRepository;
    PocketServiceImpl pocketService;

    @BeforeEach
    void setUp() {
        pocketService = new PocketServiceImpl(pocketRepository);
    }

    /**
     * Parameterized Test for the determinePocketByReason Method in the {@link PocketServiceImpl}
     *
     * @param reason      The reason that should, or should not, contain a keyword
     * @param pocketIndex The index in the mock list for the Pocket.
     *                    <ul>
     *                     <li>0 => Pocket with FirstKeyword,SecondKeyword</li>
     *                     <li>1 => Pocket with ThirdKeyword</li>
     *                     <li>-1 => null</li>
     *                    </ul>
     */
    @ParameterizedTest
    @CsvSource(value = {
            "FirstKeyword blablabla;0",
            "FirstKEYWORD blablabla;0",
            "firstKeywordblablabla;0",
            "finally,thesecondkeyword;0",
            "secondKeyworDDDD;0",
            "itsTheSecondKeyword!!;0",
            "ThirdKeyword, now!;1",
            "thirdkeyword it is;1",
            "wowthethirdkeyword!;1",
            "nonsensekeyword!;-1",
            "idontexist,yet!;-1"
    }, delimiter = ';')
    void determinePocketByReason(String reason, int pocketIndex) throws EntityNotFoundException {
        List<Pocket> pockets = createPocketsAndMockFindAllWithThem();

        Pocket pocket = pocketService.determinePocketByReason(reason);

        Pocket expected = pocketIndex != -1 ? pockets.get(pocketIndex) : null;
        assertThat(pocket).isEqualTo(expected);
    }

    private List<Pocket> createPocketsAndMockFindAllWithThem() {
        Pocket firstPocket = new Pocket(
                "Test",
                "Test desc",
                "test-icon",
                List.of("FirstKeyword", "SecondKeyword")
        );

        Pocket secondPocket = new Pocket(
                "Test",
                "Test desc",
                "test-icon",
                List.of("ThirdKeyword")
        );

        List<Pocket> pockets = List.of(firstPocket, secondPocket);
        doReturn(pockets).when(pocketRepository).findAll();
        return pockets;
    }
}