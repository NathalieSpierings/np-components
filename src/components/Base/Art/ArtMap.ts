import { ArtDefinitions } from '../../../lib/utils/definitions';
import ArtBulb from './ArtBulb';
import ArtClaimManager from './ArtClaimManager';
import ArtContract from './ArtContract';
import ArtDossier from './ArtDossier';
import ArtEmptyData from './ArtEmptyData';
import ArtFaq from './ArtFaq';
import ArtForbidden from './ArtForbidden';
import ArtIgo from './ArtIgo';
import ArtKetenzorg from './ArtKetenzorg';
import ArtMeekijkconsult from './ArtMeekijkconsult';
import ArtNotFound from './ArtNotFound';
import ArtPopulatiebekostiging from './ArtPopulatiebekostiging';
import ArtQuestion from './ArtQuestion';
import ArtServerError from './ArtServerError';
import ArtSuite from './ArtSuite';
import ArtTicket from './ArtTicket';
import ArtUnderConstruction from './ArtUnderConstruction';
import ArtVerbruiksmiddelen from './ArtVerbruiksmiddel';
import ArtWarning from './ArtWarning';

export const ArtMap: Record<ArtDefinitions, React.FC<React.SVGProps<SVGSVGElement>>> = {
    [ArtDefinitions.Contract]: ArtContract,
    [ArtDefinitions.Suite]: ArtSuite,
    [ArtDefinitions.ClaimManager]: ArtClaimManager,
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
    [ArtDefinitions.Faq]: ArtFaq,
    [ArtDefinitions.Warning]: ArtWarning,
    [ArtDefinitions.UnderConstruction]: ArtUnderConstruction,
    [ArtDefinitions.Bulb]: ArtBulb,
    [ArtDefinitions.Question]: ArtQuestion,
};
