
const topico = new Vue({
    el: '#ctrl_topico',
    data: {
        tipousuario: "administrador",
        usuario: "NA",
        indexdispositivo: -1,
        tmptopico: '',
        topico: {
            dispositivoid: 0,
            nombre: '',
            etiqueta: '',
            tipo: ''
        },
        topicos: [],
        dispositivos: [],
        msj: []
    },
    watch: {
        tmptopico: function (val) {
            if (this.indexdispositivo >= 0) {
                var tp = this.dispositivos[this.indexdispositivo];
                this.topico.nombre = (tp.serie + "/" + val);
            }
        }
    },
    computed: {
        isFormEmpty: function () {
            return !(this.topico.nombre.length > 0 && this.topico.etiqueta.length > 0 && 
                    this.indexdispositivo >= 0 && this.tmptopico.length > 0 && 
                    this.topico.tipo.length > 0);
        }
    },
    methods: {
        onSubmit: function () {
            if (this.$isMobile()) {
                this.crearTopico();
            }
            
            this.$http.post('nuevo_topico', this.topico).then(response => {
                this.msj = response.body;
                if (this.msj.estatus === 'OK') {
                    this.obtenerTopicos();
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
        obtenerTopicos: function () {
            this.$http.get('listar_topico').then(response => {
                if (Array.isArray(response.body)) {
                    this.topicos = response.body;
                } 
            }, error => {
                this.$swal({
                    title: "Error desconocido",
                    text: error.body,
                    icon: "error"
                });
            });
        },
        crearTopico: function () {
            if (this.indexdispositivo >= 0) { 
                var tp = this.dispositivos[this.indexdispositivo];
                this.topico.nombre = (tp.serie + "/" + this.tmptopico);
            }
        },
        procesoDispositivo: function() {
            if (this.indexdispositivo >= 0) {
                var tp = this.dispositivos[this.indexdispositivo];
                this.topico.nombre = (tp.serie + "/" + this.tmptopico);
                this.topico.dispositivoid = tp.id;
            }
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
            this.indexdispositivo = -1;
            this.tmptopico = '';
            this.topico.nombre = '';
            this.topico.etiqueta = '';
            this.topico.tipo = '';
        }
    },
    created: function() {
        this.verificarUsuario();
        this.obtenerTopicos();
        this.obtenerDispositivos();
    }
});