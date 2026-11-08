/**
 * АВТОМАТИЧЕСКИЙ ГЕНЕРАТОР И СБОРЩИК ПРОЕКТА
 * LINELLA ORDER INTELLIGENCE PRO v1.0
 * Запуск: node setup-and-build.mjs
 */
import fs from 'fs';
import path from 'path';

const files = {
  'package.json': JSON.stringify({
    name: 'linella-order-intelligence-pro',
    private: true,
    version: '1.0.0',
    type: 'module',
    scripts: {
      dev: 'vite',
      build: 'tsc && vite build',
      preview: 'vite preview',
      test: 'vitest run',
      'android:init': 'npm run build && npx cap add android && npx cap sync android',
      'android:apk': 'npm run build && npx cap sync android && cd android && ./gradlew assembleDebug'
    },
    dependencies: {
      '@capacitor/android': '^6.0.0',
      '@capacitor/core': '^6.0.0',
      '@capacitor/filesystem': '^6.0.0',
      dexie: '^4.0.8',
      'dexie-react-hooks': '^1.1.7',
      'lucide-react': '^0.454.0',
      react: '^18.3.1',
      'react-dom': '^18.3.1',
      recharts: '^2.13.0',
      xlsx: '^0.18.5'
    },
    devDependencies: {
      '@capacitor/cli': '^6.0.0',
      '@types/react': '^18.3.11',
      '@types/react-dom': '^18.3.1',
      '@vitejs/plugin-react': '^4.3.3',
      autoprefixer: '^10.4.20',
      postcss: '^8.4.47',
      tailwindcss: '^3.4.14',
      typescript: '^5.6.2',
      vite: '^5.4.10',
      vitest: '^2.1.4'
    }
  }, null, 2),

  'tsconfig.json': JSON.stringify({
    compilerOptions: {
      target: 'ES2020',
      useDefineForClassFields: true,
      lib: ['ES2020', 'DOM', 'DOM.Iterable'],
      module: 'ESNext',
      skipLibCheck: true,
      moduleResolution: 'bundler',
      allowImportingTsExtensions: true,
      resolveJsonModule: true,
      isolatedModules: true,
      noEmit: true,
      jsx: 'react-jsx',
      strict: true,
      noUnusedLocals: false,
      noUnusedParameters: false,
      noFallthroughCasesInSwitch: true
    },
    include: ['src', 'tests']
  }, null, 2),

  'vite.config.ts': `import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    sourcemap: false
  }
});
`,

  'postcss.config.js': `export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
`,

  'tailwind.config.js': `/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [],
};
`,

  'capacitor.config.ts': `import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'md.linella.orderintelligence.pro',
  appName: 'Linella Order PRO',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  },
  android: {
    allowMixedContent: true,
    captureInput: true,
    webContentsDebuggingEnabled: true
  }
};

export default config;
`,

  'index.html': `<!DOCTYPE html>
<html lang="ru">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
    <title>Linella Order Intelligence PRO</title>
  </head>
  <body class="bg-slate-950 text-slate-100 antialiased">
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
`,

  'src/index.css': `@tailwind base;
@tailwind components;
@tailwind utilities;
`,

  'src/main.tsx': `import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
`,

  '.github/workflows/build-apk.yml': `name: Build Linella Order Intelligence PRO APK

on:
  push:
    branches: [ main, master ]
  workflow_dispatch:

jobs:
  build-android-apk:
    name: Build Web & Compile Android APK
    runs-on: ubuntu-latest
    timeout-minutes: 25

    steps:
      - name: 1. Checkout Repository
        uses: actions/checkout@v4

      - name: 2. Setup Node.js 20
        uses: actions/setup-node@v4
        with:
          node-version: '20'

      - name: 3. Setup Java JDK 21
        uses: actions/setup-java@v4
        with:
          distribution: 'temurin'
          java-version: '21'

      - name: 4. Setup Android SDK
        uses: android-actions/setup-android@v3

      - name: 5. Install NPM Dependencies
        run: npm install

      - name: 6. Run Unit Tests
        run: npm test

      - name: 7. Build Web App
        run: npm run build

      - name: 8. Add & Sync Capacitor Android
        run: |
          if [ ! -d "android" ]; then
            npx cap add android
          fi
          npx cap sync android

      - name: 9. Configure Android Manifest (largeHeap)
        run: |
          MANIFEST="android/app/src/main/AndroidManifest.xml"
          if [ -f "$MANIFEST" ]; then
            if ! grep -q "android:largeHeap" "$MANIFEST"; then
              sed -i 's/<application/<application android:largeHeap="true" android:usesCleartextTraffic="true"/g' "$MANIFEST"
            fi
          fi
          echo "org.gradle.jvmargs=-Xmx4096m -Dfile.encoding=UTF-8" >> android/gradle.properties

      - name: 10. Assemble Debug APK
        working-directory: ./android
        run: |
          chmod +x gradlew
          ./gradlew assembleDebug --no-daemon --stacktrace

      - name: 11. Upload APK Artifact
        uses: actions/upload-artifact@v4
        with:
          name: Linella-Order-Intelligence-PRO-APK
          path: android/app/build/outputs/apk/debug/app-debug.apk
          retention-days: 30
`
};

console.log('🚀 Создание структуры проекта Linella Order Intelligence PRO...');

for (const [relativePath, content] of Object.entries(files)) {
  const fullPath = path.join(process.cwd(), relativePath);
  fs.mkdirSync(path.dirname(fullPath), { recursive: true });
  fs.writeFileSync(fullPath, content, 'utf8');
  console.log('  ✔ Создан:', relativePath);
}

console.log('\\n✅ Базовая конфигурация создана!');
console.log('Поместите файлы из первого сообщения в папку src/ (types/domain.ts, db/database.ts, services/*, App.tsx) и запустите:');
console.log('1) npm install');
console.log('2) npm run dev (для работы на ПК)');
console.log('3) git push (для автоматической сборки APK в GitHub Actions)');