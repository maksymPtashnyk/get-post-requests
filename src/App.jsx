import './App.scss';
import { UserContextProvider } from './context/Context';
import GetBlock from './components/GetBlock/GetBlock';
import Header from './components/Header/Header';
import PostBlock from './components/PostBlock/PostBlock';
import SiteTitle from './components/SiteTitle/SiteTitle';

const App = () => {
  return (
    <UserContextProvider>
      <Header/>
      <SiteTitle/>
      <GetBlock/>
      <PostBlock/>
    </UserContextProvider>
  );
}

export default App;