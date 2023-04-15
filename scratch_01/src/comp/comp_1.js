import React from 'react'

class Fun_1 extends Component {
    constructor() {
      super();
      this.state = {
        count: 0,
        msg : "hello",
        var : [1,2,3,4,5],
        cur : 5
      };
    }
  
    update() {
      console.log("Button clicked");
      if(this.state.msg === "hello "){
        this.setState({
          count: this.state.count + 1,
          msg : "world" 
        });
  
      }
      else{
        this.setState({
          count: this.state.count + 1,
          msg : "hello" 
        });
      }
      
    }
    inc(){
      this.setState({
        var: [...this.state.var, this.state.cur + 1],
        cur: this.state.cur + 1,
        count : this.state.count+1
        
      });
    }
    dec(){
      this.setState({
        var : this.state.var.slice(0,this.state.cur-1),
        cur : this.state.cur-1,
        count : this.state.count+1
      });
    }
    Ren(){
      const numbers = this.state.var;
      const tags = numbers.map((number) => (
      <h1 key={number}>List {number}</h1>
      ));
      return(
        <div>
          {tags}
        </div>
        );
        
    }
  
    render() {
      
      return (
        <div>
          <h2>Number of  - {this.state.count}</h2>
          
         
          {this.Ren()}
          <button onClick={() => this.inc()}>inc</button>
          <button onClick={() => this.dec()}>dec</button>
        </div>
      );
    }
  }

export default Fun_1;