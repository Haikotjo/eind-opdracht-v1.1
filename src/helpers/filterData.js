export const filterData = (data, searchTerm, attribute) => {
    return data.filter(item =>
        item[attribute].toLowerCase().includes(searchTerm.toLowerCase())
    );
};