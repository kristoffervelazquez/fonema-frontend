import { createTheme } from "@mui/material";
import { esES as coreesES } from "@mui/material/locale";

const Theme = createTheme(
  {
    palette: {
      mode: 'dark',
      primary: {
        main: '#3f51b5',
      },
      secondary: {
        main: '#f50057',
      },
    },
  },
  coreesES
);

export default Theme;




