document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('contactForm');

    if (!form) return;

    form.addEventListener('submit', async function (e) {
        e.preventDefault();

        // Coleta os valores atuais
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const phone = document.getElementById('phone').value.trim();
        const service = document.getElementById('service').value;
        const message = document.getElementById('message').value.trim();

        // Dados UTM
        const urlParams = new URLSearchParams(window.location.search);
        const get = (param) => urlParams.has(param) ? urlParams.get(param) : '';

        // Payload SIMPLIFICADO — SEM ACENTOS, SEM ESPAÇOS, TUDO MINÚSCULO
        const payload = {
            name: name,
            email: email,
            phone: phone,
            service: service,
            message: message,
            form_id: form.id,
            form_name: form.name,
            page: window.location.pathname.split('/').filter(Boolean).pop() || 'home',
            url: window.location.href,
            utm_id: get('utm_id'),
            utm_term: get('utm_term'),
            utm_medium: get('utm_medium'),
            utm_source: get('utm_source'),
            utm_content: get('utm_content'),
            utm_campaign: get('utm_campaign'),
            traffic_type: ['utm_source', 'utm_medium', 'utm_campaign'].some(p => urlParams.has(p)) ? 'Pago' : 'Orgânico',
            device: window.innerWidth <= 768 ? 'Mobile' : 'Compultador',
            ip: 'Desconhecido',
            funciona_com: 'HTML'
        };

        // Mostra no console o que será enviado
        console.log('📤 Teste simplificado:', payload);

        // Envia para o webhook do Make
        fetch('https://hook.us2.make.com/yhx1dk695ixp27dxj1w9wqflcng3do9h', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        })
            .then(response => {
                if (response.ok) {
                    // ✅ Sucesso: redireciona para a página de obrigado
                    window.location.href = 'https://weblinkstudio.com.br/obrigado';
                } else {
                    // ❌ Erro: mostra alerta
                    alert('Erro no envio. Por favor, tente novamente.');
                }
            })
            .catch(err => {
                console.error('Erro:', err);
                alert('Erro de conexão. Não foi possível enviar sua mensagem.');
            });

        // Simula envio para PHP (opcional)
        const formData = new FormData(form);
        fetch(form.action, { method: 'POST', body: formData });
    });
});


// JavaScript para abrir/fechar o menu
const menuToggle = document.getElementById('mobile-menu-toggle');
const closeSidebar = document.getElementById('close-sidebar');
const sidebar = document.getElementById('sidebar-menu');
const overlay = document.getElementById('sidebar-overlay');

const openMenu = () => {
    if (!sidebar || !overlay) return;
    sidebar.classList.remove('-translate-x-full');
    overlay.classList.remove('hidden');
    document.body.classList.add('overflow-hidden'); // Evita scroll no fundo
};

const closeMenu = () => {
    if (!sidebar || !overlay) return;
    sidebar.classList.add('-translate-x-full');
    overlay.classList.add('hidden');
    document.body.classList.remove('overflow-hidden');
};

if (menuToggle) {
    // Alterna entre abrir e fechar ao clicar no botão do menu
    menuToggle.addEventListener('click', () => {
        const isOpen = !sidebar.classList.contains('-translate-x-full');
        if (isOpen) {
            closeMenu(); // Se já está aberto, fecha
        } else {
            openMenu(); // Se está fechado, abre
        }
    });
}

if (closeSidebar) {
    // Fecha o menu ao clicar no botão de fechar
    closeSidebar.addEventListener('click', closeMenu);
}

if (overlay) {
    // Fecha o menu ao clicar no overlay
    overlay.addEventListener('click', closeMenu);
}


// Portfolio Modal
function openModal(modalId) {
    const modal = document.getElementById('portfolioModal');
    const title = document.getElementById('modalTitle');
    const content = document.getElementById('modalContent');

    if (!modal || !title || !content) return;

    const portfolioData = {
        'modal1': {
            title: 'Thieguinho LP2',
            content: `
    <img src="images/Weblinkstudio - Thieguinho Lp2 - 2026-09-21.png"
        alt="Landing page para contratação de shows do Thieguinho"
        class="w-full rounded-lg mb-4 border-[1px] border-gray-300 shadow-custom-blue">
    <p class="text-gray-600 mb-4">Landing page desenvolvida para divulgar o trabalho do Thieguinho e facilitar a contratação de shows. O projeto apresenta a banda, os estilos musicais, os formatos de eventos e chamadas estratégicas para conversão.</p>
    <div class="grid grid-cols-2 gap-4 mb-4">
        <div><strong>Tecnologias:</strong> HTML5, CSS3, JavaScript, VS Code</div>
        <div><strong>Tempo de projeto:</strong> 5 dias</div>
        <div><strong>Tipo:</strong> Landing page para contratação de shows</div>
        <div><strong>Resultado:</strong> Projeto desenvolvido para apresentação</div>
        <div class="link-ao-vivo"><strong>Ao Vivo:</strong> <a href="https://weblinkstudio-dev.github.io/thieguinho/" target="_blank">https://weblinkstudio-dev.github.io/thieguinho/</a></div>
    </div>
    `
        },
        'modal2': {
            title: 'Thieguinho LP',
            content: `
    <img src="images/Weblinkstudio - Thieguinho Lp - 2026-09-21.png" alt="Landing page para contratação de shows do Thieguinho"
        class="w-full rounded-lg mb-4 border-[1px] border-gray-300 shadow-custom-blue">
    <p class="text-gray-600 mb-4">Landing page criada para apresentar o Thieguinho e sua banda, destacando a experiência dos shows e incentivando organizadores a consultarem datas e valores para seus eventos.</p>
    <div class="grid grid-cols-2 gap-4 mb-4">
        <div><strong>Tecnologias:</strong> HTML5, CSS3, JavaScript, VS Code</div>
        <div><strong>Tempo de projeto:</strong> 5 dias</div>
        <div><strong>Tipo:</strong> Landing page para contratação de shows</div>
        <div><strong>Resultado:</strong> Projeto desenvolvido para apresentação</div>
        <div class="link-ao-vivo"><strong>Ao Vivo:</strong> <a href="https://gustavosiqueiramorais.github.io/ThieguinhoLP/" target="_blank">https://gustavosiqueiramorais.github.io/ThieguinhoLP/</a></div>
    </div>
    `
        },
        'modal3': {
            title: 'Academia Futuro BR',
            content: `
    <img src="images/Weblinkstudio - Academia Futuro BR - 2026-09-21.png"
        alt="Site institucional para a Academia Futuro BR"
        class="w-full rounded-lg mb-4 border-[1px] border-gray-300 shadow-custom-blue">
    <p class="text-gray-600 mb-4">Site institucional desenvolvido para a Academia Futuro BR, com foco em apresentar sua proposta educacional, diferenciais, professores, resultados e canais de contato para novas famílias.</p>
    <div class="grid grid-cols-2 gap-4 mb-4">
        <div><strong>Tecnologias:</strong> HTML5, CSS3, JavaScript, VS Code</div>
        <div><strong>Tempo de projeto:</strong> 7 dias</div>
        <div><strong>Tipo:</strong> Site institucional educacional</div>
        <div><strong>Resultado:</strong> Projeto desenvolvido para apresentação</div>
        <div class="link-ao-vivo"><strong>Ao Vivo:</strong> <a href="https://weblinkstudio-dev.github.io/academia-futuro-br/" target="_blank">https://weblinkstudio-dev.github.io/academia-futuro-br/</a></div>
    </div>
    `
        },
        'modal4': {
            title: 'Mansão Maromba',
            content: `
    <img src="images/Weblinkstudio - Mansão Maromba - 2026-09-21.png"
        alt="Landing page para bebidas Mansão Maromba"
        class="w-full rounded-lg mb-4 border-[1px] border-gray-300 shadow-custom-blue">
    <p class="text-gray-600 mb-4">Landing page desenvolvida para a Mansão Maromba, apresentando sua linha de bebidas, a expansão da marca, os produtos e as oportunidades para lojistas e distribuidores.</p>
    <div class="grid grid-cols-2 gap-4 mb-4">
        <div><strong>Tecnologias:</strong> HTML5, CSS3, JavaScript, VS Code</div>
        <div><strong>Tempo de projeto:</strong> 6 dias</div>
        <div><strong>Tipo:</strong> Landing page para marca de bebidas</div>
        <div><strong>Resultado:</strong> Projeto desenvolvido para apresentação</div>
        <div class="link-ao-vivo"><strong>Ao Vivo:</strong> <a href="https://weblinkstudio-dev.github.io/mansao-maromba/" target="_blank">https://weblinkstudio-dev.github.io/mansao-maromba/</a></div>
    </div>
    `
        },
        'modal5': {
            title: 'Smart Fit',
            content: `
    <img src="images/Weblinkstudio - Smartfit - 2026-09-21.png"
        alt="Landing page para academia Smart Fit"
        class="w-full rounded-lg mb-4 border-[1px] border-gray-300 shadow-custom-blue">
    <p class="text-gray-600 mb-4">Landing page criada para divulgar a rede Smart Fit, seus planos, unidades, modalidades de treino e recursos do aplicativo, com foco na conversão de novos alunos.</p>
    <div class="grid grid-cols-2 gap-4 mb-4">
        <div><strong>Tecnologias:</strong> HTML5, CSS3, JavaScript, VS Code</div>
        <div><strong>Tempo de projeto:</strong> 5 dias</div>
        <div><strong>Tipo:</strong> Landing page para academia</div>
        <div><strong>Resultado:</strong> Projeto desenvolvido para apresentação</div>
        <div class="link-ao-vivo"><strong>Ao Vivo:</strong> <a href="https://weblinkstudio-dev.github.io/smartfit/" target="_blank">https://weblinkstudio-dev.github.io/smartfit/</a></div>
    </div>
    `
        },
        'modal6': {
            title: 'Orion Advocacia',
            content: `
    <img src="images/Weblinkstudio - Orion Advocacia - 2026-09-21.png"
        alt="Site institucional para o escritório Orion Advocacia"
        class="w-full rounded-lg mb-4 border-[1px] border-gray-300 shadow-custom-blue">
    <p class="text-gray-600 mb-4">Site institucional desenvolvido para a Orion Advocacia, apresentando sua atuação consultiva, áreas jurídicas, diferenciais, equipe e canais para agendamento de uma reunião estratégica.</p>
    <div class="grid grid-cols-2 gap-4 mb-4">
        <div><strong>Tecnologias:</strong> HTML5, CSS3, JavaScript, VS Code</div>
        <div><strong>Tempo de projeto:</strong> 7 dias</div>
        <div><strong>Tipo:</strong> Site institucional jurídico</div>
        <div><strong>Resultado:</strong> Projeto desenvolvido para apresentação</div>
        <div class="link-ao-vivo"><strong>Ao Vivo:</strong> <a href="https://weblinkstudio-dev.github.io/orion-advocacia/" target="_blank">https://weblinkstudio-dev.github.io/orion-advocacia/</a></div>
    </div>
    `
        }
    };

    const data = portfolioData[modalId];
    if (data) {
        title.textContent = data.title;
        content.innerHTML = data.content;
        modal.classList.remove('hidden');
        modal.classList.add('flex');
        document.body.style.overflow = 'hidden';
    }
}

function closeModal() {
    const modal = document.getElementById('portfolioModal');
    if (!modal) return;
    modal.classList.add('hidden');
    modal.classList.remove('flex');
    document.body.style.overflow = 'auto';
}


(function () {
    // FAQ Toggle Functionality
    window.toggleFAQ = function (button) {
        const content = button.nextElementSibling;
        const icon = button.querySelector('svg');

        if (!content || !icon) return;

        if (content.classList.contains('hidden')) {
            content.classList.remove('hidden');
            icon.style.transform = 'rotate(180deg)';
        } else {
            content.classList.add('hidden');
            icon.style.transform = 'rotate(0deg)';
        }
    };

    // Smooth scroll for anchor links
    document.addEventListener('DOMContentLoaded', function () {
        const links = document.querySelectorAll('a[href^="#"]');

        links.forEach(link => {
            link.addEventListener('click', function (e) {
                e.preventDefault();

                const targetId = this.getAttribute('href');
                const targetSection = document.querySelector(targetId);

                if (targetSection) {
                    const headerHeight = 80; // Fixed header height
                    const targetPosition = targetSection.offsetTop - headerHeight;

                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });

        // Header scroll effect
        const header = document.querySelector('header');

        window.addEventListener('scroll', function () {
            if (!header) return;

            if (window.scrollY > 100) {
                header.classList.add('bg-white', 'shadow-lg');
            } else {
                header.classList.remove('bg-white', 'shadow-lg');
            }
        });
    });
})();
