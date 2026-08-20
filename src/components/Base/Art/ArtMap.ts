import { ArtDefinitions } from '../../../lib/utils/definitions';
import ArtContract from './ArtContract';
import ArtDocument from './ArtDocument';
import ArtDossier from './ArtDossier';
import ArtEmptyData from './ArtEmptyData';
import ArtForbidden from './ArtForbidden';
import ArtIgo from './ArtIgo';
import ArtKetenzorg from './ArtKetenzorg';
import ArtMeekijkconsult from './ArtMeekijkconsult';
import ArtNotFound from './ArtNotFound';
import ArtPopulatiebekostiging from './ArtPopulatiebekostiging';
import ArtServerError from './ArtServerError';
import ArtSuite from './ArtSuite';
import ArtTicket from './ArtTicket';
import ArtVerbruiksmiddelen from './ArtVerbruiksmiddel';

export const ArtMap: Record<ArtDefinitions, React.FC<React.SVGProps<SVGSVGElement>>> = {
    [ArtDefinitions.Contract]: ArtContract,
    [ArtDefinitions.Document]: ArtDocument,
    [ArtDefinitions.Dossier]: ArtDossier,
    [ArtDefinitions.Igo]: ArtIgo,
    [ArtDefinitions.Ketenzorg]: ArtKetenzorg,
    [ArtDefinitions.Meekijkconsult]: ArtMeekijkconsult,
    [ArtDefinitions.Populatiebekostiging]: ArtPopulatiebekostiging,
    [ArtDefinitions.Ticket]: ArtTicket,
    [ArtDefinitions.Verbruiksmiddel]: ArtVerbruiksmiddelen,
    [ArtDefinitions.EmptyData]: ArtEmptyData,
    [ArtDefinitions.Forbidden]: ArtForbidden,
    [ArtDefinitions.NotFound]: ArtNotFound,
    [ArtDefinitions.ServerError]: ArtServerError,
};
