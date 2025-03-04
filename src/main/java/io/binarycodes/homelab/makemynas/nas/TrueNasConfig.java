package io.binarycodes.homelab.makemynas.nas;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;

@ValidTrueNasConfig
public record TrueNasConfig(
        @Min(0)
        @Max(100)
        int totalDiskCount,
        @Min(1)
        @Max(3)
        int parity,
        boolean includeAllCombination) {
}
