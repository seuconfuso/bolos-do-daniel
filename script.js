
const ADMIN_PASSWORD = 'admin123'; // ⚠️ Alterar senha no futuro ver forma mais forte


let isAuthenticated = false;


const loginOverlay = document.getElementById('loginOverlay');
const loginBtn = document.getElementById('loginBtn');
const adminPassword = document.getElementById('adminPassword');
const loginError = document.getElementById('loginError');
const adminToggleBtn = document.getElementById('adminToggleBtn');
const adminPanel = document.getElementById('adminPanel');
const adminForm = document.getElementById('adminForm');
const adminProductList = document.getElementById('adminProductList');
const adminEditId = document.getElementById('adminEditId');


const formOverlay = document.getElementById('formOverlay');
const clienteForm = document.getElementById('clienteForm');
const cancelFormBtn = document.getElementById('cancelFormBtn');


const DEFAULT_BOLOS = [
    { id: 'b1', name: 'Amarelo com chuva de chocolate', desc: 'Massa fofinha com cobertura cremosa de brigadeiro e granulado.', price: 42.90, img: 'img/amarelochoco.jpg' },
    { id: 'b2', name: 'Bolo do Flamengo', desc: 'Cobertura de chocolate derretido, cenoura fresca na massa.', price: 38.50, img: 'img/flamengo.jpg' },
    { id: 'b3', name: 'Bolo Fofo', desc: 'Morangos frescos, recheio de creme e cobertura de geleia.', price: 49.90, img: 'img/bolofofo.jpg' },
    { id: 'b4', name: 'Bolo Fazendinha', desc: 'Coco ralado na massa e cobertura com leite condensado.', price: 44.90, img: 'img/fazendinha.jpg' }
];

const DEFAULT_SALGADOS = [
    { id: 's1', name: 'Coxinha (cento)', desc: 'Coxinhas de frango com catupiry, empanadas crocantes.', price: 65.00, img: 'https://images.iimg.live/images/incredible-gallery-8170.webp' },
    { id: 's2', name: 'Kibe (cento)', desc: 'Kibe assado com recheio de carne e hortelã.', price: 65.00, img: 'https://images.iimg.live/images/incredible-gallery-8170.webp' },
    { id: 's3', name: 'Risole (cento)', desc: 'Risoles de presunto e queijo, massa dourada.', price: 65.00, img: 'https://images.iimg.live/images/incredible-gallery-8170.webp' },
    { id: 's4', name: 'Bolinhos de Bacalhau (cento)', desc: 'Bolinhos de bacalhau com azeitona e salsinha.', price: 65.00, img: 'https://images.iimg.live/images/incredible-gallery-8170.webp' }
];


function loadProducts() {
    let data = localStorage.getItem('deliciasProdutos');
    if (data) {
        try {
            const parsed = JSON.parse(data);
            if (parsed.bolos && parsed.salgados) {
                return parsed;
            }
        } catch(e) {}
    }
    const defaultData = { bolos: DEFAULT_BOLOS, salgados: DEFAULT_SALGADOS };
    localStorage.setItem('deliciasProdutos', JSON.stringify(defaultData));
    return defaultData;
}

function saveProducts(bolos, salgados) {
    localStorage.setItem('deliciasProdutos', JSON.stringify({ bolos, salgados }));
}


let data = loadProducts();
let bolos = data.bolos || [];
let salgados = data.salgados || [];
let cart = [];
let adminOpen = false;


const bolosCatalog = document.getElementById('bolosCatalog');
const salgadosCatalog = document.getElementById('salgadosCatalog');
const cartOverlay = document.getElementById('cartOverlay');
const cartItemsContainer = document.getElementById('cartItemsContainer');
const cartTotalPrice = document.getElementById('cartTotalPrice');
const cartCountSpan = document.getElementById('cartCount');
const cartOpenBtn = document.getElementById('cartOpenBtn');
const cartCloseBtn = document.getElementById('cartCloseBtn');
const hamburgerMenu = document.getElementById('hamburgerMenu');
const navMenu = document.getElementById('navMenu');


hamburgerMenu.addEventListener('click', function() {
    this.classList.toggle('active');
    navMenu.classList.toggle('active');
});

document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', function() {
        hamburgerMenu.classList.remove('active');
        navMenu.classList.remove('active');
    });
});


const tabBtns = document.querySelectorAll('.nav-menu a[data-tab], .footer-menu a[data-tab]');
const tabContents = {
    bolos: document.getElementById('bolos'),
    salgados: document.getElementById('salgados')
};

tabBtns.forEach(btn => {
    btn.addEventListener('click', function(e) {
        e.preventDefault();
        const tab = this.dataset.tab;
        
        document.querySelectorAll('.nav-menu a[data-tab]').forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        
        Object.keys(tabContents).forEach(key => {
            tabContents[key].classList.remove('active');
        });
        tabContents[tab].classList.add('active');
    });
});


function showLoginModal() {
    loginOverlay.classList.add('open');
    adminPassword.value = '';
    loginError.classList.remove('show');
    adminPassword.focus();
}

function hideLoginModal() {
    loginOverlay.classList.remove('open');
}

function attemptLogin() {
    const password = adminPassword.value.trim();
    
    if (password === ADMIN_PASSWORD) {
        isAuthenticated = true;
        hideLoginModal();
        openAdminPanel();
        adminToggleBtn.innerHTML = '<i class="fas fa-user-cog"></i> <span>Admin <i class="fas fa-check-circle" style="color:#27ae60;"></i></span>';
    } else {
        loginError.textContent = '❌ Senha incorreta! Tente novamente.';
        loginError.classList.add('show');
        adminPassword.value = '';
        adminPassword.focus();
    }
}

loginBtn.addEventListener('click', attemptLogin);
adminPassword.addEventListener('keydown', function(e) {
    if (e.key === 'Enter') {
        e.preventDefault();
        attemptLogin();
    }
});


function openAdminPanel() {
    adminOpen = true;
    adminPanel.classList.add('open');
    document.querySelectorAll('.admin-delete-btn').forEach(btn => {
        btn.style.display = 'flex';
    });
    renderAdminProductList();
    adminPanel.scrollIntoView({ behavior: 'smooth' });
}

function closeAdminPanel() {
    adminOpen = false;
    adminPanel.classList.remove('open');
    document.querySelectorAll('.admin-delete-btn').forEach(btn => {
        btn.style.display = 'none';
    });
}

adminToggleBtn.addEventListener('click', function() {
    if (isAuthenticated) {
        if (adminOpen) {
            closeAdminPanel();
        } else {
            openAdminPanel();
        }
    } else {
        showLoginModal();
    }
});

document.getElementById('footerAdminBtn').addEventListener('click', function(e) {
    e.preventDefault();
    if (isAuthenticated) {
        if (adminOpen) {
            closeAdminPanel();
        } else {
            openAdminPanel();
        }
    } else {
        showLoginModal();
    }
});


function renderCatalog(items, container, type) {
    container.innerHTML = '';
    if (!items || items.length === 0) {
        container.innerHTML = '<p style="text-align:center; color:#666; padding:40px 0;">Nenhum produto cadastrado.</p>';
        return;
    }
    items.forEach(item => {
        const card = document.createElement('div');
        card.className = 'product-card';

        const delBtn = document.createElement('button');
        delBtn.className = 'admin-delete-btn';
        delBtn.innerHTML = '<i class="fas fa-trash"></i>';
        delBtn.style.display = (adminOpen && isAuthenticated) ? 'flex' : 'none';
        delBtn.title = 'Remover produto';
        delBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            if (confirm(`Remover "${item.name}"?`)) {
                if (type === 'bolo') {
                    bolos = bolos.filter(b => b.id !== item.id);
                } else {
                    salgados = salgados.filter(s => s.id !== item.id);
                }
                saveProducts(bolos, salgados);
                renderAll();
                renderAdminProductList();
            }
        });

        const img = document.createElement('img');
        img.className = 'product-img';
        img.src = item.img || 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="300" height="200"%3E%3Crect width="300" height="200" fill="%23221f1f"/%3E%3Ctext x="150" y="100" font-family="Arial" font-size="16" fill="%23666" text-anchor="middle"%3EImagem indisponível%3C/text%3E%3C/svg%3E';
        img.alt = item.name;
        img.loading = 'lazy';
        
        img.onerror = function() {
            this.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="300" height="200"%3E%3Crect width="300" height="200" fill="%23221f1f"/%3E%3Ctext x="150" y="100" font-family="Arial" font-size="16" fill="%23666" text-anchor="middle"%3EImagem indisponível%3C/text%3E%3C/svg%3E';
        };

        const info = document.createElement('div');
        info.className = 'product-info';

        const name = document.createElement('div');
        name.className = 'product-name';
        name.textContent = item.name;

        const desc = document.createElement('div');
        desc.className = 'product-desc';
        desc.textContent = item.desc || 'Descrição não informada';

        const price = document.createElement('div');
        price.className = 'product-price';
        price.innerHTML = `R$ ${item.price.toFixed(2)} <small>${type === 'salgado' ? '/ cento' : ''}</small>`;

        const addBtn = document.createElement('button');
        addBtn.className = 'add-btn';
        addBtn.innerHTML = `<i class="fas fa-plus-circle"></i> Adicionar`;
        addBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            addToCart(item);
        });

        info.appendChild(name);
        info.appendChild(desc);
        info.appendChild(price);
        info.appendChild(addBtn);
        card.appendChild(img);
        card.appendChild(delBtn);
        card.appendChild(info);
        container.appendChild(card);
    });
}

function renderAll() {
    renderCatalog(bolos, bolosCatalog, 'bolo');
    renderCatalog(salgados, salgadosCatalog, 'salgado');
    updateCartUI();
}


function renderAdminProductList() {
    const all = [...bolos.map(b => ({ ...b, type: 'bolo' })), ...salgados.map(s => ({ ...s, type: 'salgado' }))];
    if (all.length === 0) {
        adminProductList.innerHTML = '<p style="color:#666;">Nenhum produto cadastrado.</p>';
        return;
    }
    let html = '';
    all.forEach(item => {
        html += `
            <div class="admin-product-item">
                <span>${item.name} <small>(${item.type}) - R$ ${item.price.toFixed(2)}</small></span>
                <div>
                    <button class="admin-edit-btn" data-id="${item.id}" data-type="${item.type}"><i class="fas fa-edit"></i> Editar</button>
                    <button class="admin-del-btn" data-id="${item.id}" data-type="${item.type}"><i class="fas fa-trash"></i></button>
                </div>
            </div>
        `;
    });
    adminProductList.innerHTML = html;

    document.querySelectorAll('.admin-edit-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const id = this.dataset.id;
            const type = this.dataset.type;
            const item = type === 'bolo' ? bolos.find(b => b.id === id) : salgados.find(s => s.id === id);
            if (item) {
                document.getElementById('adminProductType').value = type;
                document.getElementById('adminProductName').value = item.name;
                document.getElementById('adminProductPrice').value = item.price;
                document.getElementById('adminProductDesc').value = item.desc || '';
                document.getElementById('adminProductImage').value = item.img || '';
                adminEditId.value = id;
                document.querySelector('.admin-submit').innerHTML = '<i class="fas fa-edit"></i> Atualizar produto';
                adminPanel.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    document.querySelectorAll('.admin-del-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const id = this.dataset.id;
            const type = this.dataset.type;
            if (confirm(`Remover este produto?`)) {
                if (type === 'bolo') {
                    bolos = bolos.filter(b => b.id !== id);
                } else {
                    salgados = salgados.filter(s => s.id !== id);
                }
                saveProducts(bolos, salgados);
                renderAll();
                renderAdminProductList();
            }
        });
    });
}


adminForm.addEventListener('submit', function(e) {
    e.preventDefault();

    const type = document.getElementById('adminProductType').value;
    const name = document.getElementById('adminProductName').value.trim();
    const price = parseFloat(document.getElementById('adminProductPrice').value);
    const desc = document.getElementById('adminProductDesc').value.trim();
    const img = document.getElementById('adminProductImage').value.trim();
    const editId = adminEditId.value;

    if (!name || isNaN(price) || price <= 0 || !img) {
        alert('Preencha todos os campos corretamente.');
        return;
    }

    if (editId) {
        if (type === 'bolo') {
            const index = bolos.findIndex(b => b.id === editId);
            if (index !== -1) {
                bolos[index] = { ...bolos[index], name, price, desc, img };
            }
        } else {
            const index = salgados.findIndex(s => s.id === editId);
            if (index !== -1) {
                salgados[index] = { ...salgados[index], name, price, desc, img };
            }
        }
        adminEditId.value = '';
        document.querySelector('.admin-submit').innerHTML = '<i class="fas fa-save"></i> Salvar produto';
    } else {
        const newId = type === 'bolo' ? 'b' + Date.now() : 's' + Date.now();
        const newProduct = { id: newId, name, price, desc, img };
        if (type === 'bolo') {
            bolos.push(newProduct);
        } else {
            salgados.push(newProduct);
        }
    }

    saveProducts(bolos, salgados);
    renderAll();
    renderAdminProductList();
    adminForm.reset();
    document.getElementById('adminProductType').value = type;
    alert('Produto salvo com sucesso!');
});


function addToCart(item) {
    const existing = cart.find(c => c.id === item.id);
    if (existing) {
        existing.quantity = (existing.quantity || 1) + 1;
    } else {
        cart.push({ ...item, quantity: 1 });
    }
    updateCartUI();
}

function removeFromCart(itemId) {
    const index = cart.findIndex(c => c.id === itemId);
    if (index === -1) return;
    const item = cart[index];
    if (item.quantity > 1) {
        item.quantity -= 1;
    } else {
        cart.splice(index, 1);
    }
    updateCartUI();
}

function updateCartUI() {
    let totalItems = 0;
    cart.forEach(c => totalItems += (c.quantity || 1));
    cartCountSpan.textContent = totalItems;

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = `<div class="empty-cart">Seu carrinho está vazio.</div>`;
        cartTotalPrice.textContent = 'R$ 0,00';
        return;
    }

    let html = '';
    let total = 0;
    cart.forEach(item => {
        const qty = item.quantity || 1;
        const subtotal = item.price * qty;
        total += subtotal;
        html += `
            <div class="cart-item">
                <div class="cart-item-info">
                    <span class="cart-item-name">${item.name} <span style="font-weight:400; font-size:0.8rem; color:#666;">x${qty}</span></span>
                    <span class="cart-item-detail">${(item.desc || '').substring(0, 30)}${(item.desc || '').length > 30 ? '…' : ''}</span>
                </div>
                <div>
                    <span class="cart-item-price">R$ ${subtotal.toFixed(2)}</span>
                    <button class="cart-item-remove" data-id="${item.id}" title="Remover um"><i class="fas fa-minus-circle"></i></button>
                </div>
            </div>
        `;
    });

    cartItemsContainer.innerHTML = html;
    cartTotalPrice.textContent = `R$ ${total.toFixed(2)}`;

    document.querySelectorAll('.cart-item-remove').forEach(btn => {
        btn.addEventListener('click', () => {
            removeFromCart(btn.dataset.id);
        });
    });
}


function openCart() {
    cartOverlay.classList.add('open');
    document.body.style.overflow = 'hidden';
}
function closeCart() {
    cartOverlay.classList.remove('open');
    document.body.style.overflow = '';
}

cartOpenBtn.addEventListener('click', openCart);
cartCloseBtn.addEventListener('click', closeCart);
cartOverlay.addEventListener('click', (e) => {
    if (e.target === cartOverlay) closeCart();
});


function closeForm() {
    formOverlay.classList.remove('open');
    document.body.style.overflow = '';
    clienteForm.reset();
}


document.getElementById('checkoutBtn').addEventListener('click', function() {
    if (cart.length === 0) {
        alert('Seu carrinho está vazio.');
        return;
    }
    formOverlay.classList.add('open');
    document.body.style.overflow = 'hidden';
});

cancelFormBtn.addEventListener('click', closeForm);

formOverlay.addEventListener('click', function(e) {
    if (e.target === this) {
        closeForm();
    }
});


clienteForm.addEventListener('submit', function(e) {
    e.preventDefault();

    const nome = document.getElementById('clienteNome').value.trim();
    const telefone = document.getElementById('clienteTelefone').value.trim();
    const cpf = document.getElementById('clienteCpf').value.trim();
    const endereco = document.getElementById('clienteEndereco').value.trim();
    const observacao = document.getElementById('clienteObservacao').value.trim();

    if (!nome || !telefone || !cpf || !endereco) {
        alert('⚠️ Preencha todos os campos obrigatórios!');
        return;
    }

    let total = 0;
    cart.forEach(item => total += item.price * (item.quantity || 1));

    let mensagem = '🍰 *NOVO PEDIDO - Bolos do Daniel* 🍰\n\n';
    mensagem += '👤 *DADOS DO CLIENTE*\n';
    mensagem += `📌 Nome: ${nome}\n`;
    mensagem += `📞 Telefone: ${telefone}\n`;
    mensagem += `🆔 CPF: ${cpf}\n`;
    mensagem += `📍 Endereço: ${endereco}\n`;

    if (observacao) {
        mensagem += `📝 Observação: ${observacao}\n`;
    }

    mensagem += '\n📋 *ITENS DO PEDIDO*\n';
    cart.forEach(item => {
        const qty = item.quantity || 1;
        const subtotal = item.price * qty;
        mensagem += `- ${item.name} x${qty} = R$ ${subtotal.toFixed(2)}\n`;
    });

    mensagem += `\n💰 *TOTAL: R$ ${total.toFixed(2)}*`;
    mensagem += '\n\n⏳ *Status: Aguardando confirmação*';

    const numero = '557998000596';

    const url = `https://wa.me/${numero}?text=${encodeURIComponent(mensagem)}`;

    window.open(url, '_blank');

    cart = [];
    updateCartUI();
    closeForm();

    setTimeout(() => {
        closeForm();
    }, 500);
});


function addToCartById(id) {
    const allProducts = [...bolos, ...salgados];
    const product = allProducts.find(p => p.id === id);
    if (product) {
        addToCart(product);
    }
}


window.addToCart = addToCart;
window.addToCartById = addToCartById;


renderAll();
adminPanel.classList.remove('open');
adminOpen = false;

console.log('🍰 Bolos do Daniel - Loja carregada!');
console.log('🔑 Senha: admin123');