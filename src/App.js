import './App.css';
import {useState} from 'react';
function HeaderTag(props){
  function onClickHandler(e){
    e.preventDefault();
    props.onChangeMode();
  }
  return(
    <header>
      <h1>
        <a onClick={onClickHandler} href="index.html">WEB</a>
      </h1>
    </header>
  )
}
function NavTag(props){
  console.log('props.data', props.data);
  function clickHander(e){
    e.preventDefault();
    props.onChangeMode(Number(e.target.dataset.id));
  }
  var lis = [];
  for(var i=0; i<props.data.length; i++){
    lis.push(<li><a data-id={props.data[i].id} onClick={clickHander} href={props.data[i].id+'.html'}>{props.data[i].title}</a></li>);
  } 
  return (
    <nav>
      <ol>
      {lis}
      </ol>
    </nav>
  )
}
function ReadTag(props){
  return (
    <article>
      <h2>{props.title}</h2>
      {props.desc}
    </article>
  )
}
function App() {
  console.log('App render');
  var [mode, setMode] = useState('READ');
  var [id, setId] = useState(1);
  var topics = [
    {id:1, title:'HTML', desc:'HTML is ...'},
    {id:2, title:'CSS', desc:'CSS is ...'}
  ];
  function onChangeModeHeader(){
    console.log('onChangeModeHeader');
    setMode('WELCOME');
  }
  function onChangeModeNav(id){
    console.log('onChangeModeNav', id);
    setMode('READ');
    setId(id);
    // id값에 따른 UI를 변경하는 코드 
  }
  function onChangeModeControl(_mode){
    console.log('onChangeModeControl', _mode);
    setMode(_mode);
  }
  var article = null;
  if(mode === 'WELCOME'){
    article = <ReadTag title="Weclome" desc="Hello, WEB"></ReadTag>
  } else if(mode === 'READ'){
    for(var i=0; i<topics.length; i++){
      if(topics[i].id === id){
        article = <ReadTag title={topics[i].title} desc={topics[i].desc}></ReadTag>
        break;
      }
    }
  } else if(mode === 'CREATE'){
    article = <div>Create</div>
  } else if(mode === 'UPDATE'){
    article = <div>Update</div>
  }
  return (
    <div>
      <HeaderTag onChangeMode={onChangeModeHeader}></HeaderTag>
      <NavTag onChangeMode={onChangeModeNav} data={topics}></NavTag>
      {article}
      <Control onChangeMode={onChangeModeControl}></Control>
    </div>
  );
}
function Control(props){
  function clickHandler(e){
    e.preventDefault();
    props.onChangeMode(e.target.dataset.mode);
  }
  return (
    <div>
      <a href="/create" data-mode="CREATE" onClick={clickHandler}>create</a> | 
      <a href="/update" data-mode="UPDATE" onClick={clickHandler}>update</a> | 
      <input type="button" value="DELETE" data-mode="delete" onClick={clickHandler}></input>
    </div>);
}

export default App;
