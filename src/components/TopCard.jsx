import "../App.css";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  card: {
    backgroundColor: "rgba(255, 255, 255, 0.25)",
    paddingBottom: "5px",
    marginTop: "10px",
    textAlign: "center",
    textDecoration: "none",
    color: "white",
    borderRadius: "5px",
    "&:hover": {
      backgroundColor: "rgba(255, 255, 255, 0.4)",
      textShadow: "-1px 1px 5px black",
    },
  },
  image: {
    width: "180px",
    height: "180px",
    borderRadius: "5px 5px 0 0",
  },
  title: {
    padding: "5px",
    fontSize: "1.5em",
    fontWeight: "600",
  },
  creator: {
    color: "rgba(255, 255, 255, 0.6)",
  },
}));

function TopCard(props) {
  const classes = useStyles();

  return (
    <Link className={classes.card} to={`/${props.type}/${props.id}`}>
      <img className={classes.image} src={props.imgUrl} alt={props.title} />
      <div>
        <div className={classes.title}>{props.title}</div>
        <div className={classes.creator}>{props.creator}</div>
      </div>
    </Link>
  );
}

export default TopCard;
