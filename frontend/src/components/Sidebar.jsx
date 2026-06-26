import { Box, List, ListItemButton, ListItemText } from "@mui/material";
import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <Box width={220} bgcolor="background.paper" height="100vh">
      <List>
        <ListItemButton component={Link} to="/">
          <ListItemText primary="Dashboard" />
        </ListItemButton>
      </List>
    </Box>
  );
}
