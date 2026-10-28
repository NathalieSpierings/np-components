import { DemoComponent, fromStoriesModule } from "../Stories/storyRegistry";
import * as BasicLayoutStories from "../../../components/Page/Basic/__docs__/BasicLayout.stories";
import * as BottomSheetStories from "../../../components/Page/BottomSheet/__docs__/BottomSheet.stories";
import * as BurgerStories from "../../../components/Page/Burger/__docs__/Burger.stories";
import * as CollapsibleMenuStories from "../../../components/Page/Navigation/CollapsibleMenu/__docs__/CollapsibleMenu.stories";
import * as LogoStories from "../../../components/Page/Logo/__docs__/Logo.stories";
import * as MainLayoutStories from "../../../components/Page/Main/__docs__/MainLayout.stories";
import * as BreadcrumbStories from "../../../components/Page/Navigation/Breadcrumb/__docs__/Breadcrumb.stories";
import * as MainMenuStories from "../../../components/Page/Navigation/MainMenu/__docs__/MainMenu.stories";
import * as PageOverlayStories from "../../../components/Page/PageOverlay/__docs__/PageOverlay.stories";

/**
 * - `isolate`: stories met een eigen MemoryRouter in de story-code (de layouts en Page overlay); die draaien in een eigen React-root.
 * - `decorators: false`: de decorators voegen een MemoryRouter toe, en binnen de app mag er geen router in een router.
 */
export const pageDemoComponents: DemoComponent[] = [
    fromStoriesModule('basiclayout', 'Basic layout', BasicLayoutStories, { isolate: true }),
    fromStoriesModule('bottomsheet', 'Bottom sheet', BottomSheetStories),
    fromStoriesModule('breadcrumb', 'Breadcrumb', BreadcrumbStories, { decorators: false }),
    fromStoriesModule('burger', 'Burger', BurgerStories),
    fromStoriesModule('collapsiblemenu', 'Collapsible menu', CollapsibleMenuStories, { decorators: false }),
    fromStoriesModule('logo', 'Logo', LogoStories),
    fromStoriesModule('mainlayout', 'Main layout', MainLayoutStories, { isolate: true }),
    fromStoriesModule('mainmenu', 'Main menu', MainMenuStories, { decorators: false }),
    fromStoriesModule('pageoverlay', 'Page overlay', PageOverlayStories, { isolate: true }),
];
