import { useCallback } from 'react';
import { useDispatch } from 'react-redux';

export default function useDataImporter() {
  const dispatch = useDispatch();

  const importData = useCallback(
    (jsonData) => {
      console.log('importing data to redux', jsonData);
      // dispatch({ type: 'import/importData', payload: jsonData });
    },
    [dispatch]
  );

  return { importData };
}
