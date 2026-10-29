import React, { ReactElement } from "react";
import { ColorDefinitions, IconDefinitions } from "../lib/utils/definitions";
import Icon from "../components/UI/Icons/Icon/Icon";
import ColorSwatch from "../components/Base/colors/ColorSwatch";
import { Input } from "../components/Forms/Input/Input";
import { CSSProperties } from "styled-components";

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
						<span className="text-">The usefulness of nonsensical content</span>
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
						<span className="text-">The usefulness of nonsensical content</span>
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

			<h2>Typography</h2>
			<section className="mb-4">
				<div className="grid-x grid-x--third mb-5">
					<div className="app">
						<h4>Headings</h4>
						<h1>Heading 1 – The quick brown fox</h1>
						<h2>Heading 2 – The quick brown fox</h2>
						<h3>Heading 3 – The quick brown fox</h3>
						<h4>Heading 4 – The quick brown fox</h4>
						<h5>Heading 5 – The quick brown fox</h5>
						<h6>Heading 6 – The quick brown fox</h6>
					</div>
					<div>
						<h4>Titles</h4>
						<div className="title-lg">Title lg – Goodshepard</div>
						<div className="title">Title – Goodshepard</div>
						<div className="title-md">Title md – Goodshepard</div>
						<div className="title-sm">Title sm – Goodshepard</div>
						<div className="title-xs">Title xs – Goodshepard</div>
					</div>
					<div>
						<h4>Captions</h4>
						<div className="caption-lg">Caption lg – Goodshepard</div>
						<div className="caption">Caption – Goodshepard</div>
						<div className="caption-sm">Caption sm – Goodshepard</div>
					</div>
				</div>

				<div className="grid-x grid-x--third mb-5">
					<div>
						<h4>Text sizes</h4>
						<p className="text-xxs">This is a text-tiny</p>
						<p className="text-xs">This is a text-xs</p>
						<p className="text-sm">This is a text-sm</p>
						<p className="text-base">This is a base text</p>
						<p className="text-md">This is a text-md</p>
						<p className="text-lg">This is a text-lg</p>
						<p className="text-xl">This is a text-xl</p>
						<p className="text-2xl">This is a text-2xl</p>
						<p className="text-3xl">This is a text-3xl</p>
						<p className="text-4xl">This is a text-4xl</p>
						<p className="text-5xl">This is a text-5xl</p>
						<p className="text-6xl">This is a text-6xl</p>
					</div>
					<div>
						<h4>Text</h4>
						<p className="title">Title - The quick brown fox</p>
						<p className="subtitle">Subtitle - The quick brown fox</p>
						<p className="caption">Caption - The quick brown fox</p>
						<small>Small - The quick brown fox</small>
						<p><em>Em - The quick brown fox</em></p>
						<pre>Pre - The quick brown fox</pre>
						<p className="mb-5"><code>Monospace - The quick brown fox</code></p>
					</div>
					<div className="grid-y">
						<div>
							<h4>Body tekst</h4>
							<p>
								Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa.
							</p>
						</div>
						<div>
							<h4>Text body extra small</h4>
							<p className="text-body-xs">
								Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa.
							</p>
						</div>
						<div>
							<h4>Text body small</h4>
							<p className="text-body-sm">
								Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa.
							</p>
						</div>
						<div>
							<h4>Text body large</h4>
							<p className="text-body-lg">
								Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa.
							</p>
						</div>
					</div>
				</div>
			</section>


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


			<h1>Hello kitty catty, the wylde cat</h1>
			<section className="mb-4">


				<h2>Brand</h2>
				<section className="mb-4">
					<section className="mb-4">
						<div className="colors mb-3">
							<div className="blob drop-shadow-md bg-primary-dark"><div className="color__desc"><span>Primary</span><span className="text-mute">Dark</span></div></div>
							<div className="blob drop-shadow-md bg-primary"><div className="color__desc"><span>Primary</span><span className="text-mute">Base</span></div></div>
							<div className="blob drop-shadow-md bg-primary-light"><div className="color__desc"><span>Primary</span><span className="text-mute">Light</span></div></div>
							<div className="blob drop-shadow-md bg-primary-subtle"><div className="color__desc"><span>Primary</span><span className="text-mute">Subtle</span></div></div>
						</div>
					</section>
					<section className="mb-4">
						<div className="colors mb-3">
							<div className="blob drop-shadow-md bg-secondary-dark"><div className="color__desc"><span>Secondary</span><span className="text-mute">Dark</span></div></div>
							<div className="blob drop-shadow-md bg-secondary"><div className="color__desc"><span>Secondary</span><span className="text-mute">Base</span></div></div>
							<div className="blob drop-shadow-md bg-secondary-light"><div className="color__desc"><span>Secondary</span><span className="text-mute">Light</span></div></div>
							<div className="blob drop-shadow-md bg-secondary-subtle"><div className="color__desc"><span>Secondary</span><span className="text-mute">Subtle</span></div></div>
						</div>
					</section>
					<section className="mb-4">
						<div className="colors mb-3">
							<div className="blob drop-shadow-md bg-tertiary-dark"><div className="color__desc"><span>Tertiary</span><span className="text-mute">Dark</span></div></div>
							<div className="blob drop-shadow-md bg-tertiary"><div className="color__desc"><span>Tertiary</span><span className="text-mute">Base</span></div></div>
							<div className="blob drop-shadow-md bg-tertiary-light"><div className="color__desc"><span>Tertiary</span><span className="text-mute">Light</span></div></div>
							<div className="blob drop-shadow-md bg-tertiary-subtle"><div className="color__desc"><span>Tertiary</span><span className="text-mute">Subtle</span></div></div>
						</div>
					</section>

				</section>


				<h2>Brand shades</h2>
				<section className="mb-4">
					<section className="mb-4">
						<div className="colors mb-3">
							<div className="color drop-shadow-md bg-cotton-dark"><div className="color__desc"><span>Cotton</span><span className="text-mute">Dark</span></div></div>
							<div className="color drop-shadow-md bg-cotton"><div className="color__desc"><span>Cotton</span><span className="text-mute">Base</span></div></div>
							<div className="color drop-shadow-md bg-cotton-light"><div className="color__desc"><span>Cotton</span><span className="text-mute">Light</span></div></div>
							<div className="color drop-shadow-md bg-cotton-subtle"><div className="color__desc"><span>Cotton</span><span className="text-mute">Subtle</span></div></div>
						</div>
					</section>
					<section className="mb-4">
						<div className="colors mb-3">
							<div className="color drop-shadow-md bg-marine-dark"><div className="color__desc"><span>Marine</span><span className="text-mute">Dark</span></div></div>
							<div className="color drop-shadow-md bg-marine"><div className="color__desc"><span>Marine</span><span className="text-mute">Base</span></div></div>
							<div className="color drop-shadow-md bg-marine-light"><div className="color__desc"><span>Marine</span><span className="text-mute">Light</span></div></div>
							<div className="color drop-shadow-md bg-marine-subtle"><div className="color__desc"><span>Marine</span><span className="text-mute">Subtle</span></div></div>
						</div>
					</section>
					<section className="mb-4">
						<div className="colors mb-3">
							<div className="color drop-shadow-md bg-ice-dark"><div className="color__desc"><span>Ice</span><span className="text-mute">Dark</span></div></div>
							<div className="color drop-shadow-md bg-ice"><div className="color__desc"><span>Ice</span><span className="text-mute">Base</span></div></div>
							<div className="color drop-shadow-md bg-ice-light"><div className="color__desc"><span>Ice</span><span className="text-mute">Light</span></div></div>
							<div className="color drop-shadow-md bg-ice-subtle"><div className="color__desc"><span>Ice</span><span className="text-mute">Subtle</span></div></div>
						</div>
					</section>
					<section className="mb-4">
						<div className="colors mb-3">
							<div className="color drop-shadow-md bg-cyprus-dark"><div className="color__desc"><span>Cyprus</span><span className="text-mute">Dark</span></div></div>
							<div className="color drop-shadow-md bg-cyprus"><div className="color__desc"><span>Cyprus</span><span className="text-mute">Base</span></div></div>
							<div className="color drop-shadow-md bg-cyprus-light"><div className="color__desc"><span>Cyprus</span><span className="text-mute">Light</span></div></div>
							<div className="color drop-shadow-md bg-cyprus-subtle"><div className="color__desc"><span>Cyprus</span><span className="text-mute">Subtle</span></div></div>
						</div>
					</section>
					<section className="mb-4">
						<div className="colors mb-3">
							<div className="color drop-shadow-md bg-highland-dark"><div className="color__desc"><span>Highland</span><span className="text-mute">Dark</span></div></div>
							<div className="color drop-shadow-md bg-highland"><div className="color__desc"><span>Highland</span><span className="text-mute">Base</span></div></div>
							<div className="color drop-shadow-md bg-highland-light"><div className="color__desc"><span>Highland</span><span className="text-mute">Light</span></div></div>
							<div className="color drop-shadow-md bg-highland-subtle"><div className="color__desc"><span>Highland</span><span className="text-mute">Subtle</span></div></div>
						</div>
					</section>
					<section className="mb-4">
						<div className="colors mb-3">
							<div className="color drop-shadow-md bg-dull-orange-dark"><div className="color__desc"><span>Dull orange</span><span className="text-mute">Dark</span></div></div>
							<div className="color drop-shadow-md bg-dull-orange"><div className="color__desc"><span>Dull orange</span><span className="text-mute">Base</span></div></div>
							<div className="color drop-shadow-md bg-dull-orange-light"><div className="color__desc"><span>Dull orange</span><span className="text-mute">Light</span></div></div>
							<div className="color drop-shadow-md bg-dull-orange-subtle"><div className="color__desc"><span>Dull orange</span><span className="text-mute">Subtle</span></div></div>
						</div>
					</section>
					<section className="mb-4">
						<div className="colors mb-3">
							<div className="color drop-shadow-md bg-cherry-dark"><div className="color__desc"><span>Cherry</span><span className="text-mute">Dark</span></div></div>
							<div className="color drop-shadow-md bg-cherry"><div className="color__desc"><span>Cherry</span><span className="text-mute">Base</span></div></div>
							<div className="color drop-shadow-md bg-cherry-light"><div className="color__desc"><span>Cherry</span><span className="text-mute">Light</span></div></div>
							<div className="color drop-shadow-md bg-cherry-subtle"><div className="color__desc"><span>Cherry</span><span className="text-mute">Subtle</span></div></div>
						</div>
					</section>
					<section className="mb-4">
						<div className="colors mb-3">
							<div className="color drop-shadow-md bg-golden-dark"><div className="color__desc"><span>Golden</span><span className="text-mute">Dark</span></div></div>
							<div className="color drop-shadow-md bg-golden"><div className="color__desc"><span>Golden</span><span className="text-mute">Base</span></div></div>
							<div className="color drop-shadow-md bg-golden-light"><div className="color__desc"><span>Golden</span><span className="text-mute">Light</span></div></div>
							<div className="color drop-shadow-md bg-golden-subtle"><div className="color__desc"><span>Golden</span><span className="text-mute">Subtle</span></div></div>
						</div>
					</section>
					<section className="mb-4">
						<div className="colors mb-3">
							<div className="color drop-shadow-md bg-cottage-blue-dark"><div className="color__desc"><span>Cottage blue</span><span className="text-mute">Dark</span></div></div>
							<div className="color drop-shadow-md bg-cottage-blue"><div className="color__desc"><span>Cottage blue</span><span className="text-mute">Base</span></div></div>
							<div className="color drop-shadow-md bg-cottage-blue-light"><div className="color__desc"><span>Cottage blue</span><span className="text-mute">Light</span></div></div>
							<div className="color drop-shadow-md bg-cottage-blue-subtle"><div className="color__desc"><span>Cottage blue</span><span className="text-mute">Subtle</span></div></div>
						</div>
					</section>
				</section>

				<h2>Colors</h2>
				<section className="mb-4">

					<div className="blob drop-shadow-md bg-primary">primary</div>
					<div className="blob drop-shadow-md bg-secondary">secondary</div>
					<div className="blob drop-shadow-md bg-tertiary">tertiary</div>
					<div className="blob drop-shadow-md bg-hot-pink">hot-pink</div>
					<div className="blob drop-shadow-md bg-bordeaux">bordeaux</div>
					<div className="blob drop-shadow-md bg-magenta">magenta</div>
					<div className="blob drop-shadow-md bg-pale">pale</div>

					<div className="blob drop-shadow-md bg-black">black</div>
					<div className="blob drop-shadow-md bg-dark-brown">dark-brown</div>
					<div className="blob drop-shadow-md bg-stone">stone</div>

					<div className="blob drop-shadow-md bg-pepper">pepper</div>
					<div className="blob drop-shadow-md bg-sand">sand</div>
					<div className="blob drop-shadow-md bg-beige">beige</div>
					<div className="blob drop-shadow-md bg-isabelline">isabelline</div>
					<div className="blob drop-shadow-md bg-offwhite">offwhite</div>
					<div className="blob drop-shadow-md bg-white">white</div>

					<div className="blob drop-shadow-md bg-chinese-white">chinese-white</div>
					<div className="blob drop-shadow-md bg-terracotta">terracotta</div>
					<div className="blob drop-shadow-md bg-overcast">overcast</div>
					<div className="blob drop-shadow-md bg-silver">silver</div>

				</section>

				<h2>Color shades</h2>
				<section className="mb-4">
					<div className="colors mb-3">
						<div className="color  bg-purple-dark"><div className="color__desc"><span>Purple</span><span className="text-mute">Dark</span></div></div>
						<div className="color  bg-purple"><div className="color__desc"><span>Purple</span><span className="text-mute">Base</span></div></div>
						<div className="color  bg-purple-light"><div className="color__desc"><span>Purple</span><span className="text-mute">Light</span></div></div>
						<div className="color  bg-purple-subtle"><div className="color__desc"><span>Purple</span><span className="text-mute">Subtle</span></div></div>
					</div>

					<div className="colors mb-3">
						<div className="color  bg-violet-dark"><div className="color__desc"><span>Violet</span><span className="text-mute">Dark</span></div></div>
						<div className="color  bg-violet"><div className="color__desc"><span>Violet</span><span className="text-mute">Base</span></div></div>
						<div className="color  bg-violet-light"><div className="color__desc"><span>Violet</span><span className="text-mute">Light</span></div></div>
						<div className="color  bg-violet-subtle"><div className="color__desc"><span>Violet</span><span className="text-mute">Subtle</span></div></div>
					</div>

					<div className="colors mb-3">
						<div className="color  bg-royalblue-dark"><div className="color__desc"><span>Royalblue</span><span className="text-mute">Dark</span></div></div>
						<div className="color  bg-royalblue"><div className="color__desc"><span>Royalblue</span><span className="text-mute">Base</span></div></div>
						<div className="color  bg-royalblue-light"><div className="color__desc"><span>Royalblue</span><span className="text-mute">Light</span></div></div>
						<div className="color  bg-royalblue-subtle"><div className="color__desc"><span>Royalblue</span><span className="text-mute">Subtle</span></div></div>
					</div>

					<div className="colors mb-3">
						<div className="color  bg-blue-dark"><div className="color__desc"><span>Blue</span><span className="text-mute">Dark</span></div></div>
						<div className="color  bg-blue"><div className="color__desc"><span>Blue</span><span className="text-mute">Base</span></div></div>
						<div className="color  bg-blue-light"><div className="color__desc"><span>Blue</span><span className="text-mute">Light</span></div></div>
						<div className="color  bg-blue-subtle"><div className="color__desc"><span>Blue</span><span className="text-mute">Subtle</span></div></div>
					</div>

					<div className="colors mb-3">
						<div className="color  bg-vintage-blue-dark"><div className="color__desc"><span>Vintage blue</span><span className="text-mute">Dark</span></div></div>
						<div className="color  bg-vintage-blue"><div className="color__desc"><span>Vintage blue</span><span className="text-mute">Base</span></div></div>
						<div className="color  bg-vintage-blue-light"><div className="color__desc"><span>Vintage blue</span><span className="text-mute">Light</span></div></div>
						<div className="color  bg-vintage-blue-subtle"><div className="color__desc"><span>Vintage blue</span><span className="text-mute">Subtle</span></div></div>
					</div>

					<div className="colors mb-3">
						<div className="color  bg-cyan-dark"><div className="color__desc"><span>Cyan</span><span className="text-mute">Dark</span></div></div>
						<div className="color  bg-cyan"><div className="color__desc"><span>Cyan</span><span className="text-mute">Base</span></div></div>
						<div className="color  bg-cyan-light"><div className="color__desc"><span>Cyan</span><span className="text-mute">Light</span></div></div>
						<div className="color  bg-cyan-subtle"><div className="color__desc"><span>Cyan</span><span className="text-mute">Subtle</span></div></div>
					</div>

					<div className="colors mb-3">
						<div className="color  bg-sea-dark"><div className="color__desc"><span>Sea</span><span className="text-mute">Dark</span></div></div>
						<div className="color  bg-sea"><div className="color__desc"><span>Sea</span><span className="text-mute">Base</span></div></div>
						<div className="color  bg-sea-light"><div className="color__desc"><span>Sea</span><span className="text-mute">Light</span></div></div>
						<div className="color  bg-sea-subtle"><div className="color__desc"><span>Sea</span><span className="text-mute">Subtle</span></div></div>
					</div>

					<div className="colors mb-3">
						<div className="color  bg-olive-dark"><div className="color__desc"><span>Olive</span><span className="text-mute">Dark</span></div></div>
						<div className="color  bg-olive"><div className="color__desc"><span>Olive</span><span className="text-mute">Base</span></div></div>
						<div className="color  bg-olive-light"><div className="color__desc"><span>Olive</span><span className="text-mute">Light</span></div></div>
						<div className="color  bg-olive-subtle"><div className="color__desc"><span>Olive</span><span className="text-mute">Subtle</span></div></div>
					</div>

					<div className="colors mb-3">
						<div className="color  bg-sage-dark"><div className="color__desc"><span>Sage</span><span className="text-mute">Dark</span></div></div>
						<div className="color  bg-sage"><div className="color__desc"><span>Sage</span><span className="text-mute">Base</span></div></div>
						<div className="color  bg-sage-light"><div className="color__desc"><span>Sage</span><span className="text-mute">Light</span></div></div>
						<div className="color  bg-sage-subtle"><div className="color__desc"><span>Sage</span><span className="text-mute">Subtle</span></div></div>
					</div>

					<div className="colors mb-3">
						<div className="color  bg-green-dark"><div className="color__desc"><span>Green</span><span className="text-mute">Dark</span></div></div>
						<div className="color  bg-green"><div className="color__desc"><span>Green</span><span className="text-mute">Base</span></div></div>
						<div className="color  bg-green-light"><div className="color__desc"><span>Green</span><span className="text-mute">Light</span></div></div>
						<div className="color  bg-green-subtle"><div className="color__desc"><span>Green</span><span className="text-mute">Subtle</span></div></div>
					</div>

					<div className="colors mb-3">
						<div className="color  bg-spring-dark"><div className="color__desc"><span>Spring</span><span className="text-mute">Dark</span></div></div>
						<div className="color  bg-spring"><div className="color__desc"><span>Spring</span><span className="text-mute">Base</span></div></div>
						<div className="color  bg-spring-light"><div className="color__desc"><span>Spring</span><span className="text-mute">Light</span></div></div>
						<div className="color  bg-spring-subtle"><div className="color__desc"><span>Spring</span><span className="text-mute">Subtle</span></div></div>
					</div>

					<div className="colors mb-3">
						<div className="color  bg-yellow-dark"><div className="color__desc"><span>Yellow</span><span className="text-mute">Dark</span></div></div>
						<div className="color  bg-yellow"><div className="color__desc"><span>Yellow</span><span className="text-mute">Base</span></div></div>
						<div className="color  bg-yellow-light"><div className="color__desc"><span>Yellow</span><span className="text-mute">Light</span></div></div>
						<div className="color  bg-yellow-subtle"><div className="color__desc"><span>Yellow</span><span className="text-mute">Subtle</span></div></div>
					</div>

					<div className="colors mb-3">
						<div className="color  bg-havanna-dark"><div className="color__desc"><span>Havanna</span><span className="text-mute">Dark</span></div></div>
						<div className="color  bg-havanna"><div className="color__desc"><span>Havanna</span><span className="text-mute">Base</span></div></div>
						<div className="color  bg-havanna-light"><div className="color__desc"><span>Havanna</span><span className="text-mute">Light</span></div></div>
						<div className="color  bg-havanna-subtle"><div className="color__desc"><span>Havanna</span><span className="text-mute">Subtle</span></div></div>
					</div>

					<div className="colors mb-3">
						<div className="color  bg-orange-dark"><div className="color__desc"><span>Orange</span><span className="text-mute">Dark</span></div></div>
						<div className="color  bg-orange"><div className="color__desc"><span>Orange</span><span className="text-mute">Base</span></div></div>
						<div className="color  bg-orange-light"><div className="color__desc"><span>Orange</span><span className="text-mute">Light</span></div></div>
						<div className="color  bg-orange-subtle"><div className="color__desc"><span>Orange</span><span className="text-mute">Subtle</span></div></div>
					</div>

					<div className="colors mb-3">
						<div className="color  bg-salmon-dark"><div className="color__desc"><span>Salmon</span><span className="text-mute">Dark</span></div></div>
						<div className="color  bg-salmon"><div className="color__desc"><span>Salmon</span><span className="text-mute">Base</span></div></div>
						<div className="color  bg-salmon-light"><div className="color__desc"><span>Salmon</span><span className="text-mute">Light</span></div></div>
						<div className="color  bg-salmon-subtle"><div className="color__desc"><span>Salmon</span><span className="text-mute">Subtle</span></div></div>
					</div>

					<div className="colors mb-3">
						<div className="color  bg-red-dark"><div className="color__desc"><span>Red</span><span className="text-mute">Dark</span></div></div>
						<div className="color  bg-red"><div className="color__desc"><span>Red</span><span className="text-mute">Base</span></div></div>
						<div className="color  bg-red-light"><div className="color__desc"><span>Red</span><span className="text-mute">Light</span></div></div>
						<div className="color  bg-red-subtle"><div className="color__desc"><span>Red</span><span className="text-mute">Subtle</span></div></div>
					</div>

					<div className="colors mb-3">
						<div className="color  bg-rose-dark"><div className="color__desc"><span>Rose</span><span className="text-mute">Dark</span></div></div>
						<div className="color  bg-rose"><div className="color__desc"><span>Rose</span><span className="text-mute">Base</span></div></div>
						<div className="color  bg-rose-light"><div className="color__desc"><span>Rose</span><span className="text-mute">Light</span></div></div>
						<div className="color  bg-rose-subtle"><div className="color__desc"><span>Rose</span><span className="text-mute">Subtle</span></div></div>
					</div>

					<div className="colors mb-3">
						<div className="color  bg-soft-pink-dark"><div className="color__desc"><span>Soft pink</span><span className="text-mute">Dark</span></div></div>
						<div className="color  bg-soft-pink"><div className="color__desc"><span>Soft pink</span><span className="text-mute">Base</span></div></div>
						<div className="color  bg-soft-pink-light"><div className="color__desc"><span>Soft pink</span><span className="text-mute">Light</span></div></div>
						<div className="color  bg-soft-pink-subtle"><div className="color__desc"><span>Soft pink</span><span className="text-mute">Subtle</span></div></div>
					</div>

					<div className="colors mb-3">
						<div className="color  bg-nude-dark"><div className="color__desc"><span>Nude</span><span className="text-mute">Dark</span></div></div>
						<div className="color  bg-nude"><div className="color__desc"><span>Nude</span><span className="text-mute">Base</span></div></div>
						<div className="color  bg-nude-light"><div className="color__desc"><span>Nude</span><span className="text-mute">Light</span></div></div>
						<div className="color  bg-nude-subtle"><div className="color__desc"><span>Nude</span><span className="text-mute">Subtle</span></div></div>
					</div>

					<div className="colors mb-3">
						<div className="color  bg-mulberry-dark"><div className="color__desc"><span>Mulberry</span><span className="text-mute">Dark</span></div></div>
						<div className="color  bg-mulberry"><div className="color__desc"><span>Mulberry</span><span className="text-mute">Base</span></div></div>
						<div className="color  bg-mulberry-light"><div className="color__desc"><span>Mulberry</span><span className="text-mute">Light</span></div></div>
						<div className="color  bg-mulberry-subtle"><div className="color__desc"><span>Mulberry</span><span className="text-mute">Subtle</span></div></div>
					</div>

					<div className="colors mb-3">
						<div className="color  bg-pink-dark"><div className="color__desc"><span>Pink</span><span className="text-mute">Dark</span></div></div>
						<div className="color  bg-pink"><div className="color__desc"><span>Pink</span><span className="text-mute">Base</span></div></div>
						<div className="color  bg-pink-light"><div className="color__desc"><span>Pink</span><span className="text-mute">Light</span></div></div>
						<div className="color  bg-pink-subtle"><div className="color__desc"><span>Pink</span><span className="text-mute">Subtle</span></div></div>
					</div>

					<div className="colors mb-3">
						<div className="color  bg-brown-dark"><div className="color__desc"><span>Brown</span><span className="text-mute">Dark</span></div></div>
						<div className="color  bg-brown"><div className="color__desc"><span>Brown</span><span className="text-mute">Base</span></div></div>
						<div className="color  bg-brown-light"><div className="color__desc"><span>Brown</span><span className="text-mute">Light</span></div></div>
						<div className="color  bg-brown-subtle"><div className="color__desc"><span>Brown</span><span className="text-mute">Subtle</span></div></div>
					</div>
				</section>

			</section>

			<h1>Swatches </h1>

			<h3>Theme</h3>

			<ColorSwatch theme={true} />


			<h3>Colors</h3>
			<ColorSwatch />


		</section>

	)
}

export default ThemePage;