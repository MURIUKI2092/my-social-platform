
// import { Grid, Typography } from "@mui/material";
import { useGetAllUsersQuery } from "../../features/users/usersApi";
import Typography from "@mui/material/Typography";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import CircularProgress from "@mui/material/CircularProgress";
import { UserProps } from "../../model/type";
import Paper from "@mui/material/Paper";
import Avatar from "@mui/material/Avatar";
import stringToColor from "../../utils/color";

// Sample data for demonstration

function stringAvatar(name: string) {
  return {
    sx: {
      bgcolor: stringToColor(name),
    },
    children: `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`,
  };
}
const Profile = () => {
  const { data, isLoading, isError, error } = useGetAllUsersQuery("Users");
  console.log(data, ">>>>>>>>>>>");
  if (isError) {
    console.log(">>>>>>>>>>>>>>>>+++++++z", error, "error");
  }
  return (
    <>
      <Breadcrumbs aria-label="breadcrumb">
        <Link color="inherit" href="/posts">
          Home
        </Link>
        <Link color="inherit" href="/profile">
          Profile
        </Link>
      </Breadcrumbs>
      {isLoading ? (
        <CircularProgress />
      ) : (
        <div>
          {data
            .filter((label: UserProps) => label.id === 1)
            .map((label: UserProps) => (
              <Grid
                container
                spacing={2}
                justifyContent="center"
                alignItems="center"
                direction="column"
                key={label.id}
              >
                {/* Row 1 */}
                <Paper sx={{ width: "100%", mt: 5, py: 2, p: 3 }}>
                  <Grid
                    item
                    container
                    spacing={2}
                    direction="column"
                    justifyContent="center"
                    alignItems="center"
                  >
                    {/* Avatar with user initial */}
                    <Grid item>
                      <Avatar {...stringAvatar(`${label.name}`)} />
                      <Typography
                        variant="h5"
                        component="div"
                        // style={{ marginLeft: "10px" }}
                      >
                        {label.name}
                      </Typography>
                    </Grid>

                    {/* Item rows */}
                    <Grid item container spacing={2}>
                      {/* Row 1 */}
                      <Grid item xs={4}>
                        <Typography variant="h6">Username</Typography>
                        <Typography variant="subtitle2">
                          {label?.username}
                        </Typography>
                      </Grid>
                      <Grid item xs={4}>
                        <Typography variant="h6">Email</Typography>
                        <Typography variant="subtitle2">
                          {label?.email}
                        </Typography>
                      </Grid>
                      <Grid item xs={4}>
                        <Typography variant="h6">Phone Number</Typography>
                        <Typography variant="subtitle2">
                          {label?.phone}
                        </Typography>
                      </Grid>

                      {/* Row 2 */}
                      <Grid item xs={4}>
                        <Typography variant="h6">Website</Typography>
                        <Typography variant="subtitle2">
                          {label?.website}
                        </Typography>
                      </Grid>
                      <Grid item xs={4}>
                        <Typography variant="h6">Company Name</Typography>
                        <Typography variant="subtitle2">
                          {label?.company?.name}
                        </Typography>
                      </Grid>
                      <Grid item xs={4}>
                        <Typography variant="h6">City</Typography>
                        <Typography variant="subtitle2">
                          {label?.address?.city}
                        </Typography>
                      </Grid>

                      {/* Row 3 */}
                      <Grid item xs={4}>
                        <Typography variant="h6">Street</Typography>
                        <Typography variant="subtitle2">
                          {label?.address?.street}
                        </Typography>
                      </Grid>
                      <Grid item xs={4}>
                        <Typography variant="h6">Name</Typography>
                        <Typography variant="subtitle2">
                          {label?.name}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                </Paper>
                {/* Add more rows here */}
              </Grid>
            ))}
        </div>
      )}
    </>
  );
};

export default Profile;
