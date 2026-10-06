import type { Meta, StoryFn, StoryObj } from '@storybook/react-webpack5';
import { useEffect, useState } from 'react';
import { Breadcrumb, Button, ContentItem, DividerSplitted, EventStopper, Fieldset, LayoutProvider, TabPane, TabPanes, Tabs, Title, useLayoutContext } from '../../..';
import { ColorDefinitions } from '../../../..';
import ColumnLayout from '../ColumnLayout';
import ColumnLayoutAside from '../ColumnLayoutAside';
import ColumnLayoutContent from '../ColumnLayoutContent';
import ColumnLayoutHeader from '../ColumnLayoutHeader';
import ColumnLayoutMain from '../ColumnLayoutMain';
import { MemoryRouter } from 'react-router';
import { SvgSprite } from '../../../../assets/SvgSprite';

const meta: Meta<typeof ColumnLayout> = {
    title: 'Layout/Column layout',
    component: ColumnLayout,
    decorators: [
        (Story) => (
            <MemoryRouter>
                <LayoutProvider>
                    <SvgSprite />
                    <Story />
                </LayoutProvider>
            </MemoryRouter>

        ),
    ],
};

export default meta;
type Story = StoryObj<typeof ColumnLayout>;


export const Default: StoryFn = () => {
    return (
        <ColumnLayout>
            <ColumnLayoutMain>
                <ColumnLayoutHeader>
                    Main header
                </ColumnLayoutHeader>
                <ColumnLayoutContent>
                    <p>Main content goes here...</p>
                </ColumnLayoutContent>
            </ColumnLayoutMain>
            <ColumnLayoutAside>
                <ColumnLayoutHeader>Aside header</ColumnLayoutHeader>
                <ColumnLayoutContent>
                    <p>Aside content goes here...</p>
                </ColumnLayoutContent>
            </ColumnLayoutAside>
        </ColumnLayout>
    )
};

export const EventStopperSample: StoryFn = () => {
    const { setFullscreen, setShowHeader, setHasSidebars, setShowSidebarMobile } = useLayoutContext();

    useEffect(() => {
        setFullscreen(true);
        setShowHeader(false);
        setHasSidebars(true);
        setShowSidebarMobile(true);

        return () => {
            setFullscreen(false);
            setShowHeader(true);
            setHasSidebars(true);
            setShowSidebarMobile(true);
        };
    }, [setFullscreen, setShowHeader, setHasSidebars, setShowSidebarMobile]);



    const [parentFullHeight, setParentFullHeight] = useState(false);
    const [nestedFullHeight, setNestedFullHeight] = useState(false);
    const [enableAsideLeft, setEnableAsideLeft] = useState(false);
    const [enableAsideRight, setEnableAsideRight] = useState(true);
    const [enableHeader, setEnableHeader] = useState(false);
    const [enableFooter, setEnableFooter] = useState(false);
    const [enableNested, setEnableNested] = useState(false);

    const title = "Demo layout"
    const breadcrumbItems = [
        { label: "Home", href: "" },
        { label: "Demo", href: "" },
        { label: "Layout", href: "" },
    ];
    
    return (
        <ColumnLayout asidePosition="right">
            <ColumnLayoutMain>
                <ColumnLayoutHeader>
                    <ContentItem item={{
                        content: <>
                            <Title>{title}</Title>

                            {breadcrumbItems.length > 0 ?
                                <Breadcrumb items={breadcrumbItems} />
                                : null}
                        </>
                    }} />
                </ColumnLayoutHeader>
                <ColumnLayoutContent>
                    <p className="p20001">Main content goes here...</p>

                     <Fieldset legend="Options" borderColor={ColorDefinitions.Surface} fieldsetCss="mb-3">
                        <Button onClick={() => setParentFullHeight(!parentFullHeight)}>{parentFullHeight === false ? "Enable" : "Disible"} parent fullheight</Button>
                        <Button onClick={() => setNestedFullHeight(!nestedFullHeight)}>{nestedFullHeight === false ? "Enable" : "Disible"} nested fullheight</Button>
                        <Button onClick={() => setEnableNested(!enableNested)}>{enableNested === false ? "Enable" : "Disible"} nested content</Button>
                        <Button onClick={() => setEnableHeader(!enableHeader)}>{enableHeader === false ? "Enable" : "Disible"} parent header</Button>
                        <Button onClick={() => setEnableFooter(!enableFooter)}>{enableFooter === false ? "Enable" : "Disible"} parent footer</Button>
                        <Button onClick={() => setEnableAsideLeft(!enableAsideLeft)}>{enableAsideLeft === false ? "Enable" : "Disible"} aside left</Button>
                        <Button onClick={() => setEnableAsideRight(!enableAsideRight)}>{enableAsideRight === false ? "Enable" : "Disible"} aside right</Button>
                    </Fieldset>
 <DividerSplitted label="Dossiers" dividerSplittedCss="mt-1" />

                  <EventStopper>
                       <div className={`pc-layout ${parentFullHeight ? 'pc-layout--full-height' : ''} `}>
                        {enableHeader && (
                            <header className="pc-layout__header bg-olive">
                                Header
                            </header>
                        )}

                        <div className="pc-layout__content">
                            {enableAsideLeft && (
                                <div className="pc-layout__aside pc-layout__aside--left shown bg-orange">
                                    <p>Aside</p>
                                    <p className="p2000">Long content</p>
                                </div>
                            )}

                            <div className="pc-layout__main bg-blue-10">

                                {enableNested ? (
                                    <div className={`pc-layout ${nestedFullHeight ? 'pc-layout--full-height' : ''} `}>
                                        <header className="pc-layout__header bg-blue">
                                            Header
                                        </header>
                                        <div className="pc-layout__content bg-red">
                                            <p className="p2000">Lange content...</p>
                                        </div>
                                        <footer className="pc-layout__footer bg-blue">
                                            Footer
                                        </footer>
                                    </div>
                                )
                                    : (
                                        <div className="p2000">Long content</div>
                                    )
                                }

                            </div>

                            {enableAsideRight && (
                                <div className="pc-layout__aside pc-layout__aside--right shown bg-orange">
                                    <p>Aside R</p>
                                    <p className="p2000">Long content</p>
                                </div>
                            )}
                        </div>

                        {enableFooter && (
                            <footer className="pc-layout__footer bg-olive">
                                Footer
                            </footer>
                        )}
                    </div>
                  </EventStopper>

                </ColumnLayoutContent>
            </ColumnLayoutMain>
          <ColumnLayoutAside>
                <ColumnLayoutHeader>Aside header</ColumnLayoutHeader>
                <ColumnLayoutContent>
                    <p className="p2000">Aside content goes here...</p>
                </ColumnLayoutContent>
            </ColumnLayoutAside>

        </ColumnLayout>
    )
};


export const NestedContent: StoryFn = () => {

     const { setFullscreen, setShowHeader, setHasSidebars, setShowSidebarMobile } = useLayoutContext();

    useEffect(() => {
        setFullscreen(true);
        setShowHeader(false);
        setHasSidebars(true);
        setShowSidebarMobile(true);

        return () => {
            setFullscreen(false);
            setShowHeader(true);
            setHasSidebars(true);
            setShowSidebarMobile(true);
        };
    }, [setFullscreen, setShowHeader, setHasSidebars, setShowSidebarMobile]);



    const [parentFullHeight, setParentFullHeight] = useState(false);
    const [nestedFullHeight, setNestedFullHeight] = useState(false);
    const [enableAsideLeft, setEnableAsideLeft] = useState(false);
    const [enableAsideRight, setEnableAsideRight] = useState(true);
    const [enableHeader, setEnableHeader] = useState(false);
    const [enableFooter, setEnableFooter] = useState(false);
    const [enableNested, setEnableNested] = useState(false);

    const title = "Demo layout"
    const breadcrumbItems = [
        { label: "Home", href: "" },
        { label: "Demo", href: "" },
        { label: "Layout", href: "" },
    ];
    
    return (
        <ColumnLayout asidePosition="right">
            <ColumnLayoutMain>
                <ColumnLayoutHeader>
                    <ContentItem item={{
                        content: <>
                            <Title>{title}</Title>

                            {breadcrumbItems.length > 0 ?
                                <Breadcrumb items={breadcrumbItems} />
                                : null}
                        </>
                    }} />
                </ColumnLayoutHeader>
                <ColumnLayoutContent>
                    <p className="p20001">Main content goes here...</p>

                     <Fieldset legend="Options" borderColor={ColorDefinitions.Surface} fieldsetCss="mb-3">
                        <Button onClick={() => setParentFullHeight(!parentFullHeight)}>{parentFullHeight === false ? "Enable" : "Disible"} parent fullheight</Button>
                        <Button onClick={() => setNestedFullHeight(!nestedFullHeight)}>{nestedFullHeight === false ? "Enable" : "Disible"} nested fullheight</Button>
                        <Button onClick={() => setEnableNested(!enableNested)}>{enableNested === false ? "Enable" : "Disible"} nested content</Button>
                        <Button onClick={() => setEnableHeader(!enableHeader)}>{enableHeader === false ? "Enable" : "Disible"} parent header</Button>
                        <Button onClick={() => setEnableFooter(!enableFooter)}>{enableFooter === false ? "Enable" : "Disible"} parent footer</Button>
                        <Button onClick={() => setEnableAsideLeft(!enableAsideLeft)}>{enableAsideLeft === false ? "Enable" : "Disible"} aside left</Button>
                        <Button onClick={() => setEnableAsideRight(!enableAsideRight)}>{enableAsideRight === false ? "Enable" : "Disible"} aside right</Button>
                    </Fieldset>


                     <div className={`pc-layout ${parentFullHeight ? 'pc-layout--full-height' : ''} `}>
                        {enableHeader && (
                            <header className="pc-layout__header bg-olive">
                                Header
                            </header>
                        )}

                        <div className="pc-layout__content">
                            {enableAsideLeft && (
                                <div className="pc-layout__aside pc-layout__aside--left shown bg-orange">
                                    <p>Aside</p>
                                    <p className="p2000">Long content</p>
                                </div>
                            )}

                            <div className="pc-layout__main bg-blue-10">

                                {enableNested ? (
                                    <div className={`pc-layout ${nestedFullHeight ? 'pc-layout--full-height' : ''} `}>
                                        <header className="pc-layout__header bg-blue">
                                            Header
                                        </header>
                                        <div className="pc-layout__content bg-red">
                                            <p className="p2000">Lange content...</p>
                                        </div>
                                        <footer className="pc-layout__footer bg-blue">
                                            Footer
                                        </footer>
                                    </div>
                                )
                                    : (
                                        <div className="p2000">Long content</div>
                                    )
                                }

                            </div>

                            {enableAsideRight && (
                                <div className="pc-layout__aside pc-layout__aside--right shown bg-orange">
                                    <p>Aside R</p>
                                    <p className="p2000">Long content</p>
                                </div>
                            )}
                        </div>

                        {enableFooter && (
                            <footer className="pc-layout__footer bg-olive">
                                Footer
                            </footer>
                        )}
                    </div>

                </ColumnLayoutContent>
            </ColumnLayoutMain>
          <ColumnLayoutAside>
                <ColumnLayoutHeader>Aside header</ColumnLayoutHeader>
                <ColumnLayoutContent>
                    <p className="p2000">Aside content goes here...</p>
                </ColumnLayoutContent>
            </ColumnLayoutAside>

        </ColumnLayout>
    )
};
export const ToggleMainFromAside: StoryFn = () => {

    const [isShown, setIsShown] = useState(false);

    return (
        <ColumnLayout
            primaryViewOnMobile="aside"
            asidePosition="right"
            enableBurger={false}
            isShown={isShown}
            onShownChange={setIsShown}
        >
            <ColumnLayoutMain>
                <ColumnLayoutHeader>Main header</ColumnLayoutHeader>
                <ColumnLayoutContent>
                    <p>Main content</p>
                </ColumnLayoutContent>
            </ColumnLayoutMain>
            <ColumnLayoutAside>
                <ColumnLayoutHeader>Aside header</ColumnLayoutHeader>
                <ColumnLayoutContent>
                    <p>Aside content</p>
                    <br />
                    <Button color={ColorDefinitions.Primary} onClick={() => setIsShown(true)}>Resize me to mobile size and click me to see the magic happen</Button>
                </ColumnLayoutContent>
            </ColumnLayoutAside>
        </ColumnLayout>
    );
};

export const TabsHeader: StoryFn = () => {

    const [selectedTab, setSelectedTab] = useState(0);

    return (
        <ColumnLayout>
            <ColumnLayoutMain>
                <ColumnLayoutHeader>
                    <ContentItem item={
                        {
                            id: '1',
                            prefix: (

                                <div className="flex-column">
                                    <div className="title  ">Bulkupload</div>
                                    <nav aria-label="breadcrumb">
                                        <ul className="breadcrumb">
                                            <li className="breadcrumb__item"><a aria-label="Home" href="/suite-dossier" data-discover="true">Home</a></li>
                                            <li aria-label="Bulkupload" className="breadcrumb__item active">Bulkupload</li>
                                        </ul>
                                    </nav>
                                </div>
                            ),
                            separatorAfterPrefix: true,
                            content: (

                                <Tabs placement="bottom"
                                    borderBottomColor={ColorDefinitions.None}
                                    tabs={[
                                        { index: 0, label: "Tab 1" },
                                        { index: 1, label: "Tab 2" },
                                    ]}
                                    selectedTab={selectedTab}
                                    onClick={setSelectedTab}
                                />


                            ),
                            postfix: (
                                <button type="button" className="btn btn--shadow btn-primary">Opslaan</button>
                            )
                        }
                    } />
                </ColumnLayoutHeader>
                <ColumnLayoutContent>
                    <TabPanes selectedTab={selectedTab}>
                        <TabPane>
                            <p>Tab 1 content goes here</p>
                            <p>
                                Lorem ipsum dolor sit amet. Et laudantium molestiae vel aspernatur
                                ipsum non voluptatum fuga ex repellat quas est vitae aliquid est
                                quisquam doloribus? Est praesentium nisi aut quas deserunt ut natus
                                illo ut nisi inventore ea ratione doloribus non ratione omnis. Ut
                                eaque soluta et velit blanditiis sit possimus aperiam ut blanditiis
                                fuga et officiis sunt. Eum officiis nihil est quae facere qui
                                consequatur debitis aut tenetur consequatur qui velit rerum non
                                quaerat repellendus hic laboriosam error. Est illum voluptatum vel
                                perferendis provident ut perferendis tempore est dolores quae ut
                                sint velit qui labore ipsa sit voluptate aperiam. Vel deserunt
                                voluptate non dolore odio qui quis galisum aut neque sequi et
                                internos beatae 33 ipsum quia. Et alias facilis et molestiae dolore
                                aut aperiam veniam et nostrum labore aut quod sint aut accusantium
                                nostrum id sint enim. In quia animi hic autem enim et voluptates
                                blanditiis et minus officiis et maiores perferendis et eius sunt non
                                fugiat voluptas. Eos ducimus nisi et velit tenetur et commodi rerum
                                et galisum voluptate eos aliquid placeat non laborum nesciunt qui
                                omnis doloremque. Id consectetur omnis qui internos consequuntur sit
                                fugit quas sed doloribus earum qui voluptas nostrum non dolorem
                                tenetur At dicta officia. In nemo deserunt et molestiae quidem id
                                dolorum ratione aut corrupti obcaecati non animi enim sit unde
                                aspernatur! Qui ratione molestiae rem nisi vero eos excepturi nihil
                                ea rerum tempora eum beatae omnis rem deleniti esse eos rerum
                                placeat. Ab inventore aliquam est minima nihil non delectus optio ut
                                nostrum consequatur ut numquam itaque ex consequatur deleniti ut
                                nemo rerum. Et quia unde et voluptates porro ut voluptates
                                obcaecati. Et nihil maiores ut totam doloribus et cumque voluptatem
                                a voluptate nihil et beatae dolores eos autem galisum. Et quod nihil
                                ut tempora quia sit fugiat vitae sit dolor eveniet. Ea rerum quia
                                cum voluptates enim sed debitis fugiat eum tempora harum et dolores
                                commodi id recusandae autem. Qui quibusdam magnam ut quisquam minus
                                ea unde quia ut dicta possimus qui inventore saepe. Et eveniet
                                perspiciatis sed dolor fuga sed dolorem quia! Sed maxime explicabo
                                vel expedita magni eum vitae nemo sed facere voluptatem. Et nostrum
                                sint est voluptatem voluptate cum commodi voluptatem eos molestiae
                                explicabo. Et galisum ullam qui autem veniam ut quam officiis. Et
                                blanditiis praesentium et nemo eligendi sit unde voluptatum ex
                                veritatis quia ut voluptates sint est autem maiores hic neque
                                fugiat. Hic fugit mollitia est tempora aliquid ut tempore
                                perferendis. Sed delectus reprehenderit ad culpa animi et dolorem
                                velit qui adipisci numquam sed quibusdam iste et esse reprehenderit
                                eos accusantium eligendi. Lorem ipsum dolor sit amet. Et laudantium
                                molestiae vel aspernatur ipsum non voluptatum fuga ex repellat quas
                                est vitae aliquid est quisquam doloribus? Est praesentium nisi aut
                                quas deserunt ut natus illo ut nisi inventore ea ratione doloribus
                                non ratione omnis. Ut eaque soluta et velit blanditiis sit possimus
                                aperiam ut blanditiis fuga et officiis sunt. Eum officiis nihil est
                                quae facere qui consequatur debitis aut tenetur consequatur qui
                                velit rerum non quaerat repellendus hic laboriosam error. Est illum
                                voluptatum vel perferendis provident ut perferendis tempore est
                                dolores quae ut sint velit qui labore ipsa sit voluptate aperiam.
                                Vel deserunt voluptate non dolore odio qui quis galisum aut neque
                                sequi et internos beatae 33 ipsum quia. Et alias facilis et
                                molestiae dolore aut aperiam veniam et nostrum labore aut quod sint
                                aut accusantium nostrum id sint enim. In quia animi hic autem enim
                                et voluptates blanditiis et minus officiis et maiores perferendis et
                                eius sunt non fugiat voluptas. Eos ducimus nisi et velit tenetur et
                                commodi rerum et galisum voluptate eos aliquid placeat non laborum
                                nesciunt qui omnis doloremque. Id consectetur omnis qui internos
                                consequuntur sit fugit quas sed doloribus earum qui voluptas nostrum
                                non dolorem tenetur At dicta officia. In nemo deserunt et molestiae
                                quidem id dolorum ratione aut corrupti obcaecati non animi enim sit
                                unde aspernatur! Qui ratione molestiae rem nisi vero eos excepturi
                                nihil ea rerum tempora eum beatae omnis rem deleniti esse eos rerum
                                placeat. Ab inventore aliquam est minima nihil non delectus optio ut
                                nostrum consequatur ut numquam itaque ex consequatur deleniti ut
                                nemo rerum. Et quia unde et voluptates porro ut voluptates
                                obcaecati. Et nihil maiores ut totam doloribus et cumque voluptatem
                                a voluptate nihil et beatae dolores eos autem galisum. Et quod nihil
                                ut tempora quia sit fugiat vitae sit dolor eveniet. Ea rerum quia
                                cum voluptates enim sed debitis fugiat eum tempora harum et dolores
                                commodi id recusandae autem. Qui quibusdam magnam ut quisquam minus
                                ea unde quia ut dicta possimus qui inventore saepe. Et eveniet
                                perspiciatis sed dolor fuga sed dolorem quia! Sed maxime explicabo
                                vel expedita magni eum vitae nemo sed facere voluptatem. Et nostrum
                                sint est voluptatem voluptate cum commodi voluptatem eos molestiae
                                explicabo. Et galisum ullam qui autem veniam ut quam officiis. Et
                                blanditiis praesentium et nemo eligendi sit unde voluptatum ex
                                veritatis quia ut voluptates sint est autem maiores hic neque
                                fugiat. Hic fugit mollitia est tempora aliquid ut tempore
                                perferendis. Sed delectus reprehenderit ad culpa animi et dolorem
                                velit qui adipisci numquam sed quibusdam iste et esse reprehenderit
                                eos accusantium eligendi. Lorem ipsum dolor sit amet. Et laudantium
                                molestiae vel aspernatur ipsum non voluptatum fuga ex repellat quas
                                est vitae aliquid est quisquam doloribus? Est praesentium nisi aut
                                quas deserunt ut natus illo ut nisi inventore ea ratione doloribus
                                non ratione omnis. Ut eaque soluta et velit blanditiis sit possimus
                                aperiam ut blanditiis fuga et officiis sunt. Eum officiis nihil est
                                quae facere qui consequatur debitis aut tenetur consequatur qui
                                velit rerum non quaerat repellendus hic laboriosam error. Est illum
                                voluptatum vel perferendis provident ut perferendis tempore est
                                dolores quae ut sint velit qui labore ipsa sit voluptate aperiam.
                                Vel deserunt voluptate non dolore odio qui quis galisum aut neque
                                sequi et internos beatae 33 ipsum quia. Et alias facilis et
                                molestiae dolore aut aperiam veniam et nostrum labore aut quod sint
                                aut accusantium nostrum id sint enim. In quia animi hic autem enim
                                et voluptates blanditiis et minus officiis et maiores perferendis et
                                eius sunt non fugiat voluptas. Eos ducimus nisi et velit tenetur et
                                commodi rerum et galisum voluptate eos aliquid placeat non laborum
                                nesciunt qui omnis doloremque. Id consectetur omnis qui internos
                                consequuntur sit fugit quas sed doloribus earum qui voluptas nostrum
                                non dolorem tenetur At dicta officia. In nemo deserunt et molestiae
                                quidem id dolorum ratione aut corrupti obcaecati non animi enim sit
                                unde aspernatur! Qui ratione molestiae rem nisi vero eos excepturi
                                nihil ea rerum tempora eum beatae omnis rem deleniti esse eos rerum
                                placeat. Ab inventore aliquam est minima nihil non delectus optio ut
                                nostrum consequatur ut numquam itaque ex consequatur deleniti ut
                                nemo rerum. Et quia unde et voluptates porro ut voluptates
                                obcaecati. Et nihil maiores ut totam doloribus et cumque voluptatem
                                a voluptate nihil et beatae dolores eos autem galisum. Et quod nihil
                                ut tempora quia sit fugiat vitae sit dolor eveniet. Ea rerum quia
                                cum voluptates enim sed debitis fugiat eum tempora harum et dolores
                                commodi id recusandae autem. Qui quibusdam magnam ut quisquam minus
                                ea unde quia ut dicta possimus qui inventore saepe. Et eveniet
                                perspiciatis sed dolor fuga sed dolorem quia! Sed maxime explicabo
                                vel expedita magni eum vitae nemo sed facere voluptatem. Et nostrum
                                sint est voluptatem voluptate cum commodi voluptatem eos molestiae
                                explicabo. Et galisum ullam qui autem veniam ut quam officiis. Et
                                blanditiis praesentium et nemo eligendi sit unde voluptatum ex
                                veritatis quia ut voluptates sint est autem maiores hic neque
                                fugiat. Hic fugit mollitia est tempora aliquid ut tempore
                                perferendis. Sed delectus reprehenderit ad culpa animi et dolorem
                                velit qui adipisci numquam sed quibusdam iste et esse reprehenderit
                                eos accusantium eligendi. Lorem ipsum dolor sit amet. Et laudantium
                                molestiae vel aspernatur ipsum non voluptatum fuga ex repellat quas
                                est vitae aliquid est quisquam doloribus? Est praesentium nisi aut
                                quas deserunt ut natus illo ut nisi inventore ea ratione doloribus
                                non ratione omnis. Ut eaque soluta et velit blanditiis sit possimus
                                aperiam ut blanditiis fuga et officiis sunt. Eum officiis nihil est
                                quae facere qui consequatur debitis aut tenetur consequatur qui
                                velit rerum non quaerat repellendus hic laboriosam error. Est illum
                                voluptatum vel perferendis provident ut perferendis tempore est
                                dolores quae ut sint velit qui labore ipsa sit voluptate aperiam.
                                Vel deserunt voluptate non dolore odio qui quis galisum aut neque
                                sequi et internos beatae 33 ipsum quia. Et alias facilis et
                                molestiae dolore aut aperiam veniam et nostrum labore aut quod sint
                                aut accusantium nostrum id sint enim. In quia animi hic autem enim
                                et voluptates blanditiis et minus officiis et maiores perferendis et
                                eius sunt non fugiat voluptas. Eos ducimus nisi et velit tenetur et
                                commodi rerum et galisum voluptate eos aliquid placeat non laborum
                                nesciunt qui omnis doloremque. Id consectetur omnis qui internos
                                consequuntur sit fugit quas sed doloribus earum qui voluptas nostrum
                                non dolorem tenetur At dicta officia. In nemo deserunt et molestiae
                                quidem id dolorum ratione aut corrupti obcaecati non animi enim sit
                                unde aspernatur! Qui ratione molestiae rem nisi vero eos excepturi
                                nihil ea rerum tempora eum beatae omnis rem deleniti esse eos rerum
                                placeat. Ab inventore aliquam est minima nihil non delectus optio ut
                                nostrum consequatur ut numquam itaque ex consequatur deleniti ut
                                nemo rerum. Et quia unde et voluptates porro ut voluptates
                                obcaecati. Et nihil maiores ut totam doloribus et cumque voluptatem
                                a voluptate nihil et beatae dolores eos autem galisum. Et quod nihil
                                ut tempora quia sit fugiat vitae sit dolor eveniet. Ea rerum quia
                                cum voluptates enim sed debitis fugiat eum tempora harum et dolores
                                commodi id recusandae autem. Qui quibusdam magnam ut quisquam minus
                                ea unde quia ut dicta possimus qui inventore saepe. Et eveniet
                                perspiciatis sed dolor fuga sed dolorem quia! Sed maxime explicabo
                                vel expedita magni eum vitae nemo sed facere voluptatem. Et nostrum
                                sint est voluptatem voluptate cum commodi voluptatem eos molestiae
                                explicabo. Et galisum ullam qui autem veniam ut quam officiis. Et
                                blanditiis praesentium et nemo eligendi sit unde voluptatum ex
                                veritatis quia ut voluptates sint est autem maiores hic neque
                                fugiat. Hic fugit mollitia est tempora aliquid ut tempore
                                perferendis. Sed delectus reprehenderit ad culpa animi et dolorem
                                velit qui adipisci numquam sed quibusdam iste et esse reprehenderit
                                eos accusantium eligendi.
                            </p>
                        </TabPane>
                        <TabPane>
                            <p>Tab 2 content goes here</p>
                               <div className={`pc-layout pc-layout--full-height`}>
                        
                            <header className="pc-layout__header bg-olive">
                                Header
                            </header>
                       

                        <div className="pc-layout__content">
                           
                                <div className="pc-layout__aside pc-layout__aside--left shown bg-orange">
                                    <p>Aside</p>
                                    <p className="p2000">Long content</p>
                                </div>
                         

                            <div className="pc-layout__main bg-blue-10">

                               
                                        <div className="p2000">Long content</div>
                                  
                            </div>

                           
                                <div className="pc-layout__aside pc-layout__aside--right shown bg-orange">
                                    <p>Aside R</p>
                                    <p className="p2000">Long content</p>
                                </div>
                          
                        </div>

                            <footer className="pc-layout__footer bg-olive">
                                Footer
                            </footer>
                     
                    </div>
                        </TabPane>
                    </TabPanes>
                </ColumnLayoutContent>
            </ColumnLayoutMain>
        </ColumnLayout>
    );
};

export const MobilePrimaryViewMain: StoryFn = () => {
    return (
        <ColumnLayout primaryViewOnMobile="main">
            <ColumnLayoutMain>
                <ColumnLayoutHeader>
                    Main header
                </ColumnLayoutHeader>
                <ColumnLayoutContent>
                    <p>Main content goes here...</p>
                </ColumnLayoutContent>
            </ColumnLayoutMain>
            <ColumnLayoutAside>
                <ColumnLayoutHeader>Aside header</ColumnLayoutHeader>
                <ColumnLayoutContent>
                    <p>Aside content goes here...</p>
                </ColumnLayoutContent>
            </ColumnLayoutAside>
        </ColumnLayout>

    );
};

export const MobilePrimaryViewAside: StoryFn = () => {
    return (
        <ColumnLayout primaryViewOnMobile="aside">
            <ColumnLayoutMain>
                <ColumnLayoutHeader>
                    Main header
                </ColumnLayoutHeader>
                <ColumnLayoutContent>
                    <p>Main content goes here...</p>
                </ColumnLayoutContent>
            </ColumnLayoutMain>
            <ColumnLayoutAside>
                <ColumnLayoutHeader>Aside header</ColumnLayoutHeader>
                <ColumnLayoutContent>
                    <p>Aside content goes here...</p>
                </ColumnLayoutContent>
            </ColumnLayoutAside>
        </ColumnLayout>

    );
};

export const MainOnlyNoHeader: StoryFn = () => {

    return (
        <ColumnLayout>
            <ColumnLayoutMain>
                <ColumnLayoutContent>
                    <p>Main content goes here...</p>
                </ColumnLayoutContent>
            </ColumnLayoutMain>
        </ColumnLayout>
    );
};

export const MainOnly: StoryFn = () => {

    return (
        <ColumnLayout>
            <ColumnLayoutMain>
                <ColumnLayoutHeader>
                    Main header
                </ColumnLayoutHeader>
                <ColumnLayoutContent>
                    <p>Main content goes here...</p>
                </ColumnLayoutContent>
            </ColumnLayoutMain>
        </ColumnLayout>
    );
};

export const MainAndAsideNoHeader: StoryFn = () => {

    return (
        <ColumnLayout>
            <ColumnLayoutMain>
                <ColumnLayoutContent>
                    <p>Main content goes here...</p>
                </ColumnLayoutContent>
            </ColumnLayoutMain>
            <ColumnLayoutAside>
                <ColumnLayoutContent>
                    <p>Aside content goes here...</p>
                </ColumnLayoutContent>
            </ColumnLayoutAside>
        </ColumnLayout>
    );
};


export const MainAndAsideMainNoHeader: StoryFn = () => {
    return (
        <ColumnLayout>
            <ColumnLayoutMain>
                <ColumnLayoutContent>
                    <p>Main content goes here...</p>
                </ColumnLayoutContent>
            </ColumnLayoutMain>
            <ColumnLayoutAside>
                <ColumnLayoutHeader>Aside header</ColumnLayoutHeader>
                <ColumnLayoutContent>
                    <p>Aside content goes here...</p>
                </ColumnLayoutContent>
            </ColumnLayoutAside>
        </ColumnLayout>
    );
};

export const MainAndAsideAsideNoHeader: StoryFn = () => {
    return (
        <ColumnLayout>
            <ColumnLayoutMain>
                <ColumnLayoutHeader>Main header</ColumnLayoutHeader>
                <ColumnLayoutContent>
                    <p>Main content goes here...</p>
                </ColumnLayoutContent>
            </ColumnLayoutMain>
            <ColumnLayoutAside>
                <ColumnLayoutContent>
                    <p>Aside content goes here...</p>
                </ColumnLayoutContent>
            </ColumnLayoutAside>
        </ColumnLayout>
    );
};

export const AsideLeft: StoryFn = () => {
    return (
        <ColumnLayout asidePosition="left">
            <ColumnLayoutMain>
                <ColumnLayoutHeader>
                    Main header
                </ColumnLayoutHeader>
                <ColumnLayoutContent>
                    <p>Main content goes here...</p>
                </ColumnLayoutContent>
            </ColumnLayoutMain>
            <ColumnLayoutAside>
                <ColumnLayoutHeader>Aside header</ColumnLayoutHeader>
                <ColumnLayoutContent>
                    <p>Aside content goes here...</p>
                </ColumnLayoutContent>
            </ColumnLayoutAside>
        </ColumnLayout>
    );
};

export const AsideRight: StoryFn = () => {

    return (
        <ColumnLayout asidePosition="right">
            <ColumnLayoutMain>
                <ColumnLayoutHeader>
                    Main header
                </ColumnLayoutHeader>
                <ColumnLayoutContent>
                    <p>Main content goes here...</p>
                </ColumnLayoutContent>
            </ColumnLayoutMain>
            <ColumnLayoutAside>
                <ColumnLayoutHeader>Aside header</ColumnLayoutHeader>
                <ColumnLayoutContent>
                    <p>Aside content goes here...</p>
                </ColumnLayoutContent>
            </ColumnLayoutAside>
        </ColumnLayout>
    );
};
