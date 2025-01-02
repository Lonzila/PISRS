<template>
  <div class="min-h-screen w-screen bg-gray-100 flex flex-col items-center justify-center">
    <!-- Glavni naslov -->
    <h1 class="text-4xl font-extrabold text-gray-800 mb-8 text-center">
      Izberite Poglavje
    </h1>
    <!-- Mreža poglavij -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4 max-w-6xl w-full">
      <router-link
          v-for="(chapter, index) in poglavja"
          :key="index"
          :to="chapter.path"
          class="p-6 bg-white shadow-lg rounded-lg hover:shadow-xl transition duration-300 transform hover:scale-105"
      >
        <h2 class="text-2xl font-bold text-gray-800">{{ chapter.naziv }}</h2>
        <p class="text-gray-600">{{ chapter.opis }}</p>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      poglavja: [
        { naziv: "I. Uvod", opis: "Osnovne informacije in uvodna poglavja.", path: "/chapter1" },
        { naziv: "II. Pravice in dolžnosti", opis: "Opis pravic in dolžnosti strank.", path: "/chapter2" },
        { naziv: "III. Posebni postopki", opis: "Posebni pravni postopki in določila.", path: "/chapter3" },
        { naziv: "IV. Stroški postopka", opis: "Določitev in obračun stroškov.", path: "/chapter4" },
        { naziv: "V. Odvetniške tarife", opis: "Pregled tarif odvetnikov.", path: "/chapter5" },
        { naziv: "VI. Zastopanje", opis: "Podrobnosti o zastopanju strank.", path: "/chapter6" },
        { naziv: "VII. Pritožbeni postopki", opis: "Opis postopkov za pritožbe.", path: "/chapter7" },
        { naziv: "VIII. Pravdni postopek", opis: "Določila o pravdnih postopkih.", path: "/pravdniPostopek" },
        { naziv: "IX. Posebna pravna sredstva", opis: "Podrobnosti o pravnih sredstvih.", path: "/chapter9" },
        { naziv: "X. Mednarodni postopki", opis: "Postopki v mednarodnem okolju.", path: "/chapter10" },
      ],
    };
  },
};
</script>
