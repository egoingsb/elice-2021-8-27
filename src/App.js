import logo from './logo.svg';
import './App.css';
function HeaderTag(){
  return(
    <header>
      <h1>
        <a href="index.html">WEB</a>
      </h1>
    </header>
  )
}
function NavTag(){
  return (
    <nav>
      <ol>
      <li>
          <a href="1.html">html</a>
        </li>
        <li>
          <a href="1.html">css</a>
        </li>
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
  return (
    <div>
      <HeaderTag></HeaderTag>
      <NavTag></NavTag>
      <ReadTag title="Weclome" desc="Hello, WEB"></ReadTag>
    </div>
  );
}

export default App;
