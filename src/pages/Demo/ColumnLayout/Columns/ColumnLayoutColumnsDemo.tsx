import React, { useEffect, useState } from "react";
import { ColumnLayout, ColumnLayoutAside, ColumnLayoutContent, ColumnLayoutHeader, ColumnLayoutMain, Columns, ColumnsAside, ColumnsContent, ColumnsMain, useLayoutContext } from "../../../../components";

const ColumnLayoutColumnsDemo = () => {

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

    return (
        <ColumnLayout>
            <ColumnLayoutMain>
                <ColumnLayoutHeader>
                    Main header
                </ColumnLayoutHeader>
                <ColumnLayoutContent>

                    <Columns hasAside>
                        <ColumnsMain>
                            <ColumnsContent>
                                <p>Main column content</p>
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
                            </ColumnsContent>
                        </ColumnsMain>
                        <ColumnsAside>
                            <ColumnsContent>
                                <p>Aside column content</p>
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
                            </ColumnsContent>
                        </ColumnsAside>
                    </Columns>

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

export default ColumnLayoutColumnsDemo;