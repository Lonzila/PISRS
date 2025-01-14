<template>
  <div class="h-screen w-screen relative flex items-center justify-center">
    <!-- Background -->
    <div class="absolute inset-0 bg-pravniska-slika bg-cover bg-center"></div>

    <!-- Transparent overlay -->
    <div class="absolute inset-0 bg-white bg-opacity-40"></div>

    <!-- Calculation card -->
    <div class="relative z-10 bg-white shadow-2xl rounded-xl p-8 max-w-lg w-full">
      <h1 class="text-4xl font-extrabold text-gray-800 mb-8 text-center">
        Izračun Odvetniških Storitev
      </h1>

      <!-- Main dropdown for service selection -->
      <label class="block mb-4 font-semibold text-gray-700">
        Izberite storitev:
        <select
            v-model="izbranaStoritev"
            @change="resetOptions"
            class="w-full mt-2 p-2 border border-gray-300 rounded-lg"
        >
          <option value="">Izberite...</option>
          <option v-for="(storitev, key) in storitve" :key="key" :value="key">
            {{ storitev.naziv }}
          </option>
        </select>
      </label>

      <!-- Submenu for specific service options -->
      <div v-if="podOpcije.length > 0" class="mb-4">
        <label class="block mb-2 font-semibold text-gray-700">
          Izberite dodatno možnost:
          <select
              v-model="izbranaPodstoritev"
              class="w-full mt-2 p-2 border border-gray-300 rounded-lg"
          >
            <option value="">Izberite...</option>
            <option
                v-for="(podstoritev, index) in podOpcije"
                :key="index"
                :value="podstoritev"
            >
              {{ podstoritev.naziv }}
            </option>
          </select>
        </label>
      </div>

      <!-- Input for case value -->
      <div v-if="potrebenVnos" class="mb-4">
        <label class="block mb-2 font-semibold text-gray-700">
          Vnesite vrednost predmeta (€):
          <input
              v-model.number="vrednostPredmeta"
              type="number"
              placeholder="Vrednost predmeta (€)"
              class="w-full mt-2 p-2 border border-gray-300 rounded-lg"
          />
        </label>
      </div>

      <!-- Calculation button -->
      <button
          @click="izracunaj"
          :disabled="!validnaIzbira"
          class="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 hover:shadow-lg transition duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Izračunaj
      </button>

      <!-- Display results -->
      <div
          v-if="rezultat"
          class="mt-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg"
      >
        <p>Število točk storitve: <strong>{{ rezultat.tocke }}</strong></p>
        <p>Vrednost storitve (€): <strong>{{ rezultat.vrednostEur }}</strong></p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      izbranaStoritev: "",
      izbranaPodstoritev: "",
      vrednostPredmeta: null,
      rezultat: null,
      storitve: {
        tozbe: {
          naziv: "Tožbe",
          podOpcije: [
            { naziv: "Splošne tožbe po tarifni št. 19", faktor: 1 },
            { naziv: "Spori zaradi motenja posesti", tocke: 300 },
            { naziv: "Spori o osebnih in stvarnih služnostih", tocke: 300 },
          ],
        },
        odgovori: {
          naziv: "Odgovori na tožbe in pripravljalne vloge",
          podOpcije: [
            { naziv: "Obrazložen odgovor na tožbo", faktor: 1 },
            { naziv: "Druga pripravljalna vloga", faktor: 0.75 },
            { naziv: "Tretja pripravljalna vloga", faktor: 0.5 },
            { naziv: "Dokazni predlog in druge vloge", tocke: 50 },
          ],
        },
        zastopanje: {
          naziv: "Zastopanje",
          podOpcije: [
            { naziv: "Prvi narok za glavno obravnavo", faktor: 1 },
            { naziv: "Nadaljnji narok za glavno obravnavo", faktor: 0.5 },
            { naziv: "Narok s procesnimi vprašanji", faktor: 0.25 },
            { naziv: "Zastopanje izven zgradbe sodišča", faktor: 0.5 },
            { naziv: "Zastopanje pred sodiščem druge stopnje", faktor: 1.25 },
          ],
        },
        pravnaSredstva: {
          naziv: "Pravna sredstva",
          podOpcije: [
            { naziv: "Redno pravno sredstvo", faktor: 1.25 },
            { naziv: "Redno pravno sredstvo zoper procesni sklep", faktor: 0.5 },
            { naziv: "Izredno pravno sredstvo", faktor: 1.5 },
            { naziv: "Obrazložena pobuda za izredno pravno sredstvo", faktor: 1.25 },
            {
              naziv: "Odvetniški stroški (50 % prejšnje točke)",
              faktor: 0.5,
              pogojnaTočka: true,
            },
          ],
        },
      },
    };
  },
  computed: {
    podOpcije() {
      return this.izbranaStoritev
          ? this.storitve[this.izbranaStoritev]?.podOpcije || []
          : [];
    },
    potrebenVnos() {
      return (
          this.podOpcije.some(
              (podstoritev) => podstoritev.faktor || podstoritev.tocke
          ) && !this.izbranaPodstoritev?.tocke
      );
    },
    validnaIzbira() {
      return this.potrebenVnos
          ? this.vrednostPredmeta > 0
          : this.izbranaPodstoritev !== "";
    },
  },
  methods: {
    resetOptions() {
      this.izbranaPodstoritev = "";
      this.vrednostPredmeta = null;
      this.rezultat = null;
    },
    izracunaj() {
      let tocke = 0;

      if (this.izbranaPodstoritev.tocke) {
        tocke = this.izbranaPodstoritev.tocke;
      } else if (this.izbranaPodstoritev.faktor) {
        const tockePredmeta = this.pretvoriTockeVstoritev(this.vrednostPredmeta);
        tocke = Math.ceil(tockePredmeta * this.izbranaPodstoritev.faktor);
      } else if (this.izbranaStoritev === "tozbe") {
        tocke = this.pretvoriTockeVstoritev(this.vrednostPredmeta);
      }

      const vrednostEur = (tocke * 0.6).toFixed(2);
      this.rezultat = { tocke, vrednostEur };

      //this.$router.push("/presenecenje");
    },
    pretvoriTockeVstoritev(vrednost) {
      const tocke = Math.ceil(vrednost / 0.6);
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
