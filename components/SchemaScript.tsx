interface SchemaScriptProps {
  schemas: Record<string, unknown>[];
}

export function SchemaScript({ schemas }: SchemaScriptProps) {
  if (schemas.length === 0) return null;
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas) }}
    />
  );
}
