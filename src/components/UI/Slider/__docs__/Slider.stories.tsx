import type { Meta, StoryFn, StoryObj } from '@storybook/react-webpack5';

import { ColorDefinitions } from '../../../../lib/utils/definitions';
import ArtAanlevering from '../../../Base/Art/ArtAanlevering';
import ArtContract from '../../../Base/Art/ArtContract';
import ArtDossier from '../../../Base/Art/ArtDossier';
import ArtIgo from '../../../Base/Art/ArtIgo';
import ArtKetenzorg from '../../../Base/Art/ArtKetenzorg';
import ArtMeekijkconsult from '../../../Base/Art/ArtMeekijkconsult';
import ArtTicket from '../../../Base/Art/ArtTicket';
import ArtVerbruiksmiddel from '../../../Base/Art/ArtVerbruiksmiddel';
import Button from '../../Button/Button';
import Widget from '../../Widget/Widget';
import Slider from '../Slider';

const meta: Meta<typeof Slider> = {
    title: 'UI kit/Slider',
    component: Slider,
    parameters: {
        layout: 'centered',
    },

};

export default meta;
type Story = StoryObj<typeof Slider>;

export const Default: StoryFn = (args) => {

    return (
            <Slider>
                <Widget
                    contentItemPosition="item-center"
                    background={ColorDefinitions.SurfaceDark}
                    image={<ArtAanlevering />}
                    widgetContent={
                        <>
                            <h4>Aanlevering</h4>
                            <p>Lorum ipsum dolimiet</p>
                            <Button color={ColorDefinitions.SurfaceLight} shadow={true} css="mt-2">
                                Naar aanlevering
                            </Button>
                        </>
                    }
                />
                <Widget
                    contentItemPosition="item-center"
                    background={ColorDefinitions.SurfaceDark}
                    image={<ArtDossier />}
                    widgetContent={
                        <>
                            <h4>Dossiers</h4>
                            <p>Lorum ipsum dolimiet</p>
                            <Button color={ColorDefinitions.SurfaceLight} shadow={true} css="mt-2">
                                Naar dossiers
                            </Button>
                        </>
                    }
                />

                <Widget
                    contentItemPosition="item-center"
                    background={ColorDefinitions.SurfaceDark}
                    image={<ArtKetenzorg />}
                    widgetContent={
                        <>
                            <h4>Ketenzorg</h4>
                            <p>Lorum ipsum dolimiet</p>
                            <Button color={ColorDefinitions.SurfaceLight} shadow={true} css="mt-2">
                                Naar machtigingen
                            </Button>
                        </>
                    }
                />

                <Widget
                    contentItemPosition="item-center"
                    background={ColorDefinitions.SurfaceDark}
                    image={<ArtIgo />}
                    widgetContent={
                        <>
                            <h4>Integrale geboortezorg</h4>
                            <p>Lorum ipsum dolimiet</p>
                            <Button color={ColorDefinitions.SurfaceLight} shadow={true} css="mt-2">
                                Naar integrale geboortezorg
                            </Button>
                        </>
                    }
                />
                <Widget
                    contentItemPosition="item-center"
                    background={ColorDefinitions.SurfaceDark}
                    image={<ArtVerbruiksmiddel />}
                    widgetContent={
                        <>
                            <h4>Verbruiksmiddelen</h4>
                            <p>Lorum ipsum dolimiet</p>
                            <Button color={ColorDefinitions.SurfaceLight} shadow={true} css="mt-2">
                                Naar verbruiksmiddelen
                            </Button>
                        </>
                    }
                />
                <Widget
                    contentItemPosition="item-center"
                    background={ColorDefinitions.SurfaceDark}
                    image={<ArtMeekijkconsult />}
                    widgetContent={
                        <>
                            <h4>Meekijkconsulten</h4>
                            <p>Lorum ipsum dolimiet</p>
                            <Button color={ColorDefinitions.SurfaceLight} shadow={true} css="mt-2">
                                Naar meekijkconsulten
                            </Button>
                        </>
                    }
                />
                <Widget
                    contentItemPosition="item-center"
                    background={ColorDefinitions.SurfaceDark}
                    image={<ArtContract />}
                    widgetContent={
                        <>
                            <h4>Contracten</h4>
                            <p>Lorum ipsum dolimiet</p>
                            <Button color={ColorDefinitions.SurfaceLight} shadow={true} css="mt-2">
                                Naar contracten
                            </Button>
                        </>
                    }
                />
                <Widget
                    contentItemPosition="item-center"
                    background={ColorDefinitions.SurfaceDark}
                    image={<ArtTicket />}
                    widgetContent={
                        <>
                            <h4>Tickets</h4>
                            <p>Lorum ipsum dolimiet</p>
                            <Button color={ColorDefinitions.SurfaceLight} shadow={true} css="mt-2">
                                Naar tickets
                            </Button>
                        </>
                    }
                />
            </Slider>
   
    );
};
