package io.binarycodes.homelab.makemynas.storage;

import jakarta.annotation.Nullable;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class StoragePrice {
    @Id
    @GeneratedValue
    private Long id;

    @NotNull
    @Size(min = 1, max = 100)
    private String make;
    @NotNull
    @Size(min = 1, max = 100)
    private String model;
    @NotNull
    @Min(1)
    @Max(1000)
    private Integer sizeInTeraByte;
    @NotNull
    @Min(1)
    @Max(100000)
    private Double price;

    @Nullable
    public Double getPricePerTeraByte() {
        return Math.round((price / sizeInTeraByte) * 100) / 100.0;
    }

    public String displayModel() {
        return "%s %s %dTB".formatted(make, model, sizeInTeraByte);
    }
}
