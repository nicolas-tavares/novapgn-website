(function () {
    emailjs.init("oMr2UBvqNkoY9gn3o");
})();

const reveals = document.querySelectorAll('[data-reveal]');
const revealOnScroll = () => {
    reveals.forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight - 100) {
            el.classList.add('visible');
        }
    });
};
window.addEventListener('scroll', revealOnScroll);
revealOnScroll();

const clientesContainer = document.getElementById('clientesScroll');
const prevBtn = document.querySelector('.cliente-nav.prev');
const nextBtn = document.querySelector('.cliente-nav.next');
const clientWidth = 250;
let currentPosition = 0;
const visibleClients = 3; // Número de clientes visíveis por vez
const totalClients = clientesContainer.children.length;

function updateNavigation() {
    prevBtn.style.display = 'flex';
    nextBtn.style.display = 'flex';
}

prevBtn.addEventListener('click', () => {
    if (currentPosition >= 0) {
        currentPosition = -(totalClients - visibleClients) * clientWidth;
    } else {
        currentPosition += clientWidth;
    }
    clientesContainer.style.transform = `translateX(${currentPosition}px)`;
    updateNavigation();
});

nextBtn.addEventListener('click', () => {
    const maxScroll = -(totalClients - visibleClients) * clientWidth;
    if (currentPosition <= maxScroll) {
        currentPosition = 0;
    } else {
        currentPosition -= clientWidth;
    }
    clientesContainer.style.transform = `translateX(${currentPosition}px)`;
    updateNavigation();
});


updateNavigation();


clientesContainer.style.transition = 'transform 0.5s ease';

function sendEmail(e) {
    e.preventDefault();

    const btn = document.querySelector('.btn-page');
    const originalText = btn.textContent;
    btn.textContent = 'Enviando...';
    btn.disabled = true;

    const templateParams = {
        from_name: document.getElementById('name').value,
        from_email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        message: `Nome: ${document.getElementById('name').value}\nEmail: ${document.getElementById('email').value}\nTelefone: ${document.getElementById('phone').value}\n\nMensagem:\n${document.getElementById('message').value}`,
        to_email: 'contato.novapgn@gmail.com'
    };

    emailjs.send('service_b1hu5md', 'template_stugb2q', templateParams)
        .then(function () {
            alert('Mensagem enviada com sucesso!');
            document.getElementById('contactForm').reset();
        }, function (error) {
            alert('Erro ao enviar mensagem. Por favor, tente novamente.');
            console.error('Error:', error);
        })
        .finally(() => {
            btn.textContent = originalText;
            btn.disabled = false;
        });
}