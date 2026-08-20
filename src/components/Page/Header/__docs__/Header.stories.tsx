import type { Meta, StoryFn, StoryObj } from '@storybook/react-webpack5';
import React, { useState } from 'react';
import { LayoutProvider } from '../../../Providers/LayoutContext/LayoutContext';
import Header from '../Header';
import { MemoryRouter } from 'react-router';

const meta: Meta<typeof Header> = {
    title: 'Page/Header',
    component: Header,
    parameters: {
        layout: 'fullscreen',
    },
    decorators: [
        (Story) => (
            <MemoryRouter>
                <LayoutProvider>
                    <Story />
                </LayoutProvider>
            </MemoryRouter>

        ),
    ],
};

export default meta;
type Story = StoryObj<typeof Header>;

export const Default: StoryFn = () => {
    const [shownOnMobile, setShownOnMobile] = useState<boolean>(true);

    return (
        <div className="page">
            <Header
                title="Header Title"
                hasSidebars={true}
                mobileSidebarsShown={shownOnMobile}
                setSidebarsMobileShown={setShownOnMobile}
                breadcrumbItems={[
                    {
                        label: 'Home',
                        href: '/',
                    },
                    {
                        label: 'Section',
                        href: '/section',
                    },
                ]}
            />

            <div className="page__container">
                <div className="page__content">
                    <h3>Title</h3>
                    <p>
                        Lorem ipsum dolor sit amet. Sit molestias vero aut aliquid itaque ab quia dolores ut expedita
                        odio? Quo pariatur eligendi rem molestiae nihil aut dolor consequatur qui mollitia officiis eum
                        natus tenetur. Non ducimus dignissimos et voluptatem accusamus et harum assumenda. Est delectus
                        fuga qui voluptatum aspernatur At dolore doloremque et assumenda aspernatur! A quia incidunt aut
                        nulla unde in neque recusandae eum consequuntur deserunt est natus inventore! 33 eius aperiam et
                        officiis consequatur id quisquam laudantium ut molestias ullam. Quo dignissimos eligendi qui
                        dolorem laborum quo libero reiciendis eum autem consectetur. Sed voluptatem ipsam ex velit vero
                        aut quia excepturi et sunt esse.{' '}
                    </p>
                </div>
            </div>
        </div>
    );
};

export const NoSidebars: StoryFn = () => {
    const [shownOnMobile, setShownOnMobile] = useState<boolean>(false);

    return (
        <div className="page">
            <Header
                title="Header Title"
                hasSidebars={false}
                mobileSidebarsShown={shownOnMobile}
                setSidebarsMobileShown={setShownOnMobile}
            />

            <div className="page__container">
                <div className="page__content">
                    <h3>Title</h3>
                    <p>
                        Lorem ipsum dolor sit amet. Sit molestias vero aut aliquid itaque ab quia dolores ut expedita
                        odio? Quo pariatur eligendi rem molestiae nihil aut dolor consequatur qui mollitia officiis eum
                        natus tenetur. Non ducimus dignissimos et voluptatem accusamus et harum assumenda. Est delectus
                        fuga qui voluptatum aspernatur At dolore doloremque et assumenda aspernatur! A quia incidunt aut
                        nulla unde in neque recusandae eum consequuntur deserunt est natus inventore! 33 eius aperiam et
                        officiis consequatur id quisquam laudantium ut molestias ullam. Quo dignissimos eligendi qui
                        dolorem laborum quo libero reiciendis eum autem consectetur. Sed voluptatem ipsam ex velit vero
                        aut quia excepturi et sunt esse.{' '}
                    </p>
                </div>
            </div>
        </div>
    );
};

export const WithTitle: StoryFn = () => {
    const [shownOnMobile, setShownOnMobile] = useState<boolean>(true);

    return (
        <div className="page">
            <Header
                title="Header Title"
                hasSidebars={true}
                mobileSidebarsShown={shownOnMobile}
                setSidebarsMobileShown={setShownOnMobile}
            />

            <div className="page__container">
                <div className="page__content">
                    <h3>Title</h3>
                    <p>
                        Lorem ipsum dolor sit amet. Sit molestias vero aut aliquid itaque ab quia dolores ut expedita
                        odio? Quo pariatur eligendi rem molestiae nihil aut dolor consequatur qui mollitia officiis eum
                        natus tenetur. Non ducimus dignissimos et voluptatem accusamus et harum assumenda. Est delectus
                        fuga qui voluptatum aspernatur At dolore doloremque et assumenda aspernatur! A quia incidunt aut
                        nulla unde in neque recusandae eum consequuntur deserunt est natus inventore! 33 eius aperiam et
                        officiis consequatur id quisquam laudantium ut molestias ullam. Quo dignissimos eligendi qui
                        dolorem laborum quo libero reiciendis eum autem consectetur. Sed voluptatem ipsam ex velit vero
                        aut quia excepturi et sunt esse.{' '}
                    </p>
                </div>
            </div>
        </div>
    );
};

export const WithBreadcrumbItems: StoryFn = () => {
    const [shownOnMobile, setShownOnMobile] = useState<boolean>(true);

    return (
        <div className="page has-sidebars">
            <Header
                hasSidebars={true}
                mobileSidebarsShown={shownOnMobile}
                setSidebarsMobileShown={setShownOnMobile}
                title="Header Title"
                breadcrumbItems={[
                    {
                        label: 'Home',
                        href: '/',
                    },
                    {
                        label: 'Section',
                        href: '/section',
                    },
                ]}
            />
            <div className="page__container">
                <div className="page__content">
                    <div className="content">Content goes here...</div>
                </div>
            </div>
        </div>
    );
};

export const OnScroll: StoryFn = () => {
    const [shownOnMobile, setShownOnMobile] = useState<boolean>(true);

    return (
        <div className="page has-sidebars">
            <Header
                title="Header Title"
                hasSidebars={true}
                mobileSidebarsShown={shownOnMobile}
                setSidebarsMobileShown={setShownOnMobile}
                breadcrumbItems={[
                    {
                        label: 'Home',
                        href: '/',
                    },
                    {
                        label: 'Section',
                        href: '/section',
                    },
                ]}
            />

            <div className="page__container">
                <div className="page__content">
                    <h3>Title</h3>
                    <p>
                        Lorem ipsum dolor sit amet. Sit molestias vero aut aliquid itaque ab quia dolores ut expedita
                        odio? Quo pariatur eligendi rem molestiae nihil aut dolor consequatur qui mollitia officiis eum
                        natus tenetur. Non ducimus dignissimos et voluptatem accusamus et harum assumenda. Est delectus
                        fuga qui voluptatum aspernatur At dolore doloremque et assumenda aspernatur! A quia incidunt aut
                        nulla unde in neque recusandae eum consequuntur deserunt est natus inventore! 33 eius aperiam et
                        officiis consequatur id quisquam laudantium ut molestias ullam. Quo dignissimos eligendi qui
                        dolorem laborum quo libero reiciendis eum autem consectetur. Sed voluptatem ipsam ex velit vero
                        aut quia excepturi et sunt esse.{' '}
                    </p>
                    <p>
                        In reiciendis ratione quo expedita quae ex omnis aliquid est nesciunt dolorem eum repellendus
                        atque! Ut corrupti delectus sed obcaecati repudiandae et eius totam. Sit quisquam autem et
                        pariatur possimus eos cumque praesentium et vitae ipsa est eligendi iusto. Et doloribus numquam
                        ex provident quas aut autem voluptatibus eum asperiores suscipit aut vero maxime qui minima
                        ullam vel temporibus quibusdam. Cum molestias voluptatibus in voluptate temporibus ut aperiam
                        voluptatem est odio voluptatum. Qui repellat internos ut eveniet numquam eos animi internos. Ex
                        voluptatum voluptatem quo enim cupiditate ex eaque Quis est officiis commodi non soluta numquam?
                        Ab ratione doloremque non voluptas sequi ut architecto aperiam et repellendus quos. Eum dolorem
                        tempora in vero enim id provident omnis id recusandae veniam qui eligendi fugit ex explicabo
                        maiores. Id deleniti repellendus sed cupiditate distinctio eos velit consequatur qui consequatur
                        libero ea expedita vitae 33 consequuntur labore. Cum nisi explicabo aut error nihil qui
                        molestiae blanditiis hic eveniet exercitationem aut fuga omnis. Et ullam quia rem dolor quos et
                        vitae deserunt est galisum quibusdam aut totam modi et odit quia aut nesciunt atque. Sit quasi
                        obcaecati sed minima odit hic provident molestias a iure placeat? Eos reiciendis autem aut
                        voluptatem sequi et maxime consequuntur et quia explicabo est quisquam voluptas in eveniet quod
                        et eligendi libero.{' '}
                    </p>
                    <p>
                        Sed velit itaque non neque consequatur et dolorem maiores id culpa commodi qui labore inventore.
                        Non quia aperiam et vero tenetur vel nobis nesciunt est error voluptatem et molestiae
                        accusantium qui voluptas voluptatibus. Qui voluptate architecto ut voluptatem maxime eum quidem
                        impedit et possimus ducimus vel officia deleniti. Sit labore totam 33 ipsam tempora 33 enim
                        ullam sed aliquid repellendus in voluptas placeat aut modi consequatur sed perspiciatis optio.
                        Eum eligendi voluptates in fuga sunt qui maxime soluta sit laudantium porro ut animi praesentium
                        non modi ducimus? At cupiditate quia ut tempore reprehenderit qui iusto quibusdam qui quas
                        voluptatibus aut cumque possimus ab tempora quia ut quia illo. Quo labore autem et iste numquam
                        est nobis illo. Sit fuga voluptas sed dolorem rerum eum aperiam odio est quia quibusdam ut harum
                        sunt aut dolore consequuntur sed iste vero! Vel provident dolorum eos sunt veritatis et
                        quibusdam aliquid. Eos earum voluptates ea animi suscipit ut consequatur dolorum ut vero
                        distinctio eos voluptatibus minus. Rem aliquid soluta ut placeat nihil ut illo commodi et
                        officiis dolore qui sunt impedit hic nisi laudantium et dolorum explicabo. In fugiat nobis et
                        nesciunt accusamus qui numquam error eos rerum nihil et soluta error et dolor veritatis. Ut
                        provident minus eum labore accusamus qui nihil earum et fugit minima eos ducimus galisum aut
                        cupiditate iure? Cum sequi officia et sapiente mollitia aut dolor quasi?{' '}
                    </p>
                    <p>
                        33 totam animi in quibusdam quia non animi praesentium. Qui voluptatem Quis et ducimus maxime ut
                        modi consequatur sed maxime incidunt et maiores quibusdam sed dolorem impedit sit porro
                        sapiente? Eos consequatur quis eos saepe autem a inventore atque id molestiae odit qui
                        voluptatem dolor aut sequi blanditiis sit alias consequuntur? 33 error tenetur vel consequatur
                        exercitationem eum sunt doloremque. Sit modi deleniti ut fugit iusto non possimus expedita aut
                        provident possimus in optio iste. Aut repellat provident aut omnis nihil ut similique
                        repudiandae non libero saepe. Eum voluptatem exercitationem aut repudiandae dolores aut
                        perspiciatis internos et quasi assumenda. Aut perferendis nihil cum molestiae fuga et obcaecati
                        dolorem qui laudantium similique. Sit temporibus quam hic odio sapiente qui necessitatibus
                        nesciunt et eveniet amet non suscipit omnis sed voluptatibus magnam. Qui similique maxime est
                        provident asperiores et ipsam quidem. Non voluptatem dolor et internos sint est fugiat
                        quam.{' '}
                    </p>
                    <p>
                        Sit eaque autem est aliquam reiciendis qui ipsa quasi ea sint commodi est impedit fuga. Et quae
                        sint aut quibusdam quos est animi blanditiis ut necessitatibus ipsa id quos cupiditate et sequi
                        tempora sit nihil corporis. Sit amet praesentium hic amet reprehenderit ea repellat galisum et
                        odit autem sit veritatis galisum et impedit praesentium. Quo sint magnam ut mollitia quaerat vel
                        deleniti repudiandae est sunt velit ut alias veritatis eum amet eligendi ut illum rerum. Ut
                        voluptates modi aut reprehenderit ipsum qui voluptas velit sit commodi velit est labore quidem
                        cum ipsam minus. In omnis amet et consequatur enim est deserunt omnis eum obcaecati galisum ut
                        aliquid Quis ea voluptas laudantium. Non alias nulla est distinctio nemo nam pariatur veritatis
                        et commodi commodi ad neque quaerat! Et magni voluptas vel exercitationem laudantium id nisi
                        cupiditate et architecto rerum est quas error vel maxime quia et excepturi quam.{' '}
                    </p>
                    <p>
                        Est nihil consequatur aut quisquam tempora sed dolorum aliquam et maiores quos. In nostrum
                        accusamus in culpa beatae eos dicta nobis eum consequuntur deserunt non veniam deserunt et
                        distinctio accusantium et iste galisum. Qui sequi neque cum sint omnis vel exercitationem
                        dolores hic quasi distinctio eos dolores unde. Non harum quam sit esse velit est quam nisi non
                        laboriosam earum et magnam veritatis aut odit sint qui aliquid laudantium! Nam quia
                        reprehenderit est ratione galisum ut voluptate temporibus et voluptatum quas. Ad necessitatibus
                        quia vel culpa recusandae est molestiae velit quo nihil fugiat. Et molestiae praesentium sit
                        veritatis deleniti et eaque natus est dicta molestiae aut laboriosam doloribus ea voluptatibus
                        omnis id corrupti neque. Rem dolor ipsum sed pariatur magnam id necessitatibus molestiae ad
                        natus mollitia 33 quod delectus ex quasi error in iure expedita. Qui itaque rerum est
                        consequuntur iusto qui velit dolorem sit recusandae tenetur nam molestiae dolorum eos sint
                        blanditiis ex quaerat corporis. Sit quis vitae hic laboriosam Quis ea eius quae et veniam
                        internos et magnam blanditiis ut assumenda explicabo. Aut voluptas adipisci et eius natus qui
                        nobis Quis eum assumenda excepturi ut fugit ducimus et iste alias. Aut debitis nemo et nihil
                        repudiandae in omnis nemo non labore labore? Qui fuga esse cum aliquam consequatur est natus
                        exercitationem ut esse corrupti. Id aperiam dicta in enim enim sed omnis doloremque.{' '}
                    </p>
                    <p>
                        Sit maxime voluptate qui accusantium eaque At consequatur mollitia qui iste voluptatum qui nobis
                        provident hic illum recusandae. Et magnam incidunt et minus cupiditate aut doloremque dolorem
                        non sunt nostrum eos sunt sunt? Sit quia accusamus sed eaque ipsa ut sequi alias et perspiciatis
                        dolorem sed voluptatibus ipsa et eveniet exercitationem. A quibusdam autem eos corporis dolor
                        qui soluta tenetur eum blanditiis incidunt et nemo impedit et fuga quos. Sed alias rerum aut
                        sint voluptate ea corrupti saepe sit minima soluta et odio aliquam est officiis omnis eos quis
                        veniam? Est impedit commodi et culpa enim aut repellat quia. Hic asperiores minima et
                        consequatur voluptas aut molestias vitae quo galisum quisquam aut ducimus dignissimos ex quae
                        excepturi. Et blanditiis vero aut eligendi porro eum quod illo rem ipsam unde non nihil sunt aut
                        quia veritatis! Qui enim voluptatum et numquam reiciendis aut fugiat illum et delectus
                        voluptatem est inventore voluptas! Est voluptatem placeat est recusandae sint ea veniam corrupti
                        sed quia repellendus. Nam deleniti quia id dolorem sunt ea harum error sit recusandae error ut
                        culpa ullam aut illo amet eum repudiandae tempora.{' '}
                    </p>
                    <p>
                        Est sint laudantium qui Quis voluptatum est consectetur quisquam in esse galisum sit iusto
                        aliquid. Non officia delectus ut facilis animi qui nihil adipisci qui quibusdam omnis ut
                        perspiciatis ipsa sed similique delectus eos nisi velit. At repellendus voluptates non ullam
                        odit est vero rerum aut tempora alias est corporis earum. Sit blanditiis cupiditate ab voluptate
                        molestias ex officia cupiditate cum dolor nesciunt. Aut mollitia recusandae non quam saepe est
                        officia repudiandae et voluptatem amet? Ut asperiores nobis qui aliquam repudiandae rem aliquid
                        mollitia ut accusantium necessitatibus. Et voluptates internos non rerum esse eos voluptas
                        voluptas eos atque placeat est adipisci sapiente non saepe obcaecati. Nam rerum inventore non
                        nisi odit qui quod commodi eos blanditiis saepe et odit pariatur hic optio voluptas. Aut numquam
                        dolorem eum sequi culpa cum perspiciatis quia qui consectetur numquam qui fugit veritatis est
                        illum velit. Ex autem quae ab omnis laboriosam cum voluptates autem aut molestiae magnam est
                        voluptas accusantium vel adipisci labore ut saepe reprehenderit? Est modi odit aut
                        necessitatibus sint qui recusandae modi et reprehenderit eius aut adipisci labore est impedit
                        debitis et rerum similique.{' '}
                    </p>
                </div>
            </div>
        </div>
    );
};
