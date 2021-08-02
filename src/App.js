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
    props.onChangeMode('haha');
  }
  var lis = [];
  for(var i=0; i<props.data.length; i++){
    lis.push(<li><a onClick={clickHander} href={props.data[i].id+'.html'}>{props.data[i].title}</a></li>);
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
  function onChangeModeHeader(){
    console.log('onChangeModeHeader');
    setMode('WELCOME');
  }
  function onChangeModeNav(id){
    console.log('onChangeModeNav', id);
    setMode('READ');
    // id값에 따른 UI를 변경하는 코드 
  }
  var article = null;
  if(mode === 'WELCOME'){
    article = <ReadTag title="Weclome" desc="Hello, WEB"></ReadTag>
  } else if(mode === 'READ'){
    article = <ReadTag title="READ" desc="Hello, READ"></ReadTag>
  }
  return (
    <div>
      <HeaderTag onChangeMode={onChangeModeHeader}></HeaderTag>
      <NavTag onChangeMode={onChangeModeNav} data={[
        {id:1, title:'HTML', desc:'HTML is ...'},
        {id:2, title:'CSS', desc:'CSS is ...'}
      ]}></NavTag>
      {article}
    </div>
  );
}

export default App;
