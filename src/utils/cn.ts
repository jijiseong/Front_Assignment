const cn = (...classNamesArray: Array<string | undefined>) => {
  const classNames = classNamesArray.join(' ').split(' ');

  const mergedClassName: string[] = [];

  const usedPrefixes: string[] = [];

  classNames.reverse().forEach((className) => {
    const prefix = className.split('-')[0];
    if (usedPrefixes.includes(prefix)) return;
    mergedClassName.push(className);
  });

  return mergedClassName.join(' ');
};

export default cn;
