import React from 'react';
import PropTypes from 'prop-types';
import { Link } from '../../../../../node_modules/@material-ui/icons/index';
import { makeStyles } from '@material-ui/core/styles';
import {
  Avatar,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from '../../../../../node_modules/@material-ui/core/index';

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
