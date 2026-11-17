import {normalizeMetadata} from '../normalize_metadata';

test('normalizeMetadataTest', () => {
  const input = {
    key1: 100,
    key2: 'string',
    key3: {type: 'int', raw_value: 200},
  };

  const output = {
    key1: {type: '__infer__', raw_value: 100},
    key2: {type: '__infer__', raw_value: 'string'},
    key3: {type: 'int', raw_value: 200},
  };

  expect(normalizeMetadata(input)).toEqual(output);
});

test('normalizeMetadataNullValueTest', () => {
  // typeof null is 'object'; null and undefined must be normalized, not crash the process.
  expect(normalizeMetadata({key: null})).toEqual({key: {type: '__infer__', raw_value: null}});
  expect(normalizeMetadata({key: undefined})).toEqual({key: {type: '__infer__', raw_value: undefined}});
});
