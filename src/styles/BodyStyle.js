import { makeStyles } from '@material-ui/core/styles';
import palette from './palette.json';

export const useBodyStyle = makeStyles({
  root: {
    backgroundColor: palette.primary,
    padding: "0 20px",
  },
});
