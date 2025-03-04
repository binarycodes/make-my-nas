package io.binarycodes.homelab.makemynas.nas;

import java.lang.annotation.Documented;
import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

import jakarta.validation.Constraint;
import jakarta.validation.Payload;

@Documented
@Constraint(validatedBy = TrueNasConfigValidator.class)
@Target({ElementType.TYPE})
@Retention(RetentionPolicy.RUNTIME)
public @interface ValidTrueNasConfig {
    String message() default "totalDiskCount must be greater than parity";

    Class<?>[] groups() default {};

    Class<? extends Payload>[] payload() default {};
}