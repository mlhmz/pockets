package xyz.mlhmz.savingscategorization.mappers;

import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;
import xyz.mlhmz.savingscategorization.dtos.QueryTransactionDto;
import xyz.mlhmz.savingscategorization.dtos.QueryTransactionPocketDto;
import xyz.mlhmz.savingscategorization.models.Pocket;
import xyz.mlhmz.savingscategorization.models.Transaction;

public interface TransactionMapper {
    QueryTransactionDto mapTransactionToQueryTransaction(Transaction source);

    QueryTransactionPocketDto mapPocketToQueryTransactionPocket(Pocket source);
}