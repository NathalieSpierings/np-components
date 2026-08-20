import React, { ReactElement } from "react";
import Button from "../../../components/UI/Button/Button";
import Icon from "../../../components/UI/Icons/Icon/Icon";
import { ColorDefinitions, IconDefinitions, SizeDefinitions } from "../../../lib/utils/definitions";

const ButtonDemo = ({
}): ReactElement => {
    return (
        <section className="centered centered--wide">

            <h2>Default</h2>
            <div className="flex gap-1">
                <Button>Default</Button>
                <Button><Icon icon={IconDefinitions.arrow_left} position="left" />Default</Button>
            </div>


            <h2>Surfaces</h2>
            <div className="flex gap-1">
                <Button color={ColorDefinitions.SurfaceDark}>Surface dark</Button>
                <Button color={ColorDefinitions.Surface}>Surface</Button>
                <Button color={ColorDefinitions.SurfaceLight}>Surface light</Button>
            </div>

            <h2>Variants</h2>
            <h4>Default</h4>
            <div className="flex gap-1">         
                <Button color={ColorDefinitions.Blue}>Outline</Button>
                <Button color={ColorDefinitions.Blue} iconOnly><Icon icon={IconDefinitions.bulb} /></Button>
                <Button color={ColorDefinitions.Pink} rounded={true}>Rounded</Button>
                <Button color={ColorDefinitions.Rose} circle={true} iconOnly> <Icon icon={IconDefinitions.bulb} /></Button>
            </div>

            <h4>Outline</h4>
            <div className="flex gap-1">         
                <Button color={ColorDefinitions.Blue} variant="outline">Outline</Button>
                <Button color={ColorDefinitions.Blue} variant="outline" iconOnly><Icon icon={IconDefinitions.bulb} /></Button>
                <Button color={ColorDefinitions.Pink} variant="outline" rounded={true}>Rounded</Button>
                <Button color={ColorDefinitions.Rose} variant="outline" circle={true} iconOnly> <Icon icon={IconDefinitions.bulb} /></Button>
            </div>

            <h4>Ghost</h4>
            <div className="flex gap-1">
                <Button color={ColorDefinitions.Blue} variant="ghost">Outline</Button>
                <Button color={ColorDefinitions.Blue} variant="ghost" iconOnly><Icon icon={IconDefinitions.bulb} /></Button>
                <Button color={ColorDefinitions.Pink} variant="ghost" rounded={true}>Rounded</Button>
                <Button color={ColorDefinitions.Rose} variant="ghost" circle={true} iconOnly> <Icon icon={IconDefinitions.bulb} /></Button>
            </div>

             <h4>Flat</h4>
            <div className="flex gap-1">
                <Button color={ColorDefinitions.Blue} variant="flat">Outline</Button>
                <Button color={ColorDefinitions.Blue} variant="flat" iconOnly><Icon icon={IconDefinitions.bulb} /></Button>
                <Button color={ColorDefinitions.Pink} variant="flat" rounded={true}>Rounded</Button>
                <Button color={ColorDefinitions.Rose} variant="flat" circle={true} iconOnly> <Icon icon={IconDefinitions.bulb} /></Button>
            </div>

            <h4>Other</h4>
            <div className="flex gap-1">
                <Button color={ColorDefinitions.Olive}>Button bg</Button>
                <Button color={ColorDefinitions.Blue} raised={true}>Raised</Button>
                <Button color={ColorDefinitions.Pink} shadow={true}>Shadow</Button>
                <Button color={ColorDefinitions.Rose}><Icon icon={IconDefinitions.arrow_left} position="left" />Icon left</Button>
                <Button color={ColorDefinitions.Rose}>Icon right<Icon icon={IconDefinitions.arrow_right} position="right" /></Button>
                <Button color={ColorDefinitions.Olive} rounded={true}>Rounded</Button>
                <Button circle={true} color={ColorDefinitions.Olive} iconOnly> <Icon icon={IconDefinitions.bulb} /></Button>                
            </div>

            <h4>Sizes</h4>
            <div className="flex gap-1">
                <Button color={ColorDefinitions.Olive} size={SizeDefinitions.ExtraSmall}>Button</Button>
                <Button color={ColorDefinitions.Olive} size={SizeDefinitions.Small}>Button</Button>
                <Button color={ColorDefinitions.Olive} size={SizeDefinitions.Medium}>Button</Button>
                <Button color={ColorDefinitions.Olive} size={SizeDefinitions.Large}>Button</Button>
                <Button color={ColorDefinitions.Olive} size={SizeDefinitions.ExtraLarge}>Button</Button>
                <Button color={ColorDefinitions.Olive} size={SizeDefinitions.ExtraLarge2}>Button</Button>
                <Button color={ColorDefinitions.Olive} size={SizeDefinitions.ExtraLarge3}>Button</Button>
            </div>

            <div className="flex gap-1">
                <Button color={ColorDefinitions.Olive} size={SizeDefinitions.ExtraSmall}><Icon icon={IconDefinitions.bulb} position="left" />Button</Button>
                <Button color={ColorDefinitions.Olive} size={SizeDefinitions.Small}><Icon icon={IconDefinitions.bulb} position="left" />Button</Button>
                <Button color={ColorDefinitions.Olive} size={SizeDefinitions.Medium}><Icon icon={IconDefinitions.bulb} position="left" />Button</Button>
                <Button color={ColorDefinitions.Olive} size={SizeDefinitions.Large}><Icon icon={IconDefinitions.bulb} position="left" />Button</Button>
                <Button color={ColorDefinitions.Olive} size={SizeDefinitions.ExtraLarge}><Icon icon={IconDefinitions.bulb} position="left" />Button</Button>
                <Button color={ColorDefinitions.Olive} size={SizeDefinitions.ExtraLarge2}><Icon icon={IconDefinitions.bulb} position="left" />Button</Button>
                <Button color={ColorDefinitions.Olive} size={SizeDefinitions.ExtraLarge3}><Icon icon={IconDefinitions.bulb} position="left" />Button</Button>
            </div>

            <h4>Fluid</h4>
            <div className="flex gap-1">
                <Button color={ColorDefinitions.Olive} fluid={true}>Button</Button>
            </div>
        </section>
    )
}
export default ButtonDemo;