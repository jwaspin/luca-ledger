export default function useLoader() {
  const loadJsonData = (jsonData) => {
    console.log(jsonData);
  };

  return { loadJsonData };
}
