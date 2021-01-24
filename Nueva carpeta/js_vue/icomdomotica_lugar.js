
const inv = new Vue({
    el: '#ctrl_lugar',
    data: {
        tipousuario: "administrador",
        usuario: "NA",
        lugar: {
            descripcion: null
        },
        lugares: [],
        msj: []
    },
    computed: {
        isFormEmpty: function () {
            return !(this.lugar.descripcion);
        }
    },
    methods: {
        onSubmit: function () {
            this.$http.post('nuevo_lugar', this.lugar).then(response => {
                this.msj = response.body;
                if (this.msj.estatus === 'OK') {
                    this.obtenerLugares();
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
                    text: error.body,
                    icon: "error"
                });
            });
            this.lugar.descripcion = null;
        },
        obtenerLugares: function () {
            this.$http.get('listar_lugar').then(response => {
                if (Array.isArray(response.body)) {
                    this.lugares = response.body;
                } 
            }, error => {
                this.$swal({
                    title: "Error desconocido",
                    text: error.body,
                    icon: "error"
                });
            });
        },
        verificarUsuario: function () {
            var tmp = [];
            this.$http.get('verificar_usuario').then(response => {
                tmp = response.body;
                if (tmp.estatus === 'OK') {
                    this.tipousuario = tmp.tipo;
                    this.usuario = tmp.usuario.split('@')[0];
                    this.$almacenSet('tipo_usr', this.tipousuario);
                    this.$almacenSet('usuario', this.usuario);
                } else {
                    this.$swal({
                        title: "",
                        text: tmp.mensaje,
                        icon: "error"
                    });
                }
            }, error => {
                this.$swal({
                    title: "Error desconocido",
                    text: error.body,
                    icon: "error"
                });
            });
        }
    },
    created: function() {
        this.verificarUsuario();
        this.obtenerLugares();
    }
});