import { DemoComponent, fromStoriesModule } from "../Stories/storyRegistry";
import * as AccordionStories from "../../../components/UI/Accordion/__docs__/Accordion.stories";
import * as AlertStories from "../../../components/UI/Alert/__docs__/Alert.stories";
import * as AvatarStories from "../../../components/UI/Avatar/__docs__/Avatar.stories";
import * as BadgeStories from "../../../components/UI/Badge/__docs__/Badge.stories";
import * as ButtonStories from "../../../components/UI/Button/__docs__/Button.stories";
import * as CardStories from "../../../components/UI/Card/__docs__/Card.stories";
import * as CheckboxAnimatedStories from "../../../components/UI/CheckboxAnimated/__docs__/CheckboxAnimated.stories";
import * as CollapsibleStories from "../../../components/UI/Collapsible/__docs__/Collapsible.stories";
import * as QuickAccessMenuStories from "../../../components/UI/QuickAccessMenu/__docs__/QuickAccessMenu.stories";
import * as CollectionStories from "../../../components/UI/Collection/__docs__/Collection.stories";
import * as ConfirmDialogStories from "../../../components/UI/ConfirmDialog/__docs__/ConfirmDialog.stories";
import * as ContentItemStories from "../../../components/UI/ContentItem/__docs__/ContentItem.stories";
import * as DismissButtonStories from "../../../components/UI/DismissButton/__docs__/DismissButton.stories";
import * as DismissableBoxStories from "../../../components/UI/DismissableBox/__docs__/DismissableBox.stories";
import * as DividerStories from "../../../components/UI/Divider/__docs__/Divider.stories";
import * as DividerSplittedStories from "../../../components/UI/DividerSplitted/__docs__/DividerSplitted.stories";
import * as DrawerStories from "../../../components/UI/Drawer/__docs__/Drawer.stories";
import * as DuoColumnLayoutStories from "../../../components/UI/DuoColumnLayout/__docs__/DuoColumnLayout.stories";
import * as GridCollectionStories from "../../../components/UI/GridCollection/__docs__/GridCollection.stories";
import * as GridLayoutStories from "../../../components/UI/GridLayout/__docs__/GridLayout.stories";
import * as IconStories from "../../../components/UI/Icons/Icon/__docs__/Icon.stories";
import * as LoaderStories from "../../../components/UI/Loader/__docs__/Loader.stories";
import * as ModalStories from "../../../components/UI/Modal/__docs__/Modal.stories";
import * as PopoverStories from "../../../components/UI/Popover/__docs__/Popover.stories";
import * as ResizeHandleStories from "../../../components/UI/ResizeHandle/__docs__/ResizeHandle.stories";
import * as SliderStories from "../../../components/UI/Slider/__docs__/Slider.stories";
import * as TabsStories from "../../../components/UI/Tabs/__docs__/Tabs.stories";
import * as TagsStories from "../../../components/UI/Tags/__docs__/Tags.stories";
import * as ToastrStories from "../../../components/UI/Toastr/__docs__/Toastr.stories";
import * as ToolbarStories from "../../../components/UI/Toolbar/__docs__/Toolbar.stories";
import * as TooltipStories from "../../../components/UI/Tooltip/__docs__/Tooltip.stories";
import * as WidgetStories from "../../../components/UI/Widget/__docs__/Widget.stories";
import * as WizardStories from "../../../components/UI/Wizard/__docs__/Wizard.stories";

/**
 * Componenten met `decorators: false` hebben in Storybook een eigen MemoryRouter en/of providers als decorator.
 * Binnen de demo-app mag er geen router in een router; de providers levert de app zelf al.
 *
 * PanelLayout en ColumnLayout staan hier niet in: die hebben schermvullende demo's (Demo/UI/PanelLayout en
 * Demo/UI/ColumnLayout), in het menu onder UI > Panel layout en UI > Column layout.
 */
export const uiDemoComponents: DemoComponent[] = [
    fromStoriesModule('loader', 'Loader', LoaderStories, { decorators: false }),
    fromStoriesModule('accordion', 'Accordion', AccordionStories),
    fromStoriesModule('alert', 'Alert', AlertStories),
    fromStoriesModule('avatar', 'Avatar', AvatarStories),
    fromStoriesModule('badge', 'Badge', BadgeStories),
    fromStoriesModule('button', 'Button', ButtonStories),
    fromStoriesModule('card', 'Card', CardStories),
    fromStoriesModule('checkboxanimated', 'Checkbox animated', CheckboxAnimatedStories),
    fromStoriesModule('collapsible', 'Collapsible', CollapsibleStories),
    fromStoriesModule('collection', 'Collection', CollectionStories),
    fromStoriesModule('confirmdialog', 'Confirm dialog', ConfirmDialogStories),
    fromStoriesModule('contentitem', 'Content item', ContentItemStories),
    fromStoriesModule('dismissbutton', 'Dismiss button', DismissButtonStories),
    fromStoriesModule('dismissablebox', 'Dismissable box', DismissableBoxStories),
    fromStoriesModule('divider', 'Divider', DividerStories),
    fromStoriesModule('dividersplitted', 'Divider splitted', DividerSplittedStories),
    fromStoriesModule('drawer', 'Drawer', DrawerStories),
    fromStoriesModule('duocolumnlayout', 'Duo column layout', DuoColumnLayoutStories),
    fromStoriesModule('gridcollection', 'Grid collection', GridCollectionStories),
    fromStoriesModule('gridlayout', 'Grid layout', GridLayoutStories),
    fromStoriesModule('icon', 'Icon', IconStories),
    fromStoriesModule('modal', 'Modal', ModalStories),
    fromStoriesModule('popover', 'Popover', PopoverStories),
    fromStoriesModule('quickaccessmenu', 'Quick access menu', QuickAccessMenuStories, { decorators: false }),
    fromStoriesModule('resizehandle', 'Resize handle', ResizeHandleStories),
    fromStoriesModule('slider', 'Slider', SliderStories),
    fromStoriesModule('tabs', 'Tabs', TabsStories),
    fromStoriesModule('tags', 'Tags', TagsStories, { decorators: false }),
    fromStoriesModule('toastr', 'Toastr', ToastrStories, { decorators: false }),
    fromStoriesModule('toolbar', 'Toolbar', ToolbarStories),
    fromStoriesModule('tooltip', 'Tooltip', TooltipStories),
    fromStoriesModule('widget', 'Widget', WidgetStories),
    fromStoriesModule('wizard', 'Wizard', WizardStories),
];
