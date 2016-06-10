
var ToDoApp = React.createClass({
  addItem: function(item){
    var dat = this.state.data;
    dat.push(item);
    this.setState({data:dat});
  },
  removeItem: function(item){
    var dat = this.state.data;
    data.splice(item,1)
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
    this.setState({msg:'"'+this.props.data[id]+ '"' + " completed!"});
    this.props.complete(id);
  },
  getInitialState: function(){
    return {msg : ""};
  },
  render: function(){
    var rows = []
    for(var i =0;i<this.props.data.length;i++)
    {
      rows.push(<ToDoItem key = {i} id = {i} complete = {this.completeTask} task={this.props.data[i]}/>);
    }
    return(
      <div className = "ToDoList">
        {rows}
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

ReactDOM.render(
  <ToDoApp data = {data} />,
  document.getElementById('content')
);
