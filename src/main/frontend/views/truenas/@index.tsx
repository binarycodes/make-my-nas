import type { ViewConfig } from '@vaadin/hilla-file-router/types.js';
import { TrueNasService } from 'Frontend/generated/endpoints.js';
import { useForm } from "@vaadin/hilla-react-form";
import { Button, Checkbox, FormLayout, Grid, GridEventContext, GridSortColumn, Notification, NumberField, Tooltip } from "@vaadin/react-components";
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

    const { model, field, clear, read, submit, addValidator } = useForm(TrueNasConfigModel, {
        onSubmit: async (trueNasConfig) => {
            sessionStorage.setItem("prevConfig", JSON.stringify(trueNasConfig));
            items.value = await TrueNasService.createAll(trueNasConfig);
            Notification.show("Configs generated successfully.", { theme: 'success' });
        }
    });


    useEffect(() => {
        const prevData = sessionStorage.getItem("prevConfig") || "";
        if (!!prevData) {
            const trueNasConfig: TrueNasConfig = JSON.parse(sessionStorage.getItem("prevConfig") || "");
            read(trueNasConfig);
            submit();
        }

        addValidator({
            message: 'Must be greater than the parity',
            validate: (value: TrueNasConfig) => {
                if (value.totalDiskCount <= value.parity) {
                    return [{ property: model.totalDiskCount }];
                }
                return [];
            }
        });

        addValidator({
            message: 'Must be greater than the parity',
            validate: (value: TrueNasConfig) => {
                if (value.maxVDevSize <= value.parity) {
                    return [{ property: model.maxVDevSize }];
                }
                return [];
            }
        });
    }, []);

    const tooltipGenerator = (context: GridEventContext<TrueNas>): string => {
        const { column, item } = context;
        if (column && item && column.path) {
            if (column.path === 'displayModel') {
                return `${item[column.path]}`
            }
        }

        return '';
    };

    return (
        <>
            <div className="flex flex-col gap-xl">
                <div className="flex flex-col gap-l">
                    <FormLayout responsiveSteps={responsiveSteps}>
                        <NumberField label="Total No of Disks" {...field(model.totalDiskCount)} required/>
                        <NumberField label="Parity" {...field(model.parity)} required/>
                        <NumberField label="Max VDev Size" {...field(model.maxVDevSize)} required/>
                        <NumberField label="Keep VDev Price under" {...field(model.limitVDevPrice)} />
                        <br />
                        <Checkbox label="Include all possible combinations" {...field(model.includeAllCombination)} />
                    </FormLayout>
                    <div className="flex flex-row gap-m">
                        <Button onClick={clear}>Reset</Button>
                        <Button onClick={submit} theme="primary">Generate</Button>
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
                    <Tooltip slot="tooltip" generator={tooltipGenerator} />
                    <span slot="empty-state">Submit the form above to generate NAS configuration.</span>
                </Grid>
            </div>
        </>
    );
}
