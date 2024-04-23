const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')

const maxRecords = 151
const limit = 10
let offset = 0;

function convertPokemonToLi(pokemon) {
    const pokeName = pokemon.name;

    return `
        <li class="pokemon ${pokemon.type}" onClick="(() => openPokeModal('${pokeName}'))()">
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>

            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>

                <div>
                    <div class="img-pokemon">
                        <img src="${pokemon.photo}"
                            alt="${pokemon.name}">
                    </div>
                    <div class="img-pokeball">
                        <img src="/assets/img/ball_card.png" alt="pokeball">
                    </div>
                </div>
            </div>
        </li>

        <section id="modal-${pokemon.name}" class="modal hidden ${pokemon.type}">
            <div class="modal-header">
                <button class="btn-close" onClick="(() => {document.getElementById('modal-${pokemon.name}').classList.add('hidden'); document.getElementById('overlay-${pokemon.name}').classList.add('hidden')})()">X</button>
            </div>

            <div class="modal-body">
                <div class="poke-title">
                    <div class="poke-intro">
                        <span class="name">${pokemon.name}</span>
                        <span class="number">#${pokemon.number}</span>
                    </div>
                    <div class="typesModal">
                        <ol class="types">
                            ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                        </ol>    
                    </div>
                </div>

                <div class="poke-image">
                    <div class="img-pokemon">
                        <img src="${pokemon.photo}" alt="${pokemon.name}">
                    </div>
                    <div class="img-pokeball">
                        <img src="/assets/img/ball_card.png" alt="pokeball">
                    </div>
                </div>

                <div class="poke-detail">
                    <h4>About</h4>
                    <ul>
                        <li><span>Height:</span> ${pokemon.height}</li>
                        <li><span>Weight:</span> ${pokemon.weight}</li>
                        <li><span>Abilities:</span> ${pokemon.abilities.map((ability) => `${ability}`).join(', ')}</li>
                    </ul>
                </div>
            </div>
        </section>
    <div id="overlay-${pokemon.name}" class="overlay hidden" onClick="(() => {document.getElementById('modal-${pokemon.name}').classList.add('hidden'); document.getElementById('overlay-${pokemon.name}').classList.add('hidden')})()"></div>
    `;
}

function openPokeModal(name) {
    const pokeModal = document.getElementById(`modal-${name}`);
    //const modal = document.querySelector(".modal");
    const overlay = document.getElementById(`overlay-${name}`);
  
    pokeModal.classList.remove("hidden");
    overlay.classList.remove("hidden");
    console.log(name);
  }

function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map(convertPokemonToLi).join('')
        pokemonList.innerHTML += newHtml
    })
}

loadPokemonItens(offset, limit)

loadMoreButton.addEventListener('click', () => {
    offset += limit
    const qtdRecordsWithNexPage = offset + limit

    if (qtdRecordsWithNexPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonItens(offset, newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        loadPokemonItens(offset, limit)
    }
})