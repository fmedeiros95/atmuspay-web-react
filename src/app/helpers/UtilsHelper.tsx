import * as moment from 'moment-timezone';
moment.locale('pt-BR');

const numberFormat = (
	value: number,
	decimalSeparator = ".",
	thousandSeparator = ","
) => {
	const [ integer, decimal ] = value.toString().split(".");
	const formattedInteger = integer.replace(/\B(?=(\d{3})+(?!\d))/g, thousandSeparator);
	return `${formattedInteger}${decimal ? decimalSeparator + decimal : ""}`;
};

const currencyFormat = (
	value: number
): string => {
	return new Intl.NumberFormat('pt-BR', {
		style: 'currency',
		currency: 'BRL',
		minimumFractionDigits: 2,
		maximumFractionDigits: 2
	}).format((value / 100) || 0);
}

const dateFormat = (
	date: Date,
	format: string
): string => {
	let chooseFormat = '';
	switch (format) {
		case 'dataCurta':			chooseFormat = 'DD/M/YY'; break;
		case 'dataCompleta':		chooseFormat = 'DD MMMM YYYY'; break;
		case 'horaCurta':			chooseFormat = 'HH:mm'; break;
		case 'horaCompleta':		chooseFormat = 'HH:mm:ss'; break;
		case 'diaHoraCompleto':		chooseFormat = 'DD [de] MMMM [de] YYYY HH:mm:ss'; break;
		case 'diaHoraCurto':		chooseFormat = 'DD/MM/YYYY HH:mm:ss'; break;
		case 'diaSemanaCompleto':	chooseFormat = 'dddd'; break;
		case 'diaSemanaCurto':		chooseFormat = 'ddd'; break;
		case 'mesCompleto':			chooseFormat = 'MMMM'; break;
		case 'mesCurto':			chooseFormat = 'MMM'; break;
		case 'dataMedia':			chooseFormat = 'DD MMM YYYY'; break;
		case 'dataMediaComHora':	chooseFormat = 'DD MMM YYYY HH:mm:ss'; break;
		case 'diaMesHora':			chooseFormat = 'DD MMM, HH:mm:ss'; break;
		default:					chooseFormat = format; break;
	}

	return moment.tz(date, 'America/Sao_Paulo').format(chooseFormat);
}

const userFullName = (name: string): string => {
	const names = name.split(" ");
	return `${names[0]} ${names[names.length - 1]}`;
};

const userAvatar = (username: string): string => {
	return `http://localhost:3001/v1/user/profile-image/${username}?updated=${new Date().getTime()}`;
};

export {
	userAvatar,
	dateFormat,
	userFullName,
	numberFormat,
	currencyFormat
};
