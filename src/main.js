import './assets/main.css';
import { createApp } from 'vue';
import App from './App.vue';
import './index.css';
import router from './router'; // Dodaj router

const app = createApp(App);

app.use(router); // Poveži aplikacijo z routerjem
app.mount('#app'); // Montiraj aplikacijo
