
const permiso = new Vue({
    el: '#ctrl_permiso',
    data: {
        tipousuario: "administrador",
        usuario: "NA",
        bloqueo: false,
        invitados: [],
        lugares: [],
        permisos: [],
        consulta: {
            idlugar: 0,
            idinvitado: 0
        },
        msj: []
    },
    computed: {
        isFormEmpty: function () {
            return !(this.consulta.idlugar > 0 && this.consulta.idinvitado > 0);
        },
        classBtnConsulta: function () {
            return {
                'btn-primary': !this.bloqueo,
                'btn-secondary': this.bloqueo
            };
        }
    },
    methods: {
        consultar: function () {
            if (!this.bloqueo) {
                this.obtenerPermisos();
            } else {
                this.bloqueo = false;
            }
        },
        obtenerInvitados: function () {
            this.$http.post('listar_invitado').then(response => {
                if (Array.isArray(response.body)) {
                    this.invitados = response.body;
                } else {
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
        obtenerPermisos: function () {
            this.permisos = [];
            this.$http.post('listar_permiso', this.consulta).then(response => {
                if (Array.isArray(response.body)) {
                    this.permisos = response.body;
                    this.bloqueo = true;
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
            this.consulta.idlugar = 0;
            this.consulta.idinvitado = 0;
            this.permisos = [];
        }
    },
    created: function() {
        this.verificarUsuario();
        this.obtenerLugares();
        this.obtenerInvitados();
    }
});