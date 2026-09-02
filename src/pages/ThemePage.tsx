import React, { ReactElement } from "react";
import { ColorDefinitions, IconDefinitions } from "../lib/utils/definitions";
import Icon from "../components/UI/Icons/Icon/Icon";
import ColorSwatch from "../components/Base/colors/ColorSwatch";
import { Input } from "../components/Forms/Input/Input";

const ThemePage = ({
}): ReactElement => {

	return (
	

		<section className="centered centered--slim">

			<h3>Welkom to the theme test page</h3>

			<div className="grid">
				<div className="demobox bg-surface-light">
					<div className="demobox__header">
						Header
						<div>
							<Icon icon={IconDefinitions.undo_left} color={ColorDefinitions.Primary} />
							<Icon icon={IconDefinitions.ellipsis_h} color={ColorDefinitions.Primary} />
						</div>
					</div>
					<div className="demobox__content">
						<span className="text-mute">The usefulness of nonsensical content</span>
						<p>Dummy text is also used to demonstrate the appearance of different typefaces and layouts, and in general the content of dummy text is nonsensical. Due to its widespread use as filler text for layouts, non-readability is of great importance: human perception is tuned to recognize certain patterns and repetitions in texts. If the distribution of letters and 'words' is random, the reader will not be distracted from making a neutral judgement on the visual impact and readability of the typefaces (typography), or the distribution of text on the page (layout or type area). For this reason, dummy text usually consists of a more or less random series of words or syllables. This prevents repetitive patterns from impairing the overall visual impression and facilitates the comparison of different typefaces. Furthermore, it is advantageous when the dummy text is relatively realistic so that the layout impression of the final publication is not compromised.</p>
						<div className="box bg-theme-100">
							here is a box on top 100
						</div>
						<div className="box bg-theme-200">
							here is a box on top 200
						</div>
						<div className="box bg-theme-300">
							here is a box on top 300
						</div>
						<div className="box bg-theme-400">
							here is a box on top 400
						</div>
						<div className="box bg-theme-500">
							here is a box on top 500
						</div>
						<div className="box bg-theme-600">
							here is a box on top 600
						</div>
						<div className="box bg-theme-700">
							here is a box on top 700
						</div>
						<div className="box bg-theme-800">
							here is a box on top 800
						</div>
						<div className="box bg-theme-900">
							here is a box on top 900
						</div>
					</div>
					<div className="demobox__footer">Footer</div>
				</div>
				<div className="demobox bg-surface-dark">
					<div className="demobox__header">
						Header
						<div>
							<Icon icon={IconDefinitions.undo_left} color={ColorDefinitions.Primary} />
							<Icon icon={IconDefinitions.ellipsis_h} color={ColorDefinitions.Primary} />
						</div>
					</div>
					<div className="demobox__content">
						<span className="text-mute">The usefulness of nonsensical content</span>
						<p>Dummy text is also used to demonstrate the appearance of different typefaces and layouts, and in general the content of dummy text is nonsensical. Due to its widespread use as filler text for layouts, non-readability is of great importance: human perception is tuned to recognize certain patterns and repetitions in texts. If the distribution of letters and 'words' is random, the reader will not be distracted from making a neutral judgement on the visual impact and readability of the typefaces (typography), or the distribution of text on the page (layout or type area). For this reason, dummy text usually consists of a more or less random series of words or syllables. This prevents repetitive patterns from impairing the overall visual impression and facilitates the comparison of different typefaces. Furthermore, it is advantageous when the dummy text is relatively realistic so that the layout impression of the final publication is not compromised.</p>
						<div className="box bg-theme-100">
							here is a box on top 100
						</div>
						<div className="box bg-theme-200">
							here is a box on top 200
						</div>
						<div className="box bg-theme-300">
							here is a box on top 300
						</div>
						<div className="box bg-theme-400">
							here is a box on top 400
						</div>
						<div className="box bg-theme-500">
							here is a box on top 500
						</div>
						<div className="box bg-theme-600">
							here is a box on top 600
						</div>
						<div className="box bg-theme-700">
							here is a box on top 700
						</div>
						<div className="box bg-theme-800">
							here is a box on top 800
						</div>
						<div className="box bg-theme-900">
							here is a box on top 900
						</div>
					</div>
					<div className="demobox__footer">Footer</div>
				</div>
			</div>

			<div className="grid">
				<div className="box bg-surface-dark">
					<div className="democard bg-surface-light">
						content goes here
						<p className="text-red">I am a error message</p>
						<p className="text-orange">I am a warning message</p>
						<p className="text-blue">I am a info message</p>
						<p className="text-green">I am a success message</p>
						<div className="bg-theme-100">button</div>
					</div>
				</div>
			</div>

			<div className="box bg-theme-100">
				here is a box on top 100
			</div>
			<div className="box bg-theme-200">
				here is a box on top 200
			</div>
			<div className="box bg-theme-300">
				here is a box on top 300
			</div>
			<div className="box bg-theme-400">
				here is a box on top 400
			</div>
			<div className="box bg-theme-500">
				here is a box on top 500
			</div>
			<div className="box bg-theme-600">
				here is a box on top 600
			</div>
			<div className="box bg-theme-700">
				here is a box on top 700
			</div>
			<div className="box bg-theme-800">
				here is a box on top 800
			</div>
			<div className="box bg-theme-900">
				here is a box on top 900
			</div>

			<h3>Borders</h3>
			<div className="grid mb-3">
				<div className="bg-surface-light p-2">
					<div className="box border-surface-light p-2">I have a border</div>
				</div>
				<div className="bg-surface p-2">
					<div className="box border-surface p-2">I have a border</div>
				</div>
				<div className="bg-surface-dark p-2">
					<div className="box border-surface p-2">I have a border</div>
				</div>
			</div>

			<h3>Text</h3>
			<div className="grid mb-3">
				<div className="bg-surface-light p-2">
					<div className="box text-red p-2">I am a negative message</div>
					<div className="box text-green p-2">I am a positive message</div>
					<div className="box text-blue p-2">I am a informational message</div>
					<div className="box text-orange p-2">I am a warning message</div>
				</div>
				<div className="bg-surface p-2">
					<div className="box text-red p-2">I am a negative message</div>
					<div className="box text-green p-2">I am a positive message</div>
					<div className="box text-blue p-2">I am a informational message</div>
					<div className="box text-orange p-2">I am a warning message</div>
				</div>
				<div className="bg-surface-dark p-2">
					<div className="box text-red p-2">I am a negative message</div>
					<div className="box text-green p-2">I am a positive message</div>
					<div className="box text-blue p-2">I am a informational message</div>
					<div className="box text-orange p-2">I am a warning message</div>
				</div>
			</div>

			<h3>Alert</h3>
			<div className="grid mb-3">
				<div className="bg-surface-light p-2">
					<div className="alert bg-negative shown mb-1">
						<div className="alert__icon">
							<div className="icon icon--md">
								<svg xmlns="http://www.w3.org/2000/svg" className="icon-duotone">
									<use xlinkHref="#svg_icon_warning"></use>
								</svg>
							</div>
						</div>
						<span className="alert__message">
							<h3>Alert title</h3>
							<p>Alert message goes here...</p>
						</span>
					</div>
					<div className="alert bg-positive shown mb-1">
						<div className="alert__icon">
							<div className="icon icon--md">
								<svg xmlns="http://www.w3.org/2000/svg" className="icon-duotone">
									<use xlinkHref="#svg_icon_warning"></use>
								</svg>
							</div>
						</div>
						<span className="alert__message">
							<h3>Alert title</h3>
							<p>Alert message goes here...</p>
						</span>
					</div>
					<div className="alert bg-informational shown mb-1">
						<div className="alert__icon">
							<div className="icon icon--md">
								<svg xmlns="http://www.w3.org/2000/svg" className="icon-duotone">
									<use xlinkHref="#svg_icon_warning"></use>
								</svg>
							</div>
						</div>
						<span className="alert__message">
							<h3>Alert title</h3>
							<p>Alert message goes here...</p>
						</span>
					</div>
					<div className="alert bg-warning shown mb-1">
						<div className="alert__icon">
							<div className="icon icon--md">
								<svg xmlns="http://www.w3.org/2000/svg" className="icon-duotone">
									<use xlinkHref="#svg_icon_warning"></use>
								</svg>
							</div>
						</div>
						<span className="alert__message">
							<h3>Alert title</h3>
							<p>Alert message goes here...</p>
						</span>
					</div>
				</div>
				<div className="bg-surface p-2">
					<div className="alert bg-negative shown mb-1">
						<div className="alert__icon">
							<div className="icon icon--md">
								<svg xmlns="http://www.w3.org/2000/svg" className="icon-duotone">
									<use xlinkHref="#svg_icon_warning"></use>
								</svg>
							</div>
						</div>
						<span className="alert__message">
							<h3>Alert title</h3>
							<p>Alert message goes here...</p>
						</span>
					</div>
					<div className="alert bg-positive shown mb-1">
						<div className="alert__icon">
							<div className="icon icon--md">
								<svg xmlns="http://www.w3.org/2000/svg" className="icon-duotone">
									<use xlinkHref="#svg_icon_warning"></use>
								</svg>
							</div>
						</div>
						<span className="alert__message">
							<h3>Alert title</h3>
							<p>Alert message goes here...</p>
						</span>
					</div>
					<div className="alert bg-informational shown mb-1">
						<div className="alert__icon">
							<div className="icon icon--md">
								<svg xmlns="http://www.w3.org/2000/svg" className="icon-duotone">
									<use xlinkHref="#svg_icon_warning"></use>
								</svg>
							</div>
						</div>
						<span className="alert__message">
							<h3>Alert title</h3>
							<p>Alert message goes here...</p>
						</span>
					</div>
					<div className="alert bg-warning shown mb-1">
						<div className="alert__icon">
							<div className="icon icon--md">
								<svg xmlns="http://www.w3.org/2000/svg" className="icon-duotone">
									<use xlinkHref="#svg_icon_warning"></use>
								</svg>
							</div>
						</div>
						<span className="alert__message">
							<h3>Alert title</h3>
							<p>Alert message goes here...</p>
						</span>
					</div>
				</div>
				<div className="bg-surface-dark p-2">
					<div className="alert bg-negative shown mb-1">
						<div className="alert__icon">
							<div className="icon icon--md">
								<svg xmlns="http://www.w3.org/2000/svg" className="icon-duotone">
									<use xlinkHref="#svg_icon_warning"></use>
								</svg>
							</div>
						</div>
						<span className="alert__message">
							<h3>Alert title</h3>
							<p>Alert message goes here...</p>
						</span>
					</div>
					<div className="alert bg-positive shown mb-1">
						<div className="alert__icon">
							<div className="icon icon--md">
								<svg xmlns="http://www.w3.org/2000/svg" className="icon-duotone">
									<use xlinkHref="#svg_icon_warning"></use>
								</svg>
							</div>
						</div>
						<span className="alert__message">
							<h3>Alert title</h3>
							<p>Alert message goes here...</p>
						</span>
					</div>
					<div className="alert bg-informational shown mb-1">
						<div className="alert__icon">
							<div className="icon icon--md">
								<svg xmlns="http://www.w3.org/2000/svg" className="icon-duotone">
									<use xlinkHref="#svg_icon_warning"></use>
								</svg>
							</div>
						</div>
						<span className="alert__message">
							<h3>Alert title</h3>
							<p>Alert message goes here...</p>
						</span>
					</div>
					<div className="alert bg-warning shown mb-1">
						<div className="alert__icon">
							<div className="icon icon--md">
								<svg xmlns="http://www.w3.org/2000/svg" className="icon-duotone">
									<use xlinkHref="#svg_icon_warning"></use>
								</svg>
							</div>
						</div>
						<span className="alert__message">
							<h3>Alert title</h3>
							<p>Alert message goes here...</p>
						</span>
					</div>
				</div>
			</div>

			<h3>Input</h3>
			<div className="grid mb-3">
				<div className="bg-surface-light p-1">
					<Input label="Firstname" />
				</div>
				<div className="bg-surface p-1">
					<Input label="Firstname" />
				</div>
				<div className="bg-surface-dark p-1">
					<Input label="Firstname" />
				</div>
			</div>

			<h3>Table</h3>
			<table className="table">
				<thead>
					<tr>
						<th className="table-text-left descending">
							<div className="thcell">Naam</div>
						</th>
						<th className="table-text-left ascending">
							<div className="thcell">
								<span>Leeftijd</span>
								<span className="thcell__actions">
									<div className="icon icon--sm" draggable="true"><svg xmlns="http://www.w3.org/2000/svg" className="icon-duotone">
										<use xlinkHref="#svg_icon_sort_up"></use>
									</svg></div>
									<div className="icon icon--sm"><svg xmlns="http://www.w3.org/2000/svg" className="icon-duotone">
										<use xlinkHref="#svg_icon_cross"></use>
									</svg></div>
								</span>
							</div>
						</th>
						<th className="table-text-left ascending">
							<div className="thcell">Stad</div>
						</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>Jan</td>
						<td>28</td>
						<td>Amsterdam</td>
					</tr>
					<tr>
						<td>Piet</td>
						<td>34</td>
						<td>Rotterdam</td>
					</tr>
					<tr>
						<td>Anna</td>
						<td>25</td>
						<td>Utrecht</td>
					</tr>
					<tr className="selected">
						<td>Pierre</td>
						<td>58</td>
						<td>Eindhoven</td>
					</tr>
				</tbody>
			</table>

			<h1>Buttons</h1>
			<div className="flex gap-1">
				<button type="button" className="btn">Button</button>
				<button type="button" className="btn btn--raised">Raised</button>
				<button type="button" className="btn btn--shadow">Shadow</button>
				<button type="button" className="btn">
					<div className="icon left">
						<svg xmlns="http://www.w3.org/2000/svg" className="icon-duotone">
							<use xlinkHref="#svg_icon_arrow_left"></use>
						</svg>
					</div>Icon left
				</button>
				<button type="button" className="btn">
					Icon right
					<div className="icon right">
						<svg xmlns="http://www.w3.org/2000/svg" className="icon-duotone">
							<use xlinkHref="#svg_icon_arrow_right"></use>
						</svg>
					</div>

				</button>
				<button type="button" className="btn btn--rounded">Rounded</button>
				<button type="button" className="btn btn--circle">
					<div className="icon"><svg xmlns="http://www.w3.org/2000/svg" className="icon-duotone">
						<use xlinkHref="#svg_icon_bulb"></use>
					</svg>
					</div>
				</button>
				<button type="button" className="btn btn-outline">Outline</button>
				<button type="button" className="btn btn-ghost">Ghost</button>
				<button type="button" className="btn btn-outline btn--rounded ">Outline rounded</button>
				<button type="button" className="btn btn-outline btn--circle">
					<div className="icon"><svg xmlns="http://www.w3.org/2000/svg" className="icon-duotone">
						<use xlinkHref="#svg_icon_bulb"></use>
					</svg>
					</div>
				</button>
				<button type="button" className="btn btn-flat">Flat</button>
			</div>

			<h1>Button varants</h1>
			<div className="flex gap-1">

				<button type="button" className="btn btn-olive">Button bg</button>
				<button type="button" className="btn btn--raised btn-blue">Button raised</button>
				<button type="button" className="btn btn--shadow btn-pink">Button shadow</button>
				<button type="button" className="btn">
					<div className="icon left">
						<svg xmlns="http://www.w3.org/2000/svg" className="icon-duotone">
							<use xlinkHref="#svg_icon_arrow_left"></use>
						</svg>
					</div>With icon
				</button>
				<button type="button" className="btn btn-rose">
					With icon aand bg
					<div className="icon right">
						<svg xmlns="http://www.w3.org/2000/svg" className="icon-duotone">
							<use xlinkHref="#svg_icon_arrow_left"></use>
						</svg>
					</div>

				</button>
				<button type="button" className="btn btn--rounded btn-olive">Rounded</button>
				<button type="button" className="btn btn--circle btn-olive">
					<div className="icon"><svg xmlns="http://www.w3.org/2000/svg" className="icon-duotone">
						<use xlinkHref="#svg_icon_bulb"></use>
					</svg>
					</div>
				</button>
				<button type="button" className="btn btn-outline btn-blue">Outline</button>
				<button type="button" className="btn btn-ghost btn-pink">Ghost</button>
				<button type="button" className="btn btn-outline btn--rounded btn-pink">Outline rounded</button>
				<button type="button" className="btn btn-outline btn--circle btn-rose">
					<div className="icon"><svg xmlns="http://www.w3.org/2000/svg" className="icon-duotone">
						<use xlinkHref="#svg_icon_bulb"></use>
					</svg>
					</div>
				</button>
				<button type="button" className="btn btn-flat btn-blue">Flat</button>
			</div>

			<h1>Colors</h1>
			<h3>Theme colors</h3>
			<div className="colors mb-5">
				<div className="color bg-theme-100">
					<div className="color__desc">
						<span>theme-100</span>
						<span className="text-mute">Muted</span>
					</div>
				</div>
				<div className="color bg-theme-200">
					<div className="color__desc">
						<span>theme-100</span>
						<span className="text-mute">Muted</span>
					</div>
				</div>
				<div className="color bg-theme-300">
					<div className="color__desc">
						<span>theme-300</span>
						<span className="text-mute">Muted</span>
					</div>
				</div>
				<div className="color bg-theme-400">
					<div className="color__desc">
						<span>theme-400</span>
						<span className="text-mute">Muted</span>
					</div>
				</div>
				<div className="color bg-theme-500">
					<div className="color__desc">
						<span>theme-500</span>
						<span className="text-mute">Muted</span>
					</div>
				</div>
				<div className="color bg-theme-600">
					<div className="color__desc">
						<span>theme-600</span>
						<span className="text-mute">Muted</span>
					</div>
				</div>
				<div className="color bg-theme-700">
					<div className="color__desc">
						<span>theme-700</span>
						<span className="text-mute">Muted</span>
					</div>
				</div>
				<div className="color bg-theme-800">
					<div className="color__desc">
						<span>theme-800</span>
						<span className="text-mute">Muted</span>
					</div>
				</div>
				<div className="color bg-theme-900">
					<div className="color__desc">
						<span>theme-900</span>
						<span className="text-mute">Muted</span>
					</div>
				</div>
			</div>

			<h3>Theme gray</h3>
			<div className="colors mb-5">
				<div className="color bg-gray-25">
					<div className="color__desc">
						<span>gray-25</span>
					</div>
				</div>
				<div className="color bg-gray-50">
					<div className="color__desc">
						<span>gray-50</span>
					</div>
				</div>
				<div className="color bg-gray-100">
					<div className="color__desc">
						<span>gray-100</span>
					</div>
				</div>
				<div className="color bg-gray-200">
					<div className="color__desc">
						<span>gray-200</span>
					</div>
				</div>
				<div className="color bg-gray-300">
					<div className="color__desc">
						<span>gray-300</span>
					</div>
				</div>
				<div className="color bg-gray-400">
					<div className="color__desc">
						<span>gray-400</span>
					</div>
				</div>
				<div className="color bg-gray-500">
					<div className="color__desc">
						<span>gray-500</span>
					</div>
				</div>
				<div className="color bg-gray-600">
					<div className="color__desc">
						<span>gray-600</span>
					</div>
				</div>
				<div className="color bg-gray-700">
					<div className="color__desc">
						<span>gray-700</span>
					</div>
				</div>
				<div className="color bg-gray-800">
					<div className="color__desc">
						<span>gray-800</span>
					</div>
				</div>
				<div className="color bg-gray-900">
					<div className="color__desc">
						<span>gray-900</span>
					</div>
				</div>
				<div className="color bg-gray-950">
					<div className="color__desc">
						<span>gray-950</span>
					</div>
				</div>
			</div>

			<h3>Primary</h3>
			<div className="colors mb-5">
				<div className="color bg-primary-5">
					<div className="color__desc">
						<span>primary-5</span>
						<span className="text-mute">Muted</span>
					</div>
				</div>
				<div className="color bg-primary-10">
					<div className="color__desc">
						<span>primary-10</span>
						<span className="text-mute">Muted</span>
					</div>
				</div>
				<div className="color bg-primary-20">
					<div className="color__desc">
						<span>primary-20</span>
						<span className="text-mute">Muted</span>
					</div>
				</div>
				<div className="color bg-primary">
					<div className="color__desc">
						<span>primary</span>
						<span className="text-mute">Muted</span>
					</div>
				</div>
				<div className="color bg-primary-30">
					<div className="color__desc">
						<span>primary-30</span>
						<span className="text-mute">Muted</span>
					</div>
				</div>
			</div>

			<h3>Secondary</h3>
			<div className="colors mb-5">
				<div className="color bg-secondary-5">
					<div className="color__desc">
						<span>secondary-5</span>
						<span className="text-mute">Muted</span>
					</div>
				</div>
				<div className="color bg-secondary-10">
					<div className="color__desc">
						<span>secondary-10</span>
						<span className="text-mute">Muted</span>
					</div>
				</div>
				<div className="color bg-secondary-20">
					<div className="color__desc">
						<span>secondary-20</span>
						<span className="text-mute">Muted</span>
					</div>
				</div>
				<div className="color bg-secondary">
					<div className="color__desc">
						<span>secondary</span>
						<span className="text-mute">Muted</span>
					</div>
				</div>
				<div className="color bg-secondary-30">
					<div className="color__desc">
						<span>secondary-30</span>
						<span className="text-mute">Muted</span>
					</div>
				</div>
			</div>

			<h3>Basic colors</h3>
			<div className="colors mb-5">
				<div className="color bg-black">
					<div className="color__desc">
						<span>black</span>
						<span className="text-mute">Muted</span>
					</div>
				</div>
				<div className="color bg-white">
					<div className="color__desc">
						<span>white</span>
						<span className="text-mute">Muted</span>
					</div>
				</div>
				<div className="color bg-offwhite">
					<div className="color__desc">
						<span>offwhite</span>
						<span className="text-mute">Muted</span>
					</div>
				</div>
				<div className="color bg-light">
					<div className="color__desc">
						<span>light</span>
						<span className="text-mute">Muted</span>
					</div>
				</div>
				<div className="color bg-silver">
					<div className="color__desc">
						<span>silver</span>
						<span className="text-mute">Muted</span>
					</div>
				</div>
				<div className="color bg-beige">
					<div className="color__desc">
						<span>beige</span>
						<span className="text-mute">Muted</span>
					</div>
				</div>
				<div className="color bg-terracotta">
					<div className="color__desc">
						<span>terracotta</span>
						<span className="text-mute">Muted</span>
					</div>
				</div>
				<div className="color bg-bordeaux">
					<div className="color__desc">
						<span>bordeaux</span>
						<span className="text-mute">Muted</span>
					</div>
				</div>
				<div className="color bg-magenta">
					<div className="color__desc">
						<span>magenta</span>
						<span className="text-mute">Muted</span>
					</div>
				</div>
				<div className="color bg-pale">
					<div className="color__desc">
						<span>pale</span>
						<span className="text-mute">Muted</span>
					</div>
				</div>
				<div className="color bg-pepper">
					<div className="color__desc">
						<span>pepper</span>
						<span className="text-mute">Muted</span>
					</div>
				</div>
				<div className="color bg-sand">
					<div className="color__desc">
						<span>sand</span>
						<span className="text-mute">Muted</span>
					</div>
				</div>
				<div className="color bg-transparent">
					<div className="color__desc">
						<span>transparent</span>
						<span className="text-mute">Muted</span>
					</div>
				</div>
			</div>

			<h1>Shades</h1>

			<h3>Purple</h3>
			<div className="colors mb-5">
				<div className="color bg-purple-5">
					<div className="color__desc">
						<span>purple-5</span>
						<span className="text-mute">Muted</span>
					</div>
				</div>
				<div className="color bg-purple-10">
					<div className="color__desc">
						<span>purple-10</span>
						<span className="text-mute">Muted</span>
					</div>
				</div>
				<div className="color bg-purple-20">
					<div className="color__desc">
						<span>purple-20</span>
						<span className="text-mute">Muted</span>
					</div>
				</div>
				<div className="color bg-purple">
					<div className="color__desc">
						<span>purple</span>
						<span className="text-mute">Muted</span>
					</div>
				</div>

				<div className="color bg-purple-30">
					<div className="color__desc">
						<span>purple-30</span>
						<span className="text-mute">Muted</span>
					</div>
				</div>
			</div>

			<h3>Violet</h3>
			<div className="colors mb-5">
				<div className="color bg-violet-5">
					<div className="color__desc">
						<span>violet-5</span>
						<span className="text-mute">Muted</span>
					</div>
				</div>
				<div className="color bg-violet-10">
					<div className="color__desc">
						<span>violet-10</span>
						<span className="text-mute">Muted</span>
					</div>
				</div>
				<div className="color bg-violet-20">
					<div className="color__desc">
						<span>violet-20</span>
						<span className="text-mute">Muted</span>
					</div>
				</div>
				<div className="color bg-violet">
					<div className="color__desc">
						<span>violet</span>
						<span className="text-mute">Muted</span>
					</div>
				</div>

				<div className="color bg-violet-30">
					<div className="color__desc">
						<span>violet-30</span>
						<span className="text-mute">Muted</span>
					</div>
				</div>
			</div>

			<h3>Royalblue</h3>
			<div className="colors mb-5">
				<div className="color bg-royalblue-5">
					<div className="color__desc">
						<span>royalblue-5</span>
						<span className="text-mute">Muted</span>
					</div>
				</div>
				<div className="color bg-royalblue-10">
					<div className="color__desc">
						<span>royalblue-10</span>
						<span className="text-mute">Muted</span>
					</div>
				</div>
				<div className="color bg-royalblue-20">
					<div className="color__desc">
						<span>royalblue-20</span>
						<span className="text-mute">Muted</span>
					</div>
				</div>
				<div className="color bg-royalblue">
					<div className="color__desc">
						<span>royalblue</span>
						<span className="text-mute">Muted</span>
					</div>
				</div>

				<div className="color bg-royalblue-30">
					<div className="color__desc">
						<span>royalblue-30</span>
						<span className="text-mute">Muted</span>
					</div>
				</div>
			</div>

			<h3>Blue</h3>
			<div className="colors mb-5">
				<div className="color bg-blue-5">
					<div className="color__desc">
						<span>blue-5</span>
						<span className="text-mute">Muted</span>
					</div>
				</div>
				<div className="color bg-blue-10">
					<div className="color__desc">
						<span>blue-10</span>
						<span className="text-mute">Muted</span>
					</div>
				</div>
				<div className="color bg-blue-20">
					<div className="color__desc">
						<span>blue-20</span>
						<span className="text-mute">Muted</span>
					</div>
				</div>
				<div className="color bg-blue">
					<div className="color__desc">
						<span>blue</span>
						<span className="text-mute">Muted</span>
					</div>
				</div>

				<div className="color bg-blue-30">
					<div className="color__desc">
						<span>blue-30</span>
						<span className="text-mute">Muted</span>
					</div>
				</div>
			</div>

			<h3>vintage Blue</h3>
			<div className="colors mb-5">
				<div className="color bg-vintage-blue-5">
					<div className="color__desc">
						<span>vintage-blue-5</span>
						<span className="text-mute">Muted</span>
					</div>
				</div>
				<div className="color bg-vintage-blue-10">
					<div className="color__desc">
						<span>vintage-blue-10</span>
						<span className="text-mute">Muted</span>
					</div>
				</div>
				<div className="color bg-vintage-blue-20">
					<div className="color__desc">
						<span>vintage-blue-20</span>
						<span className="text-mute">Muted</span>
					</div>
				</div>
				<div className="color bg-vintage-blue">
					<div className="color__desc">
						<span>vintage-blue</span>
						<span className="text-mute">Muted</span>
					</div>
				</div>

				<div className="color bg-vintage-blue-30">
					<div className="color__desc">
						<span>vintage-blue-30</span>
						<span className="text-mute">Muted</span>
					</div>
				</div>
			</div>

			<h3>Cyan</h3>
			<div className="colors mb-5">
				<div className="color bg-cyan-5">
					<div className="color__desc">
						<span>cyan-5</span>
						<span className="text-mute">Muted</span>
					</div>
				</div>
				<div className="color bg-cyan-10">
					<div className="color__desc">
						<span>cyan-10</span>
						<span className="text-mute">Muted</span>
					</div>
				</div>

				<div className="color bg-cyan">
					<div className="color__desc">
						<span>cyan</span>
						<span className="text-mute">Muted</span>
					</div>
				</div>
				<div className="color bg-cyan-20">
					<div className="color__desc">
						<span>cyan-20</span>
						<span className="text-mute">Muted</span>
					</div>
				</div>
				<div className="color bg-cyan-30">
					<div className="color__desc">
						<span>cyan-30</span>
						<span className="text-mute">Muted</span>
					</div>
				</div>
			</div>

			<h3>Sea</h3>
			<div className="colors mb-5">
				<div className="color bg-sea-5">
					<div className="color__desc">
						<span>sea-5</span>
						<span className="text-mute">Muted</span>
					</div>
				</div>
				<div className="color bg-sea-10">
					<div className="color__desc">
						<span>sea-10</span>
						<span className="text-mute">Muted</span>
					</div>
				</div>
				<div className="color bg-sea-20">
					<div className="color__desc">
						<span>sea-20</span>
						<span className="text-mute">Muted</span>
					</div>
				</div>
				<div className="color bg-sea">
					<div className="color__desc">
						<span>sea</span>
						<span className="text-mute">Muted</span>
					</div>
				</div>

				<div className="color bg-sea-30">
					<div className="color__desc">
						<span>sea-30</span>
						<span className="text-mute">Muted</span>
					</div>
				</div>
			</div>

			<h3>Olive</h3>
			<div className="colors mb-5">
				<div className="color bg-olive-5">
					<div className="color__desc">
						<span>olive-5</span>
						<span className="text-mute">Muted</span>
					</div>
				</div>
				<div className="color bg-olive-10">
					<div className="color__desc">
						<span>olive-10</span>
						<span className="text-mute">Muted</span>
					</div>
				</div>

				<div className="color bg-olive">
					<div className="color__desc">
						<span>olive</span>
						<span className="text-mute">Muted</span>
					</div>
				</div>
				<div className="color bg-olive-20">
					<div className="color__desc">
						<span>olive-20</span>
						<span className="text-mute">Muted</span>
					</div>
				</div>
				<div className="color bg-olive-30">
					<div className="color__desc">
						<span>olive-30</span>
						<span className="text-mute">Muted</span>
					</div>
				</div>
			</div>

			<h3>Sage</h3>
			<div className="colors mb-5">
				<div className="color bg-sage-5">
					<div className="color__desc">
						<span>sage-5</span>
						<span className="text-mute">Muted</span>
					</div>
				</div>
				<div className="color bg-sage-10">
					<div className="color__desc">
						<span>sage-10</span>
						<span className="text-mute">Muted</span>
					</div>
				</div>
				<div className="color bg-sage-20">
					<div className="color__desc">
						<span>sage-20</span>
						<span className="text-mute">Muted</span>
					</div>
				</div>
				<div className="color bg-sage">
					<div className="color__desc">
						<span>sage</span>
						<span className="text-mute">Muted</span>
					</div>
				</div>

				<div className="color bg-sage-30">
					<div className="color__desc">
						<span>sage-30</span>
						<span className="text-mute">Muted</span>
					</div>
				</div>
			</div>

			<h3>Green</h3>
			<div className="colors mb-5">
				<div className="color bg-green-5">
					<div className="color__desc">
						<span>green-5</span>
						<span className="text-mute">Muted</span>
					</div>
				</div>
				<div className="color bg-green-10">
					<div className="color__desc">
						<span>green-10</span>
						<span className="text-mute">Muted</span>
					</div>
				</div>
				<div className="color bg-green-20">
					<div className="color__desc">
						<span>green-20</span>
						<span className="text-mute">Muted</span>
					</div>
				</div>
				<div className="color bg-green">
					<div className="color__desc">
						<span>green</span>
						<span className="text-mute">Muted</span>
					</div>
				</div>

				<div className="color bg-green-30">
					<div className="color__desc">
						<span>green-30</span>
						<span className="text-mute">Muted</span>
					</div>
				</div>
			</div>

			<h3>Spring</h3>
			<div className="colors mb-5">
				<div className="color bg-spring-5">
					<div className="color__desc">
						<span>spring-5</span>
						<span className="text-mute">Muted</span>
					</div>
				</div>
				<div className="color bg-spring-10">
					<div className="color__desc">
						<span>spring-10</span>
						<span className="text-mute">Muted</span>
					</div>
				</div>
				<div className="color bg-spring-20">
					<div className="color__desc">
						<span>spring-20</span>
						<span className="text-mute">Muted</span>
					</div>
				</div>
				<div className="color bg-spring">
					<div className="color__desc">
						<span>spring</span>
						<span className="text-mute">Muted</span>
					</div>
				</div>
				<div className="color bg-spring-30">
					<div className="color__desc">
						<span>spring-30</span>
						<span className="text-mute">Muted</span>
					</div>
				</div>
			</div>

			<h3>Yellow</h3>
			<div className="colors mb-5">
				<div className="color bg-yellow-5">
					<div className="color__desc">
						<span>yellow-5</span>
						<span className="text-mute">Muted</span>
					</div>
				</div>
				<div className="color bg-yellow-10">
					<div className="color__desc">
						<span>yellow-10</span>
						<span className="text-mute">Muted</span>
					</div>
				</div>
				<div className="color bg-yellow-20">
					<div className="color__desc">
						<span>yellow-20</span>
						<span className="text-mute">Muted</span>
					</div>
				</div>
				<div className="color bg-yellow">
					<div className="color__desc">
						<span>yellow</span>
						<span className="text-mute">Muted</span>
					</div>
				</div>
				<div className="color bg-yellow-30">
					<div className="color__desc">
						<span>yellow-30</span>
						<span className="text-mute">Muted</span>
					</div>
				</div>
			</div>

			<h3>Havanna</h3>
			<div className="colors mb-5">
				<div className="color bg-havanna-5">
					<div className="color__desc">
						<span>havanna-5</span>
						<span className="text-mute">Muted</span>
					</div>
				</div>
				<div className="color bg-havanna-10">
					<div className="color__desc">
						<span>havanna-10</span>
						<span className="text-mute">Muted</span>
					</div>
				</div>
				<div className="color bg-havanna-20">
					<div className="color__desc">
						<span>havanna-20</span>
						<span className="text-mute">Muted</span>
					</div>
				</div>
				<div className="color bg-havanna">
					<div className="color__desc">
						<span>havanna</span>
						<span className="text-mute">Muted</span>
					</div>
				</div>
				<div className="color bg-havanna-30">
					<div className="color__desc">
						<span>havanna-30</span>
						<span className="text-mute">Muted</span>
					</div>
				</div>
			</div>

			<h3>Orange</h3>
			<div className="colors mb-5">
				<div className="color bg-orange-5">
					<div className="color__desc">
						<span>orange-5</span>
						<span className="text-mute">Muted</span>
					</div>
				</div>
				<div className="color bg-orange-10">
					<div className="color__desc">
						<span>orange-10</span>
						<span className="text-mute">Muted</span>
					</div>
				</div>
				<div className="color bg-orange-20">
					<div className="color__desc">
						<span>orange-20</span>
						<span className="text-mute">Muted</span>
					</div>
				</div>
				<div className="color bg-orange">
					<div className="color__desc">
						<span>orange</span>
						<span className="text-mute">Muted</span>
					</div>
				</div>
				<div className="color bg-orange-30">
					<div className="color__desc">
						<span>orange-30</span>
						<span className="text-mute">Muted</span>
					</div>
				</div>
			</div>

			<h3>Salmon</h3>
			<div className="colors mb-5">
				<div className="color bg-salmon-5">
					<div className="color__desc">
						<span>salmon-5</span>
						<span className="text-mute">Muted</span>
					</div>
				</div>
				<div className="color bg-salmon-10">
					<div className="color__desc">
						<span>salmon-10</span>
						<span className="text-mute">Muted</span>
					</div>
				</div>
				<div className="color bg-salmon-20">
					<div className="color__desc">
						<span>salmon-20</span>
						<span className="text-mute">Muted</span>
					</div>
				</div>
				<div className="color bg-salmon">
					<div className="color__desc">
						<span>salmon</span>
						<span className="text-mute">Muted</span>
					</div>
				</div>
				<div className="color bg-salmon-30">
					<div className="color__desc">
						<span>salmon-30</span>
						<span className="text-mute">Muted</span>
					</div>
				</div>
			</div>

			<h3>Red</h3>
			<div className="colors mb-5">
				<div className="color bg-red-5">
					<div className="color__desc">
						<span>red-5</span>
						<span className="text-mute">Muted</span>
					</div>
				</div>
				<div className="color bg-red-10">
					<div className="color__desc">
						<span>red-10</span>
						<span className="text-mute">Muted</span>
					</div>
				</div>
				<div className="color bg-red-20">
					<div className="color__desc">
						<span>red-20</span>
						<span className="text-mute">Muted</span>
					</div>
				</div>
				<div className="color bg-red">
					<div className="color__desc">
						<span>red</span>
						<span className="text-mute">Muted</span>
					</div>
				</div>
				<div className="color bg-red-30">
					<div className="color__desc">
						<span>red-30</span>
						<span className="text-mute">Muted</span>
					</div>
				</div>
			</div>

			<h3>Soft-pink</h3>
			<div className="colors mb-5">
				<div className="color bg-soft-pink-5">
					<div className="color__desc">
						<span>soft-pink-5</span>
						<span className="text-mute">Muted</span>
					</div>
				</div>
				<div className="color bg-soft-pink-10">
					<div className="color__desc">
						<span>soft-pink-10</span>
						<span className="text-mute">Muted</span>
					</div>
				</div>
				<div className="color bg-soft-pink-20">
					<div className="color__desc">
						<span>soft-pink-20</span>
						<span className="text-mute">Muted</span>
					</div>
				</div>
				<div className="color bg-soft-pink">
					<div className="color__desc">
						<span>soft-pink</span>
						<span className="text-mute">Muted</span>
					</div>
				</div>
				<div className="color bg-soft-pink-30">
					<div className="color__desc">
						<span>soft-pink-30</span>
						<span className="text-mute">Muted</span>
					</div>
				</div>
			</div>

			<h3>Nude</h3>
			<div className="colors mb-5">
				<div className="color bg-nude-5">
					<div className="color__desc">
						<span>nude-5</span>
						<span className="text-mute">Muted</span>
					</div>
				</div>
				<div className="color bg-nude-10">
					<div className="color__desc">
						<span>nude-10</span>
						<span className="text-mute">Muted</span>
					</div>
				</div>
				<div className="color bg-nude-20">
					<div className="color__desc">
						<span>nude-20</span>
						<span className="text-mute">Muted</span>
					</div>
				</div>
				<div className="color bg-nude">
					<div className="color__desc">
						<span>nude</span>
						<span className="text-mute">Muted</span>
					</div>
				</div>
				<div className="color bg-nude-30">
					<div className="color__desc">
						<span>nude-30</span>
						<span className="text-mute">Muted</span>
					</div>
				</div>
			</div>

			<h3>Rose</h3>
			<div className="colors mb-5">
				<div className="color bg-rose-5">
					<div className="color__desc">
						<span>rose-5</span>
						<span className="text-mute">Muted</span>
					</div>
				</div>
				<div className="color bg-rose-10">
					<div className="color__desc">
						<span>rose-10</span>
						<span className="text-mute">Muted</span>
					</div>
				</div>
				<div className="color bg-rose-20">
					<div className="color__desc">
						<span>rose-20</span>
						<span className="text-mute">Muted</span>
					</div>
				</div>
				<div className="color bg-rose">
					<div className="color__desc">
						<span>rose</span>
						<span className="text-mute">Muted</span>
					</div>
				</div>
				<div className="color bg-rose-30">
					<div className="color__desc">
						<span>rose-30</span>
						<span className="text-mute">Muted</span>
					</div>
				</div>
			</div>

			<h3>Mulberry</h3>
			<div className="colors mb-5">
				<div className="color bg-mulberry-5">
					<div className="color__desc">
						<span>mulberry-5</span>
						<span className="text-mute">Muted</span>
					</div>
				</div>
				<div className="color bg-mulberry-10">
					<div className="color__desc">
						<span>mulberry-10</span>
						<span className="text-mute">Muted</span>
					</div>
				</div>
				<div className="color bg-mulberry-20">
					<div className="color__desc">
						<span>mulberry-20</span>
						<span className="text-mute">Muted</span>
					</div>
				</div>
				<div className="color bg-mulberry">
					<div className="color__desc">
						<span>mulberry</span>
						<span className="text-mute">Muted</span>
					</div>
				</div>
				<div className="color bg-mulberry-30">
					<div className="color__desc">
						<span>mulberry-30</span>
						<span className="text-mute">Muted</span>
					</div>
				</div>
			</div>

			<h3>Pink</h3>
			<div className="colors mb-5">
				<div className="color bg-pink-5">
					<div className="color__desc">
						<span>pink-5</span>
						<span className="text-mute">Muted</span>
					</div>
				</div>
				<div className="color bg-pink-10">
					<div className="color__desc">
						<span>pink-10</span>
						<span className="text-mute">Muted</span>
					</div>
				</div>
				<div className="color bg-pink-20">
					<div className="color__desc">
						<span>pink-20</span>
						<span className="text-mute">Muted</span>
					</div>
				</div>
				<div className="color bg-pink">
					<div className="color__desc">
						<span>pink</span>
						<span className="text-mute">Muted</span>
					</div>
				</div>
				<div className="color bg-pink-30">
					<div className="color__desc">
						<span>pink-30</span>
						<span className="text-mute">Muted</span>
					</div>
				</div>
			</div>

			<h3>Brown</h3>
			<div className="colors mb-5">
				<div className="color bg-brown-5">
					<div className="color__desc">
						<span>brown-5</span>
						<span className="text-mute">Muted</span>
					</div>
				</div>
				<div className="color bg-brown-10">
					<div className="color__desc">
						<span>brown-10</span>
						<span className="text-mute">Muted</span>
					</div>
				</div>
				<div className="color bg-brown-20">
					<div className="color__desc">
						<span>brown-20</span>
						<span className="text-mute">Muted</span>
					</div>
				</div>
				<div className="color bg-brown">
					<div className="color__desc">
						<span>brown</span>
						<span className="text-mute">Muted</span>
					</div>
				</div>
				<div className="color bg-brown-30">
					<div className="color__desc">
						<span>brown-30</span>
						<span className="text-mute">Muted</span>
					</div>
				</div>
			</div>

			<h1>Swatches </h1>

			<h3>Theme</h3>

			<ColorSwatch theme={true} />


			<h3>Colors</h3>
			<ColorSwatch />


		</section>

	)
}

export default ThemePage;