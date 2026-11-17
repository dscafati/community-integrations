const PIPES_METADATA_TYPE_INFER = '__infer__';

export function normalizeMetadata(metadata: Record<string, any>): Record<string, any> {
  const normalizedMetadata: Record<string, any> = {};

  for (const [key, value] of Object.entries(metadata)) {
    // typeof null (and undefined) is 'object'; both must fall through to the inferred
    // value below, or `'type' in value` throws and kills the process.
    if (value != null && typeof value == 'object' && 'type' in value && 'raw_value' in value) {
      normalizedMetadata[key] = value;
    } else {
      normalizedMetadata[key] = {raw_value: value, type: PIPES_METADATA_TYPE_INFER};
    }
  }

  return normalizedMetadata;
}
