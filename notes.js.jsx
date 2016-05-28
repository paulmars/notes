var Router = ReactRouter.Router;
var Link = ReactRouter.Link;
var Route = ReactRouter.Route;
var browserHistory = History.createHistory();

var Note = React.createClass({
  remove: function(e) {
    this.props.remove(this.props.note.id);
  },

  render: function() {
    return (
      <div className="row" key={this.props.key}>
        <div className="col-xs-11">
          {this.props.note.copy}
        </div>
        <div className="col-xs-1">
          <a onClick={this.remove} href="#">delete</a>
        </div>
      </div>
    );
  },
})

var NotesList = React.createClass({
  render: function() {
    var _this = this;
    var storyNodes = _.map(this.props.notes, function(note) {
      return <Note note={note} key={note.id} remove={_this.props.remove} />;
    });

    return (
      <div>
        {storyNodes}
      </div>
    );
  },
});


var Compose = React.createClass({

  getInitialState: function() {
    return {
      copy: ''
    };
  },

  handleCopyChange: function(e) {
    this.setState({copy: e.target.value});
  },

  handleSubmit: function(e) {
    e.preventDefault();
    var copy = this.state.copy.trim();
    if (copy == "") {
      return;
    }
    this.props.onCommentSubmit({copy: copy});
    this.setState({copy: ''});
  },

  render: function() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div className="form-group">
          <textarea
            onChange={this.handleCopyChange}
            type="copy" className="form-control" id="note-copy" value={this.state.copy}></textarea>
        </div>
        <div className="form-group">
          <input type="file" id="exampleInputFile" />
        </div>
        <button onClick={this.save} type="submit" className="btn btn-default btn-primary-outline">Save</button>
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
    var url = "/i/docs/notes.json";
    var _this = this;

    $.ajax({
      method: "GET",
      url: url,
      dataType: "json",
      data: {
          format: "json"
      },
      success: function( response ) {
        _this.setState({notes: response});
      }
    });
  },

  remove: function(id) {
    var url = "/i/docs/notes/" + id + ".json";
    var _this = this;

    $.ajax({
      method: "DELETE",
      url: url,
      dataType: "json",
      data: {
        format: "json"
      },
      success: function( response ) {
        _this.setState({notes: response});
      }
    });
  },

  onCommentSubmit: function(data) {
    var url = "/i/docs/notes.json";
    var _this = this;

    $.ajax({
      method: "POST",
      url: url,
      dataType: "json",
      data: {
        format: "json",
        copy: data.copy
      },
      success: function( response ) {
        // console.log("successfully created");
        // console.log(response);
        var notes = [response].concat(_this.state.notes);
        _this.setState({notes: notes});
      }
    });
  },

  componentDidMount: function() {
    this.loadData();
  },
  render: function() {
    return (
      <div className="container">
        <Compose onCommentSubmit={this.onCommentSubmit} />
        <NotesList notes={this.state.notes} remove={this.remove} />
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
