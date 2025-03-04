package io.binarycodes.homelab.makemynas.nas;

import io.binarycodes.homelab.makemynas.storage.StoragePrice;
import lombok.Getter;

@Getter
public final class TrueNas {
    private int vdevSize;
    private int vdevCount;
    private int diskCapacity;
    private int vdevCapacity;
    private int totalCapacity;
    private double vdevPrice;
    private double totalPrice;
    private double pricePerUnitCapacity;

    private TrueNas() {
        //do not initialize
    }

    public static TrueNas from(TrueNasConfig config, StoragePrice storagePrice) {
        var item = new TrueNas();
        item.vdevSize = config.vdevSize();
        item.vdevCount = config.vdevCount();
        item.diskCapacity = storagePrice.getSizeInTeraByte();
        item.vdevCapacity = item.diskCapacity * item.vdevSize;
        item.totalCapacity = item.vdevCapacity * item.vdevCount;
        item.vdevPrice = item.vdevSize * storagePrice.getPrice();
        item.totalPrice = item.vdevPrice * item.vdevCount;
        item.pricePerUnitCapacity = storagePrice.getPricePerTeraByte();

        return item;
    }
}
