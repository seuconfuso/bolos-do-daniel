# 🍰 Bolos do Daniel - Loja Virtual

![Status do Projeto](https://img.shields.io/badge/status-em%20desenvolvimento-yellow)
![HTML](https://img.shields.io/badge/HTML-5-orange)
![CSS](https://img.shields.io/badge/CSS-3-blue)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6-yellow)
![GitHub Pages](https://img.shields.io/badge/GitHub-Pages-brightgreen)

> 🎂 Uma loja virtual completa para venda de bolos e salgados artesanais.

---

## 📖 Sobre o Projeto

Este é um site de e-commerce desenvolvido para a **Bolos do Daniel**, uma confeitaria artesanal. O projeto inclui um catálogo de produtos, carrinho de compras, painel administrativo e integração com WhatsApp para finalização de pedidos.

### 🎯 Funcionalidades Principais

| Funcionalidade | Descrição |
|----------------|-----------|
| 🍰 **Catálogo de Bolos** | Exibição de bolos com fotos, descrição e preço |
| 🥟 **Catálogo de Salgados** | Salgados vendidos por cento (100 unidades) |
| 🛒 **Carrinho de Compras** | Adicione/remova itens, veja o total |
| 🔐 **Painel Admin** | Gerencie produtos (CRUD completo) com senha protegida |
| 📱 **WhatsApp Integration** | Envia pedido com dados do cliente via WhatsApp |
| 🍪 **Cookie Consent** | Modal de cookies com salvamento de preferências |
| 📱 **Responsivo** | Funciona em desktop, tablet e mobile |

---

## 🖼️ Demonstração

### 🔗 Link do Site
[https://seuconfuso.github.io/bolos-do-daniel/](https://seuconfuso.github.io/bolos-do-daniel/)

### 🔑 Acesso Admin
- **Senha:** `admin123`

---

## 🛠️ Tecnologias Utilizadas

### Frontend
- **HTML5** - Estrutura do site
- **CSS3** - Estilização e layout (com variáveis CSS)
- **JavaScript (ES6)** - Lógica e interatividade

### Bibliotecas Externas
| Biblioteca | Função |
|------------|--------|
| [Font Awesome](https://fontawesome.com/) | Ícones vetoriais |
| [Google Fonts](https://fonts.google.com/) | Fonte Cairo |
| [Owl Carousel 2](https://owlcarousel2.github.io/) | Slider/carrossel de imagens |
| [jQuery](https://jquery.com/) | Dependência do Owl Carousel |

### Recursos
- **localStorage** - Persistência de dados do carrinho
- **Cookies** - Salvamento de preferências do usuário
- **WhatsApp API** - Envio de pedidos

### Ferramentas de Apoio
- **DeepSeek (IA)** - Auxílio no desenvolvimento, correção de bugs e aprendizado

---

## 📁 Estrutura de Arquivos

```plaintext
bolos-do-daniel/
├── index.html          # Página principal
├── style.css           # Estilos CSS
├── script.js           # Lógica JavaScript
├── img/                # Imagens dos produtos
│   ├── amarelochoco.jpg
│   ├── flamengo.jpg
│   ├── bolofofo.jpg
│   └── fazendinha.jpg
├── README.md           # Documentação
└── .gitignore          # Arquivos ignorados pelo Git
```

---

## 🚀 Como Executar o Projeto

### Pré-requisitos
- Navegador moderno (Chrome, Firefox, Edge)
- VS Code (recomendado) ou qualquer editor de texto

### Executar Localmente
1. **Clone o repositório:**
   ```bash
   git clone https://github.com/seuconfuso/bolos-do-daniel.git
   cd bolos-do-daniel
   ```

2. **Abra o arquivo `index.html` no navegador** ou use a extensão Live Server do VS Code.

---

## 🛒 Como Usar

### 👤 Como Cliente
1. Navegue pelo catálogo de bolos e salgados
2. Clique em "Adicionar" para colocar itens no carrinho
3. Abra o carrinho e clique em "Finalizar compra"
4. Preencha seus dados (nome, telefone, CPF, endereço)
5. Clique em "Finalizar pedido" - o WhatsApp abrirá com a mensagem pronta

### 🔐 Como Administrador
1. Clique no botão "Admin" no menu
2. Digite a senha: `admin123`
3. Use o painel para:
   - Adicionar novos produtos
   - Editar produtos existentes
   - Remover produtos
   - Gerenciar cookies

---

## 📦 Dados Padrão

### Bolos
| Produto | Preço |
|---------|-------|
| Amarelo com chuva de chocolate | R$ 42,90 |
| Bolo do Flamengo | R$ 38,50 |
| Bolo Fofo | R$ 49,90 |
| Bolo Fazendinha | R$ 44,90 |

### Salgados (cento)
| Produto | Preço |
|---------|-------|
| Coxinha | R$ 65,00 |
| Kibe | R$ 65,00 |
| Risole | R$ 65,00 |
| Bolinhos de Bacalhau | R$ 65,00 |

---

## 🧠 Sobre o Desenvolvedor

> 👋 Olá! Meu nome é Daniel e estou aprendendo desenvolvimento web.

Este projeto faz parte da minha jornada de aprendizado em programação. Utilizei **inteligência artificial (DeepSeek)** como ferramenta de apoio para:
- 💡 Gerar ideias e soluções
- 🐛 Debugar e corrigir erros
- 📚 Aprender novas técnicas e boas práticas
- 🚀 Acelerar meu processo de aprendizado

Acredito que a IA é uma aliada poderosa no aprendizado, mas todo o código é entendido, revisado e adaptado por mim.

---

## 📝 Lições Aprendidas

Durante o desenvolvimento deste projeto, aprendi:

| Habilidade | O que foi praticado |
|------------|---------------------|
| **HTML** | Estrutura semântica, modais, formulários |
| **CSS** | Flexbox, Grid, variáveis, responsividade |
| **JavaScript** | DOM Manipulation, localStorage, eventos |
| **APIs** | Integração com WhatsApp |
| **Git/GitHub** | Versionamento e hospedagem |
| **UI/UX** | Design de interfaces para lojas virtuais |
| **Segurança** | Proteção de painel admin |

---

## 🔧 Próximas Etapas

- [ ] Adicionar mais categorias de produtos
- [ ] Implementar sistema de estoque
- [ ] Criar relatórios de vendas
- [ ] Adicionar mais opções de pagamento
- [ ] Melhorar o sistema de busca

---

## 🤝 Como Contribuir

1. Faça um **fork** do projeto
2. Crie uma **branch** para sua feature: `git checkout -b minha-feature`
3. Faça **commit** das suas mudanças: `git commit -m 'Minha feature'`
4. Envie para a **branch**: `git push origin minha-feature`
5. Abra um **Pull Request**

---

## 📄 Licença

Este projeto está sob a licença **MIT**. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---

## 📞 Contato

- **Desenvolvedor:** cordeiro confuso
- **Instagram:** falem com meu primo ai[@daniel_costaofc](https://www.instagram.com/daniel_costaofc/)
- **WhatsApp:** (79) 98990-0596
- **Email:** cordeiroconfuso@gmail.com

---

## 🙏 Agradecimentos

- À **comunidade de desenvolvedores** que compartilha conhecimento diariamente
- Às **ferramentas de IA** que ajudam no aprendizado
- Aos **clientes** que confiam no trabalho

---

### ⭐ Se você gostou do projeto, deixe uma estrela no GitHub!

![GitHub Repo stars](https://img.shields.io/github/stars/seuconfuso/bolos-do-daniel?style=social)
![GitHub forks](https://img.shields.io/github/forks/seuconfuso/bolos-do-daniel?style=social)

---

**Feito com 💙 e ☕ por Cordeiro Confuso - Aprendendo a programar com ajuda da IA!**