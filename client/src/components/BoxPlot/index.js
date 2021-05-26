import React from "react";
import { Boxplot } from "react-boxplot";
import "./index.scss";
import { Grid, Typography } from "@material-ui/core";

const stats = [
  {
    whiskerLow: 200.3,
    quartile1: 201,
    quartile2: 234.5,
    quartile3: 254.6,
    whiskerHigh: 320.95,
    outliers: [54, 350],
  },
  {
    whiskerLow: 194.3,
    quartile1: 201,
    quartile2: 234.5,
    quartile3: 254.6,
    whiskerHigh: 400.95,
    outliers: [50, 75],
  },
  {
    whiskerLow: 194.3,
    quartile1: 201,
    quartile2: 234.5,
    quartile3: 254.6,
    whiskerHigh: 350.95,
    outliers: [],
  },
  {
    whiskerLow: 110,
    quartile1: 150,
    quartile2: 2594.5,
    quartile3: 390.6,
    whiskerHigh: 400.95,
    outliers: [],
  },
  {
    whiskerLow: 194.3,
    quartile1: 201,
    quartile2: 234.5,
    quartile3: 254.6,
    whiskerHigh: 257.95,
    outliers: [],
  },
];
class Box extends React.Component {
  getStats = index => {
    const { type } = this.props;
    let data = stats[index];
    Object.keys(data).map((key, ind) => {
      if (key !== 'outliers') {
        data[key] = data[key] + 30 * type * (Math.random() + 1) * Math.pow(-1, type);
      }
    });

    return data;
  }

  render() {

    return (
      <div className="boxes">
        <Grid container spacing={10} className="box">
          <Grid item xs={4}>
            <Typography variant="body2">Reflectiveness</Typography>
          </Grid>
          <Grid item xs={8}>
            <Boxplot
              width={400}
              height={25}
              orientation="horizontal"
              min={130}
              max={520}
              stats={this.getStats(0)}
            />
          </Grid>
        </Grid>
        <Grid container spacing={10} className="box">
          <Grid item xs={4}>
            <Typography variant="body2">Organization</Typography>
          </Grid>
          <Grid item xs={8}>
            <Boxplot
              width={400}
              height={25}
              orientation="horizontal"
              min={0}
              max={420}
              stats={this.getStats(1)}
            />
          </Grid>
        </Grid>
        <Grid container spacing={10} className="box">
          <Grid item xs={4}>
            <Typography variant="body2">Assertiveness</Typography>
          </Grid>
          <Grid item xs={8}>
            <Boxplot
              width={400}
              height={25}
              orientation="horizontal"
              min={0}
              max={400}
              stats={this.getStats(2)}
            />
          </Grid>
        </Grid>
        <Grid container spacing={10} className="box">
          <Grid item xs={4}>
            <Typography variant="body2">Clarity</Typography>
          </Grid>
          <Grid item xs={8}>
            <Boxplot
              width={400}
              height={25}
              orientation="horizontal"
              min={0}
              max={520}
              stats={this.getStats(3)}
            />
          </Grid>
        </Grid>
        <Grid container spacing={10} className="box lastBox">
          <Grid item xs={4}>
            <Typography variant="body2">Neutrality</Typography>
          </Grid>
          <Grid item xs={8}>
            <Boxplot
              width={400}
              height={25}
              orientation="horizontal"
              min={0}
              max={300}
              stats={this.getStats(4)}
            />
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default Box;
