# Dungeon Game

A simple browser-based dungeon crawler built with React. Navigate your hero through the dungeon, battle monsters and collect loot. The project uses Zustand for game state management and React Bootstrap for styling.

## Game Overview

In this adventure you guide **Bjorn the Brave** through a maze of rooms filled with goblins, traps and legendary treasure.
Rooms are drawn at random so each playthrough is different.
Combat and skill checks use dice, and collecting weapons or runes improves your chances against tougher foes.
Your ultimate objective is to defeat the Goblin King and escape the dungeon with your spoils.

## Setup

```bash
npm install
npm start
```

The app will be available at [http://localhost:3000](http://localhost:3000) during development.

## Available npm scripts

- `npm start` - start the development server
- `npm test` - run unit tests in watch mode
- `npm run build` - create a production build
- `npm run eject` - expose configuration files (one-way)

## Deployment

A sample App Engine configuration is provided in `src/app.yaml`. To deploy to Google Cloud you can run:

```bash
gcloud app deploy src/app.yaml
```

## Contributing

1. Fork the repository and create a feature branch.
2. Run `npm test` to ensure your changes pass all tests.
3. Open a pull request describing your changes.

## License

This project is licensed under the [MIT License](LICENSE).
