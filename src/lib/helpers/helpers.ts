export function generateUUID() {
    // Public Domain/MIT
    let d = Date.now(); // Timestamp
    let d2 = (typeof performance !== 'undefined' && performance.now ? performance.now() * 1000 : 0); // Microseconds since page-load or 0 if unsupported

    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        let r = Math.random() * 16; // random number between 0 and 16
        if (d > 0) {
            // Use timestamp until depleted
            r = (d + r) % 16;
            d = Math.trunc(d / 16);
        } else {
            // Use microseconds since page-load if supported
            r = (d2 + r) % 16;
            d2 = Math.trunc(d2 / 16);
        }
        return (c === 'x' ? r : (r & 0x3) | 0x8).toString(16);
    });
}

export const formatNumberToDutch = (value: number) => {
    return new Intl.NumberFormat('nl-NL').format(value);
};

export const toDutchDateString = (date: Date): string => {
    // Ensure the date is valid
    if (Number.isNaN(date.getTime())) {
        return 'Invalid Date';
    }
    return date.toLocaleDateString('nl-NL');
};

export const parseToDate = (dateString: string): Date | null => {
    const myDate = new Date(dateString);
    if (Number.isNaN(myDate.getTime())) {
        return null;
    }

    return myDate;
};

export const toDateString = (date: Date): string => {
    return date.toString();
};

export const normalizeDate = (value: any): Date | null => {
    if (!value) return null;

    if (value instanceof Date) {
        return Number.isNaN(value.getTime()) ? null : value;
    }

    if (typeof value === 'string') {
        const parsed = new Date(value);
        return Number.isNaN(parsed.getTime()) ? null : parsed;
    }

    return null;
};

export const formatCurrency = (value: number | null | undefined): string => {
    if (value == null || Number.isNaN(value)) {
        return '€ 0,00';
    }

    return `€ ${value.toLocaleString('nl-NL', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    })}`;
};

// Colors
export interface ColorPair {
    background: string;
    foreground: string;
    shadow: string;
}

const HASH_MODULUS = 2_147_483_647; // grootste 32-bit priemgetal

const hashString = (str: string): number => {
    let hash = 0;
    for (const char of str) {
        hash = (hash * 31 + char.codePointAt(0)!) % HASH_MODULUS;
    }
    return hash;
};

const HUE_STEPS = 12; // 12 duidelijk verschillende tinten (30° uit elkaar)

const randomHue = (): number =>
    (crypto.getRandomValues(new Uint32Array(1))[0] % HUE_STEPS) * (360 / HUE_STEPS);

/**
 * Geeft een lichte achtergrond en donkere voorgrond in dezelfde tint.
 * Met seed: altijd dezelfde kleuren. Zonder seed: willekeurig.
 */
export const getColorPair = (seed = ''): ColorPair => {
    const hue = seed
        ? (hashString(seed.trim().toLowerCase()) % HUE_STEPS) * (360 / HUE_STEPS)
        : randomHue();

    return {
        background: `hsl(${hue} 70% 90%)`,
        foreground: `hsl(${hue} 70% 30%)`,
         shadow: `hsl(${hue} 70% 30%)`,
    };
};