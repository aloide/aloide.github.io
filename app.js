// Opción 1: Usando fetch
let posts = []
let allPosts = []

function loadPosts() {
    fetch('./data.json')
        .then(response => response.json())
        .then(data => {
            posts = data.map(post => ({
                id: post.id,
                title: post.title,
                content: post.description,
                author: "u/aloide", // Puedes ajustar esto según tus necesidades
                filename: post.filename,
                date: post.date,
                tags: post.tags
            }));
            allPosts = [...posts];
            renderPosts();
        })
        .catch(error => console.error('Error cargando los posts:', error));
}

function renderPosts(postsToRender = posts) {
    const container = document.getElementById('posts-container');
    container.innerHTML = postsToRender.map(post => `
        <div class="post-card">
            <h3><a href="post.html?id=${post.id}">${post.title}</a></h3>
            <p>${post.content}</p>
            <footer>
                <small><i>${post.date}</i></small>
                <div>
                    ${post.tags.map(tag => `<span class="tag">#${tag}</span>`).join(' ')}
                </div>
            </footer>
        </div>
    `).join('');
}

function showSection(sectionName) {
    // Hide all sections
    ['home', 'profile'].forEach(section => {
        document.getElementById(`${section}-section`).style.display = 'none';
    });

    // Show selected section
    document.getElementById(`${sectionName}-section`).style.display = 'block';

    renderPosts();
}

document.addEventListener('DOMContentLoaded', () => {
    // Actualizar el año en el footer
    document.getElementById('current-year').textContent = new Date().getFullYear();
    loadPosts();
    
    // Agregar evento de búsqueda
    const searchInput = document.getElementById('search-input');
    searchInput.addEventListener('input', (e) => {
        let searchTerm = e.target.value.toLowerCase();
        searchTerm = searchTerm.includes('#') ? 
            searchTerm.replace('#', '').trim() : 
            searchTerm.trim();
            
        const filteredPosts = allPosts.filter(post => {
            if (searchTerm.startsWith('#')) {
                return post.tags.some(tag => tag.toLowerCase().includes(searchTerm));
            }
            return post.title.toLowerCase().includes(searchTerm) ||
                   post.content.toLowerCase().includes(searchTerm) ||
                   post.tags.some(tag => tag.toLowerCase().includes(searchTerm));
        });
        renderPosts(filteredPosts);
    });

    const typed = new Typed('#auto-type', {
        strings: ['de un desarrollador...', 'de un estudiante...', 'para aprender...', 'para leer...'],
        typeSpeed: 50,          // Velocidad de escritura
        backSpeed: 50,          // Velocidad de borrado
        backDelay: 2000,        // Tiempo de espera antes de borrar
        startDelay: 1000,       // Tiempo antes de iniciar
        loop: true,             // Repetir indefinidamente
        cursorChar: '|',        // Carácter del cursor
        smartBackspace: true    // Solo borra las palabras diferentes
    });
});

// Initial render
renderPosts();
