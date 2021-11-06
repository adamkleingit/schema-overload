import { GetCarsResponseType } from "common";
import { useQuery } from "react-query";
import { fetchCars } from "./api.utils";
import "./App.css";

function useCars() {
  const { data: cars, isLoading } = useQuery<GetCarsResponseType>(
    "cars",
    fetchCars
  );

  return { isLoading, cars };
}
function App() {
  const { isLoading, cars } = useCars();

  function renderCars() {
    if (isLoading) {
      return "loading...";
    }
    return (
      <table>
        <thead>
          <tr>
            <th>Body Type</th>
            <th>Manufacturer</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {cars?.map((car) => (
            <tr key={car.id}>
              <td>{car.bodyType}</td>
              <td>{car?.manufacturer?.name}</td>
              <td>{car.manufactureDate.toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
  return <div className="App">{renderCars()}</div>;
}

export default App;
