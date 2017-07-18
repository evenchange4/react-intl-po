import R from 'ramda';
import po2json from 'po2json';

const parseFileSync = R.pipe(
  // 1. Convert po to json format
  filename => po2json.parseFileSync(filename),
  // 2. Omit pot epmty head above
  R.omit(['']),
  // 3. Omit plural
  R.mapObjIndexed(R.nth(1)),
);

export default {
  parseFileSync,
};
