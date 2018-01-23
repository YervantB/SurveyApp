//https://rallycoding.herokuapp.com/api/music_albums

function fetchAlbums() {
    fetch('https://rallycoding.herokuapp.com/api/music_albums')
    .then(res => res.json())
    .then(json => console.log(json));
}

fetchAlbums();

//using async await

async function fetchAlbums2(){
    const res = await fetch('https://rallycoding.herokuapp.com/api/music_albums');
    const json = await res.json();

    console.log(json);
}

fetchAlbums2();


//using async with arrow functions
const fetchAlbums3 = async () => {
    const res = await fetch('https://rallycoding.herokuapp.com/api/music_albums');
    const json = await res.json();

    console.log(json);
}

fetchAlbums3();
