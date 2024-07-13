package xyz.mlhmz.savingscategorization.mappers;

import org.mapstruct.Mapper;
import xyz.mlhmz.savingscategorization.dtos.QueryPocketDto;
import xyz.mlhmz.savingscategorization.models.Pocket;

@Mapper(componentModel = "spring")
public interface PocketMapper {
    QueryPocketDto mapPocketToQueryPocket(Pocket pocket);
}
