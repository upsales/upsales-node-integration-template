const Create = (props) => ({
	type: 'create',
	entity: props.entity,
	options: props.options
});

const CloseModal = () => ({
	type: 'closeModal',
});

const Modal = (props) => ({
	type: 'modal',
	fullscreen: props.fullscreen, // boolean
	name: props.name
});

const Navigate = (props) => ({
	type: 'navigate',
	to: props.to, // 'account' | 'company' | 'client' | 'salesboard' | 'accounts' | 'campaigns' | 'forms' | 'activities' | 'calendar' | 'contact' | 'campaign' | 'form' | 'activity' | 'appointment'
	tab: props.tab,
	id: props.id, // number | object (some paths require id to be { id })
	params: props.params
});

const NavigateToConfig = (props) => ({
	type: 'navigate',
	to: 'config',
	user: props.user,
	tab: props.tab
});

const Reload = () => ({
	type: 'reload'
});

const Widget = (props) => ({
	type: 'widget',
	name: props.name // Standard Integration typeId
});

const WidgetRow = (props) => ({
	type: 'widgetRow',
	name: props.name // Standard Integration typeId
});

const Window = (props) => ({
	type: 'window',
	url: props.url,
	window: props.window // 'self' | undefined === will default to '_blank'
});

module.exports = {
	Create,
	CloseModal,
	Modal,
	Navigate,
	NavigateToConfig,
	Reload,
	Widget,
	WidgetRow,
	Window
};
