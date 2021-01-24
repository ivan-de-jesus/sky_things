
const piepagina = new Vue({
    el: '#ctrl_pie',
    data: {
        respuesta: []
    },
    methods: {
        logout: function() {
            this.$http.post('salir').then(response => {
                this.respuesta = response.body;
                if (this.respuesta.estatus === 'SESSION_NULL') {
                    window.location.href = "http://localhost/sky_things/";
                } else {
                    this.$swal({
                        title: "",
                        text: this.respuesta.mensaje,
                        icon: "error"
                    });
                }
            }, error => {
                this.$swal({
                    title: "Error desconocido",
                    text: error.bodytext,
                    icon: "error"
                });
            });
        }
    }
});