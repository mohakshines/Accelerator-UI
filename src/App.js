import './App.css';
import Sidebar from './components/Sidebar';
import StepperForm from './components/StepperForm';

const App = () => {
  const heading = 'Aerothon Accelerator'.toUpperCase()
  return (
    <div className="App">
      <Sidebar />
      {/* <h1 style={{ marginBottom: '50px' }}>{heading}</h1> */}
      <StepperForm />
    </div>
  );
}

export default App;
