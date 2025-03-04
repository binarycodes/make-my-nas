package io.binarycodes.homelab.makemynas.nas;

import io.binarycodes.homelab.makemynas.storage.StoragePrice;
import lombok.Getter;

@Getter
public final class TrueNas {
    private int vdevSize;
    private int parity;
    private int vdevCount;
    private int diskCapacity;
    private int vdevCapacity;
    private int poolCapacity;
    private double vdevPrice;
    private double poolPrice;
    private double pricePerUnitCapacity;
    private String displayModel;

    private TrueNas() {
        //do not initialize
    }

    public static TrueNas from(VDevConfig config, StoragePrice storagePrice) {
        var item = new TrueNas();
        item.vdevSize = config.vdevSize();
        item.parity = config.parity();
        item.vdevCount = config.vdevCount();
        item.diskCapacity = storagePrice.getSizeInTeraByte();

        item.vdevCapacity = item.diskCapacity * (item.vdevSize - item.parity);
        item.poolCapacity = item.vdevCapacity * item.vdevCount;
        item.vdevPrice = item.vdevSize * storagePrice.getPrice();
        item.poolPrice = item.vdevPrice * item.vdevCount;

        item.pricePerUnitCapacity = Math.round((item.poolPrice / item.poolCapacity) * 100) / 100.0;
        item.displayModel = storagePrice.displayModel();

        return item;
    }
}
