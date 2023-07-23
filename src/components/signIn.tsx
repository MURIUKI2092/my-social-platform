import React from "react";
//@MUI
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
//@redux-tool-kit
import { useGetAllUsersQuery } from "../features/users/usersApi";
import { useAppDispatch } from "../store/Store";
import { setSingleUser } from "../slice/singleUserSlice";
import { UserProps } from "../model/type";

//@router-dom
import { useNavigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";

interface UProps extends UserProps {}
const SignIn = () => {
  const { data, isLoading, isError, error } = useGetAllUsersQuery("Users");
  const navigate = useNavigate();
  if (isError) {
    console.log(">>>>>>>>>>>>>>>>+++++++z", error, "error");
  }
  console.log("::::::::::", data);
  const dispatch = useAppDispatch();
  const [logError, setLogError] = React.useState<string | null>(null);
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const userData = new FormData(event.currentTarget);
    const user = userData.get("user") as String;
    const password = userData.get("password") as String;

    if (!user || !password) {
      setLogError("Email and password cannot be empty!!");
      // console.error("Email and password cannot be empty!!");
      setTimeout(() => {
        setLogError(null); // Remove the error message after 3 seconds
      }, 3000);
      return;
    }
    if (data) {
      const requiredUser = data.find(
        (item: UProps) =>
          item.username === user && item.address.zipcode === password
      );
      if (requiredUser) {
        const userWithPremium = {
          ...requiredUser,
          isPremium: requiredUser.isPremium || false,
        };
        //dispatch single user into the store
        dispatch(setSingleUser(userWithPremium));
        // Navigate to a different page using the useNavigate hook

        navigate("/posts");
      } else {
        setLogError("User with those credentials not found!!");
        // console.error("Email and password cannot be empty!!");
        setTimeout(() => {
          setLogError(null); // Remove the error message after 3 seconds
        }, 3000);
      }
    }
  };

  return (
    <ThemeProvider theme={createTheme()}>
      {isLoading ? (
        <CircularProgress size={80} thickness={3} sx={{ ml: "50vw" }} />
      ) : (
        <Grid
          container
          component="main"
          sx={{ height: "100vh", width: "100vw" }}
        >
          <CssBaseline />
          <Grid
            item
            xs={12}
            sm={4}
            md={7}
            sx={{
              backgroundImage:
                "url(https://source.unsplash.com/random?wallpapers)",
              backgroundRepeat: "no-repeat",
              backgroundColor: (t) =>
                t.palette.mode === "light"
                  ? t.palette.grey[50]
                  : t.palette.grey[900],
              backgroundSize: "cover",
              backgroundPosition: "center",
              flexGrow: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Grid container justifyContent="center">
              <Typography
                component="h1"
                variant="h2"
                color="grey"
                sx={{
                  fontFamily: "Montserrat, sans-serif",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "3px",
                  textShadow: "2px 2px 4px rgba(0, 0, 0, 0.3)",
                }}
              >
                Welcome Back!
              </Typography>
            </Grid>
          </Grid>
          <Grid
            item
            xs={12}
            sm={8}
            md={5}
            component={Paper}
            elevation={6}
            square
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
              p: 4,
            }}
          >
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{
                mt: 1,
                width: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Typography sx={{ color: "red" }}>{logError}</Typography>
              <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Sign in
              </Typography>
              <TextField
                margin="normal"
                required
                fullWidth
                id="user"
                label="Username/Email"
                name="user"
                autoComplete="user"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              <Box mt={5}>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  align="center"
                >
                  {"Copyright © "}
                  <Link color="inherit" href="">
                    My BlogSite
                  </Link>{" "}
                  {new Date().getFullYear()}
                  {"."}
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>
      )}
    </ThemeProvider>
  );
};

export default SignIn;
