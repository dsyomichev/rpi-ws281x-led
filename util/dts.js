const glob = require('glob');
const path = require('path');
const fs = require('fs');

const compiled = glob.sync(path.join(__dirname, '../dist/**/*.d.ts'), {});

/**
 *  Trims the import statements from a .d.ts file.
 * @param {*} declaration - String representation of a .d.ts file.
 * @returns String - File without imports.
 */
const trimImports = (declaration) => {
  let im = declaration.indexOf('import');
  let final = declaration;

  while (im !== -1) {
    const semi = final.indexOf(';\n', im);

    const statement = final.substring(im, semi + 1);

    final = final.replace(statement, '');

    im = final.indexOf('import');
  }

  return final.trim();
};

/**
 *  Trims the export statements from a .d.ts file.
 * @param {*} declaration - String representation of a .d.ts file.
 * @returns String - File without exports.
 */
const trimExports = (declaration) => {
  let ex = declaration.indexOf('export');
  let final = declaration;

  while (ex !== -1) {
    let endline = final.indexOf('\n', ex);
    if (endline === -1) endline = final.length;

    const statement = final.substring(ex, endline);

    const end = statement.substring(statement.length - 1);

    if (end === '{') {
      const replacement = statement.replace('export default ', 'declare ').replace('export ', 'declare ');
      final = final.replace(statement, replacement);
    } else if (end === ';') {
      final = final.replace(statement, '');
    }

    ex = final.indexOf('export');
  }

  return final.trim();
};

/**
 * Removes all import/export statements from a file.
 * @param {*} declaration - String representation of a .d.ts file.
 * @returns String - File without import/export statements.
 */
const trim = (declaration) => {
  let final = trimImports(declaration);
  final = trimExports(final);
  final += '\n';
  return final;
};

let final = '';
let ex = '';
let index;

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

fs.writeFileSync(index, final);
