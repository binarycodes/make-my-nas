package io.binarycodes.homelab.makemynas.storage;

import java.util.List;

import com.vaadin.flow.server.auth.AnonymousAllowed;
import com.vaadin.hilla.BrowserCallable;
import com.vaadin.hilla.crud.CrudRepositoryService;

@BrowserCallable
@AnonymousAllowed
public class StoragePriceService extends CrudRepositoryService<StoragePrice, Long, StoragePriceRepository> {

    private final StoragePriceRepository storagePriceRepository;

    public StoragePriceService(StoragePriceRepository storagePriceRepository) {
        this.storagePriceRepository = storagePriceRepository;
    }

    public StoragePrice save(StoragePrice storagePrice) {
        return storagePriceRepository.save(storagePrice);
    }

    public List<StoragePrice> findAll() {
        return storagePriceRepository.findAll();
    }
}
