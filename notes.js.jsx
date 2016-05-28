var Router = ReactRouter.Router;
var Link = ReactRouter.Link;
var Route = ReactRouter.Route;
var browserHistory = History.createHistory();

var Note = React.createClass({
  render: function() {

//     // console.log(this.props.story.preview.images[0].source.url);
//     // console.log(this.props.story.preview.images[0]);

//     try {
//       var imageTag = (
//         <img src={this.props.story.preview.images[0].source.url} width="500" />
//       )
//     }
//     catch (e) {
//       var imageTag = ""
//     }

//     var _this = this;
//     var t = function() {
//       return {
//         __html: $('<div />').html(_this.props.story.media_embed.content).text()
//       };
//     }

    return (
      <div className="row" key={this.props.key}>
        <div className="col-xs-1">
          {this.props.note.copy}
        </div>
      </div>
    );
  },
})

var NotesList = React.createClass({
  render: function() {
    console.log("this.props.notes");
    console.log(this.props.notes);
    var storyNodes = _.map(this.props.notes, function(note) {
      return <Note note={note.copy} key={note.id} />;
    });

    return (
      <div className="container">
        {storyNodes}
      </div>
    );
  },
});

var App = React.createClass({
  getInitialState: function() {
    return ({
      notes: [
        {
          id: "1",
          copy: "hello"
        },
        {
          id: "2",
          copy: "nope",
        }
      ],
    });
  },
//   loadMore: function(location) {
//     var _this = this;
//     // console.log(location);
//     var url = "https://www.reddit.com" + location + ".json";

//     if (this.state.stories.length > 0) {
//       // console.log(this.state.stories);
//       var storyLength = this.state.stories.length;
//       var lastStory = this.state.stories[storyLength - 1];
//       // console.log("lastStory");
//       // console.log(lastStory);
//       // var last_name = this.state[0].data.name;
//       var last_name = lastStory.data.name;
//       var url = "https://www.reddit.com/" + location + ".json?after=" + last_name;
//     }

//     console.log("url");
//     console.log(url);

//     $.ajax({
//       url: url,
//       dataType: "json",
//       data: {
//           format: "json"
//       },
//       success: function( response ) {
//         // console.log("response");
//         // console.log(_this.state.stories);
//         // console.log(response);
//         var stories = _this.state.stories.concat(response.data.children);
//         console.log(stories);
//         _this.setState({stories: stories});
//       }
//     });
//   },
//   componentDidMount: function() {
//     var _this = this;

//     var throttledMore = _.throttle(function() {
//       _this.loadMore(_this.state.url)
//     }, 3000);
//     $('body').on("bottom", throttledMore);

//     window.loadMore = this.loadMore;
//     this.loadMore(this.state.url);
//   },
  render: function() {
    return (
      <NotesList notes={this.state.notes} />
    );
  },
});

var routeSet = (
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <Route path="/r/:subreddit" component={App} />
    </Route>
  </Router>
)

ReactDOM.render(routeSet, document.getElementById('app'))
browserHistory.push(window.location.pathname);
