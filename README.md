# Map Game 🗺️

Un jeu interactif de géographie développé avec Next.js où vous pouvez tester vos connaissances des pays du monde.

## Technologies Utilisées

- Next.js 14 - Framework React moderne
- React 18 - Bibliothèque UI
- TypeScript - Pour un code typé et plus robuste
- TailwindCSS - Pour le styling
- Fichier JSON local - Données géographiques
- PostgreSQL - Base de données (pour les fonctionnalités futures)
- React Simple Maps - Pour la visualisation cartographique
- Radix UI - Composants UI accessibles et personnalisables

## Fonctionnalités

- 🌍 Carte interactive du monde
- 🎯 Quiz sur les pays
- 📊 Système de score
- 🔍 Filtres de recherche
- 📱 Interface responsive et moderne

## Installation

1. Clonez le repository :

```
git clone https://github.com/valclmb/map-quiz.git
```

2. Installez les dépendances :

```
pnpm install
```

3. Lancez le serveur de développement :

```
pnpm dev
```

4. Ouvrez http://localhost:3000 dans votre navigateur.

## Scripts Disponibles

- pnpm dev - Lance le serveur de développement
- pnpm build - Construit l'application pour la production
- pnpm start - Lance l'application en mode production
- pnpm lint - Vérifie le code avec ESLint

## Structure du Projet

```
├── app/               # Configuration Next.js 
et pages
├── src/
│   ├── components/    # Composants React
│   ├── context/       # Contextes React
│   ├── hooks/         # Hooks personnalisés
│   └── lib/           # Utilitaires et 
fonctions
└── public/            # Assets statiques
```
