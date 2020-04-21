export const getSymbolMap = (list) => {
    const map = {};
    list.forEach(key => map[key] = Symbol(key));
    return map;
};

