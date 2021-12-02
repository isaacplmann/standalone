import { formatFiles, Tree } from '@nrwl/devkit';
import { applyTransform } from 'jscodeshift/src/testUtils';
import arrowFunctionsTransform from './arrow-functions';

export default async function (tree: Tree, schema: any) {
  const path = 'packages/app/src/app/app.ts';
  const input = tree.read(path).toString();
  const transformOptions = {};
  const output = applyTransform(
    { default: arrowFunctionsTransform, parser: 'ts' },
    transformOptions,
    { source: input }
  );
  tree.write(path, output);

  await formatFiles(tree);
  return () => {};
}
