export function redirect(URL) {
    window.location.href = window.location.origin + URL
}

export function createHTML(html) {
    const template = document.createElement("template")

    template.innerHTML = html

    return template.content.cloneNode(true)
}

export default {
    redirect,
    createHTML,
}
