package xyz.mlhmz.savingscategorization.mappers;

import xyz.mlhmz.savingscategorization.dtos.MutatePocketDto;
import xyz.mlhmz.savingscategorization.dtos.QueryPocketDto;
import xyz.mlhmz.savingscategorization.models.Pocket;

public interface PocketMapper {
    QueryPocketDto mapPocketToQueryPocket(Pocket pocket);

    Pocket mapMutatePocketToPocket(MutatePocketDto mutatePocketDto);
}
