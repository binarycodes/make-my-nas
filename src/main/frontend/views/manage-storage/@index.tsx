import type { ViewConfig } from '@vaadin/hilla-file-router/types.js';
import { AutoCrud } from '@vaadin/hilla-react-crud';
import { StoragePriceService } from 'Frontend/generated/endpoints.js';
import StoragePriceModel from "Frontend/generated/io/binarycodes/homelab/makemynas/storage/StoragePriceModel";

export const config: ViewConfig = {
    title: 'Manage Storage',
    menu: {
        title: 'Manage Storage',
    },
};

export default function ManagetorageView() {
    return <AutoCrud
        className='h-full'
        service={StoragePriceService}
        model={StoragePriceModel}
        gridProps={{ noHeaderFilters: true }}
        formProps={{ visibleFields: ['make', 'model', 'sizeInTeraByte', 'price'] }}
    />
}
