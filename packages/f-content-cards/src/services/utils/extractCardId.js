const extractCardId = id => {
    const decoded = atob(id);
    const start = decoded.indexOf('=');
    const end = decoded.indexOf('&');
    return decoded.slice(start + 1, end);
};

export default extractCardId;
