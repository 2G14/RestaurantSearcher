import React from "react";
import PropTypes from "prop-types";

import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import { withStyles } from "@material-ui/core";

import geolocation from "./api/geolocation";
import request from "./api/request";

const styles = theme => ({
  buttonBack: {
    background: "dimgray"
  },
  searchButton: {
    background: "black"
  },
  form: {
    background: "palevioletred"
  }
});

/**
 * searchボタン部分
 * 検索条件を追加していく
 */
class Form extends React.Component {
  constructor() {
    super();
    this.searchClick = this.searchClick.bind(this);
  }
  /**
   * 検索
   */
  searchClick() {
    const conditions = this.props.searchConditions;
    conditions.offset_page = 1;
    geolocation((latitude, longitude) => {
      conditions.latitude = latitude;
      conditions.longitude = longitude;
      conditions.freeword = conditions.freeword.trim().replace(/[\s　]+/g, ",");
      this.props.setSearchConditions(conditions);
      console.log(conditions);
      request({ ...conditions }, json => {
        this.props.setJsonFunc(json);
        console.log(JSON.stringify(json));
      });
    });
  }
  /**
   * 検索条件セット
   */
  handleChange = name => event => {
    const conditions = this.props.searchConditions;
    conditions[name] = event.target.value;
    this.props.setSearchConditions(conditions);
  };
  render() {
    const { classes } = this.props;
    return (
      <div>
        <div className={classes.buttonBack}>
          <Button
            className={classes.searchButton}
            color="secondary"
            fullWidth
            onClick={this.searchClick}
          >
            <h3>search</h3>
          </Button>
        </div>
        <div className={classes.form}>
          {/* range */}
          <TextField
            id="range"
            select
            label="検索範囲(半径)"
            fullWidth
            value={this.props.searchConditions.range}
            onChange={this.handleChange("range")}
            margin="none"
            variant="filled"
          >
            {["300m", "500m", "1000m", "2000m", "3000m"].map((range, index) => (
              <MenuItem key={index} value={index + 1}>
                {range}
              </MenuItem>
            ))}
          </TextField>
          {/* freeword */}
          <TextField
            id="freeword"
            label="フリーワード"
            fullWidth
            value={this.props.searchConditions.freeword}
            onChange={this.handleChange("freeword")}
            margin="none"
            variant="filled"
          />
        </div>
      </div>
    );
  }
}

Form.propTypes = {
  classes: PropTypes.object.isRequired,
  setJsonFunc: PropTypes.func.isRequired,
  searchConditions: PropTypes.object.isRequired,
  setSearchConditions: PropTypes.func.isRequired
};

export default withStyles(styles)(Form);
