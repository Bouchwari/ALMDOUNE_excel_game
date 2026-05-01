import { Module } from '../../../domain/curriculum/Module';
import { colors } from '../../../presentation/theme/colors';

export const MODULE_5: Module = {
  id: 'mod5',
  order: 5,
  titleFr: 'Graphiques',
  titleDarija: 'رسم ب Excel!',
  descriptionDarija: 'تعلم تكريي graphiques و تشوف data بواحد الطريقة خرى.',
  level: 'advanced',
  icon: '🟣',
  color: colors.levelExpert,
  unlockRequirement: 60,
  lessons: [
    {
      id: 'mod5-les1',
      moduleId: 'mod5',
      order: 1,
      titleFr: 'Introduction aux graphiques',
      titleDarija: 'بداية د Graphiques',
      isMiniGame: false,
      slides: [
        {
          conceptFr: 'Pourquoi un graphique?',
          explanation: 'Graphique كيساعدك تفهم data بسرعة. بلاصت data ف tableau – كيبان ب graphique مزيان كتر.',
          tip: 'Graphique مزيان لـ présentation، tableau مزيان لـ calculs.',
          excelExample: 'Tableau → Insertion → Graphique → Choisir type',
        },
      ],
      exercises: [
        {
          id: 'mod5-les1-ex1',
          type: 'multiple_choice',
          question: 'فين كاين option "Insérer graphique" ف Excel؟',
          options: ['Tab Accueil', 'Tab Insertion', 'Tab Données', 'Tab Formules'],
          correctIndex: 1,
        },
        {
          id: 'mod5-les1-ex2',
          type: 'true_false',
          question: 'Graphique كيساعدك تفهم data بسرعة.',
          correctIndex: 0,
        },
      ],
    },
    {
      id: 'mod5-les2',
      moduleId: 'mod5',
      order: 2,
      titleFr: 'Graphique en barres',
      titleDarija: 'Graphique Barres',
      isMiniGame: false,
      slides: [
        {
          conceptFr: 'Histogramme (Barres verticales)',
          explanation: 'مزيان لـ موازنة بين valeurs مختلفة. مثلا: notes د طلاب – كل طالب عندو barre.',
          tip: 'سيلكسيوني données + en-têtes، Insertion ← Graphique ← Histogramme.',
          excelExample: 'Ali: ████ 15\nFatima: █████ 18\nOmar: ███ 12',
        },
      ],
      exercises: [
        {
          id: 'mod5-les2-ex1',
          type: 'multiple_choice',
          question: 'Graphique en barres مزيان لـ:',
          options: ['موازنة بين valeurs', 'Évolution ف temps', 'Parts د total', 'Corrélation'],
          correctIndex: 0,
        },
        {
          id: 'mod5-les2-ex2',
          type: 'multiple_choice',
          question: 'باش تكريي graphique، فالأول تختار:',
          options: ['Titre', 'Données (select)', 'Couleur', 'Format'],
          correctIndex: 1,
        },
      ],
    },
    {
      id: 'mod5-les3',
      moduleId: 'mod5',
      order: 3,
      titleFr: 'Graphique en courbes',
      titleDarija: 'Graphique Courbes',
      isMiniGame: false,
      slides: [
        {
          conceptFr: 'Courbe (Ligne)',
          explanation: 'Graphique en courbes مزيان لـ évolution ف temps. مثلا: notes د طالب من octobre حتى juin.',
          tip: 'يلا عندك données ب ordre chronologique → courbe!',
          excelExample: 'Oct: 12 → Nov: 14 → Dec: 16 → Jan: 15 → ...',
        },
      ],
      exercises: [
        {
          id: 'mod5-les3-ex1',
          type: 'multiple_choice',
          question: 'Graphique en courbes مزيان لـ:',
          options: ['موازنة', 'Évolution ف temps', 'Parts د total', 'Distribution'],
          correctIndex: 1,
        },
        {
          id: 'mod5-les3-ex2',
          type: 'true_false',
          question: 'Notes د طالب من Oct حتى Jun → Graphique en courbes هو المزيان.',
          correctIndex: 0,
        },
      ],
    },
    {
      id: 'mod5-les4',
      moduleId: 'mod5',
      order: 4,
      titleFr: 'Graphique en secteurs',
      titleDarija: 'Graphique Camembert',
      isMiniGame: false,
      slides: [
        {
          conceptFr: 'Camembert (Secteurs)',
          explanation: 'Graphique rond كايبين pourcentages. مثلا: 40% Maths، 30% Français، 30% Sciences – كايدير cercle مفصل.',
          tip: 'Total د كل secteurs = 100% ديما.',
          excelExample: '🔵 Maths 40%\n🔴 Français 30%\n🟢 Sciences 30%',
        },
      ],
      exercises: [
        {
          id: 'mod5-les4-ex1',
          type: 'multiple_choice',
          question: 'Graphique camembert (secteurs) مزيان لـ:',
          options: ['Évolution', 'Parts د total (%)', 'موازنة', 'Corrélation'],
          correctIndex: 1,
        },
        {
          id: 'mod5-les4-ex2',
          type: 'multiple_choice',
          question: 'Total د كل secteurs ف camembert:',
          options: ['50%', '200%', '100%', 'Variable'],
          correctIndex: 2,
        },
      ],
    },
    {
      id: 'mod5-les5',
      moduleId: 'mod5',
      order: 5,
      titleFr: 'Modifier un graphique',
      titleDarija: 'بدل Graphique',
      isMiniGame: false,
      slides: [
        {
          conceptFr: 'Titre du graphique',
          explanation: 'كليك على graphique ← كليك على "Titre du graphique" ← كتب titre مزيان.',
          tip: 'Titre مزيان كيفهم أي واحد كيشوف graphique.',
          excelExample: '"Notes des élèves – 6ème A – 2025-2026"',
        },
        {
          conceptFr: 'Légende et couleurs',
          explanation: 'Légende = clé د graphique. كتفهم couleur = شنو هي. تقدر تبدل couleurs د barres ولا secteurs.',
          tip: 'كليك ف barre/secteur ← Click droit ← Format de série de données.',
          excelExample: '🔵 = Ali   🔴 = Fatima   🟢 = Omar',
        },
      ],
      exercises: [
        {
          id: 'mod5-les5-ex1',
          type: 'multiple_choice',
          question: 'Légende ف graphique كتفهم:',
          options: ['الـ format', 'Couleur = شنو هي', 'الـ formule', 'الـ taille'],
          correctIndex: 1,
        },
        {
          id: 'mod5-les5-ex2',
          type: 'true_false',
          question: 'Titre د graphique مهم باش يفهم data لي فيه.',
          correctIndex: 0,
        },
      ],
    },
    {
      id: 'mod5-les6',
      moduleId: 'mod5',
      order: 6,
      titleFr: 'Mini-Jeu: Chart Detective!',
      titleDarija: 'لعب: Detective د Graphiques!',
      isMiniGame: true,
      slides: [
        {
          conceptFr: 'Mini-Jeu: Match graphique w data!',
          explanation: 'كايبان ليك data – ختار type د graphique مزيان!',
          tip: 'Temps ← courbe. Parts ← camembert. موازنة ← barres.',
          excelExample: 'Data → Type de graphique?',
        },
      ],
      exercises: [
        {
          id: 'mod5-les6-ex1',
          type: 'multiple_choice',
          question: 'Notes د طالب من septembre حتى juin – شنو type د graphique مزيان؟',
          options: ['Camembert', 'Histogramme', 'Courbe', 'Nuage de points'],
          correctIndex: 2,
        },
        {
          id: 'mod5-les6-ex2',
          type: 'multiple_choice',
          question: 'Budget: 40% Nourriture، 30% Transport، 30% Loisirs – شنو type؟',
          options: ['Courbe', 'Histogramme', 'Barres horizontales', 'Camembert'],
          correctIndex: 3,
        },
        {
          id: 'mod5-les6-ex3',
          type: 'multiple_choice',
          question: 'موازنة د prix بين 5 magasins – شنو type؟',
          options: ['Camembert', 'Histogramme', 'Courbe', 'Aucun'],
          correctIndex: 1,
        },
      ],
    },
  ],
};
