import React, { useEffect, useRef, useState } from "react";

import {
  Box,
  Card,
  CardContent,
  Typography,
  Stack,
  TextField,
  Button,
  List,
  ListItemButton,
  ListItemText,
  Avatar,
  Paper,
  IconButton,
  Divider,
  Chip,
  useMediaQuery,
} from "@mui/material";

import { useTheme } from "@mui/material/styles";

import SendRoundedIcon from "@mui/icons-material/SendRounded";
import AttachFileRoundedIcon from "@mui/icons-material/AttachFileRounded";
import ImageRoundedIcon from "@mui/icons-material/ImageRounded";
import VideocamRoundedIcon from "@mui/icons-material/VideocamRounded";
import DescriptionRoundedIcon from "@mui/icons-material/DescriptionRounded";

import API from "../../api/axios";

export default function Messages() {
  const theme = useTheme();

  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [type, setType] = useState("text");
  const [currentUser, setCurrentUser] = useState(null);

  const messagesEndRef = useRef(null);

  /* ================= CURRENT USER ================= */
  const fetchCurrentUser = async () => {
    const res = await API.get("/user");
    setCurrentUser(res.data);
  };

  /* ================= USERS ================= */
  const fetchUsers = async () => {
    const res = await API.get("/chat-users");
    setUsers(res.data);
  };

  /* ================= CONVERSATION ================= */
  const fetchConversation = async (userId) => {
    const res = await API.get(`/messages/conversation/${userId}`);

    setMessages(res.data);

    scrollBottom();
  };

  /* ================= SEND MESSAGE ================= */
  const sendMessage = async () => {
    if (!selectedUser) return;

    if (!message && !file) return;

    const formData = new FormData();

    formData.append("receiver_id", selectedUser.id);
    formData.append("message", message);

    if (file) {
      formData.append("file", file);
      formData.append("type", type);
    } else {
      formData.append("type", "text");
    }

    const res = await API.post("/messages", formData);

    setMessages((prev) => [...prev, res.data]);

    setMessage("");
    setFile(null);
    setPreview(null);
    setType("text");

    scrollBottom();
  };

  /* ================= SCROLL ================= */
  const scrollBottom = () => {
    setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({
        behavior: "smooth",
      });
    }, 100);
  };

  useEffect(() => {
    fetchUsers();
    fetchCurrentUser();
  }, []);

  /* ================= FILE CHANGE ================= */
  const handleFileChange = (e) => {
    const selected = e.target.files[0];

    if (!selected) return;

    setFile(selected);

    const fileType = selected.type;

    if (fileType.includes("image")) {
      setType("image");
      setPreview(URL.createObjectURL(selected));
    } else if (fileType.includes("video")) {
      setType("video");
      setPreview(URL.createObjectURL(selected));
    } else {
      setType("file");
      setPreview(null);
    }
  };

  /* ================= RENDER MESSAGE ================= */
  const renderMessage = (msg) => {
    const isMine = msg.sender_id === currentUser?.id;

    return (
      <Box
        key={msg.id}
        display="flex"
        justifyContent={isMine ? "flex-end" : "flex-start"}>
        <Paper
          elevation={0}
          sx={{
            p: 2,
            maxWidth: {
              xs: "90%",
              md: "70%",
            },
            borderRadius: 5,
            background: isMine
              ? "linear-gradient(135deg,#22c55e,#16a34a)"
              : "#fff",
            color: isMine ? "#fff" : "#111827",
            boxShadow: "0 6px 18px rgba(0,0,0,0.08)",
            border: isMine ? "none" : "1px solid #f1f5f9",
          }}>
          {/* TEXT */}
          {msg.type === "text" && (
            <Typography
              sx={{
                lineHeight: 1.8,
                wordBreak: "break-word",
              }}>
              {msg.message}
            </Typography>
          )}

          {/* IMAGE */}
          {msg.type === "image" && (
            <Box>
              <img
                src={`http://127.0.0.1:8000/storage/${msg.file}`}
                alt="message"
                style={{
                  width: "100%",
                  maxWidth: "260px",
                  borderRadius: "16px",
                  objectFit: "cover",
                }}
              />

              {msg.message && <Typography mt={1}>{msg.message}</Typography>}
            </Box>
          )}

          {/* VIDEO */}
          {msg.type === "video" && (
            <Box>
              <video
                controls
                style={{
                  width: "100%",
                  maxWidth: "280px",
                  borderRadius: "16px",
                }}>
                <source src={`http://127.0.0.1:8000/storage/${msg.file}`} />
              </video>

              {msg.message && <Typography mt={1}>{msg.message}</Typography>}
            </Box>
          )}

          {/* FILE */}
          {msg.type === "file" && (
            <Stack direction="row" spacing={1} alignItems="center">
              <DescriptionRoundedIcon />

              <a
                href={`http://127.0.0.1:8000/storage/${msg.file}`}
                target="_blank"
                rel="noreferrer"
                style={{
                  color: isMine ? "#fff" : "#2563eb",
                  fontWeight: "bold",
                  textDecoration: "none",
                }}>
                Download File
              </a>
            </Stack>
          )}

          {/* LOCATION */}
          {msg.type === "location" && (
            <a
              href={`https://maps.google.com/?q=${msg.latitude},${msg.longitude}`}
              target="_blank"
              rel="noreferrer"
              style={{
                color: isMine ? "#fff" : "#2563eb",
                fontWeight: "bold",
              }}>
              View Location
            </a>
          )}
        </Paper>
      </Box>
    );
  };

  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: {
          xs: "1fr",
          md: "320px 1fr",
        },
        gap: 3,
      }}>
      {/* ================= USERS ================= */}
      <Card
        sx={{
          height: {
            xs: "auto",
            md: "85vh",
          },
          borderRadius: 5,
          overflow: "hidden",
          boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
          border: "1px solid #f1f5f9",
        }}>
        <Box
          sx={{
            p: 2.5,
            borderBottom: "1px solid #e5e7eb",
            background: "linear-gradient(135deg,#22c55e,#16a34a)",
            color: "#fff",
          }}>
          <Typography fontWeight={800} fontSize="1.1rem">
            Conversations
          </Typography>
        </Box>

        <List
          sx={{
            overflowY: "auto",
            maxHeight: {
              xs: "300px",
              md: "100%",
            },
          }}>
          {users.map((u) => (
            <ListItemButton
              key={u.id}
              selected={selectedUser?.id === u.id}
              onClick={() => {
                setSelectedUser(u);
                fetchConversation(u.id);
              }}
              sx={{
                py: 1.8,
                transition: "0.3s",
                "&.Mui-selected": {
                  backgroundColor: "#dcfce7",
                },
              }}>
              <Avatar
                sx={{
                  bgcolor: "#22c55e",
                  mr: 2,
                  width: 50,
                  height: 50,
                  fontWeight: "bold",
                }}>
                {u.name.charAt(0).toUpperCase()}
              </Avatar>

              <ListItemText
                primary={<Typography fontWeight={700}>{u.name}</Typography>}
                secondary={
                  <Typography
                    variant="body2"
                    sx={{
                      textTransform: "capitalize",
                    }}>
                    {u.role}
                  </Typography>
                }
              />
            </ListItemButton>
          ))}
        </List>
      </Card>

      {/* ================= CHAT ================= */}
      <Card
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "85vh",
          borderRadius: 5,
          overflow: "hidden",
          boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
          border: "1px solid #f1f5f9",
        }}>
        {/* HEADER */}
        <Box
          sx={{
            p: 2,
            borderBottom: "1px solid #e5e7eb",
            display: "flex",
            alignItems: "center",
            gap: 2,
            backgroundColor: "#fff",
          }}>
          {selectedUser ? (
            <>
              <Avatar
                sx={{
                  bgcolor: "#22c55e",
                  width: 52,
                  height: 52,
                }}>
                {selectedUser.name.charAt(0).toUpperCase()}
              </Avatar>

              <Box>
                <Typography fontWeight={800}>{selectedUser.name}</Typography>

                <Chip
                  label={selectedUser.role}
                  size="small"
                  sx={{
                    mt: 0.5,
                    textTransform: "capitalize",
                    backgroundColor: "#dcfce7",
                    color: "#15803d",
                    fontWeight: "bold",
                  }}
                />
              </Box>
            </>
          ) : (
            <Typography fontWeight={700} color="text.secondary">
              Select a user to start chatting
            </Typography>
          )}
        </Box>

        {/* MESSAGES */}
        <CardContent
          sx={{
            flex: 1,
            overflowY: "auto",
            background: "linear-gradient(to bottom,#f8fafc,#f1f5f9)",
            p: 3,
          }}>
          <Stack spacing={2.5}>
            {messages.map(renderMessage)}

            <div ref={messagesEndRef} />
          </Stack>
        </CardContent>

        {/* INPUT */}
        {selectedUser && (
          <Box
            sx={{
              p: 2,
              borderTop: "1px solid #e5e7eb",
              backgroundColor: "#fff",
            }}>
            {/* PREVIEW */}
            {preview && (
              <Box mb={2}>
                {type === "image" && (
                  <img
                    src={preview}
                    alt="preview"
                    style={{
                      width: "160px",
                      borderRadius: "18px",
                      objectFit: "cover",
                    }}
                  />
                )}

                {type === "video" && (
                  <video
                    controls
                    style={{
                      width: "220px",
                      borderRadius: "18px",
                    }}>
                    <source src={preview} />
                  </video>
                )}
              </Box>
            )}

            {file && type === "file" && (
              <Chip
                icon={<DescriptionRoundedIcon />}
                label={file.name}
                sx={{
                  mb: 2,
                  fontWeight: "bold",
                }}
              />
            )}

            <Stack
              direction={isMobile ? "column" : "row"}
              spacing={2}
              alignItems="center">
              <TextField
                fullWidth
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Write a message..."
                multiline
                maxRows={4}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 4,
                    backgroundColor: "#f8fafc",
                  },
                }}
              />

              <Button
                component="label"
                variant="outlined"
                startIcon={<AttachFileRoundedIcon />}
                sx={{
                  minWidth: isMobile ? "100%" : "160px",
                  height: "56px",
                  borderRadius: 4,
                  fontWeight: "bold",
                  borderWidth: 2,
                }}>
                Add File
                <input hidden type="file" onChange={handleFileChange} />
              </Button>

              <Button
                variant="contained"
                endIcon={<SendRoundedIcon />}
                onClick={sendMessage}
                sx={{
                  minWidth: isMobile ? "100%" : "150px",
                  height: "56px",
                  borderRadius: 4,
                  fontWeight: "bold",
                  background: "linear-gradient(135deg,#22c55e,#16a34a)",
                  boxShadow: "0 8px 20px rgba(34,197,94,0.3)",
                  "&:hover": {
                    background: "linear-gradient(135deg,#16a34a,#15803d)",
                  },
                }}>
                Send
              </Button>
            </Stack>
          </Box>
        )}
      </Card>
    </Box>
  );
}
