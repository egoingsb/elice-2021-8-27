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
function Create(props){
  return (
    <form onSubmit={e=>{
      e.preventDefault();
      var title = e.target.title.value;
      var desc = e.target.desc.value;
      props.onCreate({
        title:title,
        desc:desc
      });
    }}>
      <h2>Create</h2>
      <p><input name="title" type="text" placeholder="title"></input></p>
      <p><textarea name="desc" placeholder="description"></textarea></p>
      <p><input type="submit"></input></p>
    </form>
  )
}
function Update(props){
  var [title, setTitle] = useState(props.title);
  var [desc, setDesc] = useState(props.desc);
  return (
    <form onSubmit={e=>{
      e.preventDefault();
      var title = e.target.title.value;
      var desc = e.target.desc.value;
      props.onUpdate({
        title:title,
        desc:desc
      });
    }}>
      <h2>Update</h2>
      <p>
        <input 
          name="title" 
          type="text" 
          placeholder="title" 
          onChange={e=>{
            console.log(e.target.value);
            setTitle(e.target.value)
          }} 
          value={title}></input></p>
      <p><textarea onChange={e=>setDesc(e.target.value)} name="desc" placeholder="description" value={desc}></textarea></p>
      <p><input type="submit"></input></p>
    </form>
  )
}
function App() {
  console.log('App render');
  var [nextId,setNextId] = useState(3);
  var [mode, setMode] = useState('CREATE');
  var [id, setId] = useState(1);
  var [topics, setTopics] = useState([
    {id:1, title:'HTML', desc:'HTML is ...'},
    {id:2, title:'CSS', desc:'CSS is ...'}
  ]);
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
    if(_mode==='DELETE'){
      var newTopics = [];
      for(var i=0; i<topics.length; i++){
        if(topics[i].id === id){
        } else {
          newTopics.push(topics[i]);
        }
      }
      setTopics(newTopics);
    } else {
      setMode(_mode);
    }
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
    article = <Create onCreate={data=>{
      var newTopics = [...topics];
      newTopics.push({
        "id":nextId,
        "title":data.title,
        "desc":data.desc
      });
      setTopics(newTopics);
      setMode('READ');
      setId(nextId);
      setNextId(nextId+1);
    }}></Create>
  } else if(mode === 'UPDATE'){
    for(var i=0; i<topics.length; i++){
      if(topics[i].id === id){
        article = <Update title={topics[i].title} desc={topics[i].desc} onUpdate={data=>{
          console.log('update', data);
          var newTopics = [...topics];
          for(var i=0; i<newTopics.length; i++){
            if(newTopics[i].id === id){
              newTopics[i] = {
                id:newTopics[i].id,
                title:data.title,
                desc:data.desc
              }
            }
          }
          setTopics(newTopics);
          setMode('READ');
        }}></Update>
        break;
      }
    }
    
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
      <input type="button" value="DELETE" data-mode="DELETE" onClick={clickHandler}></input>
    </div>);
}

export default App;
