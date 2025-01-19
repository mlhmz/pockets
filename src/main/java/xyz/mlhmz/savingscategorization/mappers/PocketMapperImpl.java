package xyz.mlhmz.savingscategorization.mappers;

import xyz.mlhmz.savingscategorization.dtos.MutatePocketDto;
import xyz.mlhmz.savingscategorization.dtos.QueryPocketDto;
import xyz.mlhmz.savingscategorization.models.Pocket;

public class PocketMapperImpl implements PocketMapper {
    @Override
    public QueryPocketDto mapPocketToQueryPocket(Pocket pocket) {
        if (pocket == null) {
            return null;
        }
        return new QueryPocketDto(
                pocket.getUuid(),
                pocket.getIdentifier(),
                pocket.getName(),
                pocket.getDescription(),
                pocket.getKeywords(),
                pocket.getTransactionSum()
        );
    }

    @Override
    public Pocket mapMutatePocketToPocket(MutatePocketDto mutatePocketDto) {
        if (mutatePocketDto == null) {
            return null;
        }
        return new Pocket(
                mutatePocketDto.name(),
                mutatePocketDto.identifier(),
                mutatePocketDto.description(),
                mutatePocketDto.iconName(),
                mutatePocketDto.keywords()
        );
    }
}
