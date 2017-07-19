function confirmDelete(url) {
    if (confirm('Are you sure delete this journey ?')) {
        location.href = url;
    }
    return false;
}

function currentPosition(){
    $('#lat').val(1234567890);
    $('#lng').val(0987654321);
}