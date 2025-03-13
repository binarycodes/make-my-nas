package io.binarycodes.homelab.makemynas.nas;

import jakarta.annotation.Nullable;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;

@ValidTrueNasConfig
public record TrueNasConfig(
        @Min(value = MIN_PARITY_ALLOWED + 1, message = "Must be greater than the parity")
        @Max(value = MAX_TOTAL_DISKS_ALLOWED, message = "At most " + MAX_TOTAL_DISKS_ALLOWED + " disks are allowed")
        int totalDiskCount,
        @Min(value = MIN_PARITY_ALLOWED, message = "Must be greater than " + MIN_PARITY_ALLOWED)
        @Max(value = MAX_PARITY_ALLOWED, message = "At most " + MAX_PARITY_ALLOWED + " disks are allowed")
        int parity,
        @Min(value = MIN_PARITY_ALLOWED + 1, message = "Must be greater than the parity")
        @Max(value = MAX_TOTAL_DISKS_ALLOWED, message = "At most " + MAX_TOTAL_DISKS_ALLOWED + " disks are allowed")
        int maxVDevSize,
        @Nullable
        Double limitVDevPrice,
        boolean includeAllCombination) {
    private static final int MIN_PARITY_ALLOWED = 1;
    private static final int MAX_PARITY_ALLOWED = 3;
    private static final int MAX_TOTAL_DISKS_ALLOWED = 100;

}
