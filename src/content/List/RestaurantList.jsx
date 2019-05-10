import React from "react";
import PropTypes from "prop-types";

import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";

import RestaurantListItem from "./RestaurantListItem";

import request from "./../../api/request";

const styles = theme => ({
  root: {
    margin: 0,
    padding: 0
  },
  header: {
    margin: 0,
    padding: 20
  },
  list: {
    margin: 0,
    padding: 0
  },
  error: {
    textAlign: "center",
    padding: 20
  }
});

class RestaurantList extends React.Component {
  constructor() {
    super();
    this.searchMoreClick = this.searchMoreClick.bind(this);
  }
  /**
   * さらに表示ボタンで追加で取得し、jsonに追加Ï
   */
  searchMoreClick() {
    const conditions = this.props.searchConditions;
    conditions.offset_page++;
    console.log(conditions);
    request({ ...conditions }, newJson => {
      const json = this.props.json;
      json.rest = json.rest.concat(newJson.rest);
      json.page_offset++;
      this.props.setJsonFunc(json);
      console.log(JSON.stringify(json));
    });
  }
  /**
   * レンダー
   */
  render() {
    const { classes, json } = this.props;
    return (
      <div className={classes.root}>
        <Typography
          component="span"
          className={classes.header}
          color="textPrimary"
        >
          件数: {json.total_hit_count ? json.total_hit_count : 0}件の内、
          {json.total_hit_count
            ? json.hit_per_page * json.page_offset < json.total_hit_count
              ? json.hit_per_page * json.page_offset
              : json.total_hit_count
            : 0}
          件までを表示中
        </Typography>
        <Divider />
        {!json.error ? (
          // 正常時
          <div>
            <List className={classes.list}>
              {json.rest.map((rest, index) => (
                <RestaurantListItem rest={rest} key={index} />
              ))}
            </List>
            {json.hit_per_page * json.page_offset < json.total_hit_count && (
              // 検索結果が全て表示されていない場合
              <Button fullWidth onClick={this.searchMoreClick}>
                <h4>さらに表示</h4>
              </Button>
            )}
          </div>
        ) : (
          // error時
          <Typography component="span" className={classes.error}>
            検索条件に一致する店舗が見つかりませんでした。
          </Typography>
        )}
      </div>
    );
  }
}

RestaurantList.propTypes = {
  classes: PropTypes.object.isRequired,
  json: PropTypes.object.isRequired,
  searchConditions: PropTypes.object.isRequired,
  setJsonFunc: PropTypes.func.isRequired
};

export default withStyles(styles)(RestaurantList);
