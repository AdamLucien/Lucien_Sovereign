import React from 'react';
import { renderToString } from 'react-dom/server';
import App from './App.jsx';

const SUPPORTED_LANGS = ['en', 'cs', 'de', 'uk', 'zh'];

export function render(urlPath = '/en/') {
  const pathLang = urlPath.split('/').filter(Boolean)[0];
  const initialLang = SUPPORTED_LANGS.includes(pathLang) ? pathLang : 'en';
  return renderToString(<App initialLang={initialLang} initialPath={urlPath} />);
}
