<template>
  <div class="h-screen w-screen relative flex items-center justify-center">
    <!-- Slikovno ozadje -->
    <div class="absolute inset-0 bg-pravniska-slika bg-cover bg-center"></div>

    <!-- Svetla prosojna plast -->
    <div class="absolute inset-0 bg-white bg-opacity-40"></div>

    <!-- Kartica za izračun -->
    <div class="relative z-10 bg-white shadow-2xl rounded-xl p-8 max-w-md w-full">
      <h1 class="text-4xl font-extrabold text-gray-800 mb-8 text-center">
        Izračun Odvetniške Tarife Št. 19
      </h1>
      <input
          v-model="vrednostPredmeta"
          type="number"
          placeholder="Vnesite vrednost predmeta (€)"
          class="w-full p-4 mb-6 border border-gray-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-300 text-black"
      />
      <button
          @click="izracunajTarifo"
          class="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 hover:shadow-lg transition duration-300 transform hover:scale-105"
      >
        Izračunaj
      </button>
    </div>

    <!-- Obvestilo -->
    <div
        v-if="prikaziObvestilo"
        class="absolute bottom-8 left-1/2 transform -translate-x-1/2 bg-green-500 text-white text-lg rounded-lg px-6 py-4 shadow-lg transition duration-300"
    >
      {{ rezultatObvestilo }}
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      vrednostPredmeta: null, // Vrednost predmeta
      prikaziObvestilo: false, // Prikaži ali skrij obvestilo
      rezultatObvestilo: "", // Besedilo obvestila
    };
  },
  methods: {
    izracunajTarifo() {
      // Izračun točk in vrednosti
      const tockePredmeta = this.vrednostVtocke(this.vrednostPredmeta);
      const storitevTocke = this.pretvoriTockeVstoritev(tockePredmeta);
      const vrednostEur = (storitevTocke * 0.6).toFixed(2);

      // Nastavi obvestilo
      this.rezultatObvestilo = `Za vrednost predmeta ${this.vrednostPredmeta} € (pretvorjeno: ${tockePredmeta} točk) je vrednost storitve: ${storitevTocke} točk (${vrednostEur} €).`;
      this.prikaziObvestilo = true;

      // Skrij obvestilo po 5 sekundah
      setTimeout(() => {
        this.prikaziObvestilo = false;
      }, 10000);
    },

    vrednostVtocke(vrednost) {
      return Math.ceil(vrednost / 0.6); // Pretvori € v točke
    },

    pretvoriTockeVstoritev(tocke) {
      if (tocke <= 3000) return 200;
      if (tocke <= 10000) return 300;
      if (tocke <= 20000) return 400;
      if (tocke <= 35000) return 500;
      if (tocke <= 50000) return 600;
      if (tocke <= 65000) return 700;
      if (tocke <= 80000) return 800;
      if (tocke <= 100000) return 900;
      if (tocke <= 120000) return 1000;

      return 1000 + Math.ceil((tocke - 120000) / 40000) * 100;
    },
  },
};
</script>
