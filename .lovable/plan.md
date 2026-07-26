## RAFAS — Fase 1

Construir a fundação da plataforma RAFAS (PT-PT/Angola, preços em AOA) com catálogo real ligado a uma loja Shopify nova.

### Passo 0 — Shopify
Criar uma loja de desenvolvimento Shopify (gratuita para construir). Para a manter, deve ser reclamada dentro de 30 dias; reclamar inicia um período de teste de 120 dias na subscrição Shopify, e é necessário um plano pago para começar a vender. O catálogo (categorias, produtos, variantes, preços em AOA) é criado nessa loja e o site lê os dados via Shopify.

### Design system (Capítulo 9 do PRD)
Tokens em `src/styles.css`:
- Obsidian `#0A0A0B`, Grafite `#1C1C1E`, Grafite claro `#2C2C2E`, Titânio `#E4E4E7`, Titânio escuro `#8E8E93`, Branco.
- Azul Elétrico `#0A5FFF` apenas para CTAs, links ativos e badges de validação — nunca decorativo.
- Sucesso `#2FB380`, aviso `#E0A030`, erro `#E0453F`.
- Inter (variable) para tudo; JetBrains Mono só para dados técnicos tabulares.
- Escala tipográfica, spacing 4px, radius 6/10/16/24/999 conforme o PRD. Base escura, muito espaço branco (mín. 96px de padding vertical por secção em desktop).

### Marca
- Logo RAFAS e a foto enviadas passam a assets CDN e são usadas na navbar/footer e no hero.
- Navbar sticky transparente sobre o hero que passa a grafite com blur após 80px; mega menu de 4 colunas (Por Uso / Por Componente / Serviços / Destaque), acordeão em mobile.
- Footer completo com 4 colunas, newsletter, redes e dados da empresa.

### Homepage (Capítulo 3, 13 secções)
Hero (headline "Engenharia de Precisão. Performance Sem Compromissos.", subheadline, CTA primário "Configurar o Meu Sistema" + ghost "Explorar a Loja", reveal por linha com stagger de 80ms, indicador de scroll) → Trust Bar (4 pilares) → Categorias por uso (3 cards, hover scale 1.03) → Configurador em destaque → Produtos em destaque → Prova técnica/benchmark → Processo → Empresas/B2B → Importação transparente → Garantia → Social proof → Newsletter → Footer.

Motion subtil (easing `cubic-bezier(0.16,1,0.3,1)`), sem estética "gamer".

### Loja (Capítulo 4)
- `/loja` e categorias `/loja/workstations`, `/loja/gaming`, `/loja/ia-compute`, `/loja/perifericos`, `/loja/componentes` (+ subcategorias).
- Grelha de produtos, breadcrumb, ordenação e filtros na hierarquia do PRD: categoria, preço, marca, spec técnica primária, compatibilidade, disponibilidade (stock local vs. importação).
- Pesquisa instantânea em overlay (debounce 200ms) com resultados agrupados.

### Página de produto (Capítulo 5)
`/produto/[slug]`: galeria, preço em AOA, disponibilidade/prazo de importação, variantes, tabela de especificações completa em mono, secções de validação técnica (consumo, compatibilidade), garantia, produtos relacionados e adicionar ao carrinho.

### Carrinho e checkout
Carrinho em painel lateral com estado persistente, a enviar para o checkout nativo do Shopify.

### Notas técnicas
Fica em TanStack Start (a stack desta plataforma) em vez de Next.js, com os dados a virem da Storefront API do Shopify — o resto da arquitetura do PRD mantém-se. SEO por rota: títulos, descrições, og/twitter e JSON-LD de produto.

### Fora desta fase
Configurador inteligente, área do cliente, B2B/orçamentos, RMA e páginas institucionais — próximas fases, sobre a mesma fundação.
