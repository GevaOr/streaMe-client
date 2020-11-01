import "../App.css";
import { Typography } from "@material-ui/core";

function NotFound() {
  return (
    <>
      <Typography color="textPrimary" variant="h1">
        You got 404'ed!
      </Typography>
      <Typography color="textPrimary" variant="h3">
        The page you were looking for does not exist.
      </Typography>
    </>
  );
}
export default NotFound;
