
const enc = new Vue({
    el: '#ctrl_encabezado',
    data: {
        respuesta: []
    },
    methods: {
        logout: function() {
            this.$http.post('salir').then(response => {
                this.respuesta = response.body;
                if (this.respuesta.estatus === 'SESSION_NULL') {
                    window.location.href = "http://localhost/icom_domotica/";
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