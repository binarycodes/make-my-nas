package io.binarycodes.homelab.makemynas.nas;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

import io.binarycodes.homelab.makemynas.storage.StoragePriceService;

import com.vaadin.flow.server.auth.AnonymousAllowed;
import com.vaadin.hilla.BrowserCallable;

@BrowserCallable
@AnonymousAllowed
public class TrueNasService {

    private final StoragePriceService storagePriceService;

    public TrueNasService(StoragePriceService storagePriceService) {
        this.storagePriceService = storagePriceService;
    }

    public List<TrueNas> createAll(TrueNasConfig config) {
        var allStorage = this.storagePriceService.findAll();
        var allPossibleVDevConfigs = generateVDevConfigs(config);

        return allStorage.stream()
                .flatMap(storage ->
                        allPossibleVDevConfigs
                                .stream()
                                .map(vDevConfig -> TrueNas.from(vDevConfig, storage))
                )
                .toList();
    }

    private Set<VDevConfig> generateVDevConfigs(TrueNasConfig config) {
        int minVDevSize = config.parity() + 1;
        var result = new HashSet<VDevConfig>();

        /* vdevSize must be at least parity+1 */
        for (int vdevSize = minVDevSize; vdevSize <= config.totalDiskCount(); vdevSize++) {
            int vdevCount = Math.floorDiv(config.totalDiskCount(), vdevSize);
            if (!config.includeAllCombination() && vdevCount == 1 && vdevSize != config.totalDiskCount()) {
                /* if we are creating one vdev, then might as well use all the drives */
                continue;
            }
            result.add(new VDevConfig(vdevSize, config.parity(), vdevCount));
        }
        return result;
    }

}
