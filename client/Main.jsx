Main = React.createClass({

  mixins: [ReactMeteorData],
  getMeteorData() {
    return {
      loading: !FlowRouter.subsReady(),
      noresults: Booze.find().count() === 0
    };
  },


  render: function() {
    if(this.data.loading) {
      return <LoadingPong />;
    }

    if(this.data.noresults) {
      return <p>Inga drycker hittades</p>;
    }

    return <BoozeTable />;
  }
});

BoozeTable = React.createClass({

  mixins: [ReactMeteorData],
  getMeteorData() {
    return {
      booze: Booze.find({}, { sort: { apk: -1 } }).fetch(),
    };
  },

  renderRows() {
    return this.data.booze.map((booze) => {
      return <BoozeTableRow key={booze._id} data={booze} />;
    })
  },

  render: function() {
    return (
      <table className="table table-striped table-hover">
        <thead>
          <tr>
            <th>Produkt</th>
            <th>Typ</th>
            <th className="hidden-xs">Förpackning</th>
            <th className="hidden-xs">Volym</th>
            <th>Pris</th>
            <th className="hidden-xs">Vol.%</th>
            <th>APK</th>
          </tr>
        </thead>
        <tbody>
          {this.renderRows()}
        </tbody>
      </table>
    );
  }
});

BoozeTableRow = React.createClass({
  propTypes: {
    data: React.PropTypes.object.isRequired
  },

  rowClass() {
    let apk = this.props.data.apk;
    if(apk > 2) {
      return 'amazing';
    }
    else if (apk < 1) {
      return 'bad';
    }
    else {
      return 'moderate';
    }
  },

  apk() {
    return Math.round(this.props.data.apk * 100) / 100
  },

  render: function() {
    return (
      <tr className={this.rowClass()}>
        <td><a href="http://www.systembolaget.se/{this.props.data.realId}">{this.props.data.name} {this.props.data.name2}</a></td>
        <td>{this.props.data.group}</td>
        <td className="hidden-xs">{this.props.data.container}</td>
        <td className="hidden-xs">{this.props.data.volume} ml</td>
        <td>{this.props.data.price} kr</td>
        <td className="hidden-xs">{this.props.data.alcohol}%</td>
        <td><strong>{this.apk()}</strong></td>
      </tr>
    );
  }
});

LoadingPong = React.createClass({
  render: function() {
    return (
      <div className="text-center">
        <div className="pong-loader">
          Loading…
        </div>
        <p>Väntar på data</p>
      </div>
    );
  }
});
