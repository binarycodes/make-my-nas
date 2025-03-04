package io.binarycodes.homelab.makemynas.storage;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

@Repository
public interface StoragePriceRepository extends JpaRepository<StoragePrice, Long>, JpaSpecificationExecutor<StoragePrice> {
}
