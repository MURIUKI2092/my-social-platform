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
import FavoriteIcon from "@mui/icons-material/Favorite";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";
import TextField from "@mui/material/TextField";
import SendIcon from "@mui/icons-material/Send";
import IconButton from "@mui/material/IconButton";
import BlockIcon from "@mui/icons-material/Block";
import PersonAddDisabledIcon from "@mui/icons-material/PersonAddDisabled";
//@redux-tool-kit
import { useGetAllPostsQuery } from "../../features/posts/postsApi";
import { useAppDispatch } from "../../store/Store";
import { useSelector } from "react-redux";
import { RootState } from "../../store/Store";
import CircularProgress from "@mui/material/CircularProgress";
import { PostProps } from "../../model/type";
import { updatePost } from "../../slice/PostSlice";
import { blockUser } from "../../slice/UserSlice";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 900,
  height: 350,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

interface PProps extends PostProps {}
const Posts = () => {
  //user from the store
  const user = useSelector((state: RootState) => state.singleUser.user);
  console.log("::::::::::>>>>>>premium", user);
  const [allComments, setAllComments] = React.useState<string[]>([]);
  const [message, setMessage] = React.useState("");
  const [selectedPost, setSelectedPost] = React.useState<PProps | null>(null);
  const [comment, setComment] = React.useState(false);
  const [likes, setLikes] = React.useState(0);
  const [open, setOpen] = React.useState(false);
  const handleOpen = (post: PProps) => {
    setSelectedPost(post);
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
    console.log(likes);
  const { data, isLoading, isError, error } = useGetAllPostsQuery("Posts");
  const dispatch = useAppDispatch();
  //   console.log(data, ">>>>>>>>>>>");

  const handleAddLikes = () => {
    if (selectedPost) {
      const postId = selectedPost.id;
      const updatedPostData: PProps = {
        ...selectedPost,
        likes: Number(selectedPost.likes + 1),
      };
      dispatch(updatePost({ postId: postId, updatedPost: updatedPostData }));
      setMessage("Liked!");

      setTimeout(() => {
        setMessage("");
      }, 3000);
      const currentLikes = Number(selectedPost.likes);

      // Check if the currentLikes value is NaN
      if (isNaN(currentLikes)) {
        // If it is NaN, set it to 1
        setLikes(1);
      } else {
        // If it is a valid number, increment it by 1 and setLikes to the updated value
        setLikes(currentLikes + 1);
      }
    }
  };
  const addComments = () => {
    setComment(!comment);
  };

  const blockThisUser = () => {
    if (selectedPost) {
      const userId = selectedPost.userId;
      dispatch(blockUser({ userId }));
    }
  };
  const blockPost = () => {
    if (selectedPost) {
      const postId = selectedPost.id;
      const updatedPostData: PProps = {
        ...selectedPost,
        isBlocked: true,
      };
      dispatch(updatePost({ postId: postId, updatedPost: updatedPostData }));
      setMessage("blocked successfully!!");

      setTimeout(() => {
        setMessage("");
      }, 3000);
    }
  };
  console.log(data, ">>>>>>>>>>>>updated data");
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
  const requiredData = user?.isPremium ? data : data?.slice(0, 20);

  if (isError) {
    console.log(">>>>>>>>>>>>>>>>+++++++z", error, "error");
  }
  return (
    <>
      <Breadcrumbs aria-label="breadcrumb">
        <Link color="inherit" href="/posts">
          Home
        </Link>
        <Link color="inherit" href="/posts">
          Feeds
        </Link>
      </Breadcrumbs>

      {isLoading ? (
        <CircularProgress />
      ) : (
        <div>
          {requiredData.map((label: PProps, index: number) => {
            return (
              <Card
                key={index}
                sx={{
                  width: "100%",
                  margin: "auto",
                  marginTop: "20px",
                  cursor: "pointer",
                }}
                onClick={() => handleOpen(label)}
              >
                <CardContent>
                  <Typography variant="h5" component="div">
                    {label.title}
                  </Typography>
                  <Typography variant="body2">{label.body}</Typography>
                </CardContent>
                <CardActions>
                  <Typography
                    sx={{ fontSize: 14 }}
                    color="text.secondary"
                    gutterBottom
                  >
                    Feed by :{label.userId}
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
          <Typography variant="subtitle2" sx={{ color: "rebeccapurple" }}>
            {message}
          </Typography>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {selectedPost?.title}
          </Typography>
          <Typography
            id="modal-modal-title"
            variant="subtitle2"
            component="h6"
            sx={{ mt: 2 }}
          >
            {selectedPost?.body}
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
                <FavoriteIcon
                  sx={{ cursor: "pointer", fontSize: "14px" }}
                  onClick={handleAddLikes}
                />
                <span style={{ marginLeft: "5px", fontSize: "16px" }}>
                  {/* @ts-ignore */}
                  {isNaN(selectedPost?.likes) ? 0 : selectedPost?.likes}
                </span>
              </Typography>
            </Grid>
            {user?.isPremium && (
              <>
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
                    <BlockIcon
                      sx={{ cursor: "pointer", fontSize: "14px" }}
                      onClick={blockPost}
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
                      //   mr: "85%",
                      color: "rgba(0, 0, 0, 0.4)",
                      fontSize: "12px",
                    }}
                    variant="h6"
                    align="right"
                  >
                    <PersonAddDisabledIcon
                      sx={{ cursor: "pointer", fontSize: "14px" }}
                      onClick={blockThisUser}
                    />
                  </Typography>
                </Grid>
              </>
            )}
            <Grid item xs={4}>
              <Typography
                id="modal-modal-description"
                sx={{
                  mt: 1,
                  //   ml: "70%",
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
      {requiredData?.length == 20 && (
        <Typography
          variant="h6"
          sx={{
            mt: 2,
            color: "rebeccapurple",
            fontWeight: "bold",
            cursor: "pointer",
          }}
        >
          Make Payments to view all feeds!!
        </Typography>
      )}
    </>
  );
};

export default Posts;
