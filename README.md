# Avito

React Native CLI проект в стиле Avito с launch-экраном.

## Требования

- Node.js >= 18
- npm или yarn
- Xcode (для iOS)
- Android Studio и Android SDK (для Android)
- CocoaPods (для iOS): `brew install cocoapods`

## Установка

```bash
npm install
```

Для iOS установите поды:

```bash
cd ios && pod install && cd ..
```

## Запуск

Metro (в одном терминале):

```bash
npm start
```

Android:

```bash
npm run android
```

iOS:

```bash
npm run ios
```

## Структура

- `App.tsx` — корневой компонент: сначала показывается Launch Screen, через 2 секунды — главный экран.
- `src/screens/LaunchScreen/` — экран-заставка (оранжевый фон, логотип Avito).
- `src/screens/MainScreen/` — главный экран после заставки.
- `src/common/theme.ts` — общие цвета и отступы в стиле Avito.

Нативный launch screen (до загрузки JS) настроен в стиле Avito:
- **iOS**: `ios/AvitoTemp/LaunchScreen.storyboard` — оранжевый фон, белый текст «Avito».
- **Android**: `android/app/src/main/res/values/styles.xml` и `colors.xml` — оранжевый фон и status bar.
