import React from "react";
//@mui
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";
import TextField from "@mui/material/TextField";
import SendIcon from "@mui/icons-material/Send";
import IconButton from "@mui/material/IconButton";
import CircularProgress from "@mui/material/CircularProgress";
import Avatar from "@mui/material/Avatar";
import { styled } from "@mui/material/styles";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import MuiAccordion, { AccordionProps } from "@mui/material/Accordion";
import MuiAccordionSummary, {
  AccordionSummaryProps,
} from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import PersonRemoveAlt1Icon from "@mui/icons-material/PersonRemoveAlt1";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";

//@redux-tool-kit
// import { useDispatch } from "react-redux";
import { useGetAllUsersQuery } from "../../features/users/usersApi";
import { useAppDispatch } from "../../store/Store";
import { UserProps } from "../../model/type";

//@utils
import stringToColor from "../../utils/color";
import { addFollower, removeFollower } from "../../slice/followersSlice";

const Accordion = styled((props: AccordionProps) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  "&:not(:last-child)": {
    borderBottom: 0,
  },
  "&:before": {
    display: "none",
  },
}));

const AccordionSummary = styled((props: AccordionSummaryProps) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: "0.9rem" }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === "dark"
      ? "rgba(255, 255, 255, .05)"
      : "rgba(0, 0, 0, .03)",
  flexDirection: "row-reverse",
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(90deg)",
  },
  "& .MuiAccordionSummary-content": {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: "1px solid rgba(0, 0, 0, .125)",
}));
const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  height: 280,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};
interface UProps extends UserProps {}
function stringAvatar(name: string) {
  return {
    sx: {
      bgcolor: stringToColor(name),
    },
    children: `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`,
  };
}
const Users = () => {
  const [expanded, setExpanded] = React.useState<string | false>("");
  const [selectedUser, setSelectedUser] = React.useState<UProps | null>(null);
  const dispatch = useAppDispatch();

  const handleAddFollower = (followerId: any) => {
    dispatch(addFollower(followerId));
    setMessage("Added Successfully!");
    setTimeout(() => {
      setMessage("");
    }, 3000);
  };
  const removeUserFollower = (followerId: any) => {
    dispatch(removeFollower(followerId));
    setMessage("removed Successfully!");
    setTimeout(() => {
      setMessage("");
    }, 3000);
  };
  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
        setExpanded(newExpanded ? panel : false);
        console.log(event);
    };
  const [allComments, setAllComments] = React.useState<string[]>([]);
  const [comment, setComment] = React.useState(false);
  const [message, setMessage] = React.useState(" ");
  const [open, setOpen] = React.useState(false);
  const handleOpen = (user: UProps) => {
    setSelectedUser(user);
    setOpen(true);
  };
    console.log(allComments);
  const handleClose = () => setOpen(false);
  const { data, isLoading, isError, error } = useGetAllUsersQuery("Users");
  console.log(data, ">>>>>>>>>>>");
  //   if (data) {
  //     const newData = data.map((singleData: UProps) => ({
  //       ...singleData, // Destructure the existing properties of the object
  //       isBlocked: false, // Add the isBlocked property with a default value of false
  //       isFriend: false, // Add the isFriend property with a default value of false
  //     }));
  //   }

  const addComments = () => {
    setComment(!comment);
  };
  const handleSubmit = () => {
    const inputElement = document.getElementById(
      "message-input"
    ) as HTMLInputElement;
    const newMessage = inputElement.value;
    if (newMessage) {
      setAllComments((prevMessages) => [...prevMessages, newMessage]);
      inputElement.value = ""; // Reset the TextField after submission.
    }
  };
  if (isError) {
    console.log(">>>>>>>>>>>>>>>>+++++++z", error, "error");
  }
  return (
    <>
      <Breadcrumbs aria-label="breadcrumb">
        <Link color="inherit" href="/posts">
          Home
        </Link>
        <Link color="inherit" href="/users">
          Users
        </Link>
      </Breadcrumbs>

      {isLoading ? (
        <CircularProgress />
      ) : (
        <div>
          {data.map((label: UProps, index: number) => {
            return (
              <Card
                key={index}
                sx={{
                  width: "100%",
                  margin: "auto",
                  marginTop: "20px",
                  cursor: "pointer",
                }}
              >
                <CardContent>
                  <Box display="flex" alignItems="center">
                    <Avatar {...stringAvatar(`${label.name}`)} />
                    <Typography
                      variant="h5"
                      component="div"
                      style={{ marginLeft: "10px" }}
                    >
                      {label.username}
                    </Typography>
                  </Box>
                </CardContent>
                <Typography onClick={() => handleOpen(label)} sx={{color:"rebeccapurple",ml:"90%"}}>
                  More<OpenInNewIcon/>
                </Typography>
                <CardActions>
                  <Accordion
                    sx={{ width: "100%" }}
                    expanded={expanded === `panel${label.id}`}
                    onChange={handleChange(`panel${label.id}`)}
                  >
                    <AccordionSummary
                      aria-controls="panel1d-content"
                      id="panel1d-header"
                    >
                      <Typography>Other Details</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Grid
                        container
                        spacing={2}
                        justifyContent="center"
                        alignItems="center"
                      >
                        {/* Row 1 */}
                        <Grid item xs={4}>
                          <Typography variant="h6">Username</Typography>
                          <Typography variant="body1">
                            {label.username}
                          </Typography>
                        </Grid>
                        <Grid item xs={4}>
                          <Typography variant="h6">email</Typography>
                          <Typography variant="body1">{label.email}</Typography>
                        </Grid>
                        <Grid item xs={4}>
                          <Typography variant="h6">Phone Number</Typography>
                          <Typography variant="body1">{label.phone}</Typography>
                        </Grid>

                        {/* Row 2 */}
                        <Grid item xs={4}>
                          <Typography variant="h6">Website</Typography>
                          <Typography variant="body1">
                            {label.website}
                          </Typography>
                        </Grid>
                        <Grid item xs={4}>
                          <Typography variant="h6">Company Name</Typography>
                          <Typography variant="body1">
                            {label.company["name"]}
                          </Typography>
                        </Grid>
                        <Grid item xs={4}>
                          <Typography variant="h6">City</Typography>
                          <Typography variant="body1">
                            {label.address["city"]}
                          </Typography>
                        </Grid>

                        {/* Row 3 */}
                        <Grid item xs={4}>
                          <Typography variant="h6">Street</Typography>
                          <Typography variant="body1">
                            {label.address["street"]}
                          </Typography>
                        </Grid>
                        {/* Add more rows here */}
                      </Grid>
                    </AccordionDetails>
                  </Accordion>
                </CardActions>
              </Card>
            );
          })}
        </div>
      )}

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography variant="subtitle2" sx={{ color: "blue" }}>
            {message}
          </Typography>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Click below to add friend or write a message
          </Typography>
          <Divider orientation="horizontal" flexItem sx={{ mt: 3 }} />
          <Grid container justifyContent="space-between">
            <Grid
              item
              xs={4}
              container
              justifyContent="space-between"
              alignItems="center"
              sx={{ display: "flex", alignItems: "center" }}
            >
              <Typography
                id="modal-modal-description"
                sx={{
                  mt: 1,
                  mr: "85%",
                  color: "rgba(0, 0, 0, 0.4)",
                  fontSize: "12px",
                }}
                variant="h6"
                align="right"
              >
                <PersonAddIcon
                  sx={{ cursor: "pointer", fontSize: "20px" }}
                  onClick={() => handleAddFollower(selectedUser?.id)}
                />
              </Typography>
            </Grid>
            <Grid
              item
              xs={4}
              container
              justifyContent="space-between"
              alignItems="center"
              sx={{ display: "flex", alignItems: "center" }}
            >
              <Typography
                id="modal-modal-description"
                sx={{
                  mt: 1,
                  mr: "85%",
                  color: "rgba(0, 0, 0, 0.4)",
                  fontSize: "12px",
                }}
                variant="h6"
                align="right"
              >
                <PersonRemoveAlt1Icon
                  sx={{ cursor: "pointer", fontSize: "20px" }}
                  onClick={() => removeUserFollower(selectedUser?.id)}
                />
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography
                id="modal-modal-description"
                sx={{
                  mt: 1,
                  ml: "70%",
                  color: "rgba(0, 0, 0, 0.4)",
                  fontSize: "12px",
                }}
                variant="h6"
                align="left"
              >
                <QuestionAnswerIcon
                  sx={{ cursor: "pointer", fontSize: "20px" }}
                  onClick={addComments}
                />
              </Typography>
            </Grid>
          </Grid>
          {comment && (
            <Grid container alignItems="center" spacing={2} sx={{ mt: 2 }}>
              <Grid item xs>
                <TextField
                  id="message-input"
                  label="Your Message"
                  variant="outlined"
                  fullWidth
                  // Add any other TextField props as needed
                />
              </Grid>
              <Grid item>
                <IconButton onClick={handleSubmit}>
                  <SendIcon />
                </IconButton>
              </Grid>
            </Grid>
          )}
        </Box>
      </Modal>
    </>
  );
};

export default Users;
