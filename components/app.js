var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

var ToDoApp = React.createClass({
  addItem: function(item){
    var dat = this.state.data;
    dat.push({id:guid(),text:item});
    this.setState({data:dat});
  },
  removeItem: function(item){
    var dat = this.state.data;
    dat.splice(item,1);
    this.setState({data:dat});
  },
  getInitialState: function(){
    return{data:this.props.data};
  },
  render: function(){
    return(
      <div>
      <ToDoList complete = {this.removeItem} data = {this.state.data} />
      <br />
      <AddToDo add = {this.addItem} />
      </div>
    )
  }
});

var ToDoList = React.createClass({
  completeTask: function(id){
    this.setState({msg:'"'+this.props.data[id].text+ '"' + " completed!"});
    this.props.complete(id);
  },
  getInitialState: function(){
    return {msg : ""};
  },
  render: function(){
    var rows = []
    for(var i =0;i<this.props.data.length;i++)
    {
      rows.push(<ToDoItem key = {this.props.data[i].id} id = {i} complete = {this.completeTask} task={this.props.data[i].text}/>);
    }
    return(
      <div className = "ToDoList">
        <ReactCSSTransitionGroup transitionName = "task" transitionEnterTimeout={1000} transitionLeaveTimeout={1000}>
          {rows}
        </ReactCSSTransitionGroup>
        <br /> {this.state.msg} <br />
      </div>
    );
  }
});

var Complete = React.createClass({
  handleClick: function()
  {
    this.props.onAction(this.props.id);
  },
  render: function(){
    return(
      <button onClick = {this.handleClick}/>
    );
  }
});

var ToDoItem = React.createClass({
  render: function(){
    return(
      <div className="ToDoItem">
        <Complete id = {this.props.id} onAction = {this.props.complete}/>{this.props.task}
      </div>
    )
  }
});

var AddToDo = React.createClass({
  getInitialState: function(){
    return {task:""};
  },
  handleChange: function(event){
    this.setState({task: event.target.value});
  },
  handleClick: function(){
    this.props.add(this.state.task);
    this.setState({task:""});
  },
  render: function(){
    return(
      <div>
      <input type = "text" value = {this.state.task} onChange = {this.handleChange} /> <button onClick={this.handleClick} >Add Task!</button>
      </div>
    );
  }
});

var data = ["Get the laundry","take out the trash","Comb your hair!", "Walk the dog"]

function addIDs(data){
  var dat = [];
  for(var item in data)
  {
    dat.push({id:guid(),text:data[item]});
  }
  return dat;
}

function guid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
    s4() + '-' + s4() + s4() + s4();
}

ReactDOM.render(
  <ToDoApp data = {addIDs(data)} />,
  document.getElementById('content')
);
