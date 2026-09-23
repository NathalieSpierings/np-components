import React, { useEffect, useState } from "react";
import { ColumnLayout, ColumnLayoutContent, ColumnLayoutHeader, ColumnLayoutMain, ContentItem, TabPane, TabPanes, Tabs, useLayoutContext } from "../../../components";
import { ColorDefinitions } from "../../../lib/utils/definitions";

const WithTabs: React.FC = () => {
  const { setFullscreen } = useLayoutContext();
  const { setShowHeader } = useLayoutContext();

  useEffect(() => {
    setFullscreen(true);
    setShowHeader(false);
    return () => {
      setFullscreen(false);
      setShowHeader(true);
    };
  }, [setFullscreen, setShowHeader]);

  const [selectedTab, setSelectedTab] = useState(0);

  return (
    <ColumnLayout>
      <ColumnLayoutMain>
        <ColumnLayoutHeader enableFixedHeader>
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
                    { index: 0, label: "Rapportages" },
                    { index: 1, label: "Retourinformatie" },
                  ]}
                  selectedTab={selectedTab}
                  onClick={setSelectedTab}
                />


              ),
              postfix: (
                <button className="btn btn--shadow btn-primary">Opslaan<div className="sc-beySbL eFIXXy"></div>
                </button>
              )
            }
          } />
        </ColumnLayoutHeader>
        <ColumnLayoutContent>

          <TabPanes selectedTab={selectedTab}>
            <TabPane>
              <p>Rapportages content goes here</p>
              <p>
                Lorem ipsum dolor sit amet. Et laudantium molestiae vel aspernatur ipsum non voluptatum fuga ex repellat quas est vitae aliquid est quisquam doloribus? Est praesentium nisi aut quas deserunt ut natus illo ut nisi inventore ea ratione doloribus non ratione omnis.

                Ut eaque soluta et velit blanditiis sit possimus aperiam ut blanditiis fuga et officiis sunt. Eum officiis nihil est quae facere qui consequatur debitis aut tenetur consequatur qui velit rerum non quaerat repellendus hic laboriosam error.

                Est illum voluptatum vel perferendis provident ut perferendis tempore est dolores quae ut sint velit qui labore ipsa sit voluptate aperiam. Vel deserunt voluptate non dolore odio qui quis galisum aut neque sequi et internos beatae 33 ipsum quia.

                Et alias facilis et molestiae dolore aut aperiam veniam et nostrum labore aut quod sint aut accusantium nostrum id sint enim. In quia animi hic autem enim et voluptates blanditiis et minus officiis et maiores perferendis et eius sunt non fugiat voluptas.

                Eos ducimus nisi et velit tenetur et commodi rerum et galisum voluptate eos aliquid placeat non laborum nesciunt qui omnis doloremque. Id consectetur omnis qui internos consequuntur sit fugit quas sed doloribus earum qui voluptas nostrum non dolorem tenetur At dicta officia. In nemo deserunt et molestiae quidem id dolorum ratione aut corrupti obcaecati non animi enim sit unde aspernatur! Qui ratione molestiae rem nisi vero eos excepturi nihil ea rerum tempora eum beatae omnis rem deleniti esse eos rerum placeat.

                Ab inventore aliquam est minima nihil non delectus optio ut nostrum consequatur ut numquam itaque ex consequatur deleniti ut nemo rerum. Et quia unde et voluptates porro ut voluptates obcaecati. Et nihil maiores ut totam doloribus et cumque voluptatem a voluptate nihil et beatae dolores eos autem galisum.

                Et quod nihil ut tempora quia sit fugiat vitae sit dolor eveniet. Ea rerum quia cum voluptates enim sed debitis fugiat eum tempora harum et dolores commodi id recusandae autem. Qui quibusdam magnam ut quisquam minus ea unde quia ut dicta possimus qui inventore saepe. Et eveniet perspiciatis sed dolor fuga sed dolorem quia!

                Sed maxime explicabo vel expedita magni eum vitae nemo sed facere voluptatem. Et nostrum sint est voluptatem voluptate cum commodi voluptatem eos molestiae explicabo.

                Et galisum ullam qui autem veniam ut quam officiis. Et blanditiis praesentium et nemo eligendi sit unde voluptatum ex veritatis quia ut voluptates sint est autem maiores hic neque fugiat. Hic fugit mollitia est tempora aliquid ut tempore perferendis. Sed delectus reprehenderit ad culpa animi et dolorem velit qui adipisci numquam sed quibusdam iste et esse reprehenderit eos accusantium eligendi.


                Lorem ipsum dolor sit amet. Et laudantium molestiae vel aspernatur ipsum non voluptatum fuga ex repellat quas est vitae aliquid est quisquam doloribus? Est praesentium nisi aut quas deserunt ut natus illo ut nisi inventore ea ratione doloribus non ratione omnis.

                Ut eaque soluta et velit blanditiis sit possimus aperiam ut blanditiis fuga et officiis sunt. Eum officiis nihil est quae facere qui consequatur debitis aut tenetur consequatur qui velit rerum non quaerat repellendus hic laboriosam error.

                Est illum voluptatum vel perferendis provident ut perferendis tempore est dolores quae ut sint velit qui labore ipsa sit voluptate aperiam. Vel deserunt voluptate non dolore odio qui quis galisum aut neque sequi et internos beatae 33 ipsum quia.

                Et alias facilis et molestiae dolore aut aperiam veniam et nostrum labore aut quod sint aut accusantium nostrum id sint enim. In quia animi hic autem enim et voluptates blanditiis et minus officiis et maiores perferendis et eius sunt non fugiat voluptas.

                Eos ducimus nisi et velit tenetur et commodi rerum et galisum voluptate eos aliquid placeat non laborum nesciunt qui omnis doloremque. Id consectetur omnis qui internos consequuntur sit fugit quas sed doloribus earum qui voluptas nostrum non dolorem tenetur At dicta officia. In nemo deserunt et molestiae quidem id dolorum ratione aut corrupti obcaecati non animi enim sit unde aspernatur! Qui ratione molestiae rem nisi vero eos excepturi nihil ea rerum tempora eum beatae omnis rem deleniti esse eos rerum placeat.

                Ab inventore aliquam est minima nihil non delectus optio ut nostrum consequatur ut numquam itaque ex consequatur deleniti ut nemo rerum. Et quia unde et voluptates porro ut voluptates obcaecati. Et nihil maiores ut totam doloribus et cumque voluptatem a voluptate nihil et beatae dolores eos autem galisum.

                Et quod nihil ut tempora quia sit fugiat vitae sit dolor eveniet. Ea rerum quia cum voluptates enim sed debitis fugiat eum tempora harum et dolores commodi id recusandae autem. Qui quibusdam magnam ut quisquam minus ea unde quia ut dicta possimus qui inventore saepe. Et eveniet perspiciatis sed dolor fuga sed dolorem quia!

                Sed maxime explicabo vel expedita magni eum vitae nemo sed facere voluptatem. Et nostrum sint est voluptatem voluptate cum commodi voluptatem eos molestiae explicabo.

                Et galisum ullam qui autem veniam ut quam officiis. Et blanditiis praesentium et nemo eligendi sit unde voluptatum ex veritatis quia ut voluptates sint est autem maiores hic neque fugiat. Hic fugit mollitia est tempora aliquid ut tempore perferendis. Sed delectus reprehenderit ad culpa animi et dolorem velit qui adipisci numquam sed quibusdam iste et esse reprehenderit eos accusantium eligendi.


                Lorem ipsum dolor sit amet. Et laudantium molestiae vel aspernatur ipsum non voluptatum fuga ex repellat quas est vitae aliquid est quisquam doloribus? Est praesentium nisi aut quas deserunt ut natus illo ut nisi inventore ea ratione doloribus non ratione omnis.

                Ut eaque soluta et velit blanditiis sit possimus aperiam ut blanditiis fuga et officiis sunt. Eum officiis nihil est quae facere qui consequatur debitis aut tenetur consequatur qui velit rerum non quaerat repellendus hic laboriosam error.

                Est illum voluptatum vel perferendis provident ut perferendis tempore est dolores quae ut sint velit qui labore ipsa sit voluptate aperiam. Vel deserunt voluptate non dolore odio qui quis galisum aut neque sequi et internos beatae 33 ipsum quia.

                Et alias facilis et molestiae dolore aut aperiam veniam et nostrum labore aut quod sint aut accusantium nostrum id sint enim. In quia animi hic autem enim et voluptates blanditiis et minus officiis et maiores perferendis et eius sunt non fugiat voluptas.

                Eos ducimus nisi et velit tenetur et commodi rerum et galisum voluptate eos aliquid placeat non laborum nesciunt qui omnis doloremque. Id consectetur omnis qui internos consequuntur sit fugit quas sed doloribus earum qui voluptas nostrum non dolorem tenetur At dicta officia. In nemo deserunt et molestiae quidem id dolorum ratione aut corrupti obcaecati non animi enim sit unde aspernatur! Qui ratione molestiae rem nisi vero eos excepturi nihil ea rerum tempora eum beatae omnis rem deleniti esse eos rerum placeat.

                Ab inventore aliquam est minima nihil non delectus optio ut nostrum consequatur ut numquam itaque ex consequatur deleniti ut nemo rerum. Et quia unde et voluptates porro ut voluptates obcaecati. Et nihil maiores ut totam doloribus et cumque voluptatem a voluptate nihil et beatae dolores eos autem galisum.

                Et quod nihil ut tempora quia sit fugiat vitae sit dolor eveniet. Ea rerum quia cum voluptates enim sed debitis fugiat eum tempora harum et dolores commodi id recusandae autem. Qui quibusdam magnam ut quisquam minus ea unde quia ut dicta possimus qui inventore saepe. Et eveniet perspiciatis sed dolor fuga sed dolorem quia!

                Sed maxime explicabo vel expedita magni eum vitae nemo sed facere voluptatem. Et nostrum sint est voluptatem voluptate cum commodi voluptatem eos molestiae explicabo.

                Et galisum ullam qui autem veniam ut quam officiis. Et blanditiis praesentium et nemo eligendi sit unde voluptatum ex veritatis quia ut voluptates sint est autem maiores hic neque fugiat. Hic fugit mollitia est tempora aliquid ut tempore perferendis. Sed delectus reprehenderit ad culpa animi et dolorem velit qui adipisci numquam sed quibusdam iste et esse reprehenderit eos accusantium eligendi.


                Lorem ipsum dolor sit amet. Et laudantium molestiae vel aspernatur ipsum non voluptatum fuga ex repellat quas est vitae aliquid est quisquam doloribus? Est praesentium nisi aut quas deserunt ut natus illo ut nisi inventore ea ratione doloribus non ratione omnis.

                Ut eaque soluta et velit blanditiis sit possimus aperiam ut blanditiis fuga et officiis sunt. Eum officiis nihil est quae facere qui consequatur debitis aut tenetur consequatur qui velit rerum non quaerat repellendus hic laboriosam error.

                Est illum voluptatum vel perferendis provident ut perferendis tempore est dolores quae ut sint velit qui labore ipsa sit voluptate aperiam. Vel deserunt voluptate non dolore odio qui quis galisum aut neque sequi et internos beatae 33 ipsum quia.

                Et alias facilis et molestiae dolore aut aperiam veniam et nostrum labore aut quod sint aut accusantium nostrum id sint enim. In quia animi hic autem enim et voluptates blanditiis et minus officiis et maiores perferendis et eius sunt non fugiat voluptas.

                Eos ducimus nisi et velit tenetur et commodi rerum et galisum voluptate eos aliquid placeat non laborum nesciunt qui omnis doloremque. Id consectetur omnis qui internos consequuntur sit fugit quas sed doloribus earum qui voluptas nostrum non dolorem tenetur At dicta officia. In nemo deserunt et molestiae quidem id dolorum ratione aut corrupti obcaecati non animi enim sit unde aspernatur! Qui ratione molestiae rem nisi vero eos excepturi nihil ea rerum tempora eum beatae omnis rem deleniti esse eos rerum placeat.

                Ab inventore aliquam est minima nihil non delectus optio ut nostrum consequatur ut numquam itaque ex consequatur deleniti ut nemo rerum. Et quia unde et voluptates porro ut voluptates obcaecati. Et nihil maiores ut totam doloribus et cumque voluptatem a voluptate nihil et beatae dolores eos autem galisum.

                Et quod nihil ut tempora quia sit fugiat vitae sit dolor eveniet. Ea rerum quia cum voluptates enim sed debitis fugiat eum tempora harum et dolores commodi id recusandae autem. Qui quibusdam magnam ut quisquam minus ea unde quia ut dicta possimus qui inventore saepe. Et eveniet perspiciatis sed dolor fuga sed dolorem quia!

                Sed maxime explicabo vel expedita magni eum vitae nemo sed facere voluptatem. Et nostrum sint est voluptatem voluptate cum commodi voluptatem eos molestiae explicabo.

                Et galisum ullam qui autem veniam ut quam officiis. Et blanditiis praesentium et nemo eligendi sit unde voluptatum ex veritatis quia ut voluptates sint est autem maiores hic neque fugiat. Hic fugit mollitia est tempora aliquid ut tempore perferendis. Sed delectus reprehenderit ad culpa animi et dolorem velit qui adipisci numquam sed quibusdam iste et esse reprehenderit eos accusantium eligendi.
              </p>
            </TabPane>
            <TabPane>
              <p>Retourinformatie content goes here</p>
              <p>
                Lorem ipsum dolor sit amet. Et laudantium molestiae vel aspernatur ipsum non voluptatum fuga ex repellat quas est vitae aliquid est quisquam doloribus? Est praesentium nisi aut quas deserunt ut natus illo ut nisi inventore ea ratione doloribus non ratione omnis.

                Ut eaque soluta et velit blanditiis sit possimus aperiam ut blanditiis fuga et officiis sunt. Eum officiis nihil est quae facere qui consequatur debitis aut tenetur consequatur qui velit rerum non quaerat repellendus hic laboriosam error.

                Est illum voluptatum vel perferendis provident ut perferendis tempore est dolores quae ut sint velit qui labore ipsa sit voluptate aperiam. Vel deserunt voluptate non dolore odio qui quis galisum aut neque sequi et internos beatae 33 ipsum quia.

                Et alias facilis et molestiae dolore aut aperiam veniam et nostrum labore aut quod sint aut accusantium nostrum id sint enim. In quia animi hic autem enim et voluptates blanditiis et minus officiis et maiores perferendis et eius sunt non fugiat voluptas.

                Eos ducimus nisi et velit tenetur et commodi rerum et galisum voluptate eos aliquid placeat non laborum nesciunt qui omnis doloremque. Id consectetur omnis qui internos consequuntur sit fugit quas sed doloribus earum qui voluptas nostrum non dolorem tenetur At dicta officia. In nemo deserunt et molestiae quidem id dolorum ratione aut corrupti obcaecati non animi enim sit unde aspernatur! Qui ratione molestiae rem nisi vero eos excepturi nihil ea rerum tempora eum beatae omnis rem deleniti esse eos rerum placeat.

                Ab inventore aliquam est minima nihil non delectus optio ut nostrum consequatur ut numquam itaque ex consequatur deleniti ut nemo rerum. Et quia unde et voluptates porro ut voluptates obcaecati. Et nihil maiores ut totam doloribus et cumque voluptatem a voluptate nihil et beatae dolores eos autem galisum.

                Et quod nihil ut tempora quia sit fugiat vitae sit dolor eveniet. Ea rerum quia cum voluptates enim sed debitis fugiat eum tempora harum et dolores commodi id recusandae autem. Qui quibusdam magnam ut quisquam minus ea unde quia ut dicta possimus qui inventore saepe. Et eveniet perspiciatis sed dolor fuga sed dolorem quia!

                Sed maxime explicabo vel expedita magni eum vitae nemo sed facere voluptatem. Et nostrum sint est voluptatem voluptate cum commodi voluptatem eos molestiae explicabo.

                Et galisum ullam qui autem veniam ut quam officiis. Et blanditiis praesentium et nemo eligendi sit unde voluptatum ex veritatis quia ut voluptates sint est autem maiores hic neque fugiat. Hic fugit mollitia est tempora aliquid ut tempore perferendis. Sed delectus reprehenderit ad culpa animi et dolorem velit qui adipisci numquam sed quibusdam iste et esse reprehenderit eos accusantium eligendi.


                Lorem ipsum dolor sit amet. Et laudantium molestiae vel aspernatur ipsum non voluptatum fuga ex repellat quas est vitae aliquid est quisquam doloribus? Est praesentium nisi aut quas deserunt ut natus illo ut nisi inventore ea ratione doloribus non ratione omnis.

                Ut eaque soluta et velit blanditiis sit possimus aperiam ut blanditiis fuga et officiis sunt. Eum officiis nihil est quae facere qui consequatur debitis aut tenetur consequatur qui velit rerum non quaerat repellendus hic laboriosam error.

                Est illum voluptatum vel perferendis provident ut perferendis tempore est dolores quae ut sint velit qui labore ipsa sit voluptate aperiam. Vel deserunt voluptate non dolore odio qui quis galisum aut neque sequi et internos beatae 33 ipsum quia.

                Et alias facilis et molestiae dolore aut aperiam veniam et nostrum labore aut quod sint aut accusantium nostrum id sint enim. In quia animi hic autem enim et voluptates blanditiis et minus officiis et maiores perferendis et eius sunt non fugiat voluptas.

                Eos ducimus nisi et velit tenetur et commodi rerum et galisum voluptate eos aliquid placeat non laborum nesciunt qui omnis doloremque. Id consectetur omnis qui internos consequuntur sit fugit quas sed doloribus earum qui voluptas nostrum non dolorem tenetur At dicta officia. In nemo deserunt et molestiae quidem id dolorum ratione aut corrupti obcaecati non animi enim sit unde aspernatur! Qui ratione molestiae rem nisi vero eos excepturi nihil ea rerum tempora eum beatae omnis rem deleniti esse eos rerum placeat.

                Ab inventore aliquam est minima nihil non delectus optio ut nostrum consequatur ut numquam itaque ex consequatur deleniti ut nemo rerum. Et quia unde et voluptates porro ut voluptates obcaecati. Et nihil maiores ut totam doloribus et cumque voluptatem a voluptate nihil et beatae dolores eos autem galisum.

                Et quod nihil ut tempora quia sit fugiat vitae sit dolor eveniet. Ea rerum quia cum voluptates enim sed debitis fugiat eum tempora harum et dolores commodi id recusandae autem. Qui quibusdam magnam ut quisquam minus ea unde quia ut dicta possimus qui inventore saepe. Et eveniet perspiciatis sed dolor fuga sed dolorem quia!

                Sed maxime explicabo vel expedita magni eum vitae nemo sed facere voluptatem. Et nostrum sint est voluptatem voluptate cum commodi voluptatem eos molestiae explicabo.

                Et galisum ullam qui autem veniam ut quam officiis. Et blanditiis praesentium et nemo eligendi sit unde voluptatum ex veritatis quia ut voluptates sint est autem maiores hic neque fugiat. Hic fugit mollitia est tempora aliquid ut tempore perferendis. Sed delectus reprehenderit ad culpa animi et dolorem velit qui adipisci numquam sed quibusdam iste et esse reprehenderit eos accusantium eligendi.


                Lorem ipsum dolor sit amet. Et laudantium molestiae vel aspernatur ipsum non voluptatum fuga ex repellat quas est vitae aliquid est quisquam doloribus? Est praesentium nisi aut quas deserunt ut natus illo ut nisi inventore ea ratione doloribus non ratione omnis.

                Ut eaque soluta et velit blanditiis sit possimus aperiam ut blanditiis fuga et officiis sunt. Eum officiis nihil est quae facere qui consequatur debitis aut tenetur consequatur qui velit rerum non quaerat repellendus hic laboriosam error.

                Est illum voluptatum vel perferendis provident ut perferendis tempore est dolores quae ut sint velit qui labore ipsa sit voluptate aperiam. Vel deserunt voluptate non dolore odio qui quis galisum aut neque sequi et internos beatae 33 ipsum quia.

                Et alias facilis et molestiae dolore aut aperiam veniam et nostrum labore aut quod sint aut accusantium nostrum id sint enim. In quia animi hic autem enim et voluptates blanditiis et minus officiis et maiores perferendis et eius sunt non fugiat voluptas.

                Eos ducimus nisi et velit tenetur et commodi rerum et galisum voluptate eos aliquid placeat non laborum nesciunt qui omnis doloremque. Id consectetur omnis qui internos consequuntur sit fugit quas sed doloribus earum qui voluptas nostrum non dolorem tenetur At dicta officia. In nemo deserunt et molestiae quidem id dolorum ratione aut corrupti obcaecati non animi enim sit unde aspernatur! Qui ratione molestiae rem nisi vero eos excepturi nihil ea rerum tempora eum beatae omnis rem deleniti esse eos rerum placeat.

                Ab inventore aliquam est minima nihil non delectus optio ut nostrum consequatur ut numquam itaque ex consequatur deleniti ut nemo rerum. Et quia unde et voluptates porro ut voluptates obcaecati. Et nihil maiores ut totam doloribus et cumque voluptatem a voluptate nihil et beatae dolores eos autem galisum.

                Et quod nihil ut tempora quia sit fugiat vitae sit dolor eveniet. Ea rerum quia cum voluptates enim sed debitis fugiat eum tempora harum et dolores commodi id recusandae autem. Qui quibusdam magnam ut quisquam minus ea unde quia ut dicta possimus qui inventore saepe. Et eveniet perspiciatis sed dolor fuga sed dolorem quia!

                Sed maxime explicabo vel expedita magni eum vitae nemo sed facere voluptatem. Et nostrum sint est voluptatem voluptate cum commodi voluptatem eos molestiae explicabo.

                Et galisum ullam qui autem veniam ut quam officiis. Et blanditiis praesentium et nemo eligendi sit unde voluptatum ex veritatis quia ut voluptates sint est autem maiores hic neque fugiat. Hic fugit mollitia est tempora aliquid ut tempore perferendis. Sed delectus reprehenderit ad culpa animi et dolorem velit qui adipisci numquam sed quibusdam iste et esse reprehenderit eos accusantium eligendi.


                Lorem ipsum dolor sit amet. Et laudantium molestiae vel aspernatur ipsum non voluptatum fuga ex repellat quas est vitae aliquid est quisquam doloribus? Est praesentium nisi aut quas deserunt ut natus illo ut nisi inventore ea ratione doloribus non ratione omnis.

                Ut eaque soluta et velit blanditiis sit possimus aperiam ut blanditiis fuga et officiis sunt. Eum officiis nihil est quae facere qui consequatur debitis aut tenetur consequatur qui velit rerum non quaerat repellendus hic laboriosam error.

                Est illum voluptatum vel perferendis provident ut perferendis tempore est dolores quae ut sint velit qui labore ipsa sit voluptate aperiam. Vel deserunt voluptate non dolore odio qui quis galisum aut neque sequi et internos beatae 33 ipsum quia.

                Et alias facilis et molestiae dolore aut aperiam veniam et nostrum labore aut quod sint aut accusantium nostrum id sint enim. In quia animi hic autem enim et voluptates blanditiis et minus officiis et maiores perferendis et eius sunt non fugiat voluptas.

                Eos ducimus nisi et velit tenetur et commodi rerum et galisum voluptate eos aliquid placeat non laborum nesciunt qui omnis doloremque. Id consectetur omnis qui internos consequuntur sit fugit quas sed doloribus earum qui voluptas nostrum non dolorem tenetur At dicta officia. In nemo deserunt et molestiae quidem id dolorum ratione aut corrupti obcaecati non animi enim sit unde aspernatur! Qui ratione molestiae rem nisi vero eos excepturi nihil ea rerum tempora eum beatae omnis rem deleniti esse eos rerum placeat.

                Ab inventore aliquam est minima nihil non delectus optio ut nostrum consequatur ut numquam itaque ex consequatur deleniti ut nemo rerum. Et quia unde et voluptates porro ut voluptates obcaecati. Et nihil maiores ut totam doloribus et cumque voluptatem a voluptate nihil et beatae dolores eos autem galisum.

                Et quod nihil ut tempora quia sit fugiat vitae sit dolor eveniet. Ea rerum quia cum voluptates enim sed debitis fugiat eum tempora harum et dolores commodi id recusandae autem. Qui quibusdam magnam ut quisquam minus ea unde quia ut dicta possimus qui inventore saepe. Et eveniet perspiciatis sed dolor fuga sed dolorem quia!

                Sed maxime explicabo vel expedita magni eum vitae nemo sed facere voluptatem. Et nostrum sint est voluptatem voluptate cum commodi voluptatem eos molestiae explicabo.

                Et galisum ullam qui autem veniam ut quam officiis. Et blanditiis praesentium et nemo eligendi sit unde voluptatum ex veritatis quia ut voluptates sint est autem maiores hic neque fugiat. Hic fugit mollitia est tempora aliquid ut tempore perferendis. Sed delectus reprehenderit ad culpa animi et dolorem velit qui adipisci numquam sed quibusdam iste et esse reprehenderit eos accusantium eligendi.
              </p>
            </TabPane>
          </TabPanes>
        </ColumnLayoutContent>
      </ColumnLayoutMain>
    </ColumnLayout>
  );
};

export default WithTabs;
