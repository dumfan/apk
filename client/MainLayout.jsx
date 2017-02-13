MainLayout = React.createClass({
  render() {
    return (
      <div className="container">
        <Header />
        <hr />
        <Groups />
        {this.props.content}
      </div>
    );
  }
});
