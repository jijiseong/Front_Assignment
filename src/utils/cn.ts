const cn = (...classNamesArray: Array<string | undefined>) => {
  const classNames = classNamesArray.join(' ').split(' ');

  const mergedClassName: string[] = [];

  const prefixExist: string[] = [];

  classNames.reverse().forEach((className) => {
    const prefix = className.split('-')[0];
    if (prefixExist.includes(prefix)) return;
    mergedClassName.push(className);
  });

  return mergedClassName.join(' ');
};

export default cn;
