import { Button, FormLayout, Notification, NumberField, TextField } from '@vaadin/react-components';
import { StoragePriceService } from 'Frontend/generated/endpoints.js';
import type { ViewConfig } from '@vaadin/hilla-file-router/types.js';
import { useForm } from "@vaadin/hilla-react-form";
import StoragePriceModel from "Frontend/generated/io/binarycodes/homelab/makemynas/storage/StoragePriceModel";

export const config: ViewConfig = {
    title: 'Register Storage',
    menu: {
        title: 'Register Storage',
    },
};

const responsiveSteps = [
    { minWidth: '0', columns: 1 },
    { minWidth: '500px', columns: 2 },
];

export default function RegisterStorageView() {
    const { model, field, clear, submit } = useForm(StoragePriceModel, {
        onSubmit: async (storagePrice) => {
            await StoragePriceService.save(storagePrice);
            Notification.show("Saved successfully.");
        }
    });

    return (
        <>
            <div className="flex flex-col gap-l">
                <FormLayout responsiveSteps={responsiveSteps}>
                    <TextField label="Make" {...field(model.make)} />
                    <TextField label="Model" {...field(model.model)} />
                    <NumberField label="Size" {...field(model.sizeInTeraByte)}>
                        <div slot="suffix">TB</div>
                    </NumberField>
                    <NumberField label="Price (in EUR)" {...field(model.price)}>
                        <div slot="suffix">€</div>
                    </NumberField>
                </FormLayout>
                <div className="flex flex-row gap-m">
                    <Button onClick={clear}>Reset</Button>
                    <Button onClick={submit} theme="primary">Save</Button>
                </div>
            </div>
        </>
    );
}
