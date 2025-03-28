document.addEventListener('DOMContentLoaded', () => {
    // Obtener el ID del post de la URL
    const urlParams = new URLSearchParams(window.location.search);
    const postId = urlParams.get('id');

    // Primero obtener los datos del JSON
    fetch('./data.json')
        .then(response => response.json())
        .then(posts => {
            // Encontrar el post que coincida con el ID
            const post = posts.find(post => post.id === parseInt(postId));

            if (!post) throw new Error('Post no encontrado');

            // Actualizar el título con los datos del JSON
            document.getElementsByTagName('title')[0].innerHTML = `@aloide - ${post.title}`;

            // Luego cargar el contenido del markdown
            return fetch(`./posts/${postId}.md`);
        })
        .then(response => response.text())
        .then(markdown => {
            const htmlContent = marked.parse(markdown);
            document.getElementById('post-content').innerHTML = htmlContent;
        })
        .catch(error => {
            console.error('Error cargando el post:', error);
            document.getElementById('post-content').innerHTML = '<p>Parece que estas intentando a acceder a un sitio al que no debes... 🤨</p>';
        });

    // Actualizar el año en el footer
    document.getElementById('current-year').textContent = new Date().getFullYear();
}); 