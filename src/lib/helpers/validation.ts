export const isValidEmail = (email: string): boolean => {
    const trimmedEmail = email.trim();

    if (!trimmedEmail) {
        return false;
    }

    if (trimmedEmail.includes(' ')) {
        return false;
    }

    const atIndex = trimmedEmail.indexOf('@');
    const lastAtIndex = trimmedEmail.lastIndexOf('@');

    // precies 1 @ en niet op eerste positie
    if (atIndex <= 0 || atIndex !== lastAtIndex) {
        return false;
    }

    const localPart = trimmedEmail.slice(0, atIndex);
    const domainPart = trimmedEmail.slice(atIndex + 1);

    if (!localPart || !domainPart) {
        return false;
    }

    // domein moet een punt bevatten
    if (!domainPart.includes('.')) {
        return false;
    }

    // domein mag niet beginnen/eindigen met punt
    if (domainPart.startsWith('.') || domainPart.endsWith('.')) {
        return false;
    }

    // geen lege domeinsegmenten zoals test@site..nl
    const domainSegments = domainPart.split('.');
    if (domainSegments.some(segment => !segment)) {
        return false;
    }

    return true;
};

export const validateSemicolonSeparatedEmails = (value?: string): true | string => {
    if (!value?.trim()) {
        return true; // optioneel veld
    }

    // Check: zijn er andere separators aanwezig (komma, spatie etc.)
    if (/[,\s]/.test(value)) {
        return "Gebruik alleen geldige e-mailadressen gescheiden door puntkomma's (;)";
    }

    const parts = value.split(';').map(x => x.trim());

    // Geen lege stukken toestaan zoals:
    // test@test.nl;
    // ;test@test.nl
    // test@test.nl;;info@test.nl
    if (parts.some(x => x.length === 0)) {
        return "Gebruik alleen geldige e-mailadressen gescheiden door puntkomma's (;)";
    }

    const invalidEmails = parts.filter(email => !isValidEmail(email));

    if (invalidEmails.length > 0) {
        return `Ongeldig e-mailadres: ${invalidEmails.join(', ')}`;
    }

    return true;
};