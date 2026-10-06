import { addons} from 'storybook/manager-api';
import { dark } from "./theme";

addons.setConfig({
  theme: dark,
  //navSize: 300,
  bottomPanelHeight: 300,
  rightPanelWidth: 300,
  panelPosition: 'bottom',
  enableShortcuts: true,
  showToolbar: true,
 // selectedPanel: undefined,
  // initialActive: 'sidebar',
  // layoutCustomisations: {
  //   showSidebar(state: State, defaultValue: boolean) {
  //     return state.storyId === 'landing' ? false : defaultValue;
  //   },
  //   showToolbar(state: State, defaultValue: boolean) {
  //     return state.viewMode === 'docs' ? false : defaultValue;
  //   },
  // },
  // sidebar: {
  //   showRoots: false,
  //   collapsedRoots: ['other'],
  // },
  // toolbar: {
  //   title: { hidden: false },
  //   zoom: { hidden: false },
  //   eject: { hidden: false },
  //   copy: { hidden: false },
  //   fullscreen: { hidden: false },
  // },
});