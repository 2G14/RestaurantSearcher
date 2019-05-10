import React from "react";
import PropTypes from "prop-types";

import ListItem from "@material-ui/core/ListItem";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";

import ExpandMore from "@material-ui/icons/ExpandMore";
import ExpandLess from "@material-ui/icons/ExpandLess";

const styles = theme => ({
  card: {
    maxWidth: 500,
    width: "100%",
    margin: "auto"
  },
  media: {
    maxWidth: "100%",
    height: "auto"
  },
  content: {
    paddingBottom: 0
  },
  actions: {
    display: "flex",
    padding: 0
  },
  expand: {
    marginLeft: "auto"
  }
});

/**
 * レストランリストアイテム
 */
class RestaurantListItem extends React.Component {
  constructor() {
    super();
    this.state = {
      open: false
    };
  }
  /**
   * 詳細情報の開閉
   */
  handleClick = () => {
    this.setState(state => ({ open: !state.open }));
  };
  /**
   * レンダー
   */
  render() {
    const { classes, rest } = this.props;
    return (
      <ListItem alignItems="flex-start">
        <Card className={classes.card}>
          {rest.image_url.shop_image1 && ( //画像があれば表示
            <CardMedia
              component="img"
              alt={rest.name}
              className={classes.media}
              src={rest.image_url.shop_image1}
              title={rest.name}
            />
          )}
          <CardContent className={classes.content}>
            <Typography gutterBottom variant="h5" component="h2">
              {rest.name}
            </Typography>
            {rest.access.line && (
              <Typography component="p">
                {rest.access.line} {rest.access.station}
                {rest.access.station_exit}から{rest.access.walk}分
              </Typography>
            )}
          </CardContent>
          <CardActions className={classes.actions} disableActionSpacing>
            <IconButton
              className={classes.expand}
              onClick={this.handleClick}
              aria-expanded={this.state.open}
              aria-label="Show more"
            >
              {this.state.open ? <ExpandLess /> : <ExpandMore />}
            </IconButton>
          </CardActions>
          <Collapse in={this.state.open} timeout="auto" unmountOnExit>
            <CardContent>
              {rest.address && (
                <Typography paragraph>
                  <a
                    href={`https://www.google.co.jp/maps/?q=${rest.name} ${
                      rest.address
                    }`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {rest.address}
                  </a>
                </Typography>
              )}
              {rest.tel && (
                <Typography paragraph>
                  電話番号:{" "}
                  <a href={`tel:${rest.tel}`}>{rest.tel}</a>
                </Typography>
              )}
              {rest.opentime && (
                <Typography paragraph>営業時間: {rest.opentime}</Typography>
              )}
              {rest.holiday && (
                <Typography paragraph>休業日: {rest.holiday}</Typography>
              )}
              {rest.credit_card && (
                <Typography>
                  クレジットカード: {rest.credit_card.replace(/,/g, ", ")}
                </Typography>
              )}
              {rest.e_money && (
                <Typography>
                  電子マネー: {rest.e_money.replace(/,/g, ", ")}
                </Typography>
              )}
            </CardContent>
          </Collapse>
        </Card>
      </ListItem>
    );
  }
}

RestaurantListItem.propTypes = {
  classes: PropTypes.object.isRequired,
  rest: PropTypes.object.isRequired
};

export default withStyles(styles)(RestaurantListItem);
