import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import articleApi from 'api/articleApi';

ArticlePreview.propTypes = {};

function ArticlePreview(props) {
  //   const [articleList, setArticleList] = useState([]);

  //   useEffect(() => {
  //     const fetchArticles = async () => {
  //       const articleList = await articleApi.getAll();
  //       setArticleList(articleList);
  //     };
  //     fetchArticles();
  //   });

  const article = props;
  return (
    <div>
      <p>Title: {article.title} </p>
      <p>Content: {article.content}</p>
    </div>
  );
}

export default ArticlePreview;
