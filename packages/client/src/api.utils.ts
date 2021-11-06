export async function fetchCars() {
  const response = await fetch("http://localhost:3333/cars");
  const data = await response.json();
  return data.map((car: any) => ({
    ...car,
    manufactureDate: new Date(car.manufactureDate),
  }));
}
