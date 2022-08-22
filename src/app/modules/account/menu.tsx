export interface MenuItemTypes {
    key: string;
    label: string;
    isTitle?: boolean;
    icon?: string;
    url?: string;
    badge?: {
        variant: string;
        text: string;
    };
    parentKey?: string;
    target?: string;
    children?: MenuItemTypes[];
}

const HORIZONTAL_MENU_ITEMS: MenuItemTypes[] = [
    {
        key: 'dashboard',
        label: 'Dashboard',
        icon: 'home',
		url: '/account/dashboard',
    }, {
        key: 'deposit',
        icon: 'grid',
        label: 'Adicionar Saldo',
        // isTitle: true,
        children: [{
			key: 'deposit-pix',
			label: 'Deposito via Pix',
			isTitle: false,
			icon: 'calendar',
			url: '/account/deposit/pix',
			parentKey: 'deposit',
		}, {
			key: 'deposit-boleto',
			label: 'Deposito via Boleto',
			isTitle: false,
			icon: 'message-square',
			url: '/account/deposit/boleto',
			parentKey: 'deposit',
		}],
    }
];

export { HORIZONTAL_MENU_ITEMS };
