package io.binarycodes.homelab.makemynas.storage;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.Formula;

import com.vaadin.hilla.Nullable;

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
    @Formula("price/size_in_tera_byte")
    private Float pricePerTeraByte;
}
