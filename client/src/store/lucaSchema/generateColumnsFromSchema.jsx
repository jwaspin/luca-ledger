export default function generateColumnsFromSchema(schema) {
  return Object.keys(schema.properties).map((key) => {
    const property = schema.properties[key];
    return {
      field: key,
      title: property.title || key,
      component: ({ row }) => <div>{String(row[key])}</div>,
    };
  });
}
