
const inv = new Vue({
    el: '#ctrl_invitado',
    data: {
        tipousuario: "administrador",
        usuario: "NA",
        invitado: {
            usuario: "",
            clave: ""
        },
        invitados: [],
        msj: {
            estatus: '',
            mensaje: ''
        }
    },
    computed: {
        isFormEmpty: function () {
            return !(this.invitado.usuario.length > 0 && this.invitado.clave.length > 0);
        }
    },
    methods: {
        onSubmit: function () {
            this.$http.post('nuevo_invitado', this.invitado).then(response => {
                this.msj = response.body;
                if (this.msj.estatus === 'OK') {
                    this.obtenerInvitados();
                } else {
                    this.$swal({
                        title: "",
                        text: this.msj.mensaje,
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
        onGenContrasenia: function () {
            this.invitado.clave = "";
            var caracteres = "TqfS4WLIi9Ul8EZBXxa3NJK06R2sYQMrtVAOnHv5yozkePbDjwG7hpcFdg1muC";
            for (var i = 0; i < 8; i++) {
                this.invitado.clave += caracteres.charAt(Math.floor(Math.random() * caracteres.length));
            }
        },
        classItem: function(logeado) {
            return {
                'border-success': (logeado === "SI"),
                'border-danger': (logeado === "NO")
            };
        },
        classItemBadge: function(logeado) {
            return {
                'badge-success': (logeado === "SI"),
                'badge-danger': (logeado === "NO")
            };
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
            this.invitado.usuario = "";
            this.invitado.clave = "";
        }
    },
    created: function() {
        this.verificarUsuario();
        this.obtenerInvitados();
    }
});