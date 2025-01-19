package xyz.mlhmz.savingscategorization.mappers;

import xyz.mlhmz.savingscategorization.dtos.QueryTransactionDto;
import xyz.mlhmz.savingscategorization.dtos.QueryTransactionPocketDto;
import xyz.mlhmz.savingscategorization.models.Pocket;
import xyz.mlhmz.savingscategorization.models.Transaction;

public class TransactionMapperImpl implements TransactionMapper {
    @Override
    public QueryTransactionDto mapTransactionToQueryTransaction(Transaction source) {
        if (source == null) {
            return null;
        }
        QueryTransactionPocketDto pocketDto = null;
        if (source.getPocket() != null) {
            pocketDto = mapPocketToQueryTransactionPocket(source.getPocket());
        }
        return new QueryTransactionDto(
                source.getId(),
                source.getReason(),
                source.getIssuer(),
                source.getDate(),
                source.getAmount(),
                source.isHideForced(),
                source.isPocketForced(),
                source.getForceReason(),
                pocketDto
        );
    }

    @Override
    public QueryTransactionPocketDto mapPocketToQueryTransactionPocket(Pocket source) {
        if (source == null) {
            return null;
        }
        return new QueryTransactionPocketDto(
                source.getUuid(),
                source.getName()
        );
    }
}
