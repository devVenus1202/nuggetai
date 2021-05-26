import { createMuiTheme } from '@material-ui/core/styles';
import yellow from '@material-ui/core/colors/yellow';
import green from '@material-ui/core/colors/green';
import red from '@material-ui/core/colors/red';

export default createMuiTheme({
  palette: {
    primary: {
      main: '#dd628f',
    },
    secondary: {
      main: '#826af9',
    },
    auth: '#826af9',
    danger: red,
  },
}); 
