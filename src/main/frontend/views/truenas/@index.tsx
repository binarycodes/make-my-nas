import type { ViewConfig } from '@vaadin/hilla-file-router/types.js';
import { TrueNasService } from 'Frontend/generated/endpoints.js';
import { useForm } from "@vaadin/hilla-react-form";
import { Button, Checkbox, FormLayout, Grid, GridColumn, GridSortColumn, Notification, NumberField } from "@vaadin/react-components";
import TrueNasConfigModel from "Frontend/generated/io/binarycodes/homelab/makemynas/nas/TrueNasConfigModel";
import TrueNas from "Frontend/generated/io/binarycodes/homelab/makemynas/nas/TrueNas";
import { useSignal } from "@vaadin/hilla-react-signals";
import { useEffect } from 'react';
import TrueNasConfig from 'Frontend/generated/io/binarycodes/homelab/makemynas/nas/TrueNasConfig';

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

    const { model, field, clear, submit, addValidator } = useForm(TrueNasConfigModel, {
        onSubmit: async (trueNasConfig) => {
            items.value = await TrueNasService.createAll(trueNasConfig);
            Notification.show("Configs generated successfully.", { theme: 'success' });
        }
    });

    useEffect(() => {
        addValidator({
            message: 'Total No of Disks should be greater than Parity',
            validate: (value: TrueNasConfig) => {
                if (value.totalDiskCount <= value.parity) {
                    return [{ property: model.totalDiskCount }];
                }
                return [];
            }
        });
    }, []);

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

                <Grid items={items.value} allRowsVisible theme="no-border row-stripes" multiSort multiSortPriority="append">
                    <GridSortColumn path="vdevSize" header="VDev Size" />
                    <GridSortColumn path="vdevCount" header="VDev Count" />
                    <GridSortColumn path="displayModel" header="Model" />
                    <GridSortColumn path="vdevCapacity" header="VDev Capacity" />
                    <GridSortColumn path="poolCapacity" header="Pool Capacity" />
                    <GridSortColumn path="vdevPrice" header="VDev Price" />
                    <GridSortColumn path="poolPrice" header="Pool Price" />
                    <GridSortColumn path="pricePerUnitCapacity" header="Price per Unit Capacity" />
                    <span slot="empty-state">Submit the form above to generate NAS configuration.</span>
                </Grid>
            </div>
        </>
    );
}
