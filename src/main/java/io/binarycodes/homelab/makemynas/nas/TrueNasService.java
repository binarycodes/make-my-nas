package io.binarycodes.homelab.makemynas.nas;

import java.util.List;

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

        return allStorage.stream()
                .map(storage -> TrueNas.from(config, storage))
                .toList();
    }
}
