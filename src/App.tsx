import { ToastContainer, Zoom } from 'react-toastify';
import Routes from './pages/Routes';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <>
      <ToastContainer
        position="top-center"
        closeOnClick
        hideProgressBar
        autoClose={1500}
        text-align="center"
        transition={Zoom}
      />
      <Routes />
    </>
  );
}

export default App;
