import { DemoComponent, fromStoriesModule } from "../Stories/storyRegistry";
import * as DatagridStories from "../../../components/Data/Datagrid/__docs__/Datagrid.stories";
import * as ServerSideTableQueryStories from "../../../components/Data/Datagrid/Hooks/ServerSideTableQuery/__docs__/useServerSideTableQuery.stories";

/**
 * `decorators: false`: de decorators voegen een MemoryRouter en een QueryClientProvider toe.
 * Binnen de demo-app mag er geen router in een router; de QueryClientProvider levert de app zelf al.
 */
export const dataDemoComponents: DemoComponent[] = [
    fromStoriesModule('datagrid', 'Datagrid', DatagridStories, { decorators: false }),
    fromStoriesModule('serversidetablequery', 'Server side table query', ServerSideTableQueryStories, { decorators: false }),
];
