import React, { ReactElement } from "react";
import Icon from "../../../components/UI/Icons/Icon/Icon";
import { ColorDefinitions, IconDefinitions, SizeDefinitions } from "../../../lib/utils/definitions";

const IconDemo = ({
}): ReactElement => {
    return (
        <>
            <p>When choosing an icon variant and set an background, the border will automatically get the same color as the background. See Icon component.</p>

            <h2>Default</h2>
            <div className="flex gap-1 mb-4">
                <Icon icon={IconDefinitions.warning} />
                <Icon icon={IconDefinitions.warning} variant="square" />
                <Icon icon={IconDefinitions.warning} variant="circle" />
                <Icon icon={IconDefinitions.warning} hover />
            </div>

            <h2>Icons with utility classes</h2>
            <div className="flex gap-1 mb-4">
                <Icon icon={IconDefinitions.warning} color={ColorDefinitions.Blue} />
                <Icon icon={IconDefinitions.warning} background={ColorDefinitions.Blue} variant="square" />
                <Icon icon={IconDefinitions.warning} borderColor={ColorDefinitions.Blue} />
                <Icon icon={IconDefinitions.warning} shadowColor={ColorDefinitions.Blue} borderColor={ColorDefinitions.Blue} variant="circle" />
                <Icon icon={IconDefinitions.warning} borderColor={ColorDefinitions.Blue} shadowBeforeColor={ColorDefinitions.Blue} variant="circle" />
                <Icon icon={IconDefinitions.warning} borderColor={ColorDefinitions.Blue} hoverShadowBeforeColor={ColorDefinitions.Blue} variant="circle" />
            </div>


            <h2>Hover state with utility classes</h2>
            <div className="flex gap-1 mb-4">
                <Icon icon={IconDefinitions.warning} hoverColor={ColorDefinitions.Blue} />
                <Icon icon={IconDefinitions.warning} hoverBackground={ColorDefinitions.Blue} variant="square" />
                <Icon icon={IconDefinitions.warning} hoverBackground={ColorDefinitions.Red} variant="circle" />
                <Icon icon={IconDefinitions.warning} borderColor={ColorDefinitions.Surface} hoverBackground={ColorDefinitions.Purple} rounded={SizeDefinitions.Full} />
                <Icon icon={IconDefinitions.warning} hoverBorderColor={ColorDefinitions.Blue} />
                <Icon icon={IconDefinitions.warning} hoverShadowColor={ColorDefinitions.Blue} hoverBorderColor={ColorDefinitions.Blue} variant="circle" />
            </div>

            <h2>Dashed with utility classes</h2>
            <div className="flex gap-1 mb-4">
                <Icon icon={IconDefinitions.warning} dashed={true} hoverColor={ColorDefinitions.Magenta} />
                <Icon icon={IconDefinitions.warning} dashed={true} hoverBackground={ColorDefinitions.Magenta} variant="square" />
                <Icon icon={IconDefinitions.warning} dashed={true} hoverBorderColor={ColorDefinitions.Magenta} />
                <Icon icon={IconDefinitions.warning} dashed={true} hoverShadowColor={ColorDefinitions.Magenta} hoverBorderColor={ColorDefinitions.Magenta} variant="circle" />
            </div>



            <h2>Ring</h2>
            <p className="mb-4">
                Puts a border around the icon. On hover and offset will be shown.
                You can choose between offset sizes <code>0, 1, 2, and 3 px</code> When choosing offset size: 0. Only the offset color will be shown.
                The ring border color can be set with the property <code>ringColor</code>.
                The ring offset border color can be set with the property <code>ringOffsetBorderColor</code>.
                The ring offset color default to <code>surface-0</code> can be set with the property <code>ringOffsetColor</code>.
                You can play around with the ring colors. Have fun :-).
            </p>

            <h3>Default ring</h3>
            <div className="flex gap-1 mb-4">
                <Icon icon={IconDefinitions.warning} ring={true} />
            </div>

            <h3>Ring size</h3>
             <div className="flex gap-1 mb-4">
                <Icon icon={IconDefinitions.warning} rounded={SizeDefinitions.Full} ring={true} ringSize="ring-0" />
                <Icon icon={IconDefinitions.warning} rounded={SizeDefinitions.Full} ring={true} ringSize="ring-1" />
                <Icon icon={IconDefinitions.warning} rounded={SizeDefinitions.Full} ring={true} ringSize="ring-2" />
                <Icon icon={IconDefinitions.warning} rounded={SizeDefinitions.Full} ring={true} ringSize="ring-3" />
            </div>

            <h3>Ring offsize 2</h3>
             <div className="flex gap-1 mb-4">
                <Icon icon={IconDefinitions.warning} rounded={SizeDefinitions.Full} ring={true} ringSize="ring-0" ringOffset="ring-offset-2" />
                <Icon icon={IconDefinitions.warning} rounded={SizeDefinitions.Full} ring={true} ringSize="ring-1" ringOffset="ring-offset-2" />
                <Icon icon={IconDefinitions.warning} rounded={SizeDefinitions.Full} ring={true} ringSize="ring-2" ringOffset="ring-offset-2" />
                <Icon icon={IconDefinitions.warning} rounded={SizeDefinitions.Full} ring={true} ringSize="ring-3" ringOffset="ring-offset-2" />
            </div>

            <h3>Ring offsize 4</h3>
            <div className="flex gap-1 mb-4">
                <Icon icon={IconDefinitions.warning} rounded={SizeDefinitions.Full} ring={true} ringSize="ring-0" ringOffset="ring-offset-4" />
                <Icon icon={IconDefinitions.warning} rounded={SizeDefinitions.Full} ring={true} ringSize="ring-1" ringOffset="ring-offset-4" />
                <Icon icon={IconDefinitions.warning} rounded={SizeDefinitions.Full} ring={true} ringSize="ring-2" ringOffset="ring-offset-4" />
                <Icon icon={IconDefinitions.warning} rounded={SizeDefinitions.Full} ring={true} ringSize="ring-3" ringOffset="ring-offset-4" />
            </div>

            <h3>Colored ring</h3>
            <div className="flex gap-1 mb-4">
                <Icon icon={IconDefinitions.warning} rounded={SizeDefinitions.Full} ring={true} ringColor={ColorDefinitions.Blue} />
                <Icon icon={IconDefinitions.bell} rounded={SizeDefinitions.Full} ring={true} ringColor={ColorDefinitions.Blue} ringHoverColor={ColorDefinitions.Blue} />
                <Icon icon={IconDefinitions.bin} rounded={SizeDefinitions.Full} ring={true} ringColor={ColorDefinitions.Blue} color={ColorDefinitions.Blue} />
                <Icon icon={IconDefinitions.briefcase} rounded={SizeDefinitions.Full} ring={true} ringColor={ColorDefinitions.Blue} background={ColorDefinitions.Blue} />
                <Icon icon={IconDefinitions.burger} rounded={SizeDefinitions.Full} ring={true} ringHoverColor={ColorDefinitions.Blue} />
                <Icon icon={IconDefinitions.bulb} rounded={SizeDefinitions.Full} ring={true} ringHoverColor={ColorDefinitions.Blue} hoverColor={ColorDefinitions.Blue} />
                <Icon icon={IconDefinitions.briefcase} rounded={SizeDefinitions.Full} ring={true} hoverBackground={ColorDefinitions.Blue} ringHoverColor={ColorDefinitions.Blue} />
                <Icon icon={IconDefinitions.bulb} rounded={SizeDefinitions.Full} ring={true} ringColor={ColorDefinitions.Blue} />
                <Icon icon={IconDefinitions.bulb} rounded={SizeDefinitions.Full} ring={true} ringHoverColor={ColorDefinitions.Red} />
            </div>


            <h2>Opacity</h2>
            <p className="mb-4">
                Shows the icon and border dimmed. On hover the opacity = 1;
                Use <code>icon--dimmed</code> class. To only dimm the icon you can use <code>icon--dimmed-icon</code> class.
            </p>
           <div className="flex gap-1 mb-4">
                <Icon icon={IconDefinitions.warning} color={ColorDefinitions.Blue} dimmed={true} />
                <Icon icon={IconDefinitions.warning} background={ColorDefinitions.Blue} variant="square" dimmed={true} />
                <Icon icon={IconDefinitions.warning} borderColor={ColorDefinitions.Blue} dimmed={true} />
                <Icon icon={IconDefinitions.warning} shadowColor={ColorDefinitions.Blue} variant="square" dimmed={true} />
            </div>


            <h3>Svg dimmed</h3>
           <div className="flex gap-1 mb-4">
                <Icon icon={IconDefinitions.warning} color={ColorDefinitions.Blue} dimmedSvg={true} />
                <Icon icon={IconDefinitions.warning} background={ColorDefinitions.Blue} variant="square" dimmedSvg={true} />
                <Icon icon={IconDefinitions.warning} borderColor={ColorDefinitions.Blue} dimmedSvg={true} />
                <Icon icon={IconDefinitions.warning} shadowColor={ColorDefinitions.Blue} variant="square" dimmedSvg={true} />
            </div>

            <h2>Hover</h2>
           <div className="flex gap-1 mb-4">
                <Icon icon={IconDefinitions.warning} variant="circle" hover={true} />
                <Icon icon={IconDefinitions.warning} variant="square" hover={true} />
                <Icon icon={IconDefinitions.warning} hover={true} />
            </div>

            <h2>Sizes</h2>
           <div className="flex gap-1 mb-5">
                <Icon icon={IconDefinitions.warning} size={SizeDefinitions.ExtraSmall} />
                <Icon icon={IconDefinitions.warning} size={SizeDefinitions.Small} />
                <Icon icon={IconDefinitions.warning} />
                <Icon icon={IconDefinitions.warning} size={SizeDefinitions.Medium} />
                <Icon icon={IconDefinitions.warning} size={SizeDefinitions.Large} />
                <Icon icon={IconDefinitions.warning} size={SizeDefinitions.ExtraLarge} />
                <Icon icon={IconDefinitions.warning} size={SizeDefinitions.ExtraLarge2} />
                <Icon icon={IconDefinitions.warning} size={SizeDefinitions.ExtraLarge3} />
            </div>

            <div className="flex gap-1 mb-5">
                <Icon icon={IconDefinitions.warning} variant="square" size={SizeDefinitions.ExtraSmall} />
                <Icon icon={IconDefinitions.warning} variant="square" size={SizeDefinitions.Small} />
                <Icon icon={IconDefinitions.warning} variant="square" />
                <Icon icon={IconDefinitions.warning} variant="square" size={SizeDefinitions.Medium} />
                <Icon icon={IconDefinitions.warning} variant="square" size={SizeDefinitions.Large} />
                <Icon icon={IconDefinitions.warning} variant="square" size={SizeDefinitions.ExtraLarge} />
                <Icon icon={IconDefinitions.warning} variant="square" size={SizeDefinitions.ExtraLarge2} />
                <Icon icon={IconDefinitions.warning} variant="square" size={SizeDefinitions.ExtraLarge3} />
            </div>

            <div className="flex gap-1 mb-5">
                <Icon icon={IconDefinitions.warning} variant="circle" size={SizeDefinitions.ExtraSmall} />
                <Icon icon={IconDefinitions.warning} variant="circle" size={SizeDefinitions.Small} />
                <Icon icon={IconDefinitions.warning} variant="circle" />
                <Icon icon={IconDefinitions.warning} variant="circle" size={SizeDefinitions.Medium} />
                <Icon icon={IconDefinitions.warning} variant="circle" size={SizeDefinitions.Large} />
                <Icon icon={IconDefinitions.warning} variant="circle" size={SizeDefinitions.ExtraLarge} />
                <Icon icon={IconDefinitions.warning} variant="circle" size={SizeDefinitions.ExtraLarge2} />
                <Icon icon={IconDefinitions.warning} variant="circle" size={SizeDefinitions.ExtraLarge3} />
            </div>


            <h2>Showwave anime</h2>
           <div className="flex gap-1 mb-4">
             <Icon icon={IconDefinitions.warning} variant="circle" size={SizeDefinitions.Small} iconCss="shockwave shadow-from-red" background={ColorDefinitions.Red} />

           </div>

         
            <h3>All icons</h3>
            <div className="row mb-4">
                <div className="col-sm-5">
                    <div className="grid">
                        {Object.values(IconDefinitions).map((item, idx) => (
                            <div key={item} className="demo__item">
                                <Icon icon={item} duotone={false} hover />
                                <h5>{item}</h5>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="col-sm-2"></div>
                <div className="col-sm-5">
                    <div className="grid">
                        {Object.values(IconDefinitions).map((item, idx) => (
                            <div key={item} className="demo__item">
                                <Icon icon={item} duotone={true} hover />
                                <h5>{item}</h5>
                            </div>
                        ))}
                    </div>
                </div>
            </div>


           
        </>
    )
}

export default IconDemo;