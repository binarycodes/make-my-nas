import type { ViewConfig } from '@vaadin/hilla-file-router/types.js';
import { AutoGrid } from '@vaadin/hilla-react-crud';
import { StoragePriceService } from 'Frontend/generated/endpoints.js';
import StoragePriceModel from "Frontend/generated/io/binarycodes/homelab/makemynas/storage/StoragePriceModel";

export const config: ViewConfig = {
    title: 'View Storage',
    menu: {
        title: 'View Storage',
    },
};

const responsiveSteps = [
    { minWidth: '0', columns: 1 },
    { minWidth: '500px', columns: 2 },
];

export default function ViewStorageView() {
    return <AutoGrid service={StoragePriceService} model={StoragePriceModel} />
}
