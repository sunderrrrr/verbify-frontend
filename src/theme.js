import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        primary: {
            main: '#6750A4', // Фиолетовый (основной цвет Material 3)
        },
        secondary: {
            main: '#958DA5', // Светло-фиолетовый
        },
        background: {
            default: '#FFFBFE', // Фон
            paper: '#FFFBFE',   // Карточки
        },
        error: {
            main: '#B3261E',   // Красный для ошибок
        },
    },
    typography: {
        fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
        button: {
            textTransform: 'none', // Убираем CAPS в кнопках
        },
    },
    shape: {
        borderRadius: 12, // Закругление углов
    },
});

export default theme;