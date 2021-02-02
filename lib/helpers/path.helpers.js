function handlePathObjectOptions(path, id, data) {
    return path.strings
        .map((s, i) => s +
        (path.contexts[i]
            ? path.contexts[i] instanceof Function
                ? path.contexts[i](id, data)
                : path.contexts[i]
            : ''))
        .join('');
}
export function parsePath(path, key, id, data) {
    let p = '';
    if (typeof path === 'string') {
        p = path + (id ? `/${id}` : '');
    }
    else if (path.strings) {
        p = handlePathObjectOptions(path, id, data);
    }
    else if (!path[key] && path.default) {
        if (typeof path.default === 'string') {
            p = path.default + (id ? `/${id}` : '');
        }
        else {
            p = handlePathObjectOptions(path.default, id, data);
        }
    }
    if (p.length) {
        return p.replace(/\/\//g, '/');
    }
    if (!key || !path[key]) {
        throw new Error(`${key} not found in ${path}`);
    }
    if (typeof path[key] === 'string') {
        return path[key];
    }
    return handlePathObjectOptions(path[key], id, data);
}
//# sourceMappingURL=path.helpers.js.map