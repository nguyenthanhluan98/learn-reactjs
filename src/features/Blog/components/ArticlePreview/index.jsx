import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import React from 'react';

import {
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from '../../../../../node_modules/@material-ui/core';

ArticlePreview.propTypes = {
  article: PropTypes.object,
};

ArticlePreview.defaultProps = {
  article: [],
};

const useStyles = makeStyles((theme) => ({
  markdown: {
    ...theme.typography.body2,

    paddingLeft: theme.spacing(2),
  },
  username: {
    color: '#6ad13e',
  },
}));

function ArticlePreview({ article }) {
  const classes = useStyles();
  return (
    <div>
      <List>
        <ListItem>
          <ListItemAvatar>
            <Avatar>
              <Avatar src={article.author.image} alt={article.author.username} />
            </Avatar>
          </ListItemAvatar>
          <ListItemText
            className={classes.username}
            primary={article.author.username}
            secondary={new Date(article.createdAt).toDateString()}
          />
        </ListItem>
        <div className={classes.markdown} key={article.body.substring(0, 5)}>
          <Typography variant="h5">{article.title}</Typography>
          {article.body}
        </div>
      </List>
    </div>
  );
}

export default ArticlePreview;
