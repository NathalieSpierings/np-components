import type { Meta, StoryFn, StoryObj } from '@storybook/react-webpack5';
import { useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { MemoryRouter } from 'react-router';
import { SvgSprite } from '../../../../assets/SvgSprite';
import { defaultProductColumns } from '../../../../lib/testdata/mock';
import { ProductGetModel, getProductsQuery } from '../../../../lib/testdata/models';
import { ColorDefinitions } from '../../../../lib/utils/definitions';
import { DatagridGetDataArguments } from '../../../Data/Datagrid/Config/DatagridData';
import Datagrid from '../../../Data/Datagrid/Datagrid';
import Loader from '../Loader';
import { useTableQueryClientFilter } from '../../../Data/Datagrid/Hooks/useTableQueryClientFilter';

const queryClient = new QueryClient();


const meta: Meta<typeof Loader> = {
    title: 'UI kit/Loader',
    component: Loader,
    parameters: {
        layout: 'fullscreen',
    },
    decorators: [
        (Story) => (
            <MemoryRouter>
                <SvgSprite />
                <QueryClientProvider client={queryClient}>
                    <Story />
                </QueryClientProvider>
            </MemoryRouter>
        ),
    ],
};

export default meta;
type Story = StoryObj<typeof Loader>;

export const Default: StoryFn = () => {
    return <Loader loading={true} />;
};

export const Centered: StoryFn = () => {
    return (
        <div className="layout">
            <div className="page">
                <div className="page__container">
                    <div className="page__content">
                        <div className="content">
                            <Loader loading={true} variant='centered' />

                            <div>
                                Lorem ipsum odor amet, consectetuer adipiscing elit. Dui montes mollis hendrerit orci
                                ex. Nam cursus nam auctor netus nulla porta; ultrices ipsum ipsum. Pellentesque orci
                                mauris dignissim vulputate metus integer. Arcu libero dis a adipiscing porttitor rhoncus
                                condimentum. Ipsum rutrum turpis auctor curabitur molestie pulvinar eros justo. Sagittis
                                non nec mi tempus cursus ultricies. Dictum suscipit morbi potenti nam eu proin tortor.
                                Sapien primis quis tempus vitae platea ut ante vivamus. Mattis elit porttitor aliquet
                                risus magnis; lobortis eget. Suspendisse conubia montes etiam morbi id hendrerit rhoncus
                                himenaeos. Venenatis lectus nascetur proin morbi accumsan lacinia. Magnis nisi urna
                                ultrices orci parturient habitasse. Commodo rhoncus proin massa nascetur consequat proin
                                nullam. Imperdiet dignissim vel libero nisl non. Ex adipiscing non sed quis fames platea
                                neque maximus. Pharetra ultricies ad montes inceptos imperdiet curae donec. Cubilia
                                mattis ac quisque vel maximus bibendum netus auctor. Venenatis ad orci sagittis lacus
                                per. Eros sit sodales facilisi dis vehicula egestas justo convallis morbi. Class nisl
                                class; dapibus dignissim purus ultricies. Integer dui finibus id nec, sapien taciti
                                mollis per. Natoque placerat tempor; at ornare senectus duis sit leo. Et hac porttitor
                                convallis habitasse nascetur efficitur. Neque curabitur lacus vehicula velit pulvinar
                                accumsan eros. Maximus mi dignissim primis dui est ex consectetur dis. Metus semper
                                elementum sociosqu semper nunc. Dolor class natoque ridiculus taciti per vestibulum.
                                Ligula at elit maximus duis, consequat orci enim pulvinar. Sollicitudin suspendisse vel
                                torquent ullamcorper finibus non? Rutrum hendrerit urna inceptos accumsan fringilla
                                suscipit. Fusce quis euismod eros gravida placerat imperdiet. Maecenas purus taciti
                                consequat sagittis ullamcorper. Class est nibh ipsum morbi in. Mattis sit pharetra sem
                                habitant felis posuere gravida nec fringilla. Pulvinar elementum penatibus etiam ipsum
                                elementum mollis iaculis malesuada ligula. Eleifend in viverra malesuada conubia rutrum
                                ad. Iaculis penatibus vivamus placerat non bibendum condimentum. Semper facilisi
                                ullamcorper inceptos orci blandit volutpat tempus. Ante dui porta nostra id massa aenean
                                nam. Donec tortor maximus dictum condimentum ad posuere. Laoreet sodales iaculis nullam
                                placerat pharetra justo hac quis accumsan.
                            </div>
                            <div>
                                Lorem ipsum odor amet, consectetuer adipiscing elit. Dui montes mollis hendrerit orci
                                ex. Nam cursus nam auctor netus nulla porta; ultrices ipsum ipsum. Pellentesque orci
                                mauris dignissim vulputate metus integer. Arcu libero dis a adipiscing porttitor rhoncus
                                condimentum. Ipsum rutrum turpis auctor curabitur molestie pulvinar eros justo. Sagittis
                                non nec mi tempus cursus ultricies. Dictum suscipit morbi potenti nam eu proin tortor.
                                Sapien primis quis tempus vitae platea ut ante vivamus. Mattis elit porttitor aliquet
                                risus magnis; lobortis eget. Suspendisse conubia montes etiam morbi id hendrerit rhoncus
                                himenaeos. Venenatis lectus nascetur proin morbi accumsan lacinia. Magnis nisi urna
                                ultrices orci parturient habitasse. Commodo rhoncus proin massa nascetur consequat proin
                                nullam. Imperdiet dignissim vel libero nisl non. Ex adipiscing non sed quis fames platea
                                neque maximus. Pharetra ultricies ad montes inceptos imperdiet curae donec. Cubilia
                                mattis ac quisque vel maximus bibendum netus auctor. Venenatis ad orci sagittis lacus
                                per. Eros sit sodales facilisi dis vehicula egestas justo convallis morbi. Class nisl
                                class; dapibus dignissim purus ultricies. Integer dui finibus id nec, sapien taciti
                                mollis per. Natoque placerat tempor; at ornare senectus duis sit leo. Et hac porttitor
                                convallis habitasse nascetur efficitur. Neque curabitur lacus vehicula velit pulvinar
                                accumsan eros. Maximus mi dignissim primis dui est ex consectetur dis. Metus semper
                                elementum sociosqu semper nunc. Dolor class natoque ridiculus taciti per vestibulum.
                                Ligula at elit maximus duis, consequat orci enim pulvinar. Sollicitudin suspendisse vel
                                torquent ullamcorper finibus non? Rutrum hendrerit urna inceptos accumsan fringilla
                                suscipit. Fusce quis euismod eros gravida placerat imperdiet. Maecenas purus taciti
                                consequat sagittis ullamcorper. Class est nibh ipsum morbi in. Mattis sit pharetra sem
                                habitant felis posuere gravida nec fringilla. Pulvinar elementum penatibus etiam ipsum
                                elementum mollis iaculis malesuada ligula. Eleifend in viverra malesuada conubia rutrum
                                ad. Iaculis penatibus vivamus placerat non bibendum condimentum. Semper facilisi
                                ullamcorper inceptos orci blandit volutpat tempus. Ante dui porta nostra id massa aenean
                                nam. Donec tortor maximus dictum condimentum ad posuere. Laoreet sodales iaculis nullam
                                placerat pharetra justo hac quis accumsan.
                            </div>
                            <div>
                                Lorem ipsum odor amet, consectetuer adipiscing elit. Dui montes mollis hendrerit orci
                                ex. Nam cursus nam auctor netus nulla porta; ultrices ipsum ipsum. Pellentesque orci
                                mauris dignissim vulputate metus integer. Arcu libero dis a adipiscing porttitor rhoncus
                                condimentum. Ipsum rutrum turpis auctor curabitur molestie pulvinar eros justo. Sagittis
                                non nec mi tempus cursus ultricies. Dictum suscipit morbi potenti nam eu proin tortor.
                                Sapien primis quis tempus vitae platea ut ante vivamus. Mattis elit porttitor aliquet
                                risus magnis; lobortis eget. Suspendisse conubia montes etiam morbi id hendrerit rhoncus
                                himenaeos. Venenatis lectus nascetur proin morbi accumsan lacinia. Magnis nisi urna
                                ultrices orci parturient habitasse. Commodo rhoncus proin massa nascetur consequat proin
                                nullam. Imperdiet dignissim vel libero nisl non. Ex adipiscing non sed quis fames platea
                                neque maximus. Pharetra ultricies ad montes inceptos imperdiet curae donec. Cubilia
                                mattis ac quisque vel maximus bibendum netus auctor. Venenatis ad orci sagittis lacus
                                per. Eros sit sodales facilisi dis vehicula egestas justo convallis morbi. Class nisl
                                class; dapibus dignissim purus ultricies. Integer dui finibus id nec, sapien taciti
                                mollis per. Natoque placerat tempor; at ornare senectus duis sit leo. Et hac porttitor
                                convallis habitasse nascetur efficitur. Neque curabitur lacus vehicula velit pulvinar
                                accumsan eros. Maximus mi dignissim primis dui est ex consectetur dis. Metus semper
                                elementum sociosqu semper nunc. Dolor class natoque ridiculus taciti per vestibulum.
                                Ligula at elit maximus duis, consequat orci enim pulvinar. Sollicitudin suspendisse vel
                                torquent ullamcorper finibus non? Rutrum hendrerit urna inceptos accumsan fringilla
                                suscipit. Fusce quis euismod eros gravida placerat imperdiet. Maecenas purus taciti
                                consequat sagittis ullamcorper. Class est nibh ipsum morbi in. Mattis sit pharetra sem
                                habitant felis posuere gravida nec fringilla. Pulvinar elementum penatibus etiam ipsum
                                elementum mollis iaculis malesuada ligula. Eleifend in viverra malesuada conubia rutrum
                                ad. Iaculis penatibus vivamus placerat non bibendum condimentum. Semper facilisi
                                ullamcorper inceptos orci blandit volutpat tempus. Ante dui porta nostra id massa aenean
                                nam. Donec tortor maximus dictum condimentum ad posuere. Laoreet sodales iaculis nullam
                                placerat pharetra justo hac quis accumsan.
                            </div>
                            <div>
                                Lorem ipsum odor amet, consectetuer adipiscing elit. Dui montes mollis hendrerit orci
                                ex. Nam cursus nam auctor netus nulla porta; ultrices ipsum ipsum. Pellentesque orci
                                mauris dignissim vulputate metus integer. Arcu libero dis a adipiscing porttitor rhoncus
                                condimentum. Ipsum rutrum turpis auctor curabitur molestie pulvinar eros justo. Sagittis
                                non nec mi tempus cursus ultricies. Dictum suscipit morbi potenti nam eu proin tortor.
                                Sapien primis quis tempus vitae platea ut ante vivamus. Mattis elit porttitor aliquet
                                risus magnis; lobortis eget. Suspendisse conubia montes etiam morbi id hendrerit rhoncus
                                himenaeos. Venenatis lectus nascetur proin morbi accumsan lacinia. Magnis nisi urna
                                ultrices orci parturient habitasse. Commodo rhoncus proin massa nascetur consequat proin
                                nullam. Imperdiet dignissim vel libero nisl non. Ex adipiscing non sed quis fames platea
                                neque maximus. Pharetra ultricies ad montes inceptos imperdiet curae donec. Cubilia
                                mattis ac quisque vel maximus bibendum netus auctor. Venenatis ad orci sagittis lacus
                                per. Eros sit sodales facilisi dis vehicula egestas justo convallis morbi. Class nisl
                                class; dapibus dignissim purus ultricies. Integer dui finibus id nec, sapien taciti
                                mollis per. Natoque placerat tempor; at ornare senectus duis sit leo. Et hac porttitor
                                convallis habitasse nascetur efficitur. Neque curabitur lacus vehicula velit pulvinar
                                accumsan eros. Maximus mi dignissim primis dui est ex consectetur dis. Metus semper
                                elementum sociosqu semper nunc. Dolor class natoque ridiculus taciti per vestibulum.
                                Ligula at elit maximus duis, consequat orci enim pulvinar. Sollicitudin suspendisse vel
                                torquent ullamcorper finibus non? Rutrum hendrerit urna inceptos accumsan fringilla
                                suscipit. Fusce quis euismod eros gravida placerat imperdiet. Maecenas purus taciti
                                consequat sagittis ullamcorper. Class est nibh ipsum morbi in. Mattis sit pharetra sem
                                habitant felis posuere gravida nec fringilla. Pulvinar elementum penatibus etiam ipsum
                                elementum mollis iaculis malesuada ligula. Eleifend in viverra malesuada conubia rutrum
                                ad. Iaculis penatibus vivamus placerat non bibendum condimentum. Semper facilisi
                                ullamcorper inceptos orci blandit volutpat tempus. Ante dui porta nostra id massa aenean
                                nam. Donec tortor maximus dictum condimentum ad posuere. Laoreet sodales iaculis nullam
                                placerat pharetra justo hac quis accumsan.
                            </div>
                            <div>
                                Lorem ipsum odor amet, consectetuer adipiscing elit. Dui montes mollis hendrerit orci
                                ex. Nam cursus nam auctor netus nulla porta; ultrices ipsum ipsum. Pellentesque orci
                                mauris dignissim vulputate metus integer. Arcu libero dis a adipiscing porttitor rhoncus
                                condimentum. Ipsum rutrum turpis auctor curabitur molestie pulvinar eros justo. Sagittis
                                non nec mi tempus cursus ultricies. Dictum suscipit morbi potenti nam eu proin tortor.
                                Sapien primis quis tempus vitae platea ut ante vivamus. Mattis elit porttitor aliquet
                                risus magnis; lobortis eget. Suspendisse conubia montes etiam morbi id hendrerit rhoncus
                                himenaeos. Venenatis lectus nascetur proin morbi accumsan lacinia. Magnis nisi urna
                                ultrices orci parturient habitasse. Commodo rhoncus proin massa nascetur consequat proin
                                nullam. Imperdiet dignissim vel libero nisl non. Ex adipiscing non sed quis fames platea
                                neque maximus. Pharetra ultricies ad montes inceptos imperdiet curae donec. Cubilia
                                mattis ac quisque vel maximus bibendum netus auctor. Venenatis ad orci sagittis lacus
                                per. Eros sit sodales facilisi dis vehicula egestas justo convallis morbi. Class nisl
                                class; dapibus dignissim purus ultricies. Integer dui finibus id nec, sapien taciti
                                mollis per. Natoque placerat tempor; at ornare senectus duis sit leo. Et hac porttitor
                                convallis habitasse nascetur efficitur. Neque curabitur lacus vehicula velit pulvinar
                                accumsan eros. Maximus mi dignissim primis dui est ex consectetur dis. Metus semper
                                elementum sociosqu semper nunc. Dolor class natoque ridiculus taciti per vestibulum.
                                Ligula at elit maximus duis, consequat orci enim pulvinar. Sollicitudin suspendisse vel
                                torquent ullamcorper finibus non? Rutrum hendrerit urna inceptos accumsan fringilla
                                suscipit. Fusce quis euismod eros gravida placerat imperdiet. Maecenas purus taciti
                                consequat sagittis ullamcorper. Class est nibh ipsum morbi in. Mattis sit pharetra sem
                                habitant felis posuere gravida nec fringilla. Pulvinar elementum penatibus etiam ipsum
                                elementum mollis iaculis malesuada ligula. Eleifend in viverra malesuada conubia rutrum
                                ad. Iaculis penatibus vivamus placerat non bibendum condimentum. Semper facilisi
                                ullamcorper inceptos orci blandit volutpat tempus. Ante dui porta nostra id massa aenean
                                nam. Donec tortor maximus dictum condimentum ad posuere. Laoreet sodales iaculis nullam
                                placerat pharetra justo hac quis accumsan.
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export const Overlay: StoryFn = () => {
    return (
        <div className="layout">
            <div className="page">
                <div className="page__container">
                    <div className="page__content">
                        <div className="content">
                            <Loader loading={true} variant="screen-overlay" />

                            <div>
                                Lorem ipsum odor amet, consectetuer adipiscing elit. Dui montes mollis hendrerit orci
                                ex. Nam cursus nam auctor netus nulla porta; ultrices ipsum ipsum. Pellentesque orci
                                mauris dignissim vulputate metus integer. Arcu libero dis a adipiscing porttitor rhoncus
                                condimentum. Ipsum rutrum turpis auctor curabitur molestie pulvinar eros justo. Sagittis
                                non nec mi tempus cursus ultricies. Dictum suscipit morbi potenti nam eu proin tortor.
                                Sapien primis quis tempus vitae platea ut ante vivamus. Mattis elit porttitor aliquet
                                risus magnis; lobortis eget. Suspendisse conubia montes etiam morbi id hendrerit rhoncus
                                himenaeos. Venenatis lectus nascetur proin morbi accumsan lacinia. Magnis nisi urna
                                ultrices orci parturient habitasse. Commodo rhoncus proin massa nascetur consequat proin
                                nullam. Imperdiet dignissim vel libero nisl non. Ex adipiscing non sed quis fames platea
                                neque maximus. Pharetra ultricies ad montes inceptos imperdiet curae donec. Cubilia
                                mattis ac quisque vel maximus bibendum netus auctor. Venenatis ad orci sagittis lacus
                                per. Eros sit sodales facilisi dis vehicula egestas justo convallis morbi. Class nisl
                                class; dapibus dignissim purus ultricies. Integer dui finibus id nec, sapien taciti
                                mollis per. Natoque placerat tempor; at ornare senectus duis sit leo. Et hac porttitor
                                convallis habitasse nascetur efficitur. Neque curabitur lacus vehicula velit pulvinar
                                accumsan eros. Maximus mi dignissim primis dui est ex consectetur dis. Metus semper
                                elementum sociosqu semper nunc. Dolor class natoque ridiculus taciti per vestibulum.
                                Ligula at elit maximus duis, consequat orci enim pulvinar. Sollicitudin suspendisse vel
                                torquent ullamcorper finibus non? Rutrum hendrerit urna inceptos accumsan fringilla
                                suscipit. Fusce quis euismod eros gravida placerat imperdiet. Maecenas purus taciti
                                consequat sagittis ullamcorper. Class est nibh ipsum morbi in. Mattis sit pharetra sem
                                habitant felis posuere gravida nec fringilla. Pulvinar elementum penatibus etiam ipsum
                                elementum mollis iaculis malesuada ligula. Eleifend in viverra malesuada conubia rutrum
                                ad. Iaculis penatibus vivamus placerat non bibendum condimentum. Semper facilisi
                                ullamcorper inceptos orci blandit volutpat tempus. Ante dui porta nostra id massa aenean
                                nam. Donec tortor maximus dictum condimentum ad posuere. Laoreet sodales iaculis nullam
                                placerat pharetra justo hac quis accumsan.
                            </div>
                            <div>
                                Lorem ipsum odor amet, consectetuer adipiscing elit. Dui montes mollis hendrerit orci
                                ex. Nam cursus nam auctor netus nulla porta; ultrices ipsum ipsum. Pellentesque orci
                                mauris dignissim vulputate metus integer. Arcu libero dis a adipiscing porttitor rhoncus
                                condimentum. Ipsum rutrum turpis auctor curabitur molestie pulvinar eros justo. Sagittis
                                non nec mi tempus cursus ultricies. Dictum suscipit morbi potenti nam eu proin tortor.
                                Sapien primis quis tempus vitae platea ut ante vivamus. Mattis elit porttitor aliquet
                                risus magnis; lobortis eget. Suspendisse conubia montes etiam morbi id hendrerit rhoncus
                                himenaeos. Venenatis lectus nascetur proin morbi accumsan lacinia. Magnis nisi urna
                                ultrices orci parturient habitasse. Commodo rhoncus proin massa nascetur consequat proin
                                nullam. Imperdiet dignissim vel libero nisl non. Ex adipiscing non sed quis fames platea
                                neque maximus. Pharetra ultricies ad montes inceptos imperdiet curae donec. Cubilia
                                mattis ac quisque vel maximus bibendum netus auctor. Venenatis ad orci sagittis lacus
                                per. Eros sit sodales facilisi dis vehicula egestas justo convallis morbi. Class nisl
                                class; dapibus dignissim purus ultricies. Integer dui finibus id nec, sapien taciti
                                mollis per. Natoque placerat tempor; at ornare senectus duis sit leo. Et hac porttitor
                                convallis habitasse nascetur efficitur. Neque curabitur lacus vehicula velit pulvinar
                                accumsan eros. Maximus mi dignissim primis dui est ex consectetur dis. Metus semper
                                elementum sociosqu semper nunc. Dolor class natoque ridiculus taciti per vestibulum.
                                Ligula at elit maximus duis, consequat orci enim pulvinar. Sollicitudin suspendisse vel
                                torquent ullamcorper finibus non? Rutrum hendrerit urna inceptos accumsan fringilla
                                suscipit. Fusce quis euismod eros gravida placerat imperdiet. Maecenas purus taciti
                                consequat sagittis ullamcorper. Class est nibh ipsum morbi in. Mattis sit pharetra sem
                                habitant felis posuere gravida nec fringilla. Pulvinar elementum penatibus etiam ipsum
                                elementum mollis iaculis malesuada ligula. Eleifend in viverra malesuada conubia rutrum
                                ad. Iaculis penatibus vivamus placerat non bibendum condimentum. Semper facilisi
                                ullamcorper inceptos orci blandit volutpat tempus. Ante dui porta nostra id massa aenean
                                nam. Donec tortor maximus dictum condimentum ad posuere. Laoreet sodales iaculis nullam
                                placerat pharetra justo hac quis accumsan.
                            </div>
                            <div>
                                Lorem ipsum odor amet, consectetuer adipiscing elit. Dui montes mollis hendrerit orci
                                ex. Nam cursus nam auctor netus nulla porta; ultrices ipsum ipsum. Pellentesque orci
                                mauris dignissim vulputate metus integer. Arcu libero dis a adipiscing porttitor rhoncus
                                condimentum. Ipsum rutrum turpis auctor curabitur molestie pulvinar eros justo. Sagittis
                                non nec mi tempus cursus ultricies. Dictum suscipit morbi potenti nam eu proin tortor.
                                Sapien primis quis tempus vitae platea ut ante vivamus. Mattis elit porttitor aliquet
                                risus magnis; lobortis eget. Suspendisse conubia montes etiam morbi id hendrerit rhoncus
                                himenaeos. Venenatis lectus nascetur proin morbi accumsan lacinia. Magnis nisi urna
                                ultrices orci parturient habitasse. Commodo rhoncus proin massa nascetur consequat proin
                                nullam. Imperdiet dignissim vel libero nisl non. Ex adipiscing non sed quis fames platea
                                neque maximus. Pharetra ultricies ad montes inceptos imperdiet curae donec. Cubilia
                                mattis ac quisque vel maximus bibendum netus auctor. Venenatis ad orci sagittis lacus
                                per. Eros sit sodales facilisi dis vehicula egestas justo convallis morbi. Class nisl
                                class; dapibus dignissim purus ultricies. Integer dui finibus id nec, sapien taciti
                                mollis per. Natoque placerat tempor; at ornare senectus duis sit leo. Et hac porttitor
                                convallis habitasse nascetur efficitur. Neque curabitur lacus vehicula velit pulvinar
                                accumsan eros. Maximus mi dignissim primis dui est ex consectetur dis. Metus semper
                                elementum sociosqu semper nunc. Dolor class natoque ridiculus taciti per vestibulum.
                                Ligula at elit maximus duis, consequat orci enim pulvinar. Sollicitudin suspendisse vel
                                torquent ullamcorper finibus non? Rutrum hendrerit urna inceptos accumsan fringilla
                                suscipit. Fusce quis euismod eros gravida placerat imperdiet. Maecenas purus taciti
                                consequat sagittis ullamcorper. Class est nibh ipsum morbi in. Mattis sit pharetra sem
                                habitant felis posuere gravida nec fringilla. Pulvinar elementum penatibus etiam ipsum
                                elementum mollis iaculis malesuada ligula. Eleifend in viverra malesuada conubia rutrum
                                ad. Iaculis penatibus vivamus placerat non bibendum condimentum. Semper facilisi
                                ullamcorper inceptos orci blandit volutpat tempus. Ante dui porta nostra id massa aenean
                                nam. Donec tortor maximus dictum condimentum ad posuere. Laoreet sodales iaculis nullam
                                placerat pharetra justo hac quis accumsan.
                            </div>
                            <div>
                                Lorem ipsum odor amet, consectetuer adipiscing elit. Dui montes mollis hendrerit orci
                                ex. Nam cursus nam auctor netus nulla porta; ultrices ipsum ipsum. Pellentesque orci
                                mauris dignissim vulputate metus integer. Arcu libero dis a adipiscing porttitor rhoncus
                                condimentum. Ipsum rutrum turpis auctor curabitur molestie pulvinar eros justo. Sagittis
                                non nec mi tempus cursus ultricies. Dictum suscipit morbi potenti nam eu proin tortor.
                                Sapien primis quis tempus vitae platea ut ante vivamus. Mattis elit porttitor aliquet
                                risus magnis; lobortis eget. Suspendisse conubia montes etiam morbi id hendrerit rhoncus
                                himenaeos. Venenatis lectus nascetur proin morbi accumsan lacinia. Magnis nisi urna
                                ultrices orci parturient habitasse. Commodo rhoncus proin massa nascetur consequat proin
                                nullam. Imperdiet dignissim vel libero nisl non. Ex adipiscing non sed quis fames platea
                                neque maximus. Pharetra ultricies ad montes inceptos imperdiet curae donec. Cubilia
                                mattis ac quisque vel maximus bibendum netus auctor. Venenatis ad orci sagittis lacus
                                per. Eros sit sodales facilisi dis vehicula egestas justo convallis morbi. Class nisl
                                class; dapibus dignissim purus ultricies. Integer dui finibus id nec, sapien taciti
                                mollis per. Natoque placerat tempor; at ornare senectus duis sit leo. Et hac porttitor
                                convallis habitasse nascetur efficitur. Neque curabitur lacus vehicula velit pulvinar
                                accumsan eros. Maximus mi dignissim primis dui est ex consectetur dis. Metus semper
                                elementum sociosqu semper nunc. Dolor class natoque ridiculus taciti per vestibulum.
                                Ligula at elit maximus duis, consequat orci enim pulvinar. Sollicitudin suspendisse vel
                                torquent ullamcorper finibus non? Rutrum hendrerit urna inceptos accumsan fringilla
                                suscipit. Fusce quis euismod eros gravida placerat imperdiet. Maecenas purus taciti
                                consequat sagittis ullamcorper. Class est nibh ipsum morbi in. Mattis sit pharetra sem
                                habitant felis posuere gravida nec fringilla. Pulvinar elementum penatibus etiam ipsum
                                elementum mollis iaculis malesuada ligula. Eleifend in viverra malesuada conubia rutrum
                                ad. Iaculis penatibus vivamus placerat non bibendum condimentum. Semper facilisi
                                ullamcorper inceptos orci blandit volutpat tempus. Ante dui porta nostra id massa aenean
                                nam. Donec tortor maximus dictum condimentum ad posuere. Laoreet sodales iaculis nullam
                                placerat pharetra justo hac quis accumsan.
                            </div>
                            <div>
                                Lorem ipsum odor amet, consectetuer adipiscing elit. Dui montes mollis hendrerit orci
                                ex. Nam cursus nam auctor netus nulla porta; ultrices ipsum ipsum. Pellentesque orci
                                mauris dignissim vulputate metus integer. Arcu libero dis a adipiscing porttitor rhoncus
                                condimentum. Ipsum rutrum turpis auctor curabitur molestie pulvinar eros justo. Sagittis
                                non nec mi tempus cursus ultricies. Dictum suscipit morbi potenti nam eu proin tortor.
                                Sapien primis quis tempus vitae platea ut ante vivamus. Mattis elit porttitor aliquet
                                risus magnis; lobortis eget. Suspendisse conubia montes etiam morbi id hendrerit rhoncus
                                himenaeos. Venenatis lectus nascetur proin morbi accumsan lacinia. Magnis nisi urna
                                ultrices orci parturient habitasse. Commodo rhoncus proin massa nascetur consequat proin
                                nullam. Imperdiet dignissim vel libero nisl non. Ex adipiscing non sed quis fames platea
                                neque maximus. Pharetra ultricies ad montes inceptos imperdiet curae donec. Cubilia
                                mattis ac quisque vel maximus bibendum netus auctor. Venenatis ad orci sagittis lacus
                                per. Eros sit sodales facilisi dis vehicula egestas justo convallis morbi. Class nisl
                                class; dapibus dignissim purus ultricies. Integer dui finibus id nec, sapien taciti
                                mollis per. Natoque placerat tempor; at ornare senectus duis sit leo. Et hac porttitor
                                convallis habitasse nascetur efficitur. Neque curabitur lacus vehicula velit pulvinar
                                accumsan eros. Maximus mi dignissim primis dui est ex consectetur dis. Metus semper
                                elementum sociosqu semper nunc. Dolor class natoque ridiculus taciti per vestibulum.
                                Ligula at elit maximus duis, consequat orci enim pulvinar. Sollicitudin suspendisse vel
                                torquent ullamcorper finibus non? Rutrum hendrerit urna inceptos accumsan fringilla
                                suscipit. Fusce quis euismod eros gravida placerat imperdiet. Maecenas purus taciti
                                consequat sagittis ullamcorper. Class est nibh ipsum morbi in. Mattis sit pharetra sem
                                habitant felis posuere gravida nec fringilla. Pulvinar elementum penatibus etiam ipsum
                                elementum mollis iaculis malesuada ligula. Eleifend in viverra malesuada conubia rutrum
                                ad. Iaculis penatibus vivamus placerat non bibendum condimentum. Semper facilisi
                                ullamcorper inceptos orci blandit volutpat tempus. Ante dui porta nostra id massa aenean
                                nam. Donec tortor maximus dictum condimentum ad posuere. Laoreet sodales iaculis nullam
                                placerat pharetra justo hac quis accumsan.
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export const InsideTable: StoryFn = () => {

    const [tableOptions, setTableOptions] = useState<DatagridGetDataArguments<ProductGetModel> | null>(null);
    const [dataRaw, data, total, status] = useTableQueryClientFilter({
        queryFn: getProductsQuery(),
        filters: tableOptions
    });

    return (
        <Datagrid
            data={data || []}
            dataRaw={dataRaw}
            total={total || 0}
            loading={true}
            onFilterUpdate={setTableOptions}
            properties={defaultProductColumns() as any}
        />

    );
};

export const Background: StoryFn = () => {
    return <Loader loading={true} background={ColorDefinitions.SurfaceDark} />;
};

export const WithoutLabels: StoryFn = () => {
    return <Loader loading={true} enableLabels={false} />;
};

export const WithoutAnimation: StoryFn = () => {
    return <Loader loading={true} enableAnimation={false} />;
};

export const AnimationColor: StoryFn = () => {
    return <Loader loading={true} animationColor={ColorDefinitions.Green} />;
};

export const TextColor: StoryFn = () => {
    return <Loader loading={true} labelColor={ColorDefinitions.Green} />;
};
