import type { ViewConfig } from '@vaadin/hilla-file-router/types.js';
import { TrueNasService } from 'Frontend/generated/endpoints.js';
import { useForm } from "@vaadin/hilla-react-form";
import { Button, Checkbox, FormLayout, Grid, GridColumn, GridSortColumn, Notification, NumberField } from "@vaadin/react-components";
import TrueNasConfigModel from "Frontend/generated/io/binarycodes/homelab/makemynas/nas/TrueNasConfigModel";
import TrueNas from "Frontend/generated/io/binarycodes/homelab/makemynas/nas/TrueNas";
import { useSignal } from "@vaadin/hilla-react-signals";

export const config: ViewConfig = {
    title: 'TrueNas Config',
    menu: {
        order: 0,
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
            <div className="flex flex-col gap-xl">
                <div className="flex flex-col gap-l">
                    <FormLayout responsiveSteps={responsiveSteps}>
                        <NumberField label="Total No of Disks" {...field(model.totalDiskCount)} />
                        <NumberField label="Parity" {...field(model.parity)} />
                        <Checkbox label="Include all possible combinations" {...field(model.includeAllCombination)} />
                    </FormLayout>
                    <div className="flex flex-row gap-m">
                        <Button onClick={clear}>Reset</Button>
                        <Button onClick={submit} theme="primary">Save</Button>
                    </div>
                </div>

                <Grid items={items.value} allRowsVisible theme="no-border row-stripes">
                    <GridSortColumn path="vdevSize" />
                    <GridSortColumn path="vdevCount" />
                    <GridSortColumn path="diskCapacity" />
                    <GridSortColumn path="vdevCapacity" />
                    <GridSortColumn path="totalCapacity" />
                    <GridSortColumn path="vdevPrice" />
                    <GridSortColumn path="totalPrice" />
                    <GridSortColumn path="pricePerUnitCapacity" />
                </Grid>
            </div>
        </>
    );
}
