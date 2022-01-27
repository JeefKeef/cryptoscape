import "./watchlist.css";
import React from 'react';
import { IconButton, List, ListItem, ListItemAvatar, Avatar, ListItemText } from "@mui/material";
import { Delete } from "@material-ui/icons";

const Watchlist = () => {
  return <div className="watchlist-container">Watchlist
  <div  className="watchlist-wrapper">
    <List>
      <ListItem 
        secondaryAction={
          <IconButton edge="end" aria-label="delete">
            <Delete/>
          </IconButton>
        }>
          <ListItemAvatar>
            <Avatar>
              W
            </Avatar>
          </ListItemAvatar>
          <ListItemText>
            Doge
          </ListItemText>

        </ListItem>
    </List>
  </div>
  </div>;
};

export default Watchlist;
