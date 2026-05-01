import { Module } from '../../../domain/curriculum/Module';
import { colors } from '../../../presentation/theme/colors';

export const MODULE_7: Module = {
  id: 'mod7',
  order: 7,
  titleFr: 'Mise en page & Impression',
  titleDarija: 'برينتيني!',
  descriptionDarija: 'تعلم تقاد feuille Excel لـ impression مزيان.',
  level: 'bonus',
  icon: '🖨️',
  color: colors.accentCyan,
  unlockRequirement: 60,
  lessons: [
    {
      id: 'mod7-les1',
      moduleId: 'mod7',
      order: 1,
      titleFr: 'Aperçu avant impression',
      titleDarija: 'شوف قبل ما تبرينتي',
      isMiniGame: false,
      slides: [
        {
          conceptFr: 'Ctrl+P – Aperçu avant impression',
          explanation: 'Ctrl+P كيبين ليك aperçu د feuille قبل ما تبرينتي. مهم تشوف واش مزيان قبل impression.',
          tip: 'ديما دير Ctrl+P باش تشوف قبل ما تبرينتي – تفادى الأخطاء!',
          excelExample: 'Ctrl + P → Aperçu → Print',
        },
      ],
      exercises: [
        {
          id: 'mod7-les1-ex1',
          type: 'multiple_choice',
          question: 'Raccourci ل aperçu avant impression:',
          options: ['Ctrl+S', 'Ctrl+P', 'Ctrl+Z', 'Ctrl+A'],
          correctIndex: 1,
        },
        {
          id: 'mod7-les1-ex2',
          type: 'true_false',
          question: 'Aperçu avant impression كايبين ليك كيف la page غاتبان ف impression.',
          correctIndex: 0,
        },
      ],
    },
    {
      id: 'mod7-les2',
      moduleId: 'mod7',
      order: 2,
      titleFr: 'Orientation et marges',
      titleDarija: 'Portrait و Paysage',
      isMiniGame: false,
      slides: [
        {
          conceptFr: 'Orientation Portrait et Paysage',
          explanation: 'Portrait = طول (vertical). Paysage = عرض (horizontal). ختار على حساب tableau ديالك.',
          tip: 'يلا tableau عندو بزاف colonnes ← Paysage. يلا بزاف lignes ← Portrait.',
          excelExample: 'Portrait: ▯ (tul)\nPaysage: ▭ (3rad)',
        },
      ],
      exercises: [
        {
          id: 'mod7-les2-ex1',
          type: 'multiple_choice',
          question: 'Tableau عندو بزاف colonnes – شنو orientation مزيانة؟',
          options: ['Portrait', 'Paysage', 'كلهم بحال بحال', 'Vertical'],
          correctIndex: 1,
        },
        {
          id: 'mod7-les2-ex2',
          type: 'multiple_choice',
          question: 'Portrait = ؟',
          options: ['Horizontal', 'Vertical (طول)', 'Diagonal', 'Carré'],
          correctIndex: 1,
        },
      ],
    },
    {
      id: 'mod7-les3',
      moduleId: 'mod7',
      order: 3,
      titleFr: 'Zone d\'impression',
      titleDarija: 'ختاري لي بغيتي تبرينتي',
      isMiniGame: false,
      slides: [
        {
          conceptFr: 'Définir la zone d\'impression',
          explanation: 'يلا بغيتي تبرينتي غير شي partie د feuille، سيلكسيوني plage، Mise en page ← Zone d\'impression ← Définir.',
          tip: 'ما تبرينتي غير لي تحتاج – وفر الحبار و الورق!',
          excelExample: 'Select A1:E20 → Mise en page → Zone impression → Définir',
        },
      ],
      exercises: [
        {
          id: 'mod7-les3-ex1',
          type: 'multiple_choice',
          question: 'Zone d\'impression كادير باش:',
          options: ['تبرينتي كاع feuille', 'تبرينتي غير partie محددة', 'تبدل couleur', 'Tri'],
          correctIndex: 1,
        },
        {
          id: 'mod7-les3-ex2',
          type: 'multiple_choice',
          question: 'فين كاين "Zone d\'impression"؟',
          options: ['Tab Données', 'Tab Accueil', 'Tab Mise en page', 'Tab Formules'],
          correctIndex: 2,
        },
      ],
    },
    {
      id: 'mod7-les4',
      moduleId: 'mod7',
      order: 4,
      titleFr: 'En-tête et pied de page',
      titleDarija: 'كتيبة فوق و تحت',
      isMiniGame: false,
      slides: [
        {
          conceptFr: 'En-tête (Header) et pied de page (Footer)',
          explanation: 'En-tête كايبان فوق كل page مبرينتية. Pied de page كايبان ف التحت. كيديرو: nom fichier، date، n° page.',
          tip: 'Insertion ← En-tête et pied de page.',
          excelExample: 'En-tête: "École Almdoun – Notes 6A"\nPied: "Page 1 de 2"',
        },
      ],
      exercises: [
        {
          id: 'mod7-les4-ex1',
          type: 'multiple_choice',
          question: 'En-tête د page كايبان ف impression:',
          options: ['ف وسط feuille', 'فوق كل page', 'ف التحت', 'ف اليسار'],
          correctIndex: 1,
        },
        {
          id: 'mod7-les4-ex2',
          type: 'true_false',
          question: 'N° د page يقدر يبان ف pied de page (footer).',
          correctIndex: 0,
        },
      ],
    },
    {
      id: 'mod7-les5',
      moduleId: 'mod7',
      order: 5,
      titleFr: 'Mini-Jeu: Print Setup!',
      titleDarija: 'لعب: Config Print!',
      isMiniGame: true,
      slides: [
        {
          conceptFr: 'Mini-Jeu: Config impression mzyan!',
          explanation: 'Config impression مزيان! ختار الـ option المزيانة لـ كل situation!',
          tip: 'ركز: orientation، zone impression، en-tête...',
          excelExample: 'Situation → Option',
        },
      ],
      exercises: [
        {
          id: 'mod7-les5-ex1',
          type: 'multiple_choice',
          question: 'Tableau فيه 12 colonnes – شنو orientation مزيانة؟',
          options: ['Portrait', 'Paysage', 'كلهم بحال بحال', 'Aucune'],
          correctIndex: 1,
        },
        {
          id: 'mod7-les5-ex2',
          type: 'multiple_choice',
          question: 'باش تشوف كيف tableau غاتبان قبل impression:',
          options: ['Ctrl+S', 'Ctrl+P', 'Ctrl+Z', 'F5'],
          correctIndex: 1,
        },
        {
          id: 'mod7-les5-ex3',
          type: 'multiple_choice',
          question: 'بغيتي تبرينتي غير A1:D10 – شنو كادير؟',
          options: ['تبرينتي كاع feuille', 'تحدد zone impression A1:D10', 'تبدل orientation', 'تفيلتري'],
          correctIndex: 1,
        },
        {
          id: 'mod7-les5-ex4',
          type: 'true_false',
          question: 'N° د page يقدر يبان ف en-tête ولا pied de page.',
          correctIndex: 0,
        },
      ],
    },
  ],
};
