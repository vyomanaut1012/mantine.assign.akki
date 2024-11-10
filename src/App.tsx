import './App.css';
import CropTable from './components/pages/cropTable/CropTable';
import TimePeriodTable from './components/pages/timePeriodTable/TimePeriodTable';

function App() {

  return (
    <>
      <h1 style={{ textAlign:'center', marginTop:'1rem'}}>Indian Agriculture Data Analysis between 1950-2020</h1>
      <CropTable />
      <TimePeriodTable />
    </>
  )
}

export default App
