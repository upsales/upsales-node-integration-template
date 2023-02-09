const BarchartData = (props) => ({
	title: props.title,
	value: props.value, // number
	color: props.color // Upsales color, defaults to 'bright-blue'
});

const Barchart = (props) => ({
	type: 'barchart',
	data: props.data, // BarchartData[]
	datatype: props.datatype, // 'number' | undefined
	baselineColor: props.baselineColor // Upsales color, defaults to 'grey-10'

});

const Button = (props) => ({
	type: 'button',
	buttonType: props.buttonType, // 'lined', 'link', defaults to 'lined'
	color: props.color, // Upsales color
	fullWidth: props.fullWidth, // boolean
	inline: props.inline, // boolean
	left: props.left, // boolean
	click: props.click,
});

const Col = (props) => ({
	align: props.align, // 'left', 'center', 'right'
	size: props.size, // number, 1 -> 12
	ellipsis: props.ellipsis, // boolean,
	element: props.element // Component
});

const Cols = (props) => ({
	type: 'cols',
	cols: props.cols // Col[]
});

const DropdownOption = (props) => ({
	text: props.text,
	click: props.click
});

const Dropdown = (props) => ({
	type: 'dropdown',
	text: props.text, // text on dropdown toggle button
	options: props.options // DropdownOption[]
});

const EmptyRow = () => ({
	type: 'emptyRow'
});

const Iframe = (props) => ({
	type: 'iframe',
	id: props.id,
	url: props.url, // url to iframe content
	html: props.html, // html to display in iframe
	height: props.height, // number, if iframe should have fixed height
	width: props.width, // number, if iframe should have fixed width
	scrolling: props.scrolling // boolean, defaults to 'auto'
});

const Image = (props) => ({
	type: 'image',
	url: props.url,
	center: props.center,
	click: props.click
});

const InternalLink = (props) => ({
	type: 'internalLink',
	linkType: props.linkType, // 'client' | 'contact'
	linkId: props.linkId,
	text: props.text
});

const Link = (props) => ({
	type: 'link',
	href: props.href,
	text: props.text
});

const Markdown = (props) => ({
	type: 'markdown',
	style: props.style, // css classes as string
	markdown: props.markdown
});

const PlainText = (props) => ({
	type: 'plainText',
	icon: props.icon,
	text: props.text,
	style: props.style, // css classes as string
	size: props.size, // 'sm', 'md', 'lg', 'xl'
	click: props.click
});

const Row = (props) => ({
	type: 'row',
	noWrap: true,
	cols: props.cols, // Component[]
	align: props.align // 'left' | 'right' | 'center' | 'space-between' | 'space-around'
});

const Separator = () => ({
	type: 'separator'
});

const Switch = (props) => ({
	type: 'switch',
	state: props.state, // boolean
	click: props.click
});

const Text = (props) => ({
	type: 'text',
	icon: props.icon,
	text: props.text,
	style: props.style, // css classes as string
	click: props.click
});

const Title = (props) => ({
	type: 'title',
	text: props.text,
	size: props.size // 'xs', 'sm', 'md', 'lg', 'xl'
});

module.exports = {
	Barchart,
	BarchartData,
	Button,
	Col,
	Cols,
	Dropdown,
	DropdownOption,
	EmptyRow,
	Iframe,
	Image,
	InternalLink,
	Link,
	Markdown,
	PlainText,
	Row,
	Separator,
	Switch,
	Text,
	Title
};
