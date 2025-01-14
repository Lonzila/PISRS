<template>
  <div class="h-screen w-screen relative flex items-center justify-center overflow-hidden">
    <!-- Ozadje -->
    <div
        class="absolute inset-0 bg-cover bg-center bg-najina-slika"
        style="background-position: center 65%;">
    </div>

    <!-- Prosojna plast -->
    <div class="absolute inset-0 bg-black bg-opacity-50"></div>

    <!-- Kartica za sporočilo -->
    <div class="relative z-10 bg-white bg-opacity-50 shadow-2xl rounded-xl p-8 max-w-lg w-full transform -translate-y-16">
      <h1 class="text-2xl font-extrabold text-gray-800 mb-4 text-center">
        Aplikacija trenutno ne deluje ampak...
      </h1>
      <p class="text-xl text-center text-red-600 font-bold">
        Bi se poročila z mano? ❤️
      </p>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style>
@import 'tailwindcss/tailwind.css';

body {
  margin: 0;
}

.bg-najina-slika {
  background-image: url('../assets/domennastjaUSA.jpg');
  background-size: cover;
  background-repeat: no-repeat;
}
</style>
