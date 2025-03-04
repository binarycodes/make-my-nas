import type { ViewConfig } from '@vaadin/hilla-file-router/types.js';
import { TrueNasService } from 'Frontend/generated/endpoints.js';
import { useForm } from "@vaadin/hilla-react-form";
import { Button, FormLayout, Grid, GridColumn, Notification, NumberField } from "@vaadin/react-components";
import TrueNasConfigModel from "Frontend/generated/io/binarycodes/homelab/makemynas/nas/TrueNasConfigModel";
import TrueNas from "Frontend/generated/io/binarycodes/homelab/makemynas/nas/TrueNas";
import { useSignal } from "@vaadin/hilla-react-signals";

export const config: ViewConfig = {
    title: 'TrueNas Config',
    menu: {
        title: 'TrueNas Config',
    },
};

const responsiveSteps = [
    { minWidth: '0', columns: 1 },
    { minWidth: '500px', columns: 2 },
];

export default function TrueNasConfigView() {
    const items = useSignal<TrueNas[]>([]);

    const { model, field, clear, submit } = useForm(TrueNasConfigModel, {
        onSubmit: async (trueNasConfig) => {
            items.value = await TrueNasService.createAll(trueNasConfig);
            Notification.show("Configs generated successfully.");
        }
    });

    return (
        <>
            <div className="flex flex-col gap-l">
                <FormLayout responsiveSteps={responsiveSteps}>
                    <NumberField label="vDev Size" {...field(model.vdevSize)} />
                    <NumberField label="No of vDev" {...field(model.vdevCount)} />
                </FormLayout>
                <div className="flex flex-row gap-m">
                    <Button onClick={clear}>Reset</Button>
                    <Button onClick={submit} theme="primary">Save</Button>
                </div>
            </div>

            <Grid items={items.value}>
                <GridColumn path="vdevSize" />
                <GridColumn path="vdevCount" />
                <GridColumn path="diskCapacity" />
                <GridColumn path="vdevCapacity" />
                <GridColumn path="totalCapacity" />
                <GridColumn path="vdevPrice" />
                <GridColumn path="totalPrice" />
                <GridColumn path="pricePerUnitCapacity" />
            </Grid>
        </>
    );
}
