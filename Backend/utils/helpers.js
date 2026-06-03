// Add reusable helper functions here
const formatDate = (date) => new Date(date).toISOString().split('T')[0];

export { formatDate };
