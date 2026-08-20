import React, { ReactElement } from "react";
import { Toolbar } from "../../../components/UI/Toolbar";
import Button from "../../../components/UI/Button/Button";
import Dropdown from "../../../components/Forms/Dropdown/Dropdown";
import DescriptionList from "../../../components/Typography/DescriptionList/DescriptionList";
import moment from "moment";
import { Badge } from "../../../components/UI/Badge";

const DescriptionListDemo = ({
}): ReactElement => {
    return (
        <>
            <h2>Default</h2>
            <DescriptionList css="mb-3"
                enableColon
                data={[
                    { label: "Dossier type", content: (<Badge>I am a badge</Badge>) },
                    { label: "Dossier status", content: (<Badge>I am a badge</Badge>) },
                    { label: "Aangemaakt", content: moment(new Date()).format("DD-MM-YYYY") },
                    { label: "Referentie Promeetec", content: "My reference" },
                    { label: "Referentie klant", content: "Customer reference" },
                    { label: "Opmerking", content: (
                        <>
                        <p>Lorem ipsum dolor sit amet. Hic impedit voluptatibus aut perferendis enim qui numquam veniam et vero magnam ex nostrum alias! Ex fuga beatae est mollitia quia hic culpa velit et necessitatibus omnis in totam perspiciatis ut delectus quia sit nisi doloribus. </p><p>Sed quia ratione vel voluptatibus dolorem quo dicta quam. Vel culpa nulla a necessitatibus ipsa ab nulla culpa et dolorem magnam eos totam assumenda ex omnis tempore. Et dignissimos minus in maxime exercitationem aut sequi sunt sed ducimus accusantium ea eius labore ea libero accusamus sed fugiat illum. </p><p>Ab saepe cupiditate non culpa eveniet eos praesentium amet et autem sint in fuga doloribus qui eius nostrum ex voluptatem voluptatem. Vel sint ducimus ea nisi dolorem ut facere distinctio eos incidunt necessitatibus aut culpa architecto in voluptas possimus ad galisum voluptate. Ea dolor voluptatem est quidem perspiciatis a aliquid eligendi non nihil Quis. Ea accusantium fugit sed deserunt officia qui totam delectus id quasi architecto nam laudantium debitis. </p>
                        </>
                    ) },
                ]}
            />


            <h2>Scrollable content</h2>
            <DescriptionList css="mb-3"
                enableColon
                data={[
                    { label: "Dossier type", content: (<Badge>I am a badge</Badge>) },
                    { label: "Dossier status", content: (<Badge>I am a badge</Badge>) },
                    { label: "Aangemaakt", content: moment(new Date()).format("DD-MM-YYYY") },
                    { label: "Referentie Promeetec", content: "My reference" },
                    { label: "Referentie klant", content: "Customer reference" },
                    { 
                        label: "Opmerking", 
                        scrollableContent: true,
                        content: (
                        <>
                        <p>Lorem ipsum dolor sit amet. Hic impedit voluptatibus aut perferendis enim qui numquam veniam et vero magnam ex nostrum alias! Ex fuga beatae est mollitia quia hic culpa velit et necessitatibus omnis in totam perspiciatis ut delectus quia sit nisi doloribus. </p><p>Sed quia ratione vel voluptatibus dolorem quo dicta quam. Vel culpa nulla a necessitatibus ipsa ab nulla culpa et dolorem magnam eos totam assumenda ex omnis tempore. Et dignissimos minus in maxime exercitationem aut sequi sunt sed ducimus accusantium ea eius labore ea libero accusamus sed fugiat illum. </p><p>Ab saepe cupiditate non culpa eveniet eos praesentium amet et autem sint in fuga doloribus qui eius nostrum ex voluptatem voluptatem. Vel sint ducimus ea nisi dolorem ut facere distinctio eos incidunt necessitatibus aut culpa architecto in voluptas possimus ad galisum voluptate. Ea dolor voluptatem est quidem perspiciatis a aliquid eligendi non nihil Quis. Ea accusantium fugit sed deserunt officia qui totam delectus id quasi architecto nam laudantium debitis. </p>
                        </>
                    ) },
                ]}
            />

        </>
    )
}

export default DescriptionListDemo;