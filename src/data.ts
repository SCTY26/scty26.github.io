// Toutes les données proviennent du CV source (CV FAGUO.docx). Aucune valeur n'est ajoutée.
export const person = {
  first: 'Sophie-Charlotte',
  last: 'Turquety',
  role: 'Chargée de mission RSE',
  city: 'Rennes (35)',
  email: 'sc.turquety@gmail.com',
};

export const manifesto =
  'Piloter les démarches qualité et environnementales d’une destination touristique. Embarquer les équipes. Suivre les indicateurs, corriger, recommencer.';

/** Repères chiffrés, dérivés des dates du CV. */
export const figures = [
  { value: 3, suffix: '', label: 'démarches pilotées', note: 'Bilan Carbone, ISO 20121, Destination d’Excellence' },
  { value: 7, suffix: ' ans', label: 'en communication, référente RSE', note: 'SPL Destination Rennes, 2015 à 2022' },
  { value: 13, suffix: ' ans', label: 'de parcours', note: 'Calcul : 2026 moins 2013, première prise de poste' },
];

export interface Chapter {
  n: string;
  title: string;
  meta: string;
  body: string;
}

export const chapters: Chapter[] = [
  {
    n: '01',
    title: 'Bilan Carbone',
    meta: 'Janvier 2023',
    body: 'Collecte d’informations, accompagnement interne, mise en place d’actions de réduction d’impact jusqu’à la contribution carbone.',
  },
  {
    n: '02',
    title: 'Certification ISO 20121',
    meta: 'Certification',
    body: 'Suivi et coordination des groupes de travail, pilotage de revues de direction, organisation et planification des audits.',
  },
  {
    n: '03',
    title: 'Destination d’Excellence',
    meta: 'En cours de labellisation',
    body: 'Suivi et coordination du groupe de travail valorisant enjeux et qualité de services des structures touristiques.',
  },
  {
    n: '04',
    title: 'Animation et suivi qualité',
    meta: 'Réunions, comités de pilotage, groupes d’experts',
    body: 'Organisation et animation des réunions de travail avec les collaborateurs : identification des dysfonctionnements et mise en place de mesures correctives.',
  },
  {
    n: '05',
    title: 'Indicateurs ESG',
    meta: 'Reporting auprès de la direction',
    body: 'Suivi des indicateurs de performance ESG et reporting auprès de la direction : mesures, analyse et actions correctives.',
  },
  {
    n: '06',
    title: 'Cohérence transversale',
    meta: 'Pôles métiers et services',
    body: 'Collaboration étroite avec les pôles métiers et les services pour veiller à la cohérence entre les engagements de l’entreprise et les actions envisagées : communication responsable, politique d’achats responsables.',
  },
  {
    n: '07',
    title: 'Sensibilisation',
    meta: 'Ateliers, journées thématiques, opérations solidaires',
    body: 'Création et organisation d’actions d’embarquement des collaborateurs : Fresque du Climat, Collectif Tous de mèche, création d’un groupe d’ambassadeurs internes Ecomotivé.es.',
  },
];

/** Carte du périmètre de la mission RSE (hiérarchie). */
export interface TreeNode {
  name: string;
  children?: TreeNode[];
}
export const scope: TreeNode = {
  name: 'Mission RSE',
  children: [
    {
      name: 'Démarches qualité',
      children: [{ name: 'Bilan Carbone' }, { name: 'ISO 20121' }, { name: 'Destination d’Excellence' }],
    },
    {
      name: 'Pilotage',
      children: [{ name: 'Réunions de travail' }, { name: 'Comités de pilotage' }, { name: 'Groupes d’experts' }],
    },
    { name: 'Reporting ESG', children: [{ name: 'Indicateurs' }, { name: 'Actions correctives' }] },
    {
      name: 'Transversalité',
      children: [{ name: 'Communication responsable' }, { name: 'Achats responsables' }],
    },
    {
      name: 'Sensibilisation',
      children: [{ name: 'Fresque du Climat' }, { name: 'Tous de mèche' }, { name: 'Ecomotivé.es' }],
    },
  ],
};

/** Frise : années décimales (octobre 2022 = 2022.75). `approx` = dates précises non fournies par le CV. */
export const NOW = 2026.75;
export interface Bar {
  label: string;
  from: number;
  to: number;
  approx?: boolean;
  open?: boolean;
  tone?: 'main' | 'data';
}
export interface Lane {
  name: string;
  bars: Bar[];
}
export const lanes: Lane[] = [
  {
    name: 'Postes',
    bars: [
      { label: 'Office de Tourisme', from: 2013, to: 2015, tone: 'main' },
      { label: 'Communication, référente RSE', from: 2015, to: 2022.75, tone: 'main' },
      { label: 'Chargée de mission RSE', from: 2022.75, to: NOW, open: true, tone: 'main' },
    ],
  },
  {
    name: 'RSE',
    bars: [
      { label: 'Référente RSE', from: 2015, to: 2022.75, approx: true, tone: 'data' },
      { label: 'Bilan Carbone', from: 2023, to: 2023.25, tone: 'data' },
      { label: 'ISO 20121', from: 2022.75, to: NOW, approx: true, open: true, tone: 'data' },
      { label: 'Destination d’Excellence', from: 2022.75, to: NOW, approx: true, open: true, tone: 'data' },
    ],
  },
  {
    name: 'Événements',
    bars: [
      { label: 'Festival Gourmand', from: 2014, to: 2018, tone: 'main' },
      { label: 'Bouffes Rennaises', from: 2019, to: 2020, tone: 'main' },
      { label: 'Goûts de Rennes', from: 2021, to: 2023, tone: 'main' },
    ],
  },
  {
    name: 'Engagements',
    bars: [
      { label: 'Association ALB Bruz', from: 2019, to: NOW, open: true, tone: 'main' },
      { label: 'CSE, suppléante', from: 2022, to: NOW, approx: true, open: true, tone: 'main' },
    ],
  },
];
export const milestones = [
  { year: 2009, label: 'Licence' },
  { year: 2012, label: 'Master' },
];

export interface Role {
  period: string;
  title: string;
  org: string;
  logo?: 'destination' ;
  items?: string[];
}
export const roles: Role[] = [
  {
    period: 'Depuis octobre 2022',
    title: 'Chargée de mission RSE',
    org: 'SPL Destination Rennes',
    logo: 'destination',
  },
  {
    period: '2015 à 2022 · 7 ans',
    title: 'Chargée de communication, référente RSE',
    org: 'SPL Destination Rennes',
    logo: 'destination',
    items: [
      'Déploiement et pilotage du plan de communication pour promouvoir la destination auprès des cibles individuelles et professionnelles.',
      'Production de supports 360° externes et internes pour le secteur des Rencontres Professionnelles : film promotionnel, brochures et outils de communication pour workshops et salons.',
      'Gestion des rétroplannings et briefs agence pour déploiement des supports de communication à 360° et suivi administratif (devis, respect des BPU, contrôle des factures).',
      'Collaboration étroite avec les différents services pour assurer une communication cohérente et efficace.',
      'Organisation des événementiels et animation partenariale sur l’axe de développement de la gastronomie locale : Goûts de Rennes (2021, 2022), les Bouffes Rennaises (2019), Festival Gourmand (organisation et gestion logistique, éditions 2014 à 2017).',
    ],
  },
  {
    period: '2013 à 2015 · 2 ans',
    title: 'Assistante communication et relations presse',
    org: 'Office de Tourisme de Rennes Métropole',
  },
];

export const skills = [
  'Planification et conduite de projet',
  'Management transversal',
  'Esprit d’initiative',
  'Travail en équipe',
  'Capacités organisationnelles',
];

export const education = [
  {
    year: '2012',
    title: 'Master Information-Communication-Culture (alternance)',
    school: 'IUP Denis Diderot, Université de Bourgogne',
    logo: 'ube' as const,
  },
  {
    year: '2009',
    title: 'Licence Histoire, Patrimoine et Tourisme',
    school: 'Université Rennes 2 Villejean',
    logo: 'rennes2' as const,
  },
];

export const commitments = [
  'Élue suppléante au CSE, commission Santé et Sécurité au Travail depuis 2022, Destination Rennes.',
  'Secrétaire d’une association de couture depuis 2019, ALB Bruz.',
  'Activités sportives : piscine et marche nordique.',
];
