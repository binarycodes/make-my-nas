package io.binarycodes.homelab.makemynas.nas;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

public class TrueNasConfigValidator implements ConstraintValidator<ValidTrueNasConfig, TrueNasConfig> {

    @Override
    public boolean isValid(TrueNasConfig config, ConstraintValidatorContext context) {
        /* Cross-field check: totalDiskCount must be greater than parity. */
        return config.totalDiskCount() > config.parity();
    }
}