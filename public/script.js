async function windowActions() {
    const endpoint = 'https://data.princegeorgescountymd.gov/resource/umjn-t2iz.json';

    const request = await fetch(endpoint);

    const resturaunts = await request.json();

    function findMatches(zipToMatch, resturaunts) {
        return resturaunts.filter(place => {
        // here we need to figure out if the city or state matches what was searched
        const regex = new RegExp(zipToMatch, 'gi');
        return place.zip.match(regex)
        });
    }
    
    function displayMatches(event) {
        const matchArray = findMatches(event.target.value, resturaunts);
        const html = matchArray.map(place => {
            const regex = new RegExp(event.target.value, 'gi');
            const zipCode = place.zip.replace(regex, `<span class="hl">${event.target.value}</span>`);
            const rName = place.name.replace(regex, `<span class="hl">${event.target.value}</span>`);
            const address = place.address_line_1.replace(regex, `<span class="hl">${event.target.value}</span>`);
            const category = place.category.replace(regex, `<span class="hl">${event.target.value}</span>`);
            const inspectionResults = place.inspection_results.replace(regex, `<span class="hl">${event.target.value}</span>`);
            
            return `
            <li>
                <span class="name">${rName}</span>
                <span class="category">${category}</span>
                <span class="address">${address}</span>
                <span class="zipcode">${zipCode}</span>
                <span class="zipcode">Inspection Results: ${inspectionResults}</span>
            </li>
            `;
        }).join('');
        suggestions.innerHTML = html;
    }

    const searchInput = document.querySelector('.search');
    const suggestions = document.querySelector('.suggestions');

    searchInput.addEventListener('change', (evt) => {displayMatches(evt)});
    searchInput.addEventListener('keyup', (evt) => {displayMatches(evt)});
}    

window.onload = windowActions;