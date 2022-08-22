import noAvatar from '../../images/no-avatar.jpg';
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

const cleanValue = (
	value: string | number
): number => typeof value === 'number' ? value : Number(value.toString().replace(/[^0-9-]/g, ''));

const normalizeValue = (
	value: string | number,
	decimals: number = 2
) => {
	let safeNumber = value;

    if (typeof value === 'string') {
		safeNumber = cleanValue(value);

		if (safeNumber%1 !== 0) {
			safeNumber = safeNumber.toFixed(decimals);
		}
    } else {
      // all input numbers must be a float point (for the cents portion). This is a fallback in case of integer ones.
      safeNumber = Number.isInteger(value) ? Number(value) * (10 ** decimals) : value.toFixed(decimals);
    }

    // divide it by 10 power the maximum fraction digits.
    return cleanValue(safeNumber) / (10 ** decimals);
}

const currencyFormat = (
	value: string | number,
	currency: string = "BRL",
	decimals: number = 2
): string => new Intl.NumberFormat('pt-BR', {
	style: 'currency',
	currency,
	minimumFractionDigits: decimals,
	maximumFractionDigits: decimals
}).format((normalizeValue(value || 0, decimals) / 100) || 0);

const dateFormat = (
	date: Date,
	format: string
): string => {
	let chooseFormat = '';
	switch (format) {
		case 'dataCurta':			chooseFormat = 'DD/MM/YYYY'; break;
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
	// Get first and last name from full name and display it
	const names = name.split(" ");
	return `${names[0]} ${names[names.length - 1]}`;
};

const assetImage = (ressource: string) => `${process.env.REACT_APP_CDN_URL}/${ressource}`;

const userAvatar = (avatar: any): string => {
	const cdn: string = process.env.REACT_APP_CDN_URL || '';
	if (cdn !== '' && avatar?.image) {
		return assetImage(`${avatar?.image}?updated=${new Date(avatar?.updated_at).getTime()}`);
	} else {
		return noAvatar;
	}
};

const applyMask = (
	value: string,
	mask: string
) => {
    let result = "";

    let inc = 0;
    Array.from(value).forEach((letter, index) => {
		if (!mask[index + inc].match(/[0-9]/)) {
			result += mask[index + inc];
			inc++;
		}
		result += letter;
    });
    return result;
}

const onlyDigits = (value: string): string => value.replace(/\D/g, "");

// Is a valid Date? (with Date())
const isValidDate = (date: string): boolean => {
	const normalized = date.split("/").reverse().join("-");
	const dateObj = new Date(normalized);

	return !isNaN(Date.parse(dateObj.toString()));
}

// Is a valid date and have 18 years old?
const isAdult = (birthday: string): boolean => {
	const normalized: string = birthday.split("/").reverse().join("-");
	const ageDate = new Date(normalized);

	return isValidDate(birthday) && ageDate.getFullYear() - new Date().getFullYear() >= 18;
}

/**
 * split array into chunks
 * @param array - array to split
 * @param chunkSize - chunk size
 * @returns
 */
 const splitArray = (array: Array<any>, chunkSize: number) => {
    const chunks = Array(Math.ceil(array.length / chunkSize))
        .fill(1)
        .map((_, index) => index * chunkSize)
        .map((begin) => array.slice(begin, begin + chunkSize));
    return chunks;
};

export {
	isAdult,
	isValidDate,
	onlyDigits,
	applyMask,
	cleanValue,
	userAvatar,
	dateFormat,
	userFullName,
	numberFormat,
	currencyFormat,
	normalizeValue,
	splitArray
};
