function confirmDelete(url) {
    if (confirm('Are you sure delete this journey ?')) {
        location.href = url;
    }
    return false;
}