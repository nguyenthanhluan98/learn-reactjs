import articleApi from 'api/articleApi';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import ArticlePreview from '../ArticlePreview/index';

ArticleList.propTypes = {
  articleList: PropTypes.array,
};

ArticleList.defaultProps = {
  articleList: [],
};

function ArticleList(props) {
  const [articleList, setArticleList] = useState([]);

  useEffect(() => {
    const fetchArticles = async () => {
      const articles = await articleApi.getAll();
      console.log(articles);
      setArticleList(articles);
    };
    fetchArticles();
  }, []);
  //const { articles } = articleList;
  if (articleList.length === 0) {
    return <div>Loading....</div>;
  }
  if (articleList) {
    const { articles } = articleList;
    return (
      <div>
        {articles.map((article) => (
          <ArticlePreview article={article} />
        ))}
      </div>
    );
  }
}

export default ArticleList;
