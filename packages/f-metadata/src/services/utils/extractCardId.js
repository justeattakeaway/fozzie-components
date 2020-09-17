const extractCardId = id => {
    try {
        const decoded = atob(id);
        const start = decoded.indexOf('=');
        const end = decoded.indexOf('&');
        return decoded.slice(start + 1, end);
    } catch (error) {
        return id;
    }
};

export default extractCardId;
