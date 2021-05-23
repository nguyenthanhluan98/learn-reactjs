import React from "react";

import { Route, Switch, useRouteMatch } from "react-router-dom";
import NotFoundFeature from "../NotFound";
import DetailPage from "./pages/DetailPage";
import ListPage from "./pages/ListPage";
TodoFeature.propTypes = {};

function TodoFeature(props) {
  const match = useRouteMatch();

  return (
    <div>
      Todo share UI
      <Switch>
        <Route path={match.path} component={ListPage} exact />
        <Route path={`${match.path}/:todoId`} component={DetailPage} />
        <Route component={NotFoundFeature} />
      </Switch>
    </div>
  );
}

export default TodoFeature;
