var ToDoList = React.createClass({
  getInitialState: function(){
    return {data : ["Get the laundry","take out the trash","Comb your hair!", "Walk the dog"]};
  },
  render: function(){
    var rows = []
    for(var i =0;i<this.state.data.length;i++)
    {
      rows.push(<ToDoItem key = {i} task={this.state.data[i]}/>);
    }
    return(
      <div className = "ToDoList">
        {rows}
      </div>
    );
  }
});

var Complete = React.createClass({
  handleClick: function()
  {
    this.props.onAction(this.props.task);
  },
  render: function(){
    return(
      <input type="checkbox" onClick = {this.handleClick}/>
    );
  }
})

var ToDoItem = React.createClass({
  completeTask: function(task){
    console.log(task + " completed");
  },
  render: function(){
    return(
      <div className="ToDoItem">
        <Complete task = {this.props.task} onAction = {this.completeTask}/>{this.props.task}
      </div>
    )
  }
})

ReactDOM.render(
  <ToDoList />,
  document.getElementById('content')
);
