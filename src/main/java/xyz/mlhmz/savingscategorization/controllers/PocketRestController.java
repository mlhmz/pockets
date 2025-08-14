package xyz.mlhmz.savingscategorization.controllers;

import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import xyz.mlhmz.savingscategorization.dtos.MutatePocketDto;
import xyz.mlhmz.savingscategorization.dtos.QueryPocketDto;
import xyz.mlhmz.savingscategorization.exceptions.EntityAlreadyExistsException;
import xyz.mlhmz.savingscategorization.exceptions.EntityNotFoundException;
import xyz.mlhmz.savingscategorization.mappers.PocketMapper;
import xyz.mlhmz.savingscategorization.models.Pocket;
import xyz.mlhmz.savingscategorization.services.PocketService;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/pockets")
@AllArgsConstructor
public class PocketRestController {
    private final PocketService pocketService;
    private final PocketMapper pocketMapper;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public QueryPocketDto createPocket(@RequestBody MutatePocketDto mutatePocketDto) throws EntityAlreadyExistsException {
        Pocket pocket = pocketMapper.mapMutatePocketToPocket(mutatePocketDto);
        return pocketMapper.mapPocketToQueryPocket(pocketService.createPocket(pocket));
    }

    @PostMapping("/actions/recalculatePocketSum/{uuid}")
    public ResponseEntity<QueryPocketDto> recalculatePocketSum(@PathVariable UUID uuid) {
        try {
            Pocket pocket = pocketService.findPocketByUuid(uuid);
            pocketService.recalculatePocketSum(pocket);
            return ResponseEntity.ok(pocketMapper.mapPocketToQueryPocket(pocket));
        } catch (EntityNotFoundException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping
    public List<QueryPocketDto> findAllPockets() {
        List<Pocket> pockets = pocketService.findAllPockets();
        return pockets.stream()
                .map(pocketMapper::mapPocketToQueryPocket)
                .toList();
    }

    @GetMapping("/{uuid}")
    public ResponseEntity<QueryPocketDto> findPocketByUuid(@PathVariable UUID uuid) {
        try {
            Pocket pocket = pocketService.findPocketByUuid(uuid);
            return ResponseEntity.ok(pocketMapper.mapPocketToQueryPocket(pocket));
        } catch (EntityNotFoundException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping("/{uuid}")
    public ResponseEntity<QueryPocketDto> updatePocketByUuid(@PathVariable UUID uuid, @RequestBody MutatePocketDto mutatePocketDto) {
        try {
            Pocket payload = pocketMapper.mapMutatePocketToPocket(mutatePocketDto);
            Pocket target = pocketService.findPocketByUuid(uuid);
            Pocket result = pocketService.updatePocket(target, payload);
            return ResponseEntity.ok(pocketMapper.mapPocketToQueryPocket(result));
        } catch (EntityNotFoundException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{uuid}")
    public ResponseEntity<Object> deletePocketByUuid(@PathVariable UUID uuid) {
        try {
            Pocket pocket = pocketService.findPocketByUuid(uuid);
            pocketService.deletePocket(pocket);
            return ResponseEntity.noContent().build();
        } catch (EntityNotFoundException e) {
            return ResponseEntity.notFound().build();
        }
    }
}
