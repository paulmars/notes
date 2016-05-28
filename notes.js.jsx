var Router = ReactRouter.Router;
var Link = ReactRouter.Link;
var Route = ReactRouter.Route;
var browserHistory = History.createHistory();

var Note = React.createClass({
  render: function() {
    return (
      <div className="row" key={this.props.key}>
        <div className="col-xs-12">
          {this.props.note.copy}
        </div>
      </div>
    );
  },
})

var NotesList = React.createClass({
  render: function() {
    var storyNodes = _.map(this.props.notes, function(note) {
      return <Note note={note} key={note.id} />;
    });

    return (
      <div>
        {storyNodes}
      </div>
    );
  },
});


var Compose = React.createClass({
  render: function() {
    return (
      <form>
        <div className="form-group">
          <textarea type="cooy" className="form-control" id="note-copy" placeholder="copy"></textarea>
        </div>
        <div className="form-group">
          <input type="file" id="exampleInputFile" />
        </div>
        <button type="submit" className="btn btn-default btn-primary-outline">Save</button>
      </form>
    );
  },
});

var App = React.createClass({
  getInitialState: function() {
    return ({
      notes: [],
      photos: []
    });
  },
  loadData: function() {
    // console.log("load data");
    // var url = "/i/docs/notes.json";
    // var _this = this;

    // $.ajax({
    //   method: "GET",
    //   url: url,
    //   dataType: "json",
    //   data: {
    //       format: "json"
    //   },
    //   success: function( response ) {
    //     console.log("response");
    //     console.log(response);
    //     _this.setState({notes: notes});
    //   }
    // });
  },
  componentDidMount: function() {
    this.loadData();
  },
  render: function() {
    return (
      <div className="container">
        <Compose />
        <NotesList notes={this.state.notes} />
      </div>
    );
  },
});

var routeSet = (
  <Router history={browserHistory}>
    <Route path="/" component={App} />
  </Router>
)

ReactDOM.render(routeSet, document.getElementById('app'))
browserHistory.push(window.location.pathname);
