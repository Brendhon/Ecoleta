const populateUFs = _ => {

    const ufSelect = document.querySelector("select[name=uf]")

    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
        .then(res => res.json())
        .then(states => {
            for (state of states)
                ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`
        })
}
populateUFs()

const getCities = event => {

    const citiesSelect = document.querySelector("select[name=city]")
    const stateInput = document.querySelector("input[name=state]")

    const ufValue = event.target.value //pega o valor do local onde o envento foi executado

    const indexOfSelectedState = event.target.selectedIndex // Retorna um numero referente ao index de qual foi selecionado   
    stateInput.value = event.target.options[indexOfSelectedState].text

    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`


    citiesSelect.innerHTML = "<option value>Selecione a cidade</option>" // Zera os campos caso mude de município 
    citiesSelect.disabled = true // Desabilita 


    fetch(url)
        .then(res => res.json())
        .then(cities => {

            for (city of cities)
                citiesSelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`

            citiesSelect.disabled = false // Habilita  
        })

}

document.querySelector("select[name=uf]")
    .addEventListener("change", getCities)


// Items de coleta

const itemsToCollect = document.querySelectorAll(".items-grid li")

const collectItems = document.querySelector("input[name=items]")

let selectedItems = []

const handleSelectedItem = event => {

    const itemLi = event.target

    //Adiciona ou remove uma classe com js
    itemLi.classList.toggle("selected")

    itemId = itemLi.dataset.id // Pegando o valor salvo no atributo data-id

    // Verificar se o item clicado esta selecionado, se sim retorna o index do array se não retorna -1
    const alreadySelected = selectedItems.findIndex(item => item == itemId ? true : false)

    if (alreadySelected != -1)
        selectedItems = selectedItems.filter(item => item != itemId ? true : false) // Tirar da seleção
    else
        selectedItems.push(itemId) // Se ja estiver selecionado, tirar da seleção

    // Atualizar o campo escondido com os dados selecionados 
    collectItems.value = selectedItems

    console.log(collectItems.value)
}


for (const item of itemsToCollect) {
    item.addEventListener("click", handleSelectedItem)
}