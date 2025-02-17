document.addEventListener('DOMContentLoaded', () => {
    fetch('/api/data')
        .then(response => response.json())
        .then(data => {
            const list = document.getElementById('list');
            data.forEach(item => {
                const listItem = document.createElement('li');
                listItem.textContent = item.name;
                list.appendChild(listItem);
            });
        });
});
