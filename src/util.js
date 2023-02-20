exports.parseFullName = (fullName) => {
  let scope;
  let name = fullName;
  if (fullName.startsWith('@')) {
    [scope, name] = fullName.replace('@', '').split('/');
  }

  return [
    scope,
    fullName,
  ]
}