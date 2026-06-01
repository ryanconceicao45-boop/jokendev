export async function carregarDados() {

    const response = await fetch('./assets/src/config.json')

    return await response.json()

}