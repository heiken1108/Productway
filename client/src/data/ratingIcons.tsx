import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';
import SentimentSatisfiedIcon from '@mui/icons-material/SentimentSatisfied';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAltOutlined';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import SentimentVerySatisfiedIcon from '@mui/icons-material/SentimentVerySatisfied';

/**
 * This object contains the rating icons
 */
const customIcons: {
	[index: string]: {
		icon: React.ReactElement;
		label: string;
	};
} = {
	0: { icon: <></>, label: 'No rating' },
	1: {
		icon: <SentimentVeryDissatisfiedIcon color="error" fontSize="large" />,
		label: 'Very Dissatisfied',
	},
	2: {
		icon: <SentimentDissatisfiedIcon color="error" fontSize="large" />,
		label: 'Dissatisfied',
	},
	3: {
		icon: <SentimentSatisfiedIcon color="warning" fontSize="large" />,
		label: 'Neutral',
	},
	4: {
		icon: <SentimentSatisfiedAltIcon color="success" fontSize="large" />,
		label: 'Satisfied',
	},
	5: {
		icon: <SentimentVerySatisfiedIcon color="success" fontSize="large" />,
		label: 'Very Satisfied',
	},
};

export default customIcons;
