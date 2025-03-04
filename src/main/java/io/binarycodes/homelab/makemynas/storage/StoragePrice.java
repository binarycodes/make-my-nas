package io.binarycodes.homelab.makemynas.storage;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
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

    private String make;
    private String model;
    private Integer sizeInTeraByte;
    private Double price;

    @Nullable
    @Formula("price/size_in_tera_byte")
    private Float pricePerTeraByte;
}
