const endpoint = 'https://data.princegeorgescountymd.gov/resource/umjn-t2iz.json';
    const resturaunts = [];

    fetch(endpoint)
    .then(blob => blob.json())
    .then(data => resturaunts.push(...data));

    function findMatches(zipToMatch, resturaunts) {
        return resturaunts.filter(place => {
        // here we need to figure out if the city or state matches what was searched
        const regex = new RegExp(zipToMatch, 'gi');
        return place.zip.match(regex)
        });
    }
    
    function displayMatches() {
        const matchArray = findMatches(this.value, resturaunts);
        const html = matchArray.map(place => {
            const regex = new RegExp(this.value, 'gi');
            const zipCode = place.zip.replace(regex, `<span class="hl">${this.value}</span>`);
            const rName = place.name.replace(regex, `<span class="hl">${this.value}</span>`);
            const address = place.address_line_1.replace(regex, `<span class="hl">${this.value}</span>`);
            const category = place.category.replace(regex, `<span class="hl">${this.value}</span>`);
            
            return `
            <li>
                <span class="name">${rName}</span>
                <span class="category">${category}</span>
                <span class="address">${address}</span>
                <span class="zipcode">${zipCode}</span>
            </li>
            `;
        }).join('');
        suggestions.innerHTML = html;
    }

    const searchInput = document.querySelector('.search');
    const suggestions = document.querySelector('.suggestions');

    searchInput.addEventListener('change', displayMatches);
    searchInput.addEventListener('keyup', displayMatches);
