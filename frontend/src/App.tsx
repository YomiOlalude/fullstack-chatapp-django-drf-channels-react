import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Explore from './pages/Explore';
import ToggleColorMode from './pages/elements/ToggleColorMode';
import Server from './pages/Server';

function App() {

  return (
    <>
      <ToggleColorMode>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/server/:serverId/:channelId?" element={<Server />} />
          <Route path="/explore/:categoryName/" element={<Explore />} />
        </Routes>
      </ToggleColorMode>
    </>
  );
}

export default App;
