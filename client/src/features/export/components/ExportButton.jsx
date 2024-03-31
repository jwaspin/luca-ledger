import { Button } from '@mui/material';

import { useEntities, useTransactions } from '@/hooks';
import { validateLucaSchema, validateSchema } from '@/store/validators';

export default function ExportButton() {
  const { transactions } = useTransactions();
  const { entities } = useEntities();

  const handleExport = () => {
    const schema = {
      id: 'luca-schema',
      name: 'Luca Schema',
      version: '1.0.0',
    };

    const valid = validateSchema(schema);

    if (!valid) {
      console.error(validateSchema.errors);
      return;
    }

    const data = {
      schema,
      transactions,
      entities,
    };

    const validData = validateLucaSchema(data);

    if (!validData) {
      console.error(validateLucaSchema.errors);
      return;
    }

    const blob = new Blob([JSON.stringify(data)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = 'export.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div style={{ position: 'absolute', right: '50px' }}>
      <Button
        variant='contained'
        color='primary'
        onClick={handleExport}
      >
        Export
      </Button>
    </div>
  );
}
