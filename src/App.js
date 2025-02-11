import { RouterProvider } from 'react-router-dom';
import './App.css';
import router from './Pages/Router/Routes/Routes';
import RouteChangeListener from './RouteChangeListener';
import InitialRouteSync from './InitialRouteSync';

function App() {



  return (
    <div className='mx-auto max-w-screen-lg'>
      <RouterProvider router = {router}>
        <InitialRouteSync></InitialRouteSync>
        <RouteChangeListener></RouteChangeListener>
      </RouterProvider>
    </div>
  );
}

export default App;
