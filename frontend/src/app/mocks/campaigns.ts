import { Campaign } from "../types/campaign";

const campaigns: Campaign[] = [
  {
    id: "",
    userId: "",
    goal: 5000,
    deadline: new Date("2025-01-01"),
    createdAt: new Date("2024-08-01"),
    updatedAt: new Date("2024-08-01"),
    title: "Campanha de Doação de Alimentos",
    description:
      "A campanha de Doação de Alimentos tem como objetivo arrecadar alimentos não perecíveis para apoiar famílias em situação de vulnerabilidade. Com a crescente demanda por auxílio alimentar, nossa missão é garantir que todos tenham acesso a refeições nutritivas. Contribua para que possamos distribuir cestas básicas que tragam alívio e esperança. A fome é um problema sério e juntos podemos combater essa realidade. Participar dessa campanha é uma forma de mostrar solidariedade e empatia. Cada doação é um passo importante para um mundo onde ninguém passe fome. Através de parcerias com mercados, escolas e igrejas, estamos organizando pontos de coleta para facilitar sua contribuição. Além de alimentos, aceitamos doações financeiras que serão revertidas em mais cestas básicas. Nossa meta é alcançar um número significativo de famílias e fazer uma diferença real. Junte-se a nós nessa jornada de solidariedade e faça parte da mudança. Sua participação pode transformar vidas e criar um futuro melhor.",
    category: "Assistência Social",
    preview:
      "Ajude a fornecer alimentos não perecíveis para famílias carentes e faça a diferença na luta contra a fome.",
    imageUrl:
      "https://plus.unsplash.com/premium_photo-1683141099821-131921b4cccd?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    state: "Amazonas",
    city: "Manaus",
  },
  {
    id: "",
    userId: "",
    goal: 10500,
    deadline: new Date("2024-12-25"),
    createdAt: new Date("2024-08-01"),
    updatedAt: new Date("2024-08-01"),
    title: "Apoio à Educação Infantil",
    description:
      "A campanha de Apoio à Educação Infantil visa proporcionar um futuro melhor para crianças de baixa renda através da educação. Nosso foco é arrecadar fundos para a compra de materiais escolares, uniformes e livros didáticos, além de oferecer suporte educacional e atividades extracurriculares. Acreditamos que a educação é a chave para romper o ciclo da pobreza e abrir portas para oportunidades. Com a sua ajuda, podemos garantir que essas crianças tenham as ferramentas necessárias para um aprendizado eficaz. Estamos trabalhando em conjunto com escolas públicas e organizações não-governamentais para identificar as crianças que mais necessitam de ajuda. Cada contribuição fará uma grande diferença na vida dessas crianças, permitindo-lhes sonhar e alcançar seus objetivos. Participe dessa causa e ajude a construir um futuro mais justo e igualitário. Seu apoio pode mudar a trajetória de muitas vidas e contribuir para uma sociedade mais educada e consciente.",
    category: "Educação",
    preview:
      "Contribua para a educação de crianças de baixa renda, proporcionando material escolar e suporte educacional.",
    imageUrl:
      "https://images.unsplash.com/photo-1610500795224-fb86b02926d7?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    state: "Amazonas",
    city: "Manaus",
  },
  {
    id: "",
    userId: "",
    title: "Preservação Ambiental",
    createdAt: new Date("2025-08-25"),
    updatedAt: new Date("2024-07-08"),
    deadline: new Date("2025-03-20"),
    imageUrl:
      "https://images.unsplash.com/photo-1502082553048-f009c37129b9?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    category: "Meio Ambiente",
    goal: 40000,
    preview:
      "Ajude a preservar o meio ambiente através de ações de conscientização e projetos de sustentabilidade.",
    description:
      "A campanha de Preservação Ambiental é uma iniciativa para promover a conscientização sobre a importância de cuidar do nosso planeta. Com o aumento dos problemas ambientais, é essencial que todos nós façamos nossa parte. Nosso objetivo é implementar projetos de sustentabilidade, como plantio de árvores, limpeza de rios e campanhas educativas. Acreditamos que pequenas ações podem resultar em grandes mudanças, e com a sua ajuda podemos atingir nossos objetivos. Estamos organizando eventos de voluntariado, palestras e workshops para educar a população sobre práticas sustentáveis. Além disso, estamos trabalhando em parceria com escolas e empresas para criar uma rede de apoio e expandir nossas atividades. Sua contribuição será fundamental para financiar esses projetos e garantir que possamos continuar nossas ações em prol do meio ambiente. Junte-se a nós e faça parte dessa causa nobre. Juntos, podemos proteger nosso planeta para as futuras gerações.",
    state: "Roraima",
    city: "Boa Vista",
  },
  {
    id: "",
    userId: "",
    title: "Adoção de Animais Abandonados",
    createdAt: new Date("2025-03-31"),
    updatedAt: new Date("2024-07-08"),
    deadline: new Date("2025-04-25"),
    imageUrl:
      "https://images.unsplash.com/photo-1583786693544-e352f898888d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    category: "Proteção Animal",
    goal: 20000,
    preview:
      "Ajude a encontrar lares amorosos para animais abandonados e reduza o número de animais nas ruas.",
    description:
      "A campanha de Adoção de Animais Abandonados busca encontrar lares para cães e gatos que foram deixados nas ruas ou resgatados de situações de maus-tratos. Nossa missão é proporcionar uma segunda chance a esses animais, garantindo que sejam adotados por famílias responsáveis e amorosas. Cada animal adotado é uma vida salva e um passo importante para reduzir a superpopulação de animais nas ruas. Estamos realizando eventos de adoção em diversos pontos da cidade, além de campanhas online para divulgar os animais disponíveis. Também oferecemos suporte pós-adoção para garantir que os novos donos tenham todas as informações e recursos necessários para cuidar bem de seus novos pets. Com a sua ajuda, podemos continuar resgatando, cuidando e encontrando lares para esses animais. Participe da nossa campanha e faça a diferença na vida de um animal abandonado. Juntos, podemos proporcionar um futuro melhor para esses animais.",
    state: "São Paulo",
    city: "São Paulo",
  },
  {
    id: "",
    userId: "",
    title: "Combate ao Desperdício de Alimentos",
    createdAt: new Date("2024-10-30"),
    updatedAt: new Date("2024-07-08"),
    deadline: new Date("2025-05-30"),
    imageUrl:
      "https://images.unsplash.com/photo-1628717341663-0007b0ee2597?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    category: "Sustentabilidade",
    goal: 25000,
    preview:
      "Participe da luta contra o desperdício de alimentos, ajudando a distribuir o excedente para quem precisa.",
    description:
      "A campanha de Combate ao Desperdício de Alimentos tem como objetivo reduzir a quantidade de comida que é jogada fora e redistribuir o excedente para pessoas em necessidade. Todos os dias, toneladas de alimentos em boas condições são descartadas enquanto muitas pessoas sofrem com a fome. Nosso projeto busca parcerias com restaurantes, supermercados e feiras para coletar esses alimentos e distribuir em comunidades carentes e instituições de caridade. Além disso, promovemos a conscientização sobre o desperdício de alimentos, ensinando práticas de consumo consciente, como planejamento de compras, armazenamento adequado e aproveitamento integral dos alimentos. Aceitamos doações de alimentos não perecíveis e recursos financeiros para apoiar a logística de coleta e distribuição. Com sua ajuda, podemos criar um sistema mais sustentável e justo, onde os recursos são aproveitados ao máximo e todos têm acesso à alimentação.",
    state: "Rio de Janeiro",
    city: "Rio de Janeiro",
  },
  {
    id: "",
    userId: "",
    title: "Inclusão Digital por um Futuro Melhor",
    createdAt: new Date("2025-10-05"),
    updatedAt: new Date("2024-07-08"),
    deadline: new Date("2025-06-05"),
    imageUrl:
      "https://images.unsplash.com/photo-1515378960530-7c0da6231fb1?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    category: "Tecnologia e Inclusão",
    goal: 15000,
    preview:
      "Apoie nossa campanha para fornecer acesso à internet e recursos digitais para comunidades carentes.",
    description:
      "A campanha de Inclusão Digital busca promover o acesso à tecnologia e à internet em comunidades carentes, reduzindo a exclusão digital e proporcionando oportunidades de desenvolvimento pessoal e profissional. Em um mundo cada vez mais conectado, o acesso à informação e à educação digital é essencial para o progresso e a inclusão social. Nosso objetivo é equipar espaços comunitários com computadores, oferecer cursos de capacitação digital e facilitar o acesso à internet de qualidade. Trabalhamos em parceria com empresas de tecnologia, ONGs e instituições educativas para criar uma rede de suporte e maximizar o impacto de nossas ações. Acreditamos que a inclusão digital pode transformar vidas, oferecendo novas possibilidades de aprendizado e crescimento. Sua contribuição pode ajudar a adquirir equipamentos, financiar a infraestrutura necessária e expandir nossos programas educativos. Participe dessa causa e ajude a construir um futuro mais inclusivo e conectado.",
    city: "Goiás",
    state: "Goiania",
  },
  {
    id: "",
    userId: "",
    title: "Saúde Mental",
    createdAt: new Date("2025-06-13"),
    updatedAt: new Date("2024-07-08"),
    deadline: new Date("2025-07-10"),
    imageUrl:
      "https://images.unsplash.com/photo-1493836512294-502baa1986e2?q=80&w=1790&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    category: "Saúde",
    goal: 35000,
    preview:
      "Promova a saúde mental e o bem-estar emocional através de nossa campanha de conscientização e apoio.",
    description:
      "A campanha de Saúde Mental tem como objetivo promover a conscientização sobre a importância da saúde mental e oferecer suporte emocional para aqueles que precisam. Com o aumento dos casos de ansiedade, depressão e outros transtornos mentais, é fundamental que a sociedade esteja bem informada e preparada para lidar com esses desafios. Estamos organizando palestras, workshops e grupos de apoio para ajudar as pessoas a entender e gerenciar melhor sua saúde mental. Além disso, estamos criando uma linha de apoio para oferecer orientação e suporte imediato a quem necessitar. Nosso projeto inclui campanhas de conscientização para desmistificar e combater o estigma associado aos transtornos mentais. Também buscamos parcerias com profissionais da área de saúde para oferecer atendimentos gratuitos ou a preços acessíveis. A saúde mental é tão importante quanto a saúde física, e é crucial que todos tenham acesso a recursos e apoio adequados. Participe dessa causa!",
    city: "Goiás",
    state: "Goiania",
  },
  {
    id: "",
    userId: "",
    title: "Arte e Cultura",
    createdAt: new Date("2024-12-30"),
    updatedAt: new Date("2024-07-08"),
    deadline: new Date("2025-08-15"),
    imageUrl:
      "https://plus.unsplash.com/premium_photo-1661767490975-f31a02946f48?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    category: "Cultura",
    goal: 45000,
    preview:
      "Incentive a produção e o acesso à arte e cultura em comunidades carentes através de nossa campanha.",
    description:
      "A campanha de Arte e Cultura tem como objetivo promover o acesso à arte e à cultura em comunidades carentes, proporcionando oportunidades para o desenvolvimento artístico e cultural. Acreditamos que a arte é uma ferramenta poderosa para a transformação social, capaz de inspirar e empoderar indivíduos. Nosso projeto inclui oficinas de arte, apresentações culturais e apoio a artistas locais. Estamos trabalhando em parceria com escolas, centros comunitários e organizações culturais para oferecer uma variedade de atividades artísticas, como teatro, música, dança e artes visuais. Através dessas iniciativas, esperamos despertar o interesse e o talento artístico em jovens e adultos, proporcionando um espaço onde possam expressar sua criatividade e desenvolver suas habilidades. Além disso, buscamos criar oportunidades para que artistas locais apresentem seu trabalho, fortalecendo a cena cultural da região. Participe dessa campanha e ajude a enriquecer a vida cultural de nossa comunidade. Sua contribuição pode fazer a diferença na promoção da arte e cultura, proporcionando momentos de alegria, aprendizado e inspiração para todos.",
    state: "Pernanbuco",
    city: "Recife",
  },
  {
    id: "",
    userId: "",
    title: "Esporte para Todos",
    createdAt: new Date("2024-09-20"),
    updatedAt: new Date("2024-07-08"),
    deadline: new Date("2025-09-20"),
    imageUrl:
      "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    category: "Esportes",
    goal: 40000,
    preview:
      "Promova a prática de esportes e atividades físicas para todas as idades através de nossa campanha.",
    description:
      "A campanha Esporte para Todos tem como objetivo incentivar a prática de esportes e atividades físicas entre pessoas de todas as idades. Acreditamos que o esporte é fundamental para a saúde física e mental, além de promover a inclusão social e o espírito de equipe. Nosso projeto oferece uma variedade de atividades esportivas, como futebol, basquete, vôlei, atletismo e muito mais. Estamos organizando eventos e torneios esportivos, bem como aulas e treinamentos para iniciantes e avançados. Além disso, buscamos parcerias com academias, clubes e centros esportivos para expandir as oportunidades de prática esportiva. Queremos garantir que todos, independentemente de idade ou condição física, tenham acesso a atividades que promovam um estilo de vida saudável. Participe dessa campanha e ajude a fomentar a cultura do esporte em nossa comunidade. Sua contribuição pode ajudar a adquirir equipamentos esportivos, melhorar a infraestrutura dos espaços de prática e oferecer mais opções de atividades.",
    state: "Rio de Janeiro",
    city: "Rio de Janeiro",
  },
  {
    id: "",
    userId: "",
    title: "Segurança no Trânsito",
    createdAt: new Date("2024-10-25"),
    updatedAt: new Date("2024-07-08"),
    deadline: new Date("2025-10-25"),
    imageUrl:
      "https://plus.unsplash.com/premium_photo-1661678211857-55ae9cc4d8e9?q=80&w=1931&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    category: "Segurança",
    goal: 30000,
    preview:
      "Promova a segurança no trânsito e ajude a reduzir o número de acidentes através de nossa campanha.",
    description:
      "A campanha Segurança no Trânsito tem como objetivo conscientizar a população sobre a importância de um comportamento responsável e seguro nas vias públicas. Com o aumento do número de acidentes de trânsito, é essencial que todos estejam cientes das regras e boas práticas para um trânsito mais seguro. Nossa campanha inclui a realização de palestras e workshops educativos, distribuição de materiais informativos e campanhas publicitárias. Além disso, estamos trabalhando em parceria com escolas, empresas e órgãos de trânsito para promover ações que incentivem o respeito às leis de trânsito e a prevenção de acidentes. Queremos destacar a importância do uso do cinto de segurança, o respeito aos limites de velocidade, a atenção aos pedestres e ciclistas, e a necessidade de não dirigir sob a influência de álcool ou outras substâncias. Participe dessa campanha e ajude a salvar vidas. Sua contribuição pode fazer a diferença na construção de um trânsito mais seguro para todos.",
    state: "Amazonas",
    city: "Manaus",
  },
];

export default campaigns;
