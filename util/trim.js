const trimImports = (ch) => {
  let im = ch.indexOf('import');
  let final = ch;

  while (im !== -1) {
    const semi = final.indexOf(';\n', im);

    const statement = final.substring(im, semi + 1);

    final = final.replace(statement, '');

    im = final.indexOf('import');
  }

  return final.trim();
};

const trimExports = (ch) => {
  let ex = ch.indexOf('export');
  let final = ch;

  while (ex !== -1) {
    let endline = final.indexOf('\n', ex);
    if (endline === -1) endline = final.length;

    const statement = final.substring(ex, endline);

    const end = statement.substring(statement.length - 1);

    if (end === '{') {
      const replacement = statement.replace('export default ', '\ndeclare ').replace('export ', '\ndeclare ');
      final = final.replace(statement, replacement);
    } else if (end === ';') {
      final = final.replace(statement, '');
    }

    ex = final.indexOf('export');
  }

  return final.trim();
};

const trim = (interface) => {
  let final = trimImports(interface);
  final = trimExports(final);
  final += '\n\n';
  return final;
};

module.exports = trim;
module.exports.trimImports = trimImports;
module.exports.trimExports = trimExports;
