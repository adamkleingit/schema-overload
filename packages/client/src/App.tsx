import { GetCarsResponseSchema, GetCarsResponseType } from "common";
import Ajv from "ajv/dist/jtd";
import { useQuery } from "react-query";
import "./App.css";

const ajv = new Ajv();
const parse = ajv.compileParser<GetCarsResponseType>(GetCarsResponseSchema);

async function fetchCars() {
  const response = await fetch("http://localhost:3333/cars");
  const data = await response.json();
  const cars = parse(data);
  if (!cars) {
    throw new Error("Error parsing cars");
  }
  return cars;
}

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
        <tr>
          <th>Body Type</th>
          <th>Manufacturer</th>
          <th>Date</th>
        </tr>
        {cars?.map((car) => (
          <tr key={car.id}>
            <td>{car.bodyType}</td>
            <td>{car?.manufacturer?.name}</td>
            <td>{car.manufactureDate.getTime()}</td>
          </tr>
        ))}
      </table>
    );
  }
  return <div className="App">{renderCars()}</div>;
}

export default App;
