Groups = React.createClass({

  mixins: [ReactMeteorData],

  getMeteorData() {
    return {
      groups: BoozeGroups.find({}, { sort: { name: 1 } }),
      searchTerm: FlowRouter.getParam("term") || "",
      group: FlowRouter.getParam('group') || "alla",
      loading: !FlowRouter.subsReady()
    };
  },

  renderOptions() {
    return this.data.groups.map(function (item) {
      return <option value={item.slug} key={item.slug}>{item.name}</option>;
    });
  },

  changeGroup: function(event) {
    FlowRouter.go('/:group/:term?', {
      group: event.currentTarget.value,
      term: FlowRouter.getParam('term')
    });
  },

  changeTerm: function(event) {
    if(event.target.value.length === 0) {
      FlowRouter.go('/:group/', {
        group: FlowRouter.getParam('group') || "alla",
      });
    }
    if(event.target.value.length >= 1) {
      FlowRouter.go('/:group/:term', {
        group: FlowRouter.getParam('group') || "alla",
        term: event.target.value
      });
    }
  },

  render: function() {
    if(this.data.loading) {
      return (
        <p>Loading booze types</p>
      )
    }
    return (
      <div className="alcohol-type">
        <div className="row">
          <div className="col-sm-3">
            <label className="control-label" htmlFor="product-group">Visa alkoholtyp</label>
            
            <select onChange={this.changeGroup} className="form-control" id="product-group" value={this.data.group}>
              <option value="alla">Alla</option>
              {this.renderOptions()}
            </select>
          </div>

          <div className="col-sm-3">
            <label className="control-label" htmlFor="product-search">Sök produkt</label>
            
            <input onKeyUp={this.changeTerm} onChange={this.changeTerm} type="search" value={this.data.searchTerm} placeholder="Sökterm" className="form-control product-search" id="product-search" />
          </div>
        </div>
      </div>
    );
  }
});
