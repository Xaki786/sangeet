import { makeStyles } from "@material-ui/core/styles";

export default {
  Header: makeStyles(theme => ({
    root: {
      flexGrow: 1
    },
    menuButton: {
      marginRight: theme.spacing(2)
    },
    title: {
      textDecoration: "none",
      flexGrow: 1,
      // textTransform: "uppercase",
      fontWeight: "bold"
    }
  }))
};
