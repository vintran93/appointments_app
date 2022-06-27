import { Routes, Route} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Sidebar from './components/Sidebar';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import Profile from './components/Profile';
import DoctorsContainer from './components/DoctorsContainer';
import Doctor from './components/Doctor';
// import AppointmentsContainer from './components/AppointmentsContainer';
// import Appointment from './components/Appointment';
// import NewAppointment from './components/NewAppointment';

function App () {
  return (
    <div>
      <Sidebar />
      <main>
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/doctors" element={<DoctorsContainer />} />
          <Route path="/doctors/:id" element={<Doctor />} /> 
        </Routes>
      </main>
      Hello World
    </div>
  );
};

export default App;