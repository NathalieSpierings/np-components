import React, { FC, ReactElement, useEffect, useState } from 'react';
import { isRouteErrorResponse, Link, useRouteError } from 'react-router';
import { SvgSprite } from '../../../assets/SvgSprite';
import ArtForbidden from '../../Base/Art/ArtForbidden';
import ArtNotFound from '../../Base/Art/ArtNotFound';
import ArtServerError from '../../Base/Art/ArtServerError';

export interface ErrorPageProps {
    title?: string;
    message?: string | ReactElement;
    errorMessage?: string;
    buttonBackToHomeLabel?: string;
    buttonBackToHomeUrl?: string;
    errorCode?: '404' | '403' | '500';
}

const ErrorPage: FC<ErrorPageProps> = ({
    errorCode = '404',
    title = 'Sorry, pagina niet gevonden!',
    message = <>De opgevraagde pagina is niet gevonden of bestaat niet meer.</>,
    errorMessage,
    buttonBackToHomeLabel = 'Terug naar home',
    buttonBackToHomeUrl = '/',
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const toggleCollapse = () => setIsOpen(!isOpen);

    const error = useRouteError();

    // For testing only
    useEffect(() => {
        if (error) {
            console.error('Routing error captured:', error);
        }
    }, [error]);

    if (isRouteErrorResponse(error)) {
        switch (error.status) {
            case 403:
                errorCode = '403';
                errorMessage = typeof error.data === 'string' ? error.data : JSON.stringify(error.data);
                break;
            case 500:
                errorCode = '500';
                errorMessage = typeof error.data === 'string' ? error.data : JSON.stringify(error.data);
                break;
            default:
                errorCode = '404';
                errorMessage = typeof error.data === 'string' ? error.data : JSON.stringify(error.data);
        }
    } else if (error instanceof Error) {
        errorCode = '500';
        errorMessage = error.message;
    }

    switch (errorCode) {
        case '403':
            title = 'Sorry, kan de content of pagina niet weergeven!';
            message = (
                <>
                    U heeft onvoldoende rechten om de inhoud van deze pagina te bekijken.
                    <br />
                    <Link to="https://promeetec.nl/contact/" target="_blank" className="link text-primary-30">
                        Neem contact op
                    </Link>{' '}
                    met Promeetec als u denkt dat u deze inhoud wel moet kunnen zien.
                </>
            );
            break;
        case '500':
            title = 'Sorry, er is een fout opgetreden!';
            message = (
                <>
                    We gaan dit nu regelen, maar u kunt ons desgewenst{' '}
                    <Link to="https://promeetec.nl/contact/" target="_blank" className="link text-primary-30">
                        laten weten wat u probeerde te doen
                    </Link>
                    .
                </>
            );
            break;
    }

    const illustrations: Record<'403' | '404' | '500', ReactElement> = {
        '403': <ArtForbidden />,
        '404': <ArtNotFound />,
        '500': <ArtServerError />,
    };

    return (
        <div className="page-error">
            <div className="page-error__illustration">{illustrations[errorCode]}</div>

            <div className="page-error__content">
                <h3>{title}</h3>
                <p>{message}</p>
                <Link to={buttonBackToHomeUrl} className="btn btn--outline btn-primary">
                    {buttonBackToHomeLabel}{' '}
                </Link>
            </div>

            <SvgSprite />
        </div>
    );
};
export default ErrorPage;
