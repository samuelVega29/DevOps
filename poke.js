const campoBusqueda = traerElemento('.campo-busqueda'),
  botonBuscar = traerElemento('.boton-buscar'),
  container = traerElemento('.seccion-pokemon');

const URL_API = 'https://pokeapi.co/api/v2/pokemon/';

function traerElemento(element) {
  return document.querySelector(element);
}

async function solicitarInfo(nameOrId) {
  try {
    const response = await fetch(URL_API + nameOrId);
    if (!response.ok) throw new Error("Pokémon no encontrado");
    const data = await response.json();
    imprimir(data);
  } catch (err) {
    container.innerHTML = `<p class="error">❌ ${err.message}</p>`;
  }
}

function imprimir(pokemon) {
  const tipos = pokemon.types.map(t => t.type.name).join(', ');

  container.innerHTML = `
    <div class="pokemon-card">
      <div class="pokemon-picture">
        <img src="${pokemon.sprites.other['official-artwork'].front_default}" alt="${pokemon.name}">
      </div>
      <div class="pokemon-info">
        <h1>${pokemon.name.toUpperCase()}</h1>
        <p><strong>ID:</strong> ${pokemon.id}</p>
        <p><strong>Altura:</strong> ${(pokemon.height / 10).toFixed(2)} mts</p>
        <p><strong>Peso:</strong> ${(pokemon.weight / 10).toFixed(2)} kg</p>
        <p><strong>Tipo:</strong> ${tipos}</p>
      </div>
    </div>
  `;
}

function iniciar(pokeNameOrId) {
  solicitarInfo(pokeNameOrId.toLowerCase());
}

botonBuscar.addEventListener('click', event => {
  event.preventDefault();
  const pokeNameOrId = campoBusqueda.value.trim();
  if (pokeNameOrId) iniciar(pokeNameOrId);
});
