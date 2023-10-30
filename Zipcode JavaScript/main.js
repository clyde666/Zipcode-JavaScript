document.querySelector('#zip').addEventListener('submit', getInfo);

document.querySelector('body').addEventListener('click', deleteLocation);


function getInfo(e){
    e.preventDefault()
    let zip = document.querySelector('#nme').value;
    
    //Make request to zip 
    fetch(`http://api.zippopotam.us/us/${zip}`)
        .then(response => {
            if(response.status != 200){
                showIcon('remove')
                document.querySelector('#output').innerHTML = 
                `
                <article class="message text-danger">
                    <div class="message-body ">Invalid Zipcode, please try again!</div>
                </article>
                `;
            throw Error(response.statusText);
            }else{
                showIcon('check')
                return response.json();
            }
        })
        .then(data => {
            //Show Location Info
            let output = '';
            data.places.forEach(place => {
                output+= `
                <article class="message bg-primary">
                    <div class="message-header">
                        <p class="display-6 text-light" >Location Info</p>
                        <button class="delete"></button>
                    </div>
                    <div class"message-body">
                        <ul> 
                          <li><strong>City: </strong> ${place['place name']}</li>
                          <li><strong>State: </strong> ${place['state']}</li>
                          <li><strong>Longitude: </strong> ${place['longitude']}</li>
                          <li><strong>Latitude: </strong> ${place['latitude']}</li>
                        </ul>
                    </div>
                </article>
                `
            })      
            document.querySelector('#output').innerHTML = output;
        })
        .catch(err => console.log(err))
};
function showIcon(icon){
    //Clear Icon
    document.querySelector('.icon-remove').style.display = 'none';
    document.querySelector('.icon-check').style.display = 'none'
    // Show Corrent Icon
    document.querySelector(`.icon-${icon}`).style.display = 'inline-flex';
};

function deleteLocation(e){
    if(e.target.className == 'delete'){
        document.querySelector('.message').remove();
        document.querySelector('#nme').value = '';
        document.querySelector('.icon-check').remove();
    }
}
