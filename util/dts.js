const glob = require('glob');
const path = require('path');
const fs = require('fs');
const prettier = require('prettier');
const prettierrc = require('../.prettierrc.json');
const trim = require('./trim');
const { trimImports } = require('./trim');

const compiled = glob.sync(path.join(__dirname, '../dist/**/*.d.ts'), {});
const src = glob.sync(path.join(__dirname, '../src/base/**/*.d.ts'), {});

let final = '';
let ex = '';
let index;

src.forEach((l) => {
  let file = fs.readFileSync(l).toString();
  file = trim(file);

  final += file;
});

compiled.forEach((l) => {
  let file = fs.readFileSync(l).toString();
  if (l.includes('index.d.ts')) {
    file = trimImports(file);
    ex = file;
    index = l;

    fs.rmSync(l);
  } else {
    file = trim(file);
    final += file;

    fs.rmSync(l);
  }
});

final += ex;

final = prettier.format(final, { prettierrc, ...{ parser: 'typescript' } });

fs.writeFileSync(index, final);
