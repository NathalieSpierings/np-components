
const themeSteps = [100, 200, 300, 400, 500, 600, 700, 800, 900];
const shadeSteps = ["", "dark", "light", "subtle"];

const colors = [
    "black", "white", "offwhite", "carbon", "snow", "hot-pink", "bordeaux",
    "magenta", "pale", "sand", "pepper", "overcast", "stone", "silver",
    "chinese-white", "terracotta", "isabelline", "beige", "dark-brown",
];

const shades = [
    "primary", "secondary", "tertiary",
    "cotton", "ice", "marine", "cyprus", "highland", "dull-orange", "cherry", "cottage-blue", "golden",
    "purple", "violet", "royalblue", "blue", "vintage-blue", "cyan", "sea",
    "olive", "sage", "green", "spring", "yellow", "havanna", "orange", "salmon",
    "red", "rose", "soft-pink", "nude", "mulberry", "pink", "brown",
];

export interface ColorSwatchProps {
    theme?: boolean;
}

const Swatch = ({ name }: { name: string }) => (
    <div className={`color bg-${name}`}>
        <div className="color__desc">
            <span>{name}</span>
            <span className="text-muted">Muted</span>
        </div>
    </div>
);

const ColorSwatch: React.FC<ColorSwatchProps> = ({ theme }) => {
    if (theme) {
        return (
            <div className="colors">
                {themeSteps.map((step) => (
                    <Swatch key={step} name={`theme-${step}`} />
                ))}
            </div>
        );
    }

    return (
        <div>
            <h3>colors</h3>
            <div className="colors">
                {colors.map((color) => (
                    <Swatch key={color} name={color} />
                ))}
            </div>

            {shades.map((color) => (
                <div key={color}>
                    <h3>{color}</h3>
                    <div className="colors">
                        {shadeSteps.map((step) => {
                            const name = step ? `${color}-${step}` : color;
                            return <Swatch key={name} name={name} />;
                        })}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ColorSwatch;