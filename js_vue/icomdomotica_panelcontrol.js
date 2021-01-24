
const panel = new Vue({
    el: '#ctrl_central',
    data: {
        tipousuario: "administrador",
        usuario: "NA",
        sessioninit: false,
        mqttclient: null,
        topicos: [],
        mqttconfig: {
            isconnected: false,
            isreconecting: false,
            isconnectedmesagge: 'Fuera de linea',
            isconnectedsubmesagge: 'NA',
            url: null,
            options: {
                connectTimeout: 4000,
                clientId: 'mqttjs_',
                username: '',
                password: '',
                keepalive: 60,
                clean: true,
                reconnectPeriod: 4000
            }
        },
        mensaje: {
            cargando: false,
            tipo: 'default',
            texto: null
        },
        opcionesSnotify: {
            timeout: 2000,
            showProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true
        }
    },
    computed: {
        estatusConexion: function () {
            return {
                'danger': (!this.mqttconfig.isconnected && !this.mqttconfig.isreconecting),
                'success': (this.mqttconfig.isconnected && !this.mqttconfig.isreconecting),
                'warn': (!this.mqttconfig.isconnected && this.mqttconfig.isreconecting)
            };
        }
    },
    mounted: function () {
        this.mqttconfig.url = this.$broker_url;
        this.onLoginMqtt();
    },
    methods: {
        onLoginMqtt: function () {
            var tmp = [];
            this.$http.post('ingresar_mqtt').then(response => {
                tmp = response.body;
                if (tmp.estatus === "OK") {
                    this.sessioninit = true;
                    this.mqttconfig.options.clientId += tmp.token;
                    this.mqttconfig.options.username = tmp.usuario;
                    this.mqttconfig.options.password = tmp.clave;
                    this.startMqtt();
                }
            }, error => {
                this.$respuestaError(error, this.mensaje, this.opcionesSnotify);
            });
        },
        obtenerTopicos: function () {
            this.$http.get('listar_topico').then(response => {
                if (Array.isArray(response.body)) {
                    this.topicos = response.body;
                }
            }, error => {
                this.$respuestaError(error, this.mensaje, this.opcionesSnotify);
            });
        },
        startMqtt: function () {
            if (this.sessioninit) {
                this.obtenerTopicos();
                this.mqttclient = window.MQTT.connect(this.mqttconfig.url, this.mqttconfig.options);
                this.mqttconfig.isconnected = this.mqttclient.connected;
                this.mqttclient.on('connect', () => {
                    this.mqttconfig.isconnected = true;
                    this.mqttconfig.isreconecting = false;
                    this.mqttconfig.isconnectedsubmesagge = "OK";
                    this.displayEstatus();
                    for (var i = 0; i < this.topicos.length; i++) {
                        if (this.topicos[i].tipo === "realtime" || this.topicos[i].tipo === "switch") {
                            this.mqttclient.subscribe(this.topicos[i].nombre, {qos: 0}, (error, granted) => {
                                if (error) {

                                }

                                if (granted) {

                                }
                            });
                        }
                    }
                });

                this.mqttclient.on('reconnect', (error) => {
                    this.mqttconfig.isconnected = false;
                    this.mqttconfig.isreconecting = true;
                    this.mqttconfig.isconnectedsubmesagge = "Reconectando";
                    if (error) {
                        this.mqttconfig.isconnectedsubmesagge = "Error al reconectar";
                        this.mqttconfig.isconnected = false;
                        this.mqttconfig.isreconecting = false;
                    }
                    this.displayEstatus();
                });

                this.mqttclient.on('error', (error) => {
                    var err = error.toString();
                    if (err.indexOf("Not authorized", 0)) {
                        this.mqttconfig.isconnected = false;
                        this.mqttconfig.isconnectedsubmesagge = "Acceso denegado";
                    } else {
                        this.mqttconfig.isconnected = false;
                        this.mqttconfig.isconnectedsubmesagge = err;
                    }
                    this.displayEstatus();
                    this.mqttclient.end();
                });

                this.mqttclient.on('message', (topic, message) => {
                    var i = this.topicos.findIndex(t => (t.nombre == topic));
                    if (i >= 0) {
                        switch (this.topicos[i].tipo) {
                            case "switch":
                                this.topicos[i].estatus = (message.toString() === "ON") ? true : false;
                                break;
                            case "realtime":
                                this.topicos[i].valor = message.toString();
                                break;
                            default:
                                console.log(message.toString());
                                break;
                        }
                        
                    } else {
                        console.log(message.toString());
                    }
                });
            }
        },
        publicar: function (topico) {
            if (this.mqttclient) {
                this.mqttclient.publish(topico.nombre, (topico.estatus) ? "OFF" : "ON", (error) => {
                    if (!error) {
                        topico.estatus = !topico.estatus;
                    }
                });
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
        displayEstatus: function () {
            if (this.mqttconfig.isconnected) {
                this.mqttconfig.isconnectedmesagge = "En linea";
            } else {
                this.mqttconfig.isconnectedmesagge = "Fuera de linea";
            }
        }
    },
    created: function () {
        this.verificarUsuario();
    }
});