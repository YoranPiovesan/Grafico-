<template>
  <div>
    <div class="pai-upload">
    <input type="file" class="form-control" name="file" multiple ref="files" id="file">
    </div>
    <button @click="sendFile">Gerar gráfico</button>
    <div class="home text-center">
      <h3>Número de cargas por região</h3>
      <Chart type="pie" :data="chartData" :width="10000" :height="4000" />
    </div>
  </div>
</template>
<script lang="ts">
import Chart from "primevue/chart";
import Vue from "vue";
import cargas from "../services/service";

Vue.component("Chart", Chart);

export default Vue.extend({
  mounted() {
    cargas().then((resp: any) => {
      resp.forEach((element: any) => {
        this.labels.push(element.destino);
        this.quantity.push(element.quantidade);
      });
    });
  },
  data() {
    return {
      returnAPI: [] as any,
      labels: [] as any,
      quantity: [] as any,
    };
  },
  methods: {
     async sendFile() {
      let dataForm = new FormData();
      dataForm.append(`file`, this.$refs.files.files[0]);
      let res = await fetch(`http://localhost:8080/api/excel/upload`, {
        method: 'POST',
        body: dataForm,
      });
      let data = await res.json();
      console.log(data);
    },
  },

  computed: {
    chartData(): any {
      if (this.quantity.length < 1) {
        const data: any = {
          labels: [] as any,
          datasets: [
            {
              data: [] as any,
              backgroundColor: ["#42A5F5", "#66BB6A", "#FFA726"],
              hoverBackgroundColor: ["#64B5F6", "#81C784", "#FFB74D"],
            },
          ],
        };
        return data;
      }
      if (this.quantity.length >= 1) {
        const data: any = {
          labels: [...this.labels] as any,
          datasets: [
            {
              data: [...this.quantity] as any,
              backgroundColor: ["#42A5F5", "#66BB6A", "#FFA726"],
              hoverBackgroundColor: ["#64B5F6", "#81C784", "#FFB74D"],
            },
          ],
        };
        return data;
      }
      return [];
    },
  },
});
</script>

<style lang="scss">
.pai-upload {
  display: flex;
  justify-content: center;
  align-items: center;
  
  .upload {
    background: gray;
    padding: 2rem 1rem;
    color: black;
    font-size: 15px;
    border: 0;
  }
}
button {
  background: green;
  padding: 0.8rem 3rem;
  border: 0;
  color: white;
  font-size: 15px;
  text-transform: capitalize;
  margin: 1rem 0;
  cursor: pointer;
}
</style>