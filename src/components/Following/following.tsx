import React from "react";
import { Link as MyLink } from "react-router-dom";
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
import FavoriteIcon from "@mui/icons-material/Favorite";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";
import TextField from "@mui/material/TextField";
import SendIcon from "@mui/icons-material/Send";
import IconButton from "@mui/material/IconButton";
import CircularProgress from "@mui/material/CircularProgress";
//@redux-tool-kit
import { useGetAllPostsQuery } from "../../features/posts/postsApi";
import { useSelector } from "react-redux";
import { RootState } from "../../store/Store";
import { PostProps } from "../../model/type";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 900,
  height: 300,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};
interface PProps extends PostProps {}
const FollowingPosts = () => {
  const [allComments, setAllComments] = React.useState<string[]>([]);
  const [item, setItem] = React.useState<PProps>({
    body: "",
    id: "",
    title: "",
    userId: 0,
    isBlocked: false,
    likes: 0,
  });
  const [comment, setComment] = React.useState(false);
  const [likes, setLikes] = React.useState(0);
  const [open, setOpen] = React.useState(false);
  const handleOpen = (post: PProps) => {
    setItem(post);
    setOpen(true);
  };
  const handleClose = () => setOpen(false);
  const { data, isLoading, isError, error } = useGetAllPostsQuery("Posts");
  const followers = useSelector(
    (state: RootState) => state.followers.followerIds
  );
  const validFollowers = followers.filter(
    (follower) => typeof follower === "number"
  ) as number[];

  const handleAddLikes = () => {
    setLikes(1);
  };
  const addComments = () => {
    setComment(true);
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
        <Link color="inherit" href="/myPosts">
          Following
        </Link>
      </Breadcrumbs>
      {validFollowers.length === 0 && (
        <MyLink to={"/users"}>
          <Typography
            variant="h6"
            sx={{
              mt: 2,
              color: "rebeccapurple",
              fontWeight: "bold",
              cursor: "pointer",
            }}
          >
            Add Friends to view their posts
          </Typography>
        </MyLink>
      )}

      {isLoading ? (
        <CircularProgress />
      ) : (
        <div>
          {data
            .filter((label: PProps) => validFollowers.includes(label.userId)) // Filter the data array based on the condition
            .map((filteredLabel: PProps, index: number) => {
              return (
                <Card
                  key={index}
                  sx={{
                    width: "100%",
                    margin: "auto",
                    marginTop: "20px",
                    cursor: "pointer",
                  }}
                  onClick={() => handleOpen(filteredLabel)}
                >
                  <CardContent>
                    <Typography variant="h5" component="div">
                      {filteredLabel.title}
                    </Typography>
                    <Typography variant="body2">
                      {filteredLabel.body}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Typography
                      sx={{ fontSize: 14 }}
                      color="text.secondary"
                      gutterBottom
                    >
                      Feed by :{filteredLabel.userId}
                    </Typography>
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
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {item.title}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {item.body}
          </Typography>
          <Divider orientation="horizontal" flexItem sx={{ mt: 3 }} />
          <Grid container justifyContent="space-between">
            <Grid
              item
              xs={6}
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
                <FavoriteIcon
                  sx={{ cursor: "pointer", fontSize: "14px" }}
                  onClick={handleAddLikes}
                />
                <span style={{ marginLeft: "5px", fontSize: "16px" }}>
                  {likes}
                </span>
              </Typography>
            </Grid>
            <Grid item xs={6}>
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
                  sx={{ cursor: "pointer", fontSize: "14px" }}
                  onClick={addComments}
                />
                <span style={{ marginLeft: "5px", fontSize: "16px" }}>
                  {allComments.length}
                </span>
              </Typography>
            </Grid>
          </Grid>
          {comment && (
            <Grid container alignItems="center" spacing={2} sx={{ mt: 2 }}>
              <Grid item xs>
                <TextField
                  id="message-input"
                  label="Your Comment"
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

export default FollowingPosts;
