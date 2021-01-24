
const dispositivo = new Vue({
    el: '#ctrl_dispositivo',
    data: {
        tipousuario: "administrador",
        usuario: "NA",
        dispositivo: {
            lugarid: 0,
            serie: ''
        },
        lugares: [],
        dispositivos: [],
        msj: []
    },
    computed: {
        isFormEmpty: function () {
            return !(this.dispositivo.lugarid !== 0 && this.dispositivo.serie.length > 0);
        }
    },
    methods: {
        onSubmit: function () {
            this.$http.post('nuevo_dispositivo', this.dispositivo).then(response => {
                this.msj = response.body;
                if (this.msj.estatus === 'OK') {
                    this.obtenerDispositivos();
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
            this.limpiar();
        },
        obtenerDispositivos: function () {
            this.$http.get('listar_dispositivo').then(response => {
                if (Array.isArray(response.body)) {
                    this.dispositivos = response.body;
                } 
            }, error => {
                this.$swal({
                    title: "Error desconocido",
                    text: error.body,
                    icon: "error"
                });
            });
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
        },
        limpiar: function () {
            this.dispositivo.lugarid = 0;
            this.dispositivo.serie = '';
        }
    },
    created: function() {
        this.verificarUsuario();
        this.obtenerLugares();
        this.obtenerDispositivos();
    }
});