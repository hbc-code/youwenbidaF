import { useRoutes } from 'react-router-dom'
import routes from "./routers/routers";

import './common/styles/reset.css'

function App() {
  const Routes = useRoutes(routes)
  return (<div className="App">
    {Routes}
  </div>);
}

export default App;
